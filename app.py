from flask import Flask, jsonify, request, g, json
from flask_cors import CORS
from flask_restful import Resource, reqparse
from flask_restful_swagger_2 import Api
from flask_json import FlaskJSON, json_response
from bson import json_util

from neo4j import GraphDatabase
from dotenv import load_dotenv
import os

app = Flask(__name__)
CORS(app)
FlaskJSON(app)

#api = Api(app, title='Beats Beyond Borders API', api_version='0.0.10')

# Neo4j connection
load_dotenv()
uri = "bolt://localhost:7687"       # Update with your Neo4j URI
username = os.getenv("USERNAME")    # Update with your Neo4j username
password = os.getenv("PASSWORD")    # Update with your Neo4j password

#driver = GraphDatabase.driver(uri, auth=(username, password))
with GraphDatabase.driver(uri, auth=(username, password), encrypted=False) as driver:
    driver.verify_connectivity()

def get_db():
    if not hasattr(g, 'neo4j_db'):
        g.neo4j_db = driver.session()
    return g.neo4j_db

# api returns all of the songs in the database
# @app.route('/songs', methods=['POST'])
# def songs():
#     data = request.get_json()
#     query = data.get('query')
#     params = data.get('params', {})

#     with driver.session() as session:
#         result = session.run(query, params)
#         records = [record.values() for record in result.records()]

#     return jsonify(records)

@app.route('/members', methods=['GET'])
def members():
    query = "MATCH (user:Member) RETURN user"
    data = []
    result = driver.execute_query(query)
    for i in range(len(result[0])):
        record = result[0][i]
        #print(record[0])
        data.append({
            "last_name": record[0]._properties['last_name'],
            "ID": record[0]._properties['ID'],
            "first_name": record[0]._properties['first_name']
        
        })
        print()
    return jsonify(data)
    
@app.route('/genres', methods=['GET'])
def genres():
    query = "MATCH (genres:Genre) RETURN genres"
    data = []
    result = driver.execute_query(query)
    for i in range(len(result[0])):
        record = result[0][i]
        data.append({
            "name": record[0]._properties['Name']
        })
    return jsonify(data)

@app.route('/songs', methods=['GET'])
def songs():
    artist = ''
    query = "MATCH (songs:Song) RETURN songs"
    data = []
    result = driver.execute_query(query)
    for i in range(len(result[0])):
        record = result[0][i]
        if "Artiist" in record[0]._properties:
            artist = record[0]._properties['Artiist']
        else:
            artist = record[0]._properties['Artist']
        data.append({
            "Name": record[0]._properties['Name'],
            "Artist": artist
        })
    return jsonify(data)

@app.route('/<genre>', methods=['GET'])
def song_in_genre(genre):
    query = f"MATCH (song:Song)-[:Type]->(genre:Genre {{Name: '{genre}'}}) RETURN song"
    data = []
    result = driver.execute_query(query)
    for i in range(len(result[0])):
        record = result[0][i]
        artist = ''
        if "Artiist" in record[0]._properties:
            artist = record[0]._properties['Artiist']
        elif "Artist" in record[0]._properties:
            artist = record[0]._properties['Artist']
        data.append({
            "Name": record[0]._properties['Name'],
            "Artist": artist
        })
    return jsonify(data)
  
@app.route('/api/<name>', methods=['GET'])
def userSong(name):
    query = f"MATCH (user:Member {{first_name: '{name}'}})-[:Likes]->(song:Song) RETURN song"
    data = []
    result = driver.execute_query(query)
    for i in range(len(result[0])):
        record = result[0][i]
        artist = ''
        if "Artiist" in record[0]._properties:
            artist = record[0]._properties['Artiist']
        elif "Artist" in record[0]._properties:
            artist = record[0]._properties['Artist']
        data.append({
            "Name": record[0]._properties['Name'],
            "Artist": artist
        })
    return jsonify(data) 

@app.route('/api/<name>/<genre>', methods=['GET'])
def userSongGenre(name, genre):
    query = f"MATCH (user:Member {{first_name: '{name}'}})-[:Likes]->(song:Song)-[:Type]->(genre:Genre {{Name: '{genre}'}}) RETURN song"
    data = []
    result = driver.execute_query(query)
    for i in range(len(result[0])):
        record = result[0][i]
        artist = ''
        if "Artiist" in record[0]._properties:
            artist = record[0]._properties['Artiist']
        elif "Artist" in record[0]._properties:
            artist = record[0]._properties['Artist']
        data.append({
            "Name": record[0]._properties['Name'],
            "Artist": artist
        })
    return jsonify(data) 

@app.route('/')
def home():
    return jsonify({
        "name": "Beats Beyond Borders",
        "version": "Prototype",
        "description": "This API allows user to establish connection",
        "routes": {
           
        }})

if __name__ == '__main__':
    app.run(debug=True, port=8001)

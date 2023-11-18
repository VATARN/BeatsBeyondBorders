from flask import Flask, jsonify, request
from neo4j import GraphDatabase
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Neo4j connection
uri = "neo4j://localhost:7687"  # Update with your Neo4j URI
username = "neo4j"              # Update with your Neo4j username
password = "password"           # Update with your Neo4j password
driver = GraphDatabase.driver(uri, auth=(username, password))

@app.route('/api/data', methods=['GET'])
def get_data():
    # Example query (modify as needed)
    query = "MATCH (n) RETURN n LIMIT 25"

    with driver.session() as session:
        result = session.run(query)
        data = [record["n"] for record in result]
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
    app.run(debug=True)

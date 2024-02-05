
'''
from dotenv import load_dotenv
import os
load_dotenv()
username = os.getenv("USERNAME")
password = os.getenv("PASSWORD")
print(username, password)
'''
from app import driver

# get every song from a user (provide name)
'''
MATCH (user:Member{first_name:"Chad"})-[:Likes]->(song:Song)
RETURN song;
'''

# get every song in a genre (provide genre)
'''
Match (song:Song)-[:Type]->(hip_hop:Genre {Name: "Hip-Hop"})
RETURN song, hip_hop
'''
'''
# Get the name of all 42 year-olds
records, summary, keys = driver.execute_query(
    #"MATCH (user:Member {first_name:$first_name})-[:Likes]->(song:Song) RETURN song",
    "MATCH (user:Member) RETURN user",
    #first_name="Chad",
    database_="neo4j",
)
#print(records)

# Loop through results and do something with them
for song in records:
    #print(song)["Songs"].get('Artist'))
    print(song["user"].get('last_name'))

# Summary information
print("The query `{query}` returned {records_count} records in {time} ms.".format(
    query=summary.query, records_count=len(records),
    time=summary.result_available_after,
))
'''

# query = "MATCH (user:Member) RETURN user"
# data = []
# result = driver.execute_query(query)
#print(result[0][0]["user"])

'''
# Extract specific properties from each record
for record in result[0][1]:
    print()
    print(record._properties['last_name'])
    print()

    user_properties = record['user'].properties
    data.append({
        "last_name": user_properties.get('last_name', ''),
        "ID": user_properties.get('ID', ''),
        "first_name": user_properties.get('first_name', '')
    
    })

'''

# for i in range(len(result[0])):
#     record = result[0][i]
#     #print(record[0])
#     data.append({
#         "last_name": record[0]._properties['last_name'],
#         "ID": record[0]._properties['ID'],
#         "first_name": record[0]._properties['first_name']
    
#     })
#     print()

# print(data)



# query = "MATCH (songs:Song) RETURN songs"
# data = []
# result = driver.execute_query(query)
# for i in range(len(result[0])):
#     record = result[0][i]
#     data.append({
#         "Name": record[0]._properties['Name'],
#         "ID": record[0]._properties['ID'],
#         "Artiist": record[0]._properties['Artist']
#     })
# print(data)
genre = 'Hip-Hop'
#query = "match (song:Song)-[:Type]->(genre:Genre {Name: " +str(genre)+ "}) return genre, collect(song) as songs"
name = 'Chad'
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
print(data)
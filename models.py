
# CREATE CLASSES TO MODEL EACH NODE
from flask_restful import Resource
from flask_restful_swagger_2 import Schema, swagger
from app import get_db

# Team Member Model
class MemberModel(Schema):
    type = 'object'
    properties = {
        'ID': {
            'type': 'integer',
        },
        'first_name': {
            'type': 'string',
        },
        'last_name': {
            'type': 'string',
        }
    }
def serialize_member(member):
    return {
        'ID': member['ID'],
        'first_name': member['first_name'],
        'last_name': member['last_name']
    }

# Song Model
class SongModel(Schema):
    type = 'object'
    properties = {
        'ID': {
            'type': 'integer',
        },
        'Name': {
            'type': 'string',
        },
        'Artist': {
            'type': 'string',
        }
    }

def serialize_song(song):
    return {
        'ID': song['id'],
        'Name': song['name'],
        'Artist': song['Artist']
    }

# Genre Model
class GenreModel(Schema):
    type = 'object'
    properties = {
        'Name': {
            'type': 'string',
        }
    }

def serialize_genre(genre):
    return {
        'Name': genre['Name'],
    }

# find all songs that belong to a genre
class SongListByGenre(Resource):
    @swagger.doc({
        'tags': ['movies'],
        'summary': 'Find movie by genre id',
        'description': 'Returns a list of movies by genre',
        'parameters': [
            {
                'name': 'genre_id',
                'description': 'The name of the genre.',
                'in': 'path',
                'type': 'string',
                'required': 'true'
            }
        ],
        'responses': {
            '200': {
                'description': 'A list of movies with the specified genre',
                'schema': {
                    'type': 'array',
                    'items': SongModel,
                }
            }
        }
    })
    def get(self, genre_id):
        def get_songs_by_genre(tx, genre_id):
            return list(tx.run(
                '''
                MATCH (song:Song)-[:Type]->(genre:Genre)
                WHERE toLower(genre.name) = toLower($genre_id)
                RETURN song
                ''', {'genre_id': genre_id}
            ))
        db = get_db()
        result = db.read_transaction(get_songs_by_genre, genre_id)
        return [serialize_song(song['movie']) for song in result]

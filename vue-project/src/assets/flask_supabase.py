from flask import request, Flask, jsonify
from flask_cors import CORS
from supabase import create_client, Client

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

SECRET_URL = 'https://aablmtpwhrnrhgpipsia.supabase.co'
SECRET_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFhYmxtdHB3aHJucmhncGlwc2lhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDExODkzOTMsImV4cCI6MjA1Njc2NTM5M30.97h5win0zvFE1PgrkYowG9ABvoQmi11MxTQc3rWC7-k'
supabase: Client = create_client(SECRET_URL, SECRET_KEY)

@app.route('/comments', methods=['GET'])
def get_comments():
    comments = supabase.table('comments').select().execute()
    return jsonify(comments)

@app.route('/comments', methods=['POST'])
def post_comment():
    data = request.json
    comment = supabase.table('comments').insert(data).execute()
    return jsonify(comment)

@app.route('/comments/<int:id>', methods=['DELETE'])
def delete_comment(id):
    comment = supabase.table('comments').delete().eq('id', id).execute()
    return jsonify(comment)

@app.route('/comments/<int:id>', methods=['PUT'])
def update_comment(id):
    data = request.json
    comment = supabase.table('comments').update(data).eq('id', id).execute()
    return jsonify(comment)

@app.route('/comments/<int:id>', methods=['GET'])
def get_comment(id):
    comment = supabase.table('comments').select().eq('id', id).execute()
    return jsonify(comment)

if __name__ == '__main__':
    app.run(debug=True)
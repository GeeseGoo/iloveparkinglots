from flask import Flask, g, request, jsonify, render_template
import sqlite3

app = Flask(__name__)

def get_db_connection():
    conn = sqlite3.connect('database.db')
    conn.row_factory = sqlite3.Row
    return conn

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

@app.route('/')
def index():
    return render_template('./index.html')

@app.route('/users')
def get_users():
    conn = get_db_connection()
    users = conn.execute('SELECT * FROM users').fetchall()
    conn.close()
    return jsonify([dict(user) for user in users])

@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    user_username = data.get('user_username')
    conn = get_db_connection()
    try:
        conn.execute("INSERT INTO users (username) VALUES (?)", (user_username,))
        conn.commit()
        return jsonify({"message": "User added"}), 201
    except:
        return jsonify({"error": "username already taken"}), 400
    finally:
        conn.close()

@app.route('/remove_user', methods=['POST'])
def remove_user():
    data = request.json
    user_username = data.get('user_username')
    conn = get_db_connection()
    try:
        conn.execute("DELETE FROM users WHERE username=?", (user_username,))
        conn.commit()
        return jsonify({"message": "User removed"}), 201
    except:
        return jsonify({"error": "username non existent"}), 400
    finally:
        conn.close()



@app.route('/friend', methods=['POST'])
def add_friend():
    data = request.json
    user_username = data.get('user_username')
    friend_username = data.get('friend_username')

    conn = get_db_connection()

    if not user_username or not friend_username:
        return jsonify({"error": "Both user_username and friend_username are required"}), 400
    try:
        user = conn.execute('SELECT * FROM users where username = ?', (user_username,)).fetchone()
        friend = conn.execute('SELECT * FROM users where username = ?', (friend_username,)).fetchone()
        if not user or not friend:
            return jsonify({"error": "One or both usernames do not exist"}), 404

        conn.execute('INSERT INTO friendships (user_id, friend_id) VALUES (?, ?)', (user[0], friend[0]))
        conn.execute('INSERT INTO friendships (user_id, friend_id) VALUES (?, ?)', (friend[0], user[0]))

        conn.commit()
        return jsonify({"message": "Friend added successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "Friend already exists"}), 400
    finally:
        conn.close()


@app.route('/unfriend', methods=['POST'])
def remove_friend():
    data = request.json
    user_username = data.get('user_username')
    friend_username = data.get('friend_username')

    if not user_username or not friend_username:
        return jsonify({"error": "Both user_username and friend_username are required"}), 400
    conn = get_db_connection()
    try:
        userID = conn.execute('SELECT * FROM users WHERE username = ?', (user_username,)).fetchone()
        friendID = conn.execute('SELECT * FROM users where username = ?', (friend_username,)).fetchone()

        if not userID or friendID:
            return jsonify({"error": "One or both usernames do not exist"}), 404

        conn.execute('DELETE FROM friendships WHERE (user_id = ? AND friend_id = ?) OR (user_id = ? AND friend_id = ?', (userID,))

        return jsonify({"message": "Friend removed successfully"}), 201
    except sqlite3.IntegrityError:
        return jsonify({"error": "friendshipship already removed"}), 400
    finally:
        conn.close()

@app.route('/friendships/<username>')
def get_friendships(username):
    conn = get_db_connection()
    try:
        query = '''
        SELECT u2.username AS friend_username
        FROM friendships
        JOIN users u1 ON friendships.user_id = u1.id
        JOIN users u2 ON friendships.friend_id = u2.id
        WHERE u1.username = ?;
        '''
        friendships = conn.execute(query, (username,)).fetchall()

        return jsonify({"friendships": [friend['friend_username'] for friend in friendships]}), 200
    except sqlite3.Error as e:
        return jsonify({"error": str(e)}), 500
    finally:
        return jsonify({"friendships": [friend['friend_username'] for friend in friendships]}), 200
        conn.close()
if __name__ == '__main__':
    app.run(debug=True)

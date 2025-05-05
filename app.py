from flask import Flask, jsonify, request
from flask_socketio import SocketIO

app = Flask(__name__)
app.config['SECRET_KEY'] = 'coding'
socketio = SocketIO(app)


@app.route('/')
def index():
	return app.send_static_file('index.html')

@socketio.on('msg')
def handle_msg(data):
	socketio.emit('push',data)

if __name__ == "__main__" :
	socketio.run(app, debug= True)


from flask import Flask, jsonify, request
import jwt
from flask_sqlalchemy import SQLAlchemy
from functools import wraps

app = Flask(__name__)
app.config.from_object('config')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI']='mysql://demo:demo@localhost/demo'
app.config['SECRET_KEY'] = 'thisisthesecretkey'

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.environ['HTTP_AUTHORIZATION']
        token = token.replace('Bearer ', '')
        if not token:
            return jsonify({'message' : 'Token is missing!'}), 403

        try:
            data = jwt.decode(token, app.config['SECRET_KEY'])
        except:
            return jsonify({'message' : 'Token is invalid!'}), 403

        return f(*args, **kwargs)

    return decorated


#Base de dados
db = SQLAlchemy(app)

#Blueprints
from app.user.views import app_user
app.register_blueprint(app_user)

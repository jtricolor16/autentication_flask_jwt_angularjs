import jwt

from flask import request, render_template, jsonify

from app import app, db, token_required
import datetime
from app.user import app_user
from app.user.resource import User_Resource

@app_user.route('/')
@app_user.route('/home')
@app_user.route('/update')
@app_user.route('/register')
def index():
    return render_template("index.html")

@app_user.route("/login", methods=['POST'])
def login():
    try:
        user=User_Resource.login(request.json)
        if(user is not None):
            token=jwt.encode({'user' : user._name, 'exp' : datetime.datetime.utcnow() + datetime.timedelta(seconds=900)}, app.config['SECRET_KEY'])
            return jsonify({'message': 'Valid user', 'token' : token.decode('UTF-8'), 'user':user.as_dict()}), 200
        return jsonify({'message': 'User or Password Wrong'}), 404
    except:
        return jsonify({'message': 'User or Password Wrong'}), 404

@app_user.route('/logout', methods=['POST'])
@token_required
def logout():
    resp = jsonify({'logout': True})
    return resp, 200

@app_user.route("/create_user", methods=['POST'])
def create_user():
    try:
        user=User_Resource.register(request.json)
        db.session.add(user)
        db.session.commit()
        return 'success'
    except:
        return jsonify(error=404, text=str('error')), 404

@app_user.route("/update_user", methods=['POST'])
@token_required
def edit_user():
    try:
        user = User_Resource.find_user_by_id(request.json['id'])
        user = User_Resource.edit(request.json, user)
        db.session.commit()
        return jsonify({'message': 'Valid user', 'user': user.as_dict()}), 200
    except:
        return jsonify(error=404, text=str('error')), 404

@app_user.route('/delete_user/<int:id>', methods=['DELETE'])
@token_required
def delete_user(id):
    try:
        user = User_Resource.find_user_by_id(id)
        db.session.delete(user)
        db.session.commit()
        return 'success'
    except:
        return jsonify(error=404, text=str('error')), 404
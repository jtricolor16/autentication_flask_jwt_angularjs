from sqlalchemy.sql import extract, func

import hashlib

from app import db


class User(db.Model):
    __tablename__='user'
    _id = db.Column(db.Integer, primary_key=True)
    _name = db.Column(db.String(50), unique=False)
    _email = db.Column(db.String(120), unique=True)
    _password = db.Column(db.String(100))

    def __init__(self, id=None):
        self._id=id

    @classmethod
    def create_new_user(cls, name, email, password, password2):
        _user=cls()
        if (_user.validate_password(password, password2) is False or _user.validate_email(email) is False):
             return None
        _user.set_name(name)
        _user.set_email(email)
        _user.set_password(password)
        return _user

    @classmethod
    def password_string_to_hash(cls, password):
        h = hashlib.sha256()
        h.update(password.encode('utf-8'))
        return h.hexdigest()

    def as_dict(self):
        obj={'id':self._id, 'name':self._name, 'email':self._email}
        return obj

    def validate_email(self, email):
        user = self.query.filter_by(_email=email).first()
        if(self._id is None):
            if(user is None):
                return True
            return False
        return True


    def validate_password(sel, password1, password2):
        if(password1 != password2):
            return False
        return True

    def set_password(self, password):
        h=hashlib.sha256()
        h.update(password.encode('utf-8'))
        self._password=h.hexdigest()

    def set_name(self, name):
        self._name=name

    def set_email(self, email):
        self._email=email

    def get_email(self):
        return self._email

    def get_name(self):
        return self._name

    def get_password(self):
        return self._password
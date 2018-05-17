from app.user.models import User

class User_Resource(object):

    @classmethod
    def login(cls, json):
          if(json['login'] is not '' and json['password'] is not ''):
              password = User.password_string_to_hash(json['password'])
              user_db = User.query.filter_by(_email=json['login'], _password=password).first()
              if (user_db is not None):
                  return user_db
          return None

    @classmethod
    def register(cls, json):
        if (json['name'] is not '' and json['password'] is not '' and json['validate_password'] is not '' and json['email'] is not ''):
            user = User.create_new_user(json['name'], json['email'], json['password'], json['validate_password'])
            return user
        return None

    @classmethod
    def find_user_by_id(cls, id):
        if(id is not ''):
            return User.query.filter_by(_id=id).first()


    @classmethod
    def edit(cls, json, user):
        if (json['name'] is not '' and json['password'] is not '' and json['validate_password'] is not '' and
                    json['email'] is not ''):
            if(user.validate_password(json['password'], json['validate_password']) is True and user.validate_email(json['email']) is True):
                user.set_name(json['name'])
                user.set_password(json['password'])
                user.set_email(json['email'])
                return user
        return None

    @classmethod
    def logout(cls, jti):
        try:
            revoked_token = RevokedTokenModel(jti=jti)
            revoked_token.add()
            return {'message': 'Access token has been revoked'}
        except:
            return {'message': 'Something went wrong'}, 500
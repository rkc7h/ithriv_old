# Login
# *****************************
from itsdangerous import URLSafeTimedSerializer

from app import sso, app, RestException, db, auth
from app.model.user import User
from flask import jsonify, redirect, g, request, Blueprint

auth_blueprint = Blueprint('auth', __name__, url_prefix='/api')

@sso.login_handler
def login(user_info):
    if app.config["DEVELOPMENT"]:
        uid = app.config["SSO_DEVELOPMENT_UID"]
    else:
        uid = user_info['uid']

    user = User.query.filter_by(uid=uid).first()
    if user is None:
        user = User(uid=uid,
                    display_name=user_info["givenName"],
                    email=user_info["email"])
        if "Surname" in user_info:
            user.display_name = user.display_name + " " + user_info["Surname"]

        if "displayName" in user_info and len(user_info["displayName"]) > 1:
            user.display_name = user_info["displayName"]

        db.session.add(user)
        db.session.commit()
    # redirect users back to the front end, include the new auth token.
    auth_token = user.encode_auth_token().decode()
    response_url = ("%s/%s" % (app.config["FRONTEND_AUTH_CALLBACK"], auth_token))
    return redirect(response_url)


# ourapp/views.py

@auth_blueprint.route('/confirm/<token>')
def confirm_email(token):
    """When users create a new account with an email and a password, this
    allows the front end ot confirm their email and log them into the system."""
    try:
        ts = URLSafeTimedSerializer(app.config["SECRET_KEY"])
        email = ts.loads(token, salt="email-confirm-key", max_age=86400)
    except:
        raise RestException(RestException.TOKEN_INVALID)

    user = User.query.filter_by(email=email).first_or_404()
    user.email_confirmed = True
    db.session.add(user)
    db.session.commit()

    auth_token = user.encode_auth_token().decode()
    return jsonify({"token": auth_token})

@auth_blueprint.route('/password_login', methods=["GET", "POST"])
def password_login():
    request_data = request.get_json()
    email = request_data['email']
    user = User.query.filter_by(email=email).first()

    if user.is_correct_password(request_data["password"]):
        # redirect users back to the front end, include the new auth token.
        auth_token = user.encode_auth_token().decode()
        return jsonify({"token": auth_token})
    else:
        raise RestException(RestException.LOGIN_FAILURE)

@auth.verify_token
def verify_token(token):
    try:
        resp = User.decode_auth_token(token)
        if resp:
            g.user = User.query.filter_by(id=resp).first()
    except:
        g.user = None

    if 'user' in g:
        return True
    else:
        return False


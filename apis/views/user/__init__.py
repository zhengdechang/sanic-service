from sanic import Blueprint
from user.auth import userAuth
from user.info import userInfo

user = Blueprint.group(userAuth, userInfo, url_prefix="/user")

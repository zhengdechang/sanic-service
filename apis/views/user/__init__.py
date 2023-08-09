from sanic import Blueprint
from apis.views.user.auth import userAuth
from apis.views.user.info import userInfo

user = Blueprint.group(userAuth, userInfo, url_prefix="/user")

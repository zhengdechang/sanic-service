from sanic import Blueprint
from apis.views.user import user

sanic_service_apis = Blueprint.group(user, url_prefix="/api")

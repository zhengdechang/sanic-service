from sanic import Blueprint
from views.user import user

license_web_manager_apis = Blueprint.group(user,url_prefix="/api")

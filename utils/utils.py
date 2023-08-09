from sanic.response import json
import logging
from datetime import datetime, timezone, timedelta
from sanic_jwt import protected, exceptions
from language_json import LANGUAGE_DATA


def error_return(message, code="0001"):
    return json({"code": code, "msg": message})


def success_return(data=None, message=""):
    return json({
        "code": "0000",
        "data": {} if data is None else data,
        "msg": message
    })

def get_current_time(time_delta=8):
    return datetime.now(tz=timezone(timedelta(hours=time_delta)))

# protected the routes to be authenticated
def protect_if_authenticated(JWT_WHITE_LIST=[]):

    def inner_decorator(func):

        async def wrapper(*args, **kwargs):
            if "login" in args[0].name:
                return await func(*args, **kwargs)
            else:
                for item in JWT_WHITE_LIST:
                    if item in args[0].name:
                        return await func(*args, **kwargs)
                return await protected()(func)(*args, **kwargs)

        return wrapper

    return inner_decorator


# verify whether a token is invalid after exit
def is_revoked(request, JWT_WHITE_LIST=[]):
    if "login" in request.name:
        return True
    for item in JWT_WHITE_LIST:
        if item in request.name:
            return True
    token = request.headers.get("Authorization").split(" ")[1]
    if token in request.app.config.SANIC_JWT_BLACKLIST:
        # 如果在黑名单中，抛出 AuthenticationFailed 异常
        raise exceptions.AuthenticationFailed("Token has been revoked")
    # 否则返回 True
    return True


def get_language_data(message, language):
    """
    国际化语言处理
    :param message:str
    :param language:str
    :return:str
    """
    language_data = LANGUAGE_DATA

    message = message if not isinstance(message, list) else message[0]

    if language == 'en' or message not in language_data[language]:
        message_language = message
    else:
        message_language = language_data[language][message]

    return message_language

def check_keys(content, required_keys: list):
    for key in required_keys:
        if key not in content:
            logging.error(f"{key} 不存在，请检查")
            return False

    return True
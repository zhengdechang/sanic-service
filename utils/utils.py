from sanic.response import json
import logging
from datetime import datetime, timezone, timedelta
from sanic_jwt import protected, exceptions
from utils.language_json import LANGUAGE_DATA


def error_return(message, code="204"):
    """
    Returns a JSON response with an error message and code.

    :param message: The error message to be included in the response.
    :type message: str
    :param code: The error code to be included in the response. Default is "0001".
    :type code: str
    :return: The JSON response with the error message and code.
    :rtype: dict
    """
    return json({"code": code, "msg": message})


def success_return(data=None, message=""):
    """
    A function that returns a success response with optional data and message.

    Parameters:
        data (Any, optional): The data to include in the response. Defaults to None.
        message (str, optional): The message to include in the response. Defaults to an empty string.

    Returns:
        dict: A dictionary representing the success response with the following keys:
            - code (str): The success code.
            - data (Any): The data included in the response. If None, an empty dictionary is used.
            - msg (str): The message included in the response.
    """
    return json({
        "code": "200",
        "data": {} if data is None else data,
        "msg": message
    })


def get_current_time(time_delta=8):
    """
    Returns the current time adjusted by a time delta.

    :param time_delta: An integer representing the number of hours to adjust the current time.
                       Default is 8.
    :return: A datetime object representing the current time adjusted by the time delta.
    """
    return datetime.now(tz=timezone(timedelta(hours=time_delta)))


# protected the routes to be authenticated
def protect_if_authenticated(JWT_WHITE_LIST=[]):
    """
    This function is a decorator that protects a function if the user is authenticated.
    
    Parameters:
    - JWT_WHITE_LIST: A list of strings representing the names of functions that are exempt from authentication.
    
    Returns:
    - inner_decorator: A decorator that wraps the input function and performs authentication checks.
    """

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
    """
    Check if a JWT token is revoked.

    Parameters:
    - request: The request object containing the token.
    - JWT_WHITE_LIST: A list of whitelisted JWT tokens (default=[]).

    Returns:
    - True if the token is revoked, False otherwise.

    Raises:
    - AuthenticationFailed: If the token is in the blacklist.

    The function checks if the string "login" is present in the request name.
    If it is, the function returns True immediately.

    Then, the function iterates over each item in the JWT_WHITE_LIST.
    If the item is present in the request name, the function returns True.

    Next, the function extracts the token from the Authorization header.
    The token is expected to be in the format "Bearer {token}".

    If the extracted token is present in the SANIC_JWT_BLACKLIST,
    the function raises an AuthenticationFailed exception with the message
    "Token has been revoked".

    Finally, if none of the above conditions are met, the function returns True.
    """
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
    Get the language data for a given message and language.

    Parameters:
        message (str or list): The message or list of messages.
        language (str): The language code.

    Returns:
        str: The language data for the given message and language.
    """
    language_data = LANGUAGE_DATA

    message = message if not isinstance(message, list) else message[0]

    if language == 'en' or message not in language_data[language]:
        message_language = message
    else:
        message_language = language_data[language][message]

    return message_language


def check_keys(content, required_keys: list):
    """
    Check if all the required keys are present in the content dictionary.

    Args:
        content (dict): The dictionary to check for the presence of keys.
        required_keys (list): A list of keys that should be present in the content dictionary.

    Returns:
        bool: True if all the required keys are present, False otherwise.
    """
    for key in required_keys:
        if key not in content:
            logging.error(f"{key} 不存在，请检查")
            return False

    return True

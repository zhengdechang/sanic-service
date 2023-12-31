'''
Description: 
Author: Devin
Date: 2023-08-09 19:48:59
'''
from sanic import Blueprint
import logging
from sqlalchemy import select

from utils.utils import error_return, success_return, check_keys
from model.models import User

userAuth = Blueprint("userAuth")


@userAuth.post("/login")
async def login(request):
    """
    Decorator for the login API endpoint.
    
    Parameters:
    - request: The request object.
    
    Returns:
    - The response object with the login result.
    """
    content = request.json
    if not check_keys(content, required_keys=["username", "password"]):
        return error_return(message="Wrong credential")

    session = request.ctx.session
    try:
        async with session.begin():
            stmt = select(User).where(User.name == content["username"])
            user = (await session.execute(stmt)).scalar()
            if user is None:
                logging.error(f"查询用户不存在")
                return error_return("Non-exist user")
    except Exception as e:
        logging.error(f"User not found, {e}")
        return error_return("Non-exist user")

    # 检查密码
    if not user.check_password(content["password"]):
        logging.error(f"用户 {content['username']} 密码错误")
        return error_return(f"Wrong password")

    access_token = await request.app.ctx.auth.generate_access_token(
        {"user_id": content["username"]})

    return success_return(data={
        "name": content["username"],
        "token": access_token
    })


@userAuth.post("/register")
async def register(request):
    """
    Register a new user.

    Parameters:
        request (Request): The HTTP request object.

    Returns:
        A JSON response indicating the success or failure of the registration process.
    """
    content = request.json
    if not check_keys(content, required_keys=["username", "password"]):
        return error_return(message="Wrong information")

    session = request.ctx.session
    try:
        async with session.begin():
            stmt = select(User).where(User.name == content["username"])
            user = (await session.execute(stmt)).scalar()
            if user:
                logging.error(
                    f"User already exists! Cannot create user for {content['username']}"
                )
                return error_return("User already exists!")
            new_user = User(name=content["username"],
                            password=content["password"])
            session.add(new_user)

    except Exception as e:
        logging.error(
            f"Unexpected exception when searching for user {content['username']}, {e}"
        )

        return error_return("Unknown error")

    return success_return()


@userAuth.get("/logout")
async def logout(request):
    """
    Logout the user by invalidating the token.

    Args:
        request (Request): The request object containing the token in the headers.

    Returns:
        Response: A success response indicating that the user has been logged out successfully.
    """
    token = request.headers.get("Authorization").split(" ")[1]
    # 将令牌添加到黑名单中，使其失效
    request.app.config.SANIC_JWT_BLACKLIST.add(token)
    return success_return(message='Logged out successfully')

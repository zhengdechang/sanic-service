from sanic import Blueprint
import logging
from sqlalchemy import select

from utils.utils import error_return, success_return, check_keys
from db_model.models import User

userAuth = Blueprint("userAuth")


@userAuth.post("/login")
async def login(request):
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
    token = request.headers.get("Authorization").split(" ")[1]
    # 将令牌添加到黑名单中，使其失效
    request.app.config.SANIC_JWT_BLACKLIST.add(token)
    return success_return(message='Logged out successfully')

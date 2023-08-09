import logging
from sanic import Blueprint
from sanic.views import HTTPMethodView
from sqlalchemy import select, update

from db_model.models import User
from utils.utils import check_keys, success_return, error_return

userInfo = Blueprint("userInfo")


class UserInfo(HTTPMethodView):
    """
    用户信息
    """

    async def post(self, request):
        content = request.json
        if not check_keys(content=content,
                          required_keys=["name", "old_pass", "new_pass"]):
            logging.error(f"修改用户信息错误, {content}")
            return error_return(message="修改用户信息失败")

        name = content["name"]
        old_pass = content["old_pass"]
        new_pass = content["new_pass"]

        session = request.ctx.session
        try:
            async with session.begin():
                stmt = select(User).where(User.name == name)
                user = (await session.execute(stmt)).scalar()
                if user is None:
                    logging.error(f"查询用户不存在")
                    return error_return("用户不存在")

        except Exception as e:
            logging.error(f"User not found, {e}")
            return error_return("用户不存在")

        # 检查密码
        if not user.check_password(old_pass):
            logging.error(f"用户 {name} 密码错误")
            return error_return(f"密码错误")

        # 修改接收参数
        async with session.begin():
            stmt = select(User).where(User.name == name)
            user = (await session.execute(stmt)).scalar()
            user.set_password(new_pass)

        return success_return(message="修改用户信息成功")


userInfo.add_route(UserInfo.as_view(), "/user_info")

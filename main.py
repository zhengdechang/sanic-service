import os
import logging
import json

from sanic import Sanic
from sanic_cors import CORS
from contextvars import ContextVar
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

from apis.sanic_service_apis import sanic_service_apis
from model.engine import async_engine
from model.models import meta, User
from config import ProductionConfig
from utils.utils import error_return, protect_if_authenticated, is_revoked,get_language_data

from sanic_jwt import Initialize, exceptions

logging.basicConfig(
    filename="/tmp/sanic_service.log",
    filemode='a',
    format=
    '[%(asctime)s] [%(pathname)s] [%(lineno)d]: [%(levelname)s] [%(funcName)s]: %(message)s',
    datefmt='%H:%M:%S',
    level=logging.INFO)


def create_app(config=None):
    """
    Creates and configures a Sanic application.

    Parameters:
        config (Optional[Dict[str, Any]]): A dictionary containing configuration options for the application. Defaults to None.

    Returns:
        Sanic: The configured Sanic application.

    Middleware:
        - inject_session: Middleware that injects a database session into the request context.
        - close_session: Middleware that closes the database session after the response is sent.

    Listeners:
        - init_db: Listener that initializes the database and creates necessary tables if they don't exist.

    """
    backend_app = Sanic("sanic_service", config=config)
    backend_app.config.SECRET = os.urandom(32)
    backend_app.blueprint(sanic_service_apis)
    #
    _base_model_session_ctx = ContextVar("session")
    _info_sys_ctx = ContextVar("sanic_service")
    CORS(backend_app)

    @backend_app.middleware("request")
    @protect_if_authenticated(config.JWT_WHITE_LIST)
    async def inject_session(request):
        """
        Middleware function that injects a session into the request's context.

        Args:
            request: The request object.

        Returns:
            None
        """
        is_revoked(request, config.JWT_WHITE_LIST)

        request.ctx.session = sessionmaker(bind=async_engine,
                                           class_=AsyncSession,
                                           expire_on_commit=False)()
        request.ctx.session_ctx_token = _base_model_session_ctx.set(
            request.ctx.session)

    @backend_app.middleware("response")
    async def close_session(request, response):
        """
        Middleware function that is called after a response is sent.

        :param request: The incoming request.
        :param response: The outgoing response.
        :return: None
        """
        language = request.headers.get('Accept-Language') or 'zh'
        # 中引文转义
        if language == 'zh':
            data = json.loads(response.body.decode('utf-8'))

            data['msg'] = get_language_data(message=data['msg'],
                                            language=language)

            modified_response = json.dumps(data)

            response.body = modified_response.encode('utf-8')

        if hasattr(request.ctx, "session_ctx_token"):
            _base_model_session_ctx.reset(request.ctx.session_ctx_token)
            await request.ctx.session.close()

    @backend_app.listener("after_server_start")
    async def init_db(app):
        """
        Initializes the database after the server starts.

        Parameters:
        - app: The application instance.

        Returns:
        None
        """
        async with async_engine.begin() as conn:
            await conn.run_sync(meta.create_all)

        session = sessionmaker(bind=async_engine,
                               class_=AsyncSession,
                               expire_on_commit=False)()
        async with session.begin():
            user = (await
                    session.execute(select(User).where(User.name == "admin")
                                    )).scalar()
            if not user:
                admin = User(name="admin", password="admin")
                session.add(admin)

        await session.close()

    return backend_app


def generate_app_fun(config=None):
    """
    Generate an application function.

    :param config: Configuration options for creating the app (default: None)
    :return: The generated app
    """
    generate_app = create_app(config)

    # init jwt authorized
    Initialize(
        generate_app,
        authenticate=lambda username, password: password == 'password',
        on_authenticate=lambda payload, request: setattr(
            request.app.ctx, 'auth', payload),
        on_payload_changed=lambda payload, request: setattr(
            request.app.ctx, 'auth', payload),
        secret=generate_app.config.JWT_SECRET,
        expiration_delta=generate_app.config.JWT_ACCESS_TOKEN_EXPIRES,
        user_id='id',
        algorithm=generate_app.config.JWT_ALGORITHM,
    )

    # # intercept exceptions
    @generate_app.exception(exceptions.SanicJWTException)
    async def sanic_jwt_exception(request, exception):
        """
        Handle SanicJWTException and return an error response.

        Args:
            request: The Sanic request object.
            exception: The SanicJWTException object.

        Returns:
            An error response with the message and code from the exception.

        Raises:
            None.
        """
        return error_return(message=exception.args[0],
                            code=exception.status_code)

    return generate_app


if __name__ == "__main__":
    app = generate_app_fun(ProductionConfig())

    app.run(host="0.0.0.0",
            port=8000,
            access_log=False,
            workers=int(os.environ.get("WORKER_NUM") or 4),
            debug=False)

import os
import logging

from sanic import Sanic
from sanic_cors import CORS
from contextvars import ContextVar
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select

from config import ProductionConfig

logging.basicConfig(
    filename="/tmp/sanic_serve.log",
    filemode='a',
    format=
    '[%(asctime)s] [%(pathname)s] [%(lineno)d]: [%(levelname)s] [%(funcName)s]: %(message)s',
    datefmt='%H:%M:%S',
    level=logging.INFO)


def create_app(config=None):
    backend_app = Sanic("sanic_serve", config=config)
    backend_app.config.SECRET = os.urandom(32)

    return backend_app


def generate_app_fun(config=None):
    generate_app = create_app(config)
    return generate_app


if __name__ == "__main__":
    app = generate_app_fun(ProductionConfig())

    app.run(host="0.0.0.0",
            port=8000,
            access_log=False,
            workers=int(os.environ.get("WORKER_NUM") or 4),
            debug=False)

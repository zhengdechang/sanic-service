"""Establish SQLAlchemy database engine and session"""
import os
from string import Template
from sqlalchemy.ext.asyncio import create_async_engine

base_url = Template(
    "postgresql${engine_name}://" +
    f"{os.environ.get('POSTGRESQL_USER') or 'sanic_service'}:"
    f"{os.environ.get('POSTGRESQL_PASSWORD') or 'password'}@"
    f"{os.environ.get('POSTGRESQL_HOST') or '127.0.0.1'}:"
    f"{os.environ.get('POSTGRESQL_PORT') or '5432'}/"
    f"{os.environ.get('POSTGRESQL_DATABASE') or 'sanic_service'}")
async_engine = create_async_engine(base_url.substitute(engine_name="+asyncpg"),
                                   echo=False)

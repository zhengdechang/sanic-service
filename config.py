from sanic.config import Config


class BaseConfig(Config):
    DEBUG = False
    TESTING = False
    JWT_SECRET = 'sanic_serve'
    JWT_ACCESS_TOKEN_EXPIRES = 60 * 60 * 24
    JWT_ALGORITHM = "HS256"
    JWT_BLACKLIST_ENABLED = True
    JWT_BLACKLIST_TOKEN_CHECKS = ["access", "refresh"]
    SANIC_JWT_BLACKLIST = set()
    JWT_WHITE_LIST = []


class ProductionConfig(BaseConfig):
    ENV = 'production'


class DevelopmentConfig(BaseConfig):
    ENV = 'development'
    DEBUG = True


class TestingConfig(BaseConfig):
    TESTING = True

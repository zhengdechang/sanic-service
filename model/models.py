"""
Database model definition
"""

from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import MetaData
from sqlalchemy.orm import declarative_base
from sqlalchemy import INTEGER, Column, String, DateTime
from utils.utils import get_current_time
import uuid

meta = MetaData()
Base = declarative_base(metadata=meta)


class User(Base):
    """
    User table
    """
    __tablename__ = "user"
    id = Column(INTEGER(), primary_key=True, autoincrement=True)
    name = Column(String(16), nullable=False)
    pw_hash = Column(String(1000), nullable=False)
    created_at = Column(DateTime(timezone=True), default=get_current_time())
    updated_at = Column(DateTime(timezone=True), default=get_current_time())

    def __init__(self, password, **kwargs):
        super(User, self).__init__(**kwargs)
        self.set_password(password)

    def set_password(self, password):
        self.pw_hash = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.pw_hash, password)

from typing import TYPE_CHECKING

from fastapi_users_db_sqlalchemy import SQLAlchemyBaseUserTable, SQLAlchemyUserDatabase

from core.models import Base
from core.models.mixins.id_int import IdIntMixin
from core.types import UserIdType

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession


class User(Base, IdIntMixin, SQLAlchemyBaseUserTable[UserIdType]):
    @classmethod
    def get_db(cls, session: "AsyncSession"):
        return SQLAlchemyUserDatabase(session, cls)

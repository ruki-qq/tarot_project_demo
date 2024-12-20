from typing import TYPE_CHECKING, Annotated

from fastapi import Depends

from core import db_helper
from users.models import User

if TYPE_CHECKING:
    from sqlalchemy.ext.asyncio import AsyncSession


async def get_users_db(
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.session_dependency),
    ]
):
    yield User.get_db(session=session)

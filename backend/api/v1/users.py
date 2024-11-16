from fastapi import APIRouter

from core.config import settings
from users.dependencies.fastapi_users import fastapi_users
from users.schemas import UserUpdate, UserRead

router = APIRouter(prefix=settings.users_prefix, tags=["users"])
router.include_router(
    router=fastapi_users.get_users_router(
        UserRead,
        UserUpdate,
    ),
)

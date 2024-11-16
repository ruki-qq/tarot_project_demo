from fastapi import APIRouter

from users.auth import router as auth_router
from api.v1.users import router as users_router

router_v1 = APIRouter()
router_v1.include_router(auth_router)
router_v1.include_router(users_router)

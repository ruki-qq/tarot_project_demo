from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer

from users.auth import router as auth_router
from api.v1.users import router as users_router

http_bearer = HTTPBearer(auto_error=False)

router_v1 = APIRouter(dependencies=[Depends(http_bearer)])
router_v1.include_router(auth_router)
router_v1.include_router(users_router)
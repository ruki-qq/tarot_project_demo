from fastapi import APIRouter, Depends
from fastapi.security import HTTPBearer

from users.auth import router as auth_router
from api.v1.users import router as users_router
from api.v1.candidates import router as candidates_router
from api.v1.employees import router as employees_router

http_bearer = HTTPBearer(auto_error=False)

router_v1 = APIRouter(dependencies=[Depends(http_bearer)])
router_v1.include_router(auth_router)
router_v1.include_router(users_router)
router_v1.include_router(candidates_router)
router_v1.include_router(employees_router)

from typing import Annotated

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from api.v1.crud import departments as crud_departments
from api.v1.dependencies.departments import department_by_id
from api.v1.schemas.departments import Department
from core import db_helper

router = APIRouter(prefix="/departments", tags=["departments"])


@router.get("", response_model=list[Department])
async def get_departments(
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    return await crud_departments.get_departments(session)


@router.get("/{department_id}")
async def get_department(
    department: Annotated[
        Department,
        Depends(department_by_id),
    ]
):
    return department

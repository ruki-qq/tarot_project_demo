from typing import Annotated

from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core import db_helper

from api.v1.crud import departments as crud_departments
from api.v1.models import Department


async def department_by_id(
    department_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Department:
    department = await crud_departments.get_department(
        session=session, department_id=department_id
    )
    if department is not None:
        return department

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Employee {department_id} not found!",
    )

from typing import Annotated

from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core import db_helper

from api.v1.crud import employees as crud_employees
from api.v1.models import Employee


async def employee_by_id(
    employee_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Employee:
    employee = await crud_employees.get_employee(
        session=session, employee_id=employee_id
    )
    if employee is not None:
        return employee

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Product {employee_id} not found!",
    )

from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.v1.crud import employees as crud_employees
from api.v1.dependencies.employees import employee_by_id
from api.v1.schemas.employees import Employee, EmployeeCreate, EmployeeUpdate
from core import db_helper

router = APIRouter(prefix="/employees", tags=["employees"])


@router.get("", response_model=list[Employee])
async def get_employees(
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    return await crud_employees.get_employees(session)


@router.get("/{employee_id}")
async def get_employee(
    employee: Annotated[
        Employee,
        Depends(employee_by_id),
    ]
):
    return employee


@router.post(
    "",
    response_model=Employee,
    status_code=status.HTTP_201_CREATED,
)
async def create_product(
    employee_in: EmployeeCreate,
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    return await crud_employees.create_employee(
        session=session, employee_in=employee_in
    )


@router.patch("/{employee_id}")
async def update_employee(
    employee_update: EmployeeUpdate,
    employee: Annotated[Employee, Depends(employee_by_id)],
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    return await crud_employees.update_employee(
        session=session, employee=employee, employee_update=employee_update
    )


@router.delete("/{employee_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_employee(
    employee: Annotated[Employee, Depends(employee_by_id)],
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
) -> None:
    await crud_employees.delete_employee(session=session, employee=employee)

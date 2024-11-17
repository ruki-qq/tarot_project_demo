from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from api.v1.crud.departments import get_department
from api.v1.models import Employee
from api.v1.schemas.employees import EmployeeCreate, EmployeeUpdate


async def get_employees(session: AsyncSession) -> list[Employee]:
    stmt = (
        select(Employee)
        .order_by(Employee.id)
        .options(selectinload(Employee.department), selectinload(Employee.reports))
    )
    result = await session.execute(stmt)
    return list(result.scalars().all())


async def get_employee(session: AsyncSession, employee_id: int) -> Employee | None:
    stmt = (
        select(Employee)
        .where(Employee.id == employee_id)
        .options(selectinload(Employee.department), selectinload(Employee.reports))
    )
    result = await session.execute(stmt)
    return result.scalar_one_or_none()


async def create_employee(
    session: AsyncSession, employee_in: EmployeeCreate
) -> Employee:
    department = await get_department(session, employee_in.department_id)

    if not department:
        raise ValueError("Department not found")

    employee = Employee(**employee_in.model_dump())
    session.add(employee)
    await session.commit()
    employee = await get_employee(session, employee.id)
    return employee


async def update_employee(
    session: AsyncSession, employee: Employee, employee_update: EmployeeUpdate
) -> Employee:
    if employee_update.department_id:
        department = await get_department(session, employee_update.department_id)

        if not department:
            raise ValueError("Department not found")

    for name, value in employee_update.model_dump(exclude_unset=True).items():
        setattr(employee, name, value)
    await session.commit()

    # department field not updating in response
    employee = await get_employee(session, employee.id)

    return employee


async def delete_employee(
    session: AsyncSession,
    employee: Employee,
) -> None:
    await session.delete(employee)
    await session.commit()

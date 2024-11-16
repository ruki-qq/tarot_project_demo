from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.v1.models import Employee
from api.v1.schemas.employees import EmployeeCreate, EmployeeUpdate


async def get_employees(session: AsyncSession) -> list[Employee]:
    stmt = select(Employee).order_by(Employee.id)
    result = await session.execute(stmt)
    return list(result.scalars().all())


async def get_employee(session: AsyncSession, employee_id: int) -> Employee | None:
    return await session.get(Employee, employee_id)


async def create_employee(
    session: AsyncSession, employee_in: EmployeeCreate
) -> Employee:
    employee = Employee(**employee_in.model_dump())
    session.add(employee)
    await session.commit()
    return employee


async def update_employee(
    session: AsyncSession, employee: Employee, employee_update: EmployeeUpdate
) -> Employee:
    for name, value in employee_update.model_dump(exclude_unset=True).items():
        setattr(employee, name, value)
    await session.commit()
    return employee


async def delete_employee(
    session: AsyncSession,
    employee: Employee,
) -> None:
    await session.delete(employee)
    await session.commit()

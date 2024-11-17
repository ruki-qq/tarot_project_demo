from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from api.v1.models import Department


async def get_departments(session: AsyncSession) -> list[Department]:
    stmt = (
        select(Department)
        .order_by(Department.id)
        .options(selectinload(Department.employees))
    )
    result = await session.execute(stmt)
    return list(result.scalars().all())


async def get_department(
    session: AsyncSession, department_id: int
) -> Department | None:
    stmt = (
        select(Department)
        .where(Department.id == department_id)
        .options(selectinload(Department.employees))
    )
    result = await session.execute(stmt)
    return result.scalar_one_or_none()

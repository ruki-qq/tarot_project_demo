from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.v1.models import Report
from api.v1.schemas.reports import ReportCreate, ReportUpdate


async def get_reports(session: AsyncSession) -> list[Report]:
    stmt = select(Report).order_by(Report.id)
    result = await session.execute(stmt)
    return list(result.scalars().all())


async def get_report(session: AsyncSession, report_id: int) -> Report | None:
    return await session.get(Report, employee_id)


async def create_report(session: AsyncSession, report_in: ReportCreate) -> Report:
    report = Report(**report_in.model_dump())
    session.add(report)
    await session.commit()
    return report


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

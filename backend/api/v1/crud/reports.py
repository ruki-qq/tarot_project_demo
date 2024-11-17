from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from api.v1.models import Report, Employee
from api.v1.schemas.reports import ReportCreate, ReportUpdate


async def get_reports(session: AsyncSession) -> list[Report]:
    stmt = select(Report).order_by(Report.id).options(selectinload(Report.employees))
    result = await session.execute(stmt)
    return list(result.scalars().all())


async def get_report(session: AsyncSession, report_id: int) -> Report | None:
    stmt = (
        select(Report)
        .where(Report.id == report_id)
        .options(selectinload(Report.employees))
    )
    result = await session.execute(stmt)
    return result.scalar_one_or_none()


async def create_report(session: AsyncSession, report_in: ReportCreate) -> Report:
    employees_query = select(Employee).where(Employee.id.in_(report_in.employees_ids))
    res = await session.execute(employees_query)
    employees = res.scalars().all()
    if len(employees) != len(report_in.employees_ids):
        raise ValueError("Some employees not found")

    report = Report(
        compatibility_score=report_in.compatibility_score,
        tarot_reading=report_in.tarot_reading,
        candidate_id=report_in.candidate_id,
        employees=list(employees),
    )
    session.add(report)
    await session.commit()
    return report


async def update_report(
    session: AsyncSession, report: Report, report_update: ReportUpdate
) -> Report:
    for name, value in report_update.model_dump(exclude_unset=True).items():
        setattr(report, name, value)
    await session.commit()
    return report


async def delete_report(
    session: AsyncSession,
    report: Report,
) -> None:
    await session.delete(report)
    await session.commit()

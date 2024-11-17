from os import getenv

from ollama import AsyncClient
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.orm import selectinload

from api.v1.crud.candidates import get_candidate
from api.v1.models import Report, Employee
from api.v1.schemas.reports import ReportCreate, ReportUpdate
from core.config import settings

client = AsyncClient(host=settings.llm_settings.ollama_url)


async def get_report_for_candidate_employee(
    candidate_name,
    candidate_birth_date,
    candidate_birth_time,
    employee_name,
    employee_birth_date,
    employee_birth_time,
):
    message = {
        "role": "user",
        "content": "Сделай отчет по совместимости на основе Таро и космологии для"
        f"{candidate_name}, родился {candidate_birth_date} в {candidate_birth_time} и"
        f"{employee_name}, родился {employee_birth_date} в {employee_birth_time}",
    }
    response = await client.chat(model="llama3.2:1b", messages=[message])
    return response["message"]["content"]


async def get_report_by_candidate_and_employee(
    session: AsyncSession, candidate_id: int, employee_id: int
) -> list[Report]:
    stmt = (
        select(Report)
        .where(Report.candidate_id == candidate_id)
        .join(Report.employees)
        .where(Employee.id == employee_id)
        .options(selectinload(Report.candidate), selectinload(Report.employees))
    )

    result = await session.execute(stmt)
    return list(result.scalars().all())


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

    candidate = await get_candidate(session, report_in.candidate_id)

    if not candidate:
        raise ValueError("Department not found")

    tarot_reading = await get_report_for_candidate_employee(
        candidate.full_name,
        candidate.birth_date,
        candidate.birth_time,
        employees[0].full_name,
        employees[0].birth_date,
        employees[0].birth_time,
    )

    report = Report(
        compatibility_score=report_in.compatibility_score,
        tarot_reading=tarot_reading,
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

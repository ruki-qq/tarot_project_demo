from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.v1.crud import reports as crud_reports
from api.v1.dependencies.reports import report_by_id
from api.v1.schemas.reports import Report, ReportCreate, ReportUpdate
from core import db_helper

router = APIRouter(prefix="/reports", tags=["reports"])


@router.get("", response_model=list[Report])
async def get_reports(
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    return await crud_reports.get_reports(session)


@router.get("/{report_id}")
async def get_report(
    report: Annotated[
        Report,
        Depends(report_by_id),
    ]
):
    return report


@router.post(
    "",
    response_model=Report,
    status_code=status.HTTP_201_CREATED,
)
async def create_report(
    report_in: ReportCreate,
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    return await crud_reports.create_report(session=session, report_in=report_in)


@router.patch("/{report_id}")
async def update_report(
    report_update: ReportUpdate,
    report: Annotated[Report, Depends(report_by_id)],
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    return await crud_reports.update_report(
        session=session, report=report, report_update=report_update
    )


@router.delete("/{report_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_report(
    report: Annotated[Report, Depends(report_by_id)],
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
) -> None:
    await crud_reports.delete_report(session=session, report=report)

from typing import Annotated

from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core import db_helper

from api.v1.crud import reports as crud_reports
from api.v1.models import Report


async def report_by_id(
    report_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Report:
    report = await crud_reports.get_report(session=session, report_id=report_id)
    if report is not None:
        return report

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Report {report_id} not found!",
    )

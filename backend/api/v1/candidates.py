from typing import List, Annotated

from fastapi import APIRouter, Depends
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.v1.models import Candidate
from core import db_helper

router = APIRouter(prefix="/candidates", tags=["candidates"])


@router.get("/", response_model=list[Candidate])
async def get_candidates(
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    stmt = select(Candidate).filter(
        Candidate.type == Candidate.__mapper_args__["polymorphic_identity"]
    )
    result = await session.execute(stmt)
    return result.scalars().all()


@router.get("/{candidate_id}")
async def get_candidate(
    candidate_id: int,
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    stmt = select(Candidate).filter(
        Candidate.type == Candidate.__mapper_args__["polymorphic_identity"],
        Candidate.id == candidate_id,
    )
    result = await session.execute(stmt)
    return result.scalar_one_or_none()


@router.post("/")
async def create_candidate():
    pass

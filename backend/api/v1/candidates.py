from typing import Annotated

from fastapi import APIRouter, Depends, status
from sqlalchemy.ext.asyncio import AsyncSession

from api.v1.crud import candidates as crud_candidates
from api.v1.dependencies.candidates import candidate_by_id
from api.v1.schemas.candidates import Candidate, CandidateCreate, CandidateUpdate
from core import db_helper

router = APIRouter(prefix="/candidates", tags=["candidates"])


@router.get("", response_model=list[Candidate])
async def get_candidates(
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    return await crud_candidates.get_candidates(session)


@router.get("/{candidate_id}")
async def get_candidate(
    candidate: Annotated[
        Candidate,
        Depends(candidate_by_id),
    ]
):
    return candidate


@router.post(
    "",
    response_model=Candidate,
    status_code=status.HTTP_201_CREATED,
)
async def create_product(
    candidate_in: CandidateCreate,
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    return await crud_candidates.create_candidate(
        session=session, candidate_in=candidate_in
    )


@router.patch("/{candidate_id}")
async def update_candidate(
    candidate_update: CandidateUpdate,
    candidate: Annotated[Candidate, Depends(candidate_by_id)],
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
):
    return await crud_candidates.update_candidate(
        session=session, candidate=candidate, candidate_update=candidate_update
    )


@router.delete("/{candidate_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_candidate(
    candidate: Annotated[Candidate, Depends(candidate_by_id)],
    session: Annotated[
        "AsyncSession",
        Depends(db_helper.scoped_session_dependency),
    ],
) -> None:
    await crud_candidates.delete_candidate(session=session, candidate=candidate)

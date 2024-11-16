from typing import Annotated

from fastapi import Path, Depends, HTTPException, status
from sqlalchemy.ext.asyncio import AsyncSession

from core import db_helper

from api.v1.crud import candidates as crud_candidates
from api.v1.models import Candidate


async def candidate_by_id(
    candidate_id: Annotated[int, Path],
    session: AsyncSession = Depends(db_helper.scoped_session_dependency),
) -> Candidate:
    candidate = await crud_candidates.get_candidate(
        session=session, candidate_id=candidate_id
    )
    if candidate is not None:
        return candidate

    raise HTTPException(
        status_code=status.HTTP_404_NOT_FOUND,
        detail=f"Product {candidate_id} not found!",
    )

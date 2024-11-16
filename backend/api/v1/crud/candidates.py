from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from api.v1.models import Candidate
from api.v1.schemas.candidates import CandidateCreate, CandidateUpdate


async def get_candidates(session: AsyncSession) -> list[Candidate]:
    stmt = (
        select(Candidate)
        .filter(Candidate.type == Candidate.__mapper_args__["polymorphic_identity"])
        .order_by(Candidate.id)
    )
    result = await session.execute(stmt)
    return list(result.scalars().all())


async def get_candidate(session: AsyncSession, candidate_id: int) -> Candidate | None:
    stmt = select(Candidate).filter(
        Candidate.type == Candidate.__mapper_args__["polymorphic_identity"],
        Candidate.id == candidate_id,
    )
    result = await session.execute(stmt)
    return result.scalar_one_or_none()


async def create_candidate(
    session: AsyncSession, candidate_in: CandidateCreate
) -> Candidate:
    candidate = Candidate(**candidate_in.model_dump())
    session.add(candidate)
    await session.commit()
    return candidate


async def update_candidate(
    session: AsyncSession, candidate: Candidate, candidate_update: CandidateUpdate
) -> Candidate:
    for name, value in candidate_update.model_dump(exclude_unset=True).items():
        setattr(candidate, name, value)
    await session.commit()
    return candidate


async def delete_candidate(
    session: AsyncSession,
    candidate: Candidate,
) -> None:
    await session.delete(candidate)
    await session.commit()

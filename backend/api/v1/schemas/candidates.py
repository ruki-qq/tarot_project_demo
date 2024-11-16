from datetime import date, time
from typing import Annotated

from annotated_types import MinLen, MaxLen
from pydantic import BaseModel, ConfigDict, PositiveInt


class CandidateBase(BaseModel):
    full_name: Annotated[str, MinLen(1), MaxLen(256)]
    birth_date: date
    birth_time: time
    hard_skills: str | None
    soft_skills: str | None
    bio: str | None


class CandidateCreate(CandidateBase):
    pass


class CandidateUpdate(CandidateBase):
    full_name: Annotated[str, MinLen(1), MaxLen(256)] | None = None
    birth_date: date | None = None
    birth_time: time | None = None
    hard_skills: str | None = None
    soft_skills: str | None = None
    bio: str | None = None


class Candidate(CandidateBase):
    model_config = ConfigDict(from_attributes=True)

    id: PositiveInt
    is_favoured: bool

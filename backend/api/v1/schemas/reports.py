from datetime import datetime
from typing import Annotated

from annotated_types import MinLen, MaxLen
from pydantic import BaseModel, ConfigDict, PositiveInt

from api.v1.models import Employee
from api.v1.schemas.candidates import Candidate


class ReportBase(BaseModel):
    compatibility_score: float
    tarot_reading: str


class ReportCreate(ReportBase):
    candidate_id: int
    employee_ids: list[int]


class ReportUpdate(ReportBase):
    compatibility_score: float | None = None
    tarot_reading: str | None = None


class Report(ReportBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    candidates: list[Candidate]
    employees: list[Employee]

from datetime import datetime
from typing import Annotated

from annotated_types import MinLen, MaxLen
from pydantic import BaseModel, ConfigDict, PositiveInt

from api.v1.schemas.employees import Employee


class ReportBase(BaseModel):
    compatibility_score: float
    tarot_reading: str
    candidate_id: int


class ReportCreate(ReportBase):
    employees_ids: list[int]


class ReportUpdate(ReportBase):
    compatibility_score: float | None = None
    tarot_reading: str | None = None
    candidate_id: None = None


class Report(ReportBase):
    model_config = ConfigDict(from_attributes=True)

    id: int
    created_at: datetime
    employees: list[Employee]

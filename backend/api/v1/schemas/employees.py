from datetime import date, time
from typing import Annotated

from annotated_types import MinLen, MaxLen
from pydantic import BaseModel, ConfigDict, PositiveInt

from api.v1.schemas.departments import Department


class EmployeeBase(BaseModel):
    full_name: Annotated[str, MinLen(1), MaxLen(256)]
    birth_date: date
    birth_time: time
    hard_skills: str | None
    soft_skills: str | None
    bio: str | None
    position: Annotated[str, MinLen(1), MaxLen(128)]
    department_id: int
    hire_date: date


class EmployeeCreate(EmployeeBase):
    pass


class EmployeeUpdate(EmployeeBase):
    full_name: Annotated[str, MinLen(1), MaxLen(256)] | None = None
    birth_date: date | None = None
    birth_time: time | None = None
    hard_skills: str | None = None
    soft_skills: str | None = None
    bio: str | None = None
    position: Annotated[str, MinLen(1), MaxLen(128)] | None = None
    department_id: int | None = None
    hire_date: date | None = None


class Employee(EmployeeBase):
    model_config = ConfigDict(from_attributes=True)

    id: PositiveInt
    department: Department
    is_favoured: bool

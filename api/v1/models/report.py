from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import String, Text, func, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import Base

from .report_person_association import report_person_association_table

if TYPE_CHECKING:
    from .person import Person


class Report(Base):
    person1_id: int
    person2_id: int
    compatibility_score: float  # 0-100
    tarot_reading: dict
    astro_compatibility: dict
    created_at: datetime
    created_by: int

    persons: Mapped[list["Person"]] = relationship(
        secondary=report_person_association_table, back_populates="reports"
    )

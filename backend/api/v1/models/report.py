from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Text
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import Base
from core.models.mixins import IdIntMixin

from .report_candidate_association import report_candidate_association_table
from .report_employee_association import report_employee_association_table

if TYPE_CHECKING:
    from .candidate import Candidate
    from .employee import Employee
    from datetime import datetime


class Report(IdIntMixin, Base):
    compatibility_score: float  # 0-100
    tarot_reading: Mapped[str] = mapped_column(Text)
    created_at: Mapped["datetime"]

    candidates: Mapped[list["Candidate"]] = relationship(
        secondary=report_candidate_association_table,
        back_populates="reports",
    )
    employees: Mapped[list["Employee"]] = relationship(
        secondary=report_employee_association_table,
        back_populates="reports",
    )

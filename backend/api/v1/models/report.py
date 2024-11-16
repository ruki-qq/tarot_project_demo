from datetime import datetime
from typing import TYPE_CHECKING

from sqlalchemy import Text, func, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import Base
from core.models.mixins import IdIntMixin

from .report_employee_association import report_employee_association_table

if TYPE_CHECKING:
    from .employee import Employee
    from datetime import datetime


class Report(IdIntMixin, Base):
    compatibility_score: Mapped[float]
    tarot_reading: Mapped[str] = mapped_column(Text)
    created_at: Mapped[datetime] = mapped_column(
        default=datetime.now,
        server_default=func.now(),
    )

    candidate_id: Mapped[int] = mapped_column(ForeignKey("candidates.id"))

    employees: Mapped[list["Employee"]] = relationship(
        secondary=report_employee_association_table,
        back_populates="reports",
    )

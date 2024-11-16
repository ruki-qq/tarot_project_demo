from datetime import date, time
from typing import TYPE_CHECKING, Optional

from sqlalchemy import String, Text, func, DateTime, Date, Time
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import Base
from core.models.mixins import IdIntMixin

from .report_candidate_association import report_candidate_association_table


if TYPE_CHECKING:
    from .report import Report


class Candidate(IdIntMixin, Base):
    full_name: Mapped[str] = Mapped[String(256)]

    birth_date: Mapped[date] = mapped_column(Date)
    birth_time: Mapped[time] = mapped_column(Time)

    hard_skills: Mapped[str | None] = mapped_column(Text)
    soft_skills: Mapped[str | None] = mapped_column(Text)
    bio: Mapped[str | None] = mapped_column(Text)
    is_favoured: Mapped[bool]

    reports: Mapped[list["Report"]] = relationship(
        secondary=report_candidate_association_table, back_populates="candidates"
    )

    __mapper_args__ = {"polymorphic_identity": "candidate", "polymorphic_on": type}

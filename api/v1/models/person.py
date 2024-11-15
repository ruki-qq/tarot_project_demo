from datetime import datetime
from typing import TYPE_CHECKING, Optional

from sqlalchemy import String, Text, func, DateTime
from sqlalchemy.orm import Mapped, mapped_column, relationship

from core.models import Base

from .report_person_association import report_person_association_table


if TYPE_CHECKING:
    from .report import Report


class Person(Base):
    first_name: Mapped[str]
    last_name: Mapped[str]
    middle_name: Mapped[str | None]

    birth_date: Mapped[datetime]
    birth_place: Mapped[str]

    position: Mapped[str | None]
    department: Mapped[str | None]
    company_id: Mapped[int | None]

    reports: Mapped[list["Report"]] = relationship(
        secondary=report_person_association_table, back_populates="persons"
    )

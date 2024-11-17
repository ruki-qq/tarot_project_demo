from datetime import date
from typing import TYPE_CHECKING

from sqlalchemy import Date, String, ForeignKey
from sqlalchemy.orm import Mapped, mapped_column, relationship


from .report_employee_association import report_employee_association_table
from .candidate import Candidate

if TYPE_CHECKING:
    from .report import Report
    from .department import Department


class Employee(Candidate):
    id: Mapped[int] = mapped_column(
        ForeignKey("candidates.id"),
        primary_key=True,
    )

    position: Mapped[str] = mapped_column(String(128))
    department_id: Mapped[int] = mapped_column(ForeignKey("departments.id"))
    department: Mapped["Department"] = relationship(
        back_populates="employees", lazy="selectin"
    )
    hire_date: Mapped[date] = mapped_column(Date)

    reports: Mapped[list["Report"]] = relationship(
        secondary=report_employee_association_table, back_populates="employees"
    )

    __mapper_args__ = {
        "polymorphic_identity": "employee",
    }

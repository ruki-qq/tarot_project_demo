from typing import TYPE_CHECKING

from sqlalchemy import Column, ForeignKey, Integer, Table, UniqueConstraint

from core.models import Base


report_person_association_table = Table(
    "report_person_association",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("report_id", ForeignKey("reports.id"), nullable=False),
    Column("person_id", ForeignKey("persons.id"), nullable=False),
    UniqueConstraint("report_id", "person_id", name="idx_unique_report_person"),
)

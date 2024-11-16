from sqlalchemy import Column, ForeignKey, Integer, Table, UniqueConstraint

from core.models import Base


report_candidate_association_table = Table(
    "report_candidate_association",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("report_id", ForeignKey("reports.id"), nullable=False),
    Column("candidate_id", ForeignKey("candidates.id"), nullable=False),
    UniqueConstraint("report_id", "candidate_id", name="idx_unique_report_candidate"),
)

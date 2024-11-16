from sqlalchemy import Column, ForeignKey, Integer, Table, UniqueConstraint

from core.models import Base


report_employee_association_table = Table(
    "report_employee_association",
    Base.metadata,
    Column("id", Integer, primary_key=True),
    Column("report_id", ForeignKey("reports.id"), nullable=False),
    Column("employee_id", ForeignKey("employees.id"), nullable=False),
    UniqueConstraint("report_id", "employee_id", name="idx_unique_report_employee"),
)

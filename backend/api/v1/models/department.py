from typing import TYPE_CHECKING

from sqlalchemy import Text, String
from sqlalchemy.orm import mapped_column, Mapped, relationship

from core.models import Base
from core.models.mixins import IdIntMixin

if TYPE_CHECKING:
    from .employee import Employee


class Department(IdIntMixin, Base):
    name: Mapped[str] = mapped_column(String(128))
    description: Mapped[str] = mapped_column(Text)

    employees: Mapped[list["Employee"]] = relationship(back_populates="department")

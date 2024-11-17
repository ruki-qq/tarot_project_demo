from pydantic import BaseModel, ConfigDict


class DepartmentBase(BaseModel):
    name: str
    description: str


class Department(DepartmentBase):
    model_config = ConfigDict(from_attributes=True)

    id: int

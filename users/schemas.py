from datetime import datetime
from typing import Annotated

from annotated_types import MaxLen, MinLen
from pydantic import BaseModel, ConfigDict, EmailStr, PositiveInt


class UserBase(BaseModel):
    email: Annotated[EmailStr, MinLen(4), MaxLen(128)]
    first_name: Annotated[str, MinLen(1), MaxLen(128)]
    last_name: Annotated[str, MinLen(1), MaxLen(128)]
    bio: str | None


class UserCreate(UserBase):
    password: str


class UserUpdate(UserCreate):
    email: Annotated[EmailStr, MinLen(4), MaxLen(128)] | None = None
    first_name: Annotated[str, MinLen(1), MaxLen(128)] | None = None
    last_name: Annotated[str, MinLen(1), MaxLen(128)] | None = None
    bio: str | None = None
    password: str | None = None


class User(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: PositiveInt
    register_at: datetime

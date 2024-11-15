from datetime import datetime
from typing import Annotated

from annotated_types import MaxLen, MinLen
from pydantic import BaseModel, ConfigDict, EmailStr, PositiveInt


class UserBase(BaseModel):
    username: Annotated[str, MinLen(1), MaxLen(16)]
    email: Annotated[EmailStr, MinLen(4), MaxLen(128)]
    first_name: Annotated[str, MinLen(1), MaxLen(64)] | None
    last_name: Annotated[str, MinLen(1), MaxLen(64)] | None
    bio: str | None


class UserCreate(UserBase):
    pass


class UserUpdate(UserCreate):
    username: Annotated[str, MinLen(1), MaxLen(16)] | None = None
    email: Annotated[EmailStr, MinLen(4), MaxLen(128)] | None = None
    first_name: Annotated[str, MinLen(1), MaxLen(64)] | None = None
    last_name: Annotated[str, MinLen(1), MaxLen(64)] | None = None
    bio: str | None = None


class User(UserBase):
    model_config = ConfigDict(from_attributes=True)

    id: PositiveInt
    register_at: datetime

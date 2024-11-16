from typing import Annotated, Type

from fastapi import Depends, HTTPException, Path, status, APIRouter
from pydantic import BaseModel
from sqlalchemy import select
from sqlalchemy.ext.asyncio import AsyncSession

from core import db_helper
from core.types import BaseChild


class BaseObjectCRUD:
    def __init__(self, model: Type[BaseChild]):
        self.model = model

    async def get_objects(self, session: AsyncSession) -> list[BaseChild]:
        objs = await session.scalars(
            select(self.model).order_by(self.model.created_at.desc(), self.model.id)
        )
        return list(objs)

    async def get_object(self, session: AsyncSession, obj_id: int) -> BaseChild | None:
        return await session.get(self.model, obj_id)

    async def create_object(
        self,
        session: AsyncSession,
        obj_in: BaseModel,
    ) -> BaseChild:
        obj = self.model(**obj_in.model_dump())
        session.add(obj)
        await session.commit()
        return obj

    @staticmethod
    async def update_object(
        session: AsyncSession,
        obj: BaseChild,
        obj_update: BaseModel,
    ) -> BaseChild:
        for name, val in obj_update.model_dump(exclude_unset=True).items():
            setattr(obj, name, val)
        await session.commit()
        return obj

    @staticmethod
    async def delete_object(session: AsyncSession, obj: BaseChild) -> None:
        await session.delete(obj)
        await session.commit()


class BaseObjectDependencies:
    def __init__(self, crud: BaseObjectCRUD, obj_name: str):
        self.crud = crud
        self.obj_name = obj_name

    async def item_by_id(
        self,
        item_id: Annotated[int, Path],
        session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    ) -> BaseChild:
        item = await self.crud.get_object(session, item_id)
        if item:
            return item
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=f"{self.obj_name.title()} {item_id} not found.",
        )


def generate_routes(
    router: APIRouter,
    crud: BaseObjectCRUD,
    dependencies: BaseObjectDependencies,
    model_schema: Type[BaseModel],
    create_schema: BaseModel,
    update_schema: BaseModel,
):
    @router.get("", response_model=list[model_schema])
    async def get_all(
        session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    ) -> list[model_schema]:
        return await crud.get_objects(session)

    @router.get("/{item_id}", response_model=model_schema)
    async def get_one(
        item: model_schema = Depends(dependencies.item_by_id),
    ) -> model_schema:
        return item

    @router.post("", response_model=model_schema)
    async def create(
        item_in: create_schema,
        session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    ) -> model_schema:
        return await crud.create_object(session, item_in)

    @router.patch("/{item_id}", response_model=model_schema)
    async def update(
        item_update: update_schema,
        item: model_schema = Depends(dependencies.item_by_id),
        session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    ) -> model_schema:
        return await crud.update_object(session, item, item_update)

    @router.delete("/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
    async def delete(
        item: model_schema = Depends(dependencies.item_by_id),
        session: AsyncSession = Depends(db_helper.scoped_session_dependency),
    ) -> None:
        await crud.delete_object(session, item)

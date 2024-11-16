from fastapi import FastAPI

import uvicorn
from api import router_v1
from core.config import settings

app = FastAPI()
app.include_router(router_v1, prefix=settings.api_prefix)


if __name__ == "__main__":
    uvicorn.run(
        "main:app",
        reload=True,
    )

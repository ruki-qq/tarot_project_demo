from pydantic import BaseModel
from pydantic_settings import BaseSettings, SettingsConfigDict


class AccessTokenSettings(BaseSettings):
    lifetime_seconds: int = 604800  # week
    reset_password_token_secret: str = "SECRET"
    verification_token_secret: str = "SECRET"


class EnvVars(BaseModel):
    db_user: str
    db_pass: str
    db_host: str
    db_port: int
    db_name: str


class DBSettings(EnvVars, BaseSettings):
    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8")

    @property
    def db_url(self) -> str:
        return (
            "postgresql+asyncpg://"
            f"{self.db_user}:{self.db_pass}@{self.db_host}:{self.db_port}/{self.db_name}"
        )

    db_echo: bool = True


class Settings(DBSettings):
    api_prefix: str = "/api/v1"
    auth_prefix: str = "/auth"
    access_token_settings: AccessTokenSettings = AccessTokenSettings()


settings = Settings()

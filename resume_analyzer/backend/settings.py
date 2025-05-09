"""
app/core/settings.py

Centralized configuration management using environment variables.
This module loads database credentials and other sensitive config using python-dotenv.

Usage:
    from app.core.settings import settings
    engine = create_async_engine(settings.DATABASE_URL)

Environment Variables Expected:
    - DB_USER
    - DB_PASSWORD
    - DB_HOST
    - DB_PORT
    - DB_NAME
    - SECRET_KEY
"""

import os

from dotenv import load_dotenv

load_dotenv()

class Settings:
    """
    Application settings loaded from environment variables.

    Attributes:
        DB_USER (str): MySQL database username
        DB_PASSWORD (str): MySQL database password
        DB_HOST (str): Host where MySQL is running
        DB_PORT (str): Port for MySQL server
        DB_NAME (str): Target database name
        SECRET_KEY (str): Secret key for JWT token generation
    """

    DB_USER: str = os.getenv("DB_USER")
    DB_PASSWORD: str = os.getenv("DB_PASSWORD")
    DB_HOST: str = os.getenv("DB_HOST")
    DB_PORT: str = os.getenv("DB_PORT")
    DB_NAME: str = os.getenv("DB_NAME")
    SECRET_KEY: str = os.getenv("SECRET_KEY")  

    @property
    def DATABASE_URL(self) -> str:
        """
        Constructs the full SQLAlchemy database URL using aiomysql for async MySQL support.

        Returns:
            str: SQLAlchemy-compatible database connection URL
        """
        return (
            f"mysql+aiomysql://{self.DB_USER}:{self.DB_PASSWORD}"
            f"@{self.DB_HOST}:{self.DB_PORT}/{self.DB_NAME}"
        )

settings = Settings()

if __name__ == "__main__":
    print(settings.DATABASE_URL)

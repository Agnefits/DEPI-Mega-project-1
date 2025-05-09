from sqlalchemy.ext.asyncio import (
    AsyncSession,
    async_sessionmaker,
    create_async_engine,
    AsyncEngine,
)
from sqlalchemy.orm import sessionmaker
from backend.settings import settings
import aiomysql
from typing import AsyncGenerator

# Create Async SQLAlchemy engine
engine: AsyncEngine = create_async_engine(
    settings.DATABASE_URL,
    echo=True,  # Log all SQL statements
    future=True,
)

# Create async session factory
async_session = async_sessionmaker(
    bind=engine,
    class_=AsyncSession,
    expire_on_commit=False,
)

def get_sqlalchemy_engine() -> AsyncEngine:
    """
    Returns the configured SQLAlchemy async engine.
    Useful for migrations, health checks, etc.
    """
    return engine

async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """
    Yields a database session to be used with FastAPI's Depends().
    Automatically closes the session after request completes.
    """
    async with async_session() as session:
        try:
            yield session
        finally:
            await session.close()

async def get_mysql_connection():
    """
    Returns a raw aiomysql connection to the MySQL server.
    Useful for executing manual SQL commands like CREATE DATABASE.
    """
    try:
        conn = await aiomysql.connect(
            host=settings.DB_HOST,
            port=int(settings.DB_PORT),
            user=settings.DB_USER,
            password=settings.DB_PASSWORD
        )
        print("Connected to MySQL (aiomysql) successfully.")
        return conn
    except Exception as e:
        print(f"Failed to connect to MySQL: {e}")
        return None

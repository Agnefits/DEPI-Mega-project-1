# backend/database/create_all_tables.py

import asyncio
from backend.models.base import Base
from backend.database.connection import get_sqlalchemy_engine

from backend.models.resume_match_model import ResumeMatchResult
from backend.models.job_description_model import JobDescription
from backend.models.resume_model import Resume

async def create_all_tables():
    """
    Creates all tables defined in the Base metadata using Async SQLAlchemy engine.
    """
    engine = get_sqlalchemy_engine()
    async with engine.begin() as conn:
        await conn.run_sync(Base.metadata.create_all)
        print("All tables created successfully.")
    await engine.dispose()

if __name__ == "__main__":
    asyncio.run(create_all_tables())

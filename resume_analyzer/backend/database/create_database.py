# app/db/create_database.py

import asyncio
import aiomysql
from backend.settings import settings


async def create_database():
    """
    Create the database if it doesn't exist.
    """
    conn = await aiomysql.connect(
        host=settings.DB_HOST,
        port=int(settings.DB_PORT),
        user=settings.DB_USER,
        password=settings.DB_PASSWORD
    )

    try:
        async with conn.cursor() as cursor:
            await cursor.execute(f"CREATE DATABASE IF NOT EXISTS {settings.DB_NAME}")
            print(f"Database '{settings.DB_NAME}' created or already exists.")
    except Exception as e:
        print(f"Failed to create database: {e}")
    finally:
        conn.close()  # Only this is needed — aiomysql doesn't use await here


if __name__ == "__main__":
    asyncio.run(create_database())

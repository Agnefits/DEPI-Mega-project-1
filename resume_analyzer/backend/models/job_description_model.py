from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text, Integer, DateTime
from datetime import datetime
from .base import Base

class JobDescription(Base):
    """
    SQLAlchemy model for storing parsed job descriptions.
    """

    __tablename__ = "job_descriptions"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    title: Mapped[str] = mapped_column(String(255), nullable=False)        # ✅ FIXED
    company: Mapped[str] = mapped_column(String(255), nullable=True)       # ✅ FIXED
    raw_text: Mapped[str] = mapped_column(Text, nullable=False)

    required_skills: Mapped[str | None] = mapped_column(Text, nullable=True)
    required_experience: Mapped[str | None] = mapped_column(Text, nullable=True)
    required_certifications: Mapped[str | None] = mapped_column(Text, nullable=True)
    required_languages: Mapped[str | None] = mapped_column(Text, nullable=True)
    required_education: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

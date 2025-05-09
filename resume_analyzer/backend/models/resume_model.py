from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text, DateTime
from .base import Base
from datetime import datetime

class Resume(Base):
    """
    SQLAlchemy model for storing parsed resume data.
    """

    __tablename__ = "resumes"

    id: Mapped[int] = mapped_column(primary_key=True, index=True)
    file_name: Mapped[str] = mapped_column(String(255), nullable=False)              
    raw_text: Mapped[str] = mapped_column(Text, nullable=False)

    parsed_email: Mapped[str | None] = mapped_column(String(255), nullable=True)     
    parsed_phone: Mapped[str | None] = mapped_column(String(50), nullable=True)      
    parsed_links: Mapped[str | None] = mapped_column(Text, nullable=True)
    parsed_skills: Mapped[str | None] = mapped_column(Text, nullable=True)
    parsed_experience: Mapped[str | None] = mapped_column(Text, nullable=True)
    parsed_education: Mapped[str | None] = mapped_column(Text, nullable=True)
    parsed_certifications: Mapped[str | None] = mapped_column(Text, nullable=True)
    parsed_languages: Mapped[str | None] = mapped_column(Text, nullable=True)
    parsed_projects: Mapped[str | None] = mapped_column(Text, nullable=True)
    parsed_interests: Mapped[str | None] = mapped_column(Text, nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, default=datetime.utcnow)

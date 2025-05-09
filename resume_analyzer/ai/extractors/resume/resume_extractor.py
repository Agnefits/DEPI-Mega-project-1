"""
This module defines the ResumeExtractor class, a unified interface that combines multiple
specialized NLP-based extractors to parse and structure essential information from unstructured
resume or CV text.

The ResumeExtractor leverages modular components to extract:
- Contact information (emails, phone numbers, web links)
- Technical and soft skills
- Work experience blocks
- Personal and academic projects
- Certifications (standard and custom)
- Languages spoken
- Personal interests or hobbies

Each component uses pattern matching, heuristics, and customizable keyword lists to handle 
varied resume formats reliably.

Returns:
    A structured dictionary containing:
        - "Email": str or None
        - "Phone": str or None
        - "Links": list or dict
        - "Skills": List[str]
        - "Projects": List[Dict[str, Any]]
        - "Experience": List[Dict[str, Any]]
        - "Certifications": List[str]
        - "Languages": List[str]
        - "Interests": List[str]

Typical Use Cases:
    - Resume parsing for ATS systems
    - Talent analytics platforms
    - HR automation tools
    - Career recommendation engines
"""


from typing import Dict, Any, Optional

from ai.extractors.resume.skiils_extractor import SkillExtractor
from ai.extractors.resume.email_extractor import EmailExtractor
from ai.extractors.resume.phone_extractor import PhoneExtractor
from ai.extractors.resume.links_extractor import LinkExtractor
from ai.extractors.resume.projects_extractor import ProjectExtractor
from ai.extractors.resume.experience_extractor import ExperienceExtractor
from ai.extractors.resume.certification_extractor import CertificationExtractor
from ai.extractors.resume.hobbies_extractor import InterestExtractor
from ai.extractors.resume.education_extractor import EducationExtractor
from ai.extractors.resume.language_extractor import LanguageExtractor


class ResumeExtractor:
    """
    ResumeExtractor Module

    A unified extractor that combines multiple specialized extractors to parse and structure
    key information from raw resume or CV text. It wraps reusable modules for email, phone,
    skills, projects, certifications, experience, and more into a single interface.

    Features:
        - Extracts contact details (email, phone, links)
        - Identifies technical and soft skills
        - Parses project and work experience sections
        - Extracts known certifications and education/training keywords
        - Detects personal interests and spoken languages
        - Modular design allows for plug-and-play enhancements

    Returns (parsed structure):
        {
            "Email": str,
            "Phone": str,
            "Links": List[str] or Dict[str, List[str]],
            "Skills": List[str],
            "Projects": List[Dict[str, str]],
            "Experience": List[Dict[str, str]],
            "Certifications": List[str],
            "Languages": List[str],
            "Interests": List[str]
        }
        
    """

    def __init__(self):
        self.skill_extractor = SkillExtractor()
        self.email_extractor = EmailExtractor()
        self.phone_extractor = PhoneExtractor()
        self.link_extractor = LinkExtractor()
        self.project_extractor = ProjectExtractor(
            known_skills=self.skill_extractor.skill_set["Programming Languages"],
            extract_skills_fn=lambda text, skills: self.skill_extractor.extract_skills(text, return_freq=False)
        )
        self.experience_extractor = ExperienceExtractor()
        self.certification_extractor = CertificationExtractor()
        self.interest_extractor = InterestExtractor()
        self.language_extractor = LanguageExtractor()
        self.education_extractor = EducationExtractor()

    def parse(self, text: str, classify_links: bool = True) -> Dict[str, Optional[Any]]:
        """
        Parse the full resume text and return a structured dictionary of extracted fields.

        Args:
            text (str): Raw resume text.
            classify_links (bool): Whether to classify links by category (LinkedIn, GitHub, etc.).

        Returns:
            Dict[str, Optional[Any]]: Parsed resume content.
        """
        return {
            "Email": self.email_extractor.extract(text),
            "Phone": self.phone_extractor.extract(text),
            "Links": self.link_extractor.extract(text, classify=classify_links),
            "Skills": self.skill_extractor.extract_skills(text),
            "Projects": self.project_extractor.extract(text),
            "Experience": self.experience_extractor.extract(text),
            "Certifications": self.certification_extractor.extract(text),
            "Languages": self.language_extractor.extract(text),
            "Interests": self.interest_extractor.extract(text),
            "Education": self.education_extractor.extract(text)
        }
        

def main():
    
    sample_resume = """
    John Doe
    Email: john.doe@example.com
    Phone: +1 (555) 123-4567
    LinkedIn: linkedin.com/in/johndoe
    GitHub: github.com/johndoe

    Skills:
    Python, JavaScript, React, FastAPI, Docker, SQL, Machine Learning

    Projects
    Resume Parser
    Built an NLP-based resume parser using Python, spaCy, and regex to extract structured fields.

    Portfolio Website
    Developed a personal portfolio using React and deployed it on Netlify.

    Experience
    Software Engineer – OpenAI
    2021 – Present
    - Built RESTful APIs using FastAPI and deployed models on AWS
    - Collaborated on NLP models for document understanding

    Certifications
    AWS Certified Solutions Architect – Associate
    TensorFlow Developer Certificate
    Completed Coursera Deep Learning Specialization

    Languages
    English, French, Arabic

    Interests
    - Hiking • Blogging • AI Ethics • Photography
    """

    extractor = ResumeExtractor()
    parsed = extractor.parse(sample_resume)

    print("\n--- Parsed Resume ---")
    for key, value in parsed.items():
        print(f"{key}:")
        print(value)
        print()


if __name__ == "__main__":
    main()


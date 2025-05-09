"""
JobEducationExtractor Module

This module defines the JobEducationExtractor class, which extracts educational qualifications
from job descriptions. It identifies degrees, academic levels, and fields of study using
a combination of keyword matching and contextual phrase detection.

Supported detections include:
- Degree levels (e.g., Bachelor's, Master's, PhD, MBA)
- Abbreviations (e.g., BSc, MSc, BA, MA, JD, MD)
- Fields of study (e.g., Computer Science, Business, Engineering)
- Contextual phrases like "degree in", "background in", "educational background"

Classes:
    JobEducationExtractor: Extracts degree-level requirements and fields of study from job text.

Typical Use Cases:
    - Job description parsing for ATS systems
    - Candidate-job education matching
    - Career recommendation engines
    - Hiring insights and analytics tools
"""

import re
from typing import List, Optional


class JobEducationExtractor:
    """
    A class to extract education-level requirements from job description text.

    Detects degrees (e.g., Bachelor's, Master's, PhD), fields of study (e.g., Computer Science),
    and common phrases like "degree in..." or "background in...". Uses regex and keyword matching
    for both exact and flexible detection of educational requirements.

    Attributes:
        degree_keywords (List[str]): Common degrees and phrases to look for.
        field_keywords (List[str]): Optional fields of study or domains (can be extended).
    """

    def __init__(self, field_keywords: Optional[List[str]] = None):
        """
        Initializes the extractor with optional custom fields of study.

        Args:
            field_keywords (Optional[List[str]]): Custom fields of study (e.g., ["Computer Science", "Engineering"])
        """
        self.degree_keywords = [
            "Bachelor", "Master", "PhD", "Doctorate", "BSc", "MSc", "MBA", "Undergraduate", "Graduate",
            "BS", "MS", "BA", "MA", "BEng", "MEng", "JD", "MD", "Associate"
        ]
        self.field_keywords = field_keywords or [
            "Computer Science", "Engineering", "Information Technology", "Data Science",
            "Business", "Mathematics", "Statistics", "Economics", "Physics", "Artificial Intelligence",
            "Cybersecurity", "Software Engineering", "Electrical Engineering"
        ]

        self.degree_pattern = re.compile(
            r"(Bachelor[’'s]*|Master[’'s]*|PhD|Doctorate|BSc|MSc|MBA|BS|MS|BA|MA|BEng|MEng|JD|MD|Associate)", re.IGNORECASE
        )

        self.edu_context_pattern = re.compile(
            r"(degree in|background in|education in|required degree|educational background|field of study)",
            re.IGNORECASE
        )

    def extract(self, text: str) -> List[str]:
        """
        Extract educational qualifications from job description text.

        Args:
            text (str): The job description content.

        Returns:
            List[str]: A sorted list of deduplicated degree/field matches.
        """
        lines = [line.strip("•-–—* ") for line in text.split('\n') if line.strip()]
        results = set()

        for line in lines:
            line_lower = line.lower()
            found = False

            # Match known degrees
            for keyword in self.degree_keywords:
                if keyword.lower() in line_lower:
                    results.add(keyword)
                    found = True

            # Match fields of study
            for field in self.field_keywords:
                if field.lower() in line_lower:
                    results.add(field)
                    found = True

            # Match contextual phrases
            if not found and self.edu_context_pattern.search(line):
                results.add(line.strip())

        return sorted(results)
    
    

if __name__ == "__main__":
    jd_text = """
    Requirements:
    - Bachelor's degree in Computer Science, Engineering, or related field.
    - A Master's or MBA is a plus.
    - Strong academic background in Artificial Intelligence or Data Science.
    - PhD preferred for research roles.
    """

    extractor = JobEducationExtractor()
    print(extractor.extract(jd_text))


import re
from typing import List, Dict, Optional

class EducationExtractor:
    """
    A class to extract education-related information from resume text.

    This class provides a method to extract degrees, institutions, and graduation years
    from unstructured resume text. It uses a list of known degrees and regex patterns
    to identify and parse education entries.

    Attributes:
        known_degrees (List[str]): A list of degrees to look for in the resume text.
            If not provided, a default list of common degrees is used.
    """

    def __init__(self, known_degrees: Optional[List[str]] = None):
        """
        Initializes the EducationExtractor with a list of known degrees.

        Args:
            known_degrees (Optional[List[str]]): A custom list of degrees to extract.
                If None, a default list of common degrees is used.
        """
        self.known_degrees = known_degrees or [
            "Bachelor", "Master", "B.Sc", "M.Sc", "B.S.", "M.S.", "BA", "MA", "PhD", "Ph.D", "B.E", "M.E",
            "B.Tech", "M.Tech", "MBA", "MCA", "BBA", "LLB", "LLM", "MD", "DDS", "Diploma", "High School",
            "Associate Degree", "Doctorate", "Postgraduate", "Undergraduate", "MBBS", "CFA", "CA", "M.Ed", "EdD"
        ]

    def extract(self, text: str) -> Optional[List[Dict[str, Optional[str]]]]:
        """
        Extracts education entries from the given resume text.

        This method searches for lines containing known degrees and extracts the degree,
        institution name, graduation year, and the raw line from the text.

        Args:
            text (str): The resume text to extract education information from.

        Returns:
            Optional[List[Dict[str, Optional[str]]]]: A list of dictionaries, each containing:
                - "degree": The extracted degree.
                - "institution": The extracted institution name, if found.
                - "year": The extracted graduation year, if found.
                - "raw": The original line from the text.
                If no education entries are found, returns None.
        """
        if not text:
            return None

        lines = text.split('\n')
        education_data = []

        for line in lines:
            line_clean = line.strip()
            for degree in self.known_degrees:
                pattern = rf'\b{re.escape(degree)}\b'
                if re.search(pattern, line_clean, re.IGNORECASE):
                    # Extract year: Look for 4-digit numbers or date formats like "Month Year"
                    year_match = re.search(r'\b(19|20)\d{2}\b', line_clean)
                    if not year_match:
                        # Try to find "Month Year" format
                        month_year_match = re.search(r'\b(January|February|March|April|May|June|July|August|September|October|November|December)\s+(19|20)\d{2}\b', line_clean)
                        year = month_year_match.group(2) if month_year_match else None
                    else:
                        year = year_match.group(0)



                    # Extract institution: Look for text between degree and year or after degree
                    institution = self._extract_institution(line_clean, degree, year)

                    education_data.append({
                        "degree": degree,
                        "institution": institution,
                        "year": year,
                        "raw": line_clean
                    })
                    break  # Avoid duplicate matches for the same line

        return education_data if education_data else None

    def _extract_institution(self, line: str, degree: str, year: Optional[str]) -> Optional[str]:
        """
        Extracts the institution name from the education line.

        This method attempts to identify the institution name by looking for text
        between the degree and the year, or after the degree if no year is present.

        Args:
            line (str): The cleaned line containing the education entry.
            degree (str): The degree found in the line.
            year (Optional[str]): The graduation year found in the line, if any.

        Returns:
            Optional[str]: The extracted institution name, or None if not found.
        """
        # Remove degree and year from the line to isolate institution
        degree_pattern = rf'\b{re.escape(degree)}\b'
        if year:
            year_pattern = rf'\b{re.escape(year)}\b'
            # Find text between degree and year
            institution_match = re.search(f'{degree_pattern}(.*?){year_pattern}', line, re.IGNORECASE)
            if institution_match:
                institution = institution_match.group(1).strip(', ').strip()
                return institution if institution else None
        # If no year, take text after degree
        after_degree = re.split(degree_pattern, line, flags=re.IGNORECASE)[-1].strip(', ').strip()
        return after_degree if after_degree else None

# Example usage
if __name__ == "__main__":
    sample_resume = """
    John Doe
    Education:
    - Bachelor of Science in Computer Science, XYZ University, 2020
    - Master of Business Administration, ABC Business School, May 2022
    """

    extractor = EducationExtractor()
    education_entries = extractor.extract(sample_resume)

    print("\n--- Extracted Education ---")
    for entry in education_entries:
        print(entry)
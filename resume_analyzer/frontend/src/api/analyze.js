export async function analyzeResume({ resumeFile, jobDescription }) {
    if (!resumeFile || !jobDescription) {
        throw new Error("Both resume and job description are required.");
    }

    try {
        const formData = new FormData();
        formData.append("resume", resumeFile);
        formData.append("job_description", jobDescription);

        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/analyze`, {
        method: "POST",
        body: formData,
        });

        if (!response.ok) {
        throw new Error("Failed to analyze resume.");
        }

        const data = await response.json();
        return data; // { score: number, matched_skills: [...], feedback: string, etc. }
    } catch (error) {
        console.error("Error analyzing resume:", error);
        throw error;
    }
}

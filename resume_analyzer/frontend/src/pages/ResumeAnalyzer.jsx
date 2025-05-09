import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { analyzeResume } from "../api/analyze";
import ScoreCard from "../components/ScoreCard";
import StyledUpload from "../components/StyledUpload";
import Navbar from "../components/common/Navbar";

// Background animation for the page
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Center the entire wrapper and apply background animation
const Wrapper = styled.section`
  background: linear-gradient(135deg, #0a192f 0%, #1e293b 100%);
  background-size: 400% 400%;
  animation: ${gradient} 20s ease infinite;
  color: #ffffff;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  padding: 2rem;
`;

const Container = styled.div`
  max-width: 800px;
  width: 100%;
  background-color: #1e293b;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
  text-align: center;
`;

const Title = styled.h2`
  font-size: 2.5rem;
  color: #64ffda;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 1rem;
  border-radius: 10px;
  border: 1px solid ${({ theme }) => theme.colors.border || "#334155"};
  font-size: 1rem;
  background-color: #1e293b;
  color: #ffffff;
  resize: none;
  min-height: 150px;
  margin-bottom: 1.5rem;
  transition: border-color 0.3s ease, box-shadow 0.3s ease;

  &:focus {
    border-color: #64ffda;
    outline: none;
    box-shadow: 0 0 8px #64ffda;
  }

  &::placeholder {
    color: #cbd5e1;
  }
`;

const Button = styled.button`
  background-color: #64ffda;
  color: #0f172a;
  font-weight: bold;
  padding: 1rem 2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  margin-top: 1rem;

  &:hover {
    background-color: #3be4c0;
    transform: translateY(-4px);
  }

  &:disabled {
    background-color: #3e5c6d;
    cursor: not-allowed;
  }
`;

const ErrorText = styled.p`
  color: #ef4444;
  margin-top: 1rem;
  text-align: center;
`;

const ResumeAnalyzer = () => {
  const [resumeFile, setResumeFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAnalyze = async () => {
    setError("");
    setResult(null);

    if (!resumeFile || !jobDescription.trim()) {
      setError("Please upload a resume and enter a job description.");
      return;
    }

    try {
      setLoading(true);
      const response = await analyzeResume({ resumeFile, jobDescription });
      setResult(response);
    } catch (err) {
      setError("Failed to analyze. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <Navbar/>
        <Wrapper>
        <Container>
            <Title>Resume Analyzer</Title>
            <StyledUpload setFile={setResumeFile} />
            <TextArea
            rows="6"
            placeholder="Paste the job description here..."
            value={jobDescription}
            onChange={(e) => setJobDescription(e.target.value)}
            />
            <Button onClick={handleAnalyze} disabled={loading}>
            {loading ? "Analyzing..." : "Analyze"}
            </Button>

            {error && <ErrorText>{error}</ErrorText>}

            {result && (
            <div style={{ marginTop: "2rem" }}>
                <ScoreCard score={result.score} feedback={result.feedback} />
            </div>
            )}
        </Container>
        </Wrapper>
    </>
  );
};

export default ResumeAnalyzer;

import React from "react";
import styled from "styled-components";

// Subtle background animation for the score card
const CardWrapper = styled.div`
  background: linear-gradient(135deg, #1e293b, #334155);
  color: ${({ theme }) => theme.colors.text || "#ffffff"};
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.4);
  text-align: center;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.6);
  }
`;

const ScoreValue = styled.h2`
  font-size: 3rem;
  margin-bottom: 1rem;
  color: ${({ score }) => 
    score > 75 ? "#22c55e" : score > 50 ? "#f59e0b" : "#ef4444"};
  font-weight: 700;
  letter-spacing: 1px;
`;

const Feedback = styled.p`
  font-size: 1.1rem;
  color: ${({ theme }) => theme.colors.textMuted || "#cbd5e1"};
  margin-top: 0.5rem;
`;

const ProgressBar = styled.div`
  height: 8px;
  width: 100%;
  background-color: #334155;
  border-radius: 4px;
  margin-top: 1rem;
`;

const Progress = styled.div`
  height: 100%;
  width: ${({ score }) => score}%;
  background-color: ${({ score }) =>
    score > 75 ? "#22c55e" : score > 50 ? "#f59e0b" : "#ef4444"};
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ScoreCard = ({ score, feedback }) => {
  return (
    <CardWrapper>
      <ScoreValue score={score}>
        {score} / 100
      </ScoreValue>
      <ProgressBar>
        <Progress score={score} />
      </ProgressBar>
      {feedback && <Feedback>{feedback}</Feedback>}
    </CardWrapper>
  );
};

export default ScoreCard;

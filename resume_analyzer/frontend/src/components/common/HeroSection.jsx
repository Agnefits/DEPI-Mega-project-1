import React from "react";
import styled, { keyframes } from "styled-components";

// Gradient animation for the background
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Hero Section wrapper with gradient animation
const HeroWrapper = styled.section`
  background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  background-size: 400% 400%;
  animation: ${gradient} 20s ease infinite;
  color: #ffffff;
  padding: 6rem 2rem;
  text-align: center;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
`;

// Title with a glowing effect
const Title = styled.h1`
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: bold;
  text-transform: uppercase;
  letter-spacing: 2px;
  color: #ffffff;
  position: relative;
  z-index: 1;
  animation: fadeIn 2s ease-out;

  span {
    color: #64ffda;
  }

  @media (min-width: 768px) {
    font-size: 4.5rem;
  }

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(-20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

// Subtitle with better spacing and color
const Subtitle = styled.p`
  font-size: 1.3rem;
  max-width: 750px;
  margin: 0 auto 2.5rem auto;
  color: #cbd5e1;
  font-weight: 300;
  line-height: 1.6;

  @media (min-width: 768px) {
    font-size: 1.5rem;
  }
`;

// Button with hover effects and shadow
const CTAButton = styled.a`
  background-color: #64ffda;
  color: #0f172a;
  padding: 1rem 2rem;
  border-radius: 8px;
  font-weight: bold;
  text-decoration: none;
  display: inline-block;
  margin-top: 1.5rem;
  transition: background-color 0.3s ease, transform 0.3s ease;
  box-shadow: 0 4px 15px rgba(100, 255, 218, 0.25);

  &:hover {
    background-color: #3be4c0;
    transform: translateY(-4px);
    box-shadow: 0 6px 18px rgba(59, 228, 192, 0.3);
  }

  @media (max-width: 768px) {
    font-size: 1.1rem;
  }
`;

// Hero section with smooth text animations and gradient
const HeroSection = () => {
  return (
    <HeroWrapper id="home">
      <Title>
        Optimize Your <span>Resume</span> with AI
      </Title>
      <Subtitle>
        Upload your resume and a job description. Our AI will analyze and give you a score — helping you stand out in job applications.
      </Subtitle>
      <CTAButton href="#services">Get Started</CTAButton>
    </HeroWrapper>
  );
};

export default HeroSection;

import React from "react";
import styled, { keyframes } from "styled-components";

// Background gradient animation for services section
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ServicesWrapper = styled.section`
  background: linear-gradient(135deg, #0a192f, #1e293b, #0a172a);
  background-size: 400% 400%;
  animation: ${gradient} 20s ease infinite;
  color: #ffffff;
  padding: 5rem 2rem;
  text-align: center;
`;

const SectionTitle = styled.h2`
  font-size: 2.5rem;
  margin-bottom: 2.5rem;
  color: #64ffda;
  text-transform: uppercase;
  letter-spacing: 1px;

  @media (min-width: 768px) {
    font-size: 3rem;
  }
`;

const ServicesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1100px;
  margin: 0 auto;

  @media (max-width: 768px) {
    grid-template-columns: 1fr; /* Stack on small screens */
  }
`;

const ServiceCard = styled.div`
  background-color: #0f172a;
  padding: 2.5rem;
  border-radius: 15px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.4);
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-8px);
    box-shadow: 0 12px 30px rgba(0, 0, 0, 0.6);
  }
`;

const CardTitle = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1.2rem;
  color: #64ffda;
  font-weight: bold;
  text-transform: capitalize;
`;

const CardDesc = styled.p`
  font-size: 1.1rem;
  color: #cbd5e1;
  line-height: 1.5;
`;

const ServicesSection = () => {
  const services = [
    {
      title: "Resume Upload & Parsing",
      desc: "Upload your resume in PDF or Word format and let our AI parse the key details automatically.",
    },
    {
      title: "Job Description Matching",
      desc: "Paste a job description and we’ll compare it against your resume to evaluate fit.",
    },
    {
      title: "AI Matching Score",
      desc: "Receive a detailed score showing how well your resume matches the job description.",
    },
  ];

  return (
    <ServicesWrapper id="services">
      <SectionTitle>Our Services</SectionTitle>
      <ServicesGrid>
        {services.map((service, index) => (
          <ServiceCard key={index}>
            <CardTitle>{service.title}</CardTitle>
            <CardDesc>{service.desc}</CardDesc>
          </ServiceCard>
        ))}
      </ServicesGrid>
    </ServicesWrapper>
  );
};

export default ServicesSection;

import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Background animation for the section
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const ContactWrapper = styled.section`
  background: linear-gradient(135deg, #0a192f 0%, #1e293b 100%);
  background-size: 400% 400%;
  animation: ${gradient} 20s ease infinite;
  color: #ffffff;
  padding: 6rem 2rem;
  text-align: center;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center; /* Ensure content is centered horizontally */
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

const Form = styled.form`
  max-width: 800px;
  display: grid;
  gap: 1.5rem;
  width: 100%; /* Ensure the form takes up full width */
`;

const Input = styled.input`
  padding: 1rem;
  width: 100%; 
  max-width: 800px; /* Set a max-width for larger screens */
  border: 1px solid ${({ theme }) => theme.colors.border || "#334155"};
  border-radius: 10px;
  font-size: 1rem;
  background-color: #1e293b;
  color: #ffffff;
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

const Textarea = styled.textarea`
  padding: 1rem;
  width: 100%; 
  max-width: 800px; 
  border: 1px solid ${({ theme }) => theme.colors.border || "#334155"};
  border-radius: 10px;
  font-size: 1rem;
  background-color: #1e293b;
  color: #ffffff;
  min-height: 150px;
  resize: none;
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
  border: none;
  border-radius: 10px;
  padding: 1rem 2rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  font-size: 1.1rem;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #3be4c0;
    transform: translateY(-4px);
  }
`;

const SuccessMessage = styled.div`
  margin-top: 1rem;
  color: #22c55e;
  font-weight: 600;
  font-size: 1rem;
  animation: fadeIn 1s ease-out;

  @keyframes fadeIn {
    0% { opacity: 0; transform: translateY(20px); }
    100% { opacity: 1; transform: translateY(0); }
  }
`;

const ContactSection = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", formData);
    setSubmitted(true);
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <ContactWrapper id="contact">
      <SectionTitle>Contact Us</SectionTitle>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <Input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <Textarea
          name="message"
          placeholder="Your Message"
          value={formData.message}
          onChange={handleChange}
          required
        />
        <Button type="submit">Send Message</Button>
        {submitted && <SuccessMessage>Message sent successfully!</SuccessMessage>}
      </Form>
    </ContactWrapper>
  );
};

export default ContactSection;

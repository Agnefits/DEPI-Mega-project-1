import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Gradient background animation
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Fullscreen Wrapper
const Wrapper = styled.div`
  min-height: 100vh;
  width: 350px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-size: 400% 400%;
  animation: ${gradient} 20s ease infinite;
`;

const Container = styled.div`
  background-color: rgba(30, 41, 59, 0.95);
  padding: 3rem 2.5rem;
  border-radius: 20px;
  box-shadow: 0 0 40px rgba(100, 255, 218, 0.25);
  backdrop-filter: blur(8px);
  width: 100%;
  max-width: 800px;         
  min-width: 360px;       
  color: ${({ theme }) => theme.colors.text || "#ffffff"};
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 2rem;
  font-size: 2.25rem;
  color: ${({ theme }) => theme.colors.primary || "#64ffda"};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 10px;
  font-size: 1rem;
  background-color: #0f172a;
  color: #ffffff;
  transition: 0.3s border ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || "#64ffda"};
    outline: none;
    box-shadow: 0 0 8px ${({ theme }) => theme.colors.primary || "#64ffda"};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary || "#64ffda"};
  color: #0f172a;
  padding: 1rem;
  border: none;
  border-radius: 10px;
  font-weight: 600;
  font-size: 1.1rem;
  cursor: pointer;
  box-shadow: 0 0 16px rgba(100, 255, 218, 0.25);
  transition: background 0.3s ease;

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover || "#3be4c0"};
  }
`;

const ErrorText = styled.p`
  color: ${({ theme }) => theme.colors.error || "#ef4444"};
  text-align: center;
  margin-top: -0.5rem;
  margin-bottom: 0.5rem;
`;

const FooterText = styled.p`
  text-align: center;
  font-size: 0.95rem;
  margin-top: 1.5rem;
  color: ${({ theme }) => theme.colors.textMuted || "#94a3b8"};
`;

const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.primary || "#64ffda"};
  text-decoration: none;
  font-weight: 600;
  margin-left: 0.25rem;

  &:hover {
    text-decoration: underline;
  }
`;

const SignupForm = ({ onSignup }) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      await onSignup(formData);
    } catch (err) {
      setError(err.message || "Signup failed.");
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>Create an Account</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="name"
            placeholder="Full Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <Input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Button type="submit">Sign Up</Button>
          {error && <ErrorText>{error}</ErrorText>}
        </Form>

        <FooterText>
          Already have an account?
          <StyledLink to="/login">Login</StyledLink>
        </FooterText>
      </Container>
    </Wrapper>
  );
};

export default SignupForm;

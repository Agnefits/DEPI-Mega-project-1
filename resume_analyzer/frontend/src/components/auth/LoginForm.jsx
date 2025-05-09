import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Gradient background animation
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const Wrapper = styled.div`
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 2rem;
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
  gap: 1.75rem;
`;

const Input = styled.input`
  padding: 1rem;
  border: 1px solid transparent;
  border-radius: 12px;
  font-size: 1.05rem;
  background-color: #0f172a;
  color: #ffffff;
  transition: 0.3s border ease;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary || "#64ffda"};
    outline: none;
    box-shadow: 0 0 10px ${({ theme }) => theme.colors.primary || "#64ffda"};
  }
`;

const ForgotLink = styled(Link)`
  font-size: 0.95rem;
  color: ${({ theme }) => theme.colors.primary || "#64ffda"};
  text-align: right;
  text-decoration: none;
  margin-top: -1rem;
  margin-bottom: -0.5rem;

  &:hover {
    text-decoration: underline;
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.colors.primary || "#64ffda"};
  color: #0f172a;
  padding: 1rem;
  border: none;
  border-radius: 12px;
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
  font-size: 1rem;
  margin-top: 2rem;
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

const LoginForm = ({ onLogin }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
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
      await onLogin(formData);
    } catch (err) {
      setError(err.message || "Invalid credentials.");
    }
  };

  return (
    <Wrapper>
      <Container>
        <Title>Login</Title>

        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            name="email"
            placeholder="Email address"
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
          <ForgotLink to="/forgot-password">Forgot password?</ForgotLink>
          <Button type="submit">Login</Button>
          {error && <ErrorText>{error}</ErrorText>}
        </Form>

        <FooterText>
          Don&apos;t have an account?
          <StyledLink to="/signup">Sign up</StyledLink>
        </FooterText>
      </Container>
    </Wrapper>
  );
};

export default LoginForm;

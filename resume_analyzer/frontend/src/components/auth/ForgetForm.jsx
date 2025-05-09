import React, { useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";

const Container = styled.div`
    background-color: ${({ theme }) => theme.colors.surface || "#1e293b"};
    padding: 2.5rem 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
    max-width: 420px;
    margin: 3rem auto;
    color: ${({ theme }) => theme.colors.text || "#ffffff"};
`;

const Title = styled.h2`
    text-align: center;
    margin-bottom: 1.5rem;
    font-size: 1.75rem;
    color: ${({ theme }) => theme.colors.primary || "#64ffda"};
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.25rem;
`;

const Input = styled.input`
    padding: 0.85rem;
    border: 1px solid ${({ theme }) => theme.colors.border || "#334155"};
    border-radius: 8px;
    font-size: 1rem;
    background-color: #0f172a;
    color: #ffffff;

    &:focus {
        border-color: ${({ theme }) => theme.colors.primary || "#64ffda"};
        outline: none;
    }
`;

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.primary || "#64ffda"};
    color: #0f172a;
    padding: 0.85rem;
    border: none;
    border-radius: 8px;
    font-weight: bold;
    font-size: 1rem;
    cursor: pointer;
    transition: 0.3s ease;

    &:hover {
        background-color: ${({ theme }) => theme.colors.primaryHover || "#3be4c0"};
    }
`;

const Message = styled.p`
    text-align: center;
    font-size: 0.95rem;
    color: ${({ error, theme }) =>
        error ? theme.colors.error || "#ef4444" : theme.colors.success || "#22c55e"};
`;

const FooterText = styled.p`
    text-align: center;
    font-size: 0.95rem;
    margin-top: 1rem;
    color: ${({ theme }) => theme.colors.textMuted || "#94a3b8"};
`;

const StyledLink = styled(Link)`
    color: ${({ theme }) => theme.colors.primary || "#64ffda"};
    text-decoration: none;
    margin-left: 0.25rem;

    &:hover {
        text-decoration: underline;
    }
`;

const ForgetForm = ({ onRequestReset }) => {
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState({ message: "", error: false });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus({ message: "", error: false });

        try {
        await onRequestReset(email);
        setStatus({ message: "Password reset link sent to your email.", error: false });
        setEmail("");
        } catch (err) {
        setStatus({ message: err.message || "Failed to send reset link.", error: true });
        }
    };

    return (
        <Container>
        <Title>Forgot Password</Title>

        <Form onSubmit={handleSubmit}>
            <Input
            type="email"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            />
            <Button type="submit">Send Reset Link</Button>
        </Form>

        {status.message && <Message error={status.error}>{status.message}</Message>}

        <FooterText>
            Remember your password?
            <StyledLink to="/login">Login</StyledLink>
        </FooterText>
        </Container>
    );
};

export default ForgetForm;

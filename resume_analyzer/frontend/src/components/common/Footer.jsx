import React from "react";
import styled from "styled-components";

const FooterContainer = styled.footer`
  background-color: #0a192f;
  color: #ffffff;
  text-align: center;
  padding: 2rem 1rem;
  font-size: 0.9rem;
  margin-top: 4rem;
`;

const Divider = styled.hr`
  border: none;
  border-top: 1px solid #334155;
  margin-bottom: 1rem;
  width: 80%;
  margin-left: auto;
  margin-right: auto;
`;

const FooterLinks = styled.div`
  margin-bottom: 1rem;

  a {
    color: #64ffda;
    text-decoration: none;
    margin: 0 0.75rem;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Footer = () => {
  return (
    <FooterContainer>
      <Divider />
      <FooterLinks>
        <a href="#home">Home</a>
        <a href="#services">Services</a>
        <a href="#contact">Contact</a>
      </FooterLinks>
      <div>&copy; {new Date().getFullYear()} ResumeAI. All rights reserved.</div>
    </FooterContainer>
  );
};

export default Footer;

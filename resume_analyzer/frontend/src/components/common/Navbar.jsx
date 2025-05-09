import React, { useState } from "react";
import styled, { keyframes } from "styled-components";
import { Link } from "react-router-dom";

// Background animation for navbar
const gradient = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

// Navbar Container with gradient effect
const NavbarContainer = styled.nav`
  width: 100%;
  background: linear-gradient(135deg, #0a192f, #1e293b, #0a172a);
  background-size: 400% 400%;
  animation: ${gradient} 20s ease infinite;
  color: #ffffff;
  padding: 1.2rem 2.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 1000;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;
`;

const Logo = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #64ffda;
  cursor: pointer;
  transition: color 0.3s ease;

  &:hover {
    color: #3be4c0;
  }
`;

const NavLinks = styled.ul`
  display: flex;
  list-style: none;
  gap: 2rem;
  transition: all 0.3s ease;

  @media (max-width: 768px) {
    display: ${({ menuOpen }) => (menuOpen ? "flex" : "none")}; /* Display based on state */
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    background-color: #0a192f;
    padding: 2rem;
    width: 250px;
    height: 100vh;
    z-index: 2;
    transform: translateX(-100%); /* Initially hidden off-screen */
    transition: transform 0.3s ease;
    box-shadow: 4px 0 8px rgba(0, 0, 0, 0.3);
  }

  /* Show the sidebar when the menu is open */
  @media (max-width: 768px) {
    transform: ${({ menuOpen }) => (menuOpen ? "translateX(0)" : "translateX(-100%)")};
  }
`;

const NavLink = styled.li`
  a {
    color: #ffffff;
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;

    &:hover {
      color: #64ffda;
    }
  }

  &:not(:last-child) {
    margin-right: 2rem;
  }
`;

const MobileMenu = styled.div`
  display: none;

  @media (max-width: 768px) {
    display: block;
    font-size: 2rem;
    color: #ffffff;
    cursor: pointer;
  }
`;

const MobileMenuIcon = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 4px;
  cursor: pointer;
  transition: transform 0.3s ease;

  div {
    width: 30px;
    height: 3px;
    background-color: #ffffff;
    border-radius: 5px;
    transition: all 0.3s ease;
  }

  &:hover div {
    background-color: #64ffda;
  }

  &.open div:nth-child(1) {
    transform: rotate(45deg);
    position: absolute;
    top: 0;
  }

  &.open div:nth-child(2) {
    opacity: 0;
  }

  &.open div:nth-child(3) {
    transform: rotate(-45deg);
    position: absolute;
    bottom: 0;
  }
`;

const Overlay = styled.div`
  display: ${({ menuOpen }) => (menuOpen ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 1;
`;

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <NavbarContainer>
        <Logo>ResumeAI</Logo>

        <NavLinks menuOpen={menuOpen}>
          <NavLink><a href="#home">Home</a></NavLink>
          <NavLink><a href="#services">Services</a></NavLink>
          <NavLink><a href="#contact">Contact</a></NavLink>
          <NavLink><Link to="/analyzer">Resume Analyzer</Link></NavLink>
          <NavLink><Link to="/login">Login</Link></NavLink>
        </NavLinks>

        <MobileMenu onClick={handleMenuToggle}>
          <MobileMenuIcon className={menuOpen ? "open" : ""}>
            <div></div>
            <div></div>
            <div></div>
          </MobileMenuIcon>
        </MobileMenu>
      </NavbarContainer>

      {/* Overlay to dim background */}
      <Overlay menuOpen={menuOpen} onClick={handleMenuToggle} />
    </>
  );
};

export default Navbar;

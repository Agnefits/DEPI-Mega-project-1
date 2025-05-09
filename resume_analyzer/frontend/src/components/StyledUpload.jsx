import React from "react";
import styled from "styled-components";
import { FiUpload } from "react-icons/fi"; // Import file upload icon

const UploadWrapper = styled.div`
  margin-bottom: 2rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 1rem;
  font-size: 1.2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text || "#ffffff"};
`;

const Input = styled.input`
  display: none; /* Hide the default file input */
`;

const CustomFileButton = styled.button`
  width: 100%;
  padding: 1rem;
  background-color: #1e293b;
  border: 1px solid ${({ theme }) => theme.colors.border || "#334155"};
  border-radius: 8px;
  color: #ffffff;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primaryHover || "#3be4c0"};
    transform: translateY(-4px);
  }

  &:active {
    transform: translateY(0);
  }

  & svg {
    font-size: 1.5rem; /* Icon size */
  }
`;

const StyledUpload = ({ setFile }) => {
  const handleChange = (e) => {
    setFile(e.target.files[0]);
  };

  return (
    <UploadWrapper>
      <Label htmlFor="resume">Upload Resume (PDF, DOC, DOCX)</Label>
      <Input
        type="file"
        id="resume"
        accept=".pdf,.doc,.docx"
        onChange={handleChange}
      />
      <CustomFileButton as="label" htmlFor="resume">
        <FiUpload /> Choose File
      </CustomFileButton>
    </UploadWrapper>
  );
};

export default StyledUpload;

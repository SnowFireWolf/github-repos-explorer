import React from "react";
import styled from "@emotion/styled";



const StyledTextField = styled.input`
  max-width: 520px;
  width: 100%;
  margin: 1rem;
  padding: .75rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 2px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  font-size: 1.2rem;
  outline: none;

  &:hover,
  &:active {
    border-color: var(--primary-color);
  }

  &:focus {
    border-color: #0151ac;
  }
`;



export default function BaseTextField({ ...props }) {
  return (
    <StyledTextField {...props} />
  );
}
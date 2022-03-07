import React from "react";
import styled from "@emotion/styled";



const StyledButton = styled.button`
  display: inline-block;
  padding: .75rem 1.75rem;
  border-radius: 12px;
  background-color: var(--primary-color);
  color: #fff;
  text-decoration: none;
  border: none;
  cursor: pointer;
  transition: background-color 50ms ease-out;
  font-size: 1rem;

  &:hover {
    background-color: #2389ff;
  }

  &:active {
    background-color: #0d65ca;
  }
`;



export default function BaseButton({ ...props }) {
  return (
    <StyledButton {...props} />
  );
}
import React from "react";
import styled from "@emotion/styled";



const StyledCard = styled.div`
  width: 100%;
  max-width: 520px;
  margin-top: 1rem;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  transition: color 0.15s ease, border-color 0.15s ease;
  background-color: #ffffff;
  cursor: pointer;

  &:hover,
  &:focus,
  &:active {
    color: #0070f3;
    border-color: #0070f3;
  }

  h2 {
    margin: 0 0 .7rem 0;
    font-size: 1.5rem;
  }

  p {
    margin: 0;
    min-height: 30px;
    font-size: 1rem;
    line-height: 1.5;
    word-break: break-all;
  }

  .star {
    margin-top: .7rem;
    font-size: 1.25rem;
    line-height: 1.5;
  }

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;



export default function BaseCard({ ...props }) {
  return (
    <StyledCard {...props} />
  );
}
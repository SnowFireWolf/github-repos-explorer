import React from "react";
import styled from "@emotion/styled";
import BaseCard from "./Card";


const StyledSkeleton = styled(BaseCard)`
  background: linear-gradient(
    90deg,
    hsl(210, 15%, 88%),
    hsl(210, 15%, 95%),
    hsl(210, 15%, 88%)
  );
  background-size: 200%;
  animation: loader 1s infinite reverse;
  transform: rotateZ(360deg);

  & h2 {
    width: 50%;
    height: 1.5rem;
  }
  & div {
    height: 2.5rem;
  }
  & p {
    margin-top: 1rem;
    width: 30%;
    height: 1rem;
  }
`;



export default function BaseSkeleton({ ...props }) {
  return (
    <StyledSkeleton {...props} />
  );
}
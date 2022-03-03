import React from "react";
import { useRouter } from "next/router";
import styled from "@emotion/styled";



const StyledLink = styled.a`
  color: var(--primary-color);
  text-decoration: none;

  &:hover {
    color: #2389ff;
    text-decoration: underline;
  }

  &:active {
    color: #0d65ca;
    text-decoration: underline;
  }
`;



export default function BaseLink({ ...props }) {
  const router = useRouter();

  // 前往連結
  const handleLinkClick = (event: React.MouseEvent) => {
    event.preventDefault();

    const href = event.currentTarget.getAttribute('href');

    if (href) {
      router.push(href);
    }
  }

  return (
    <StyledLink
      onClick={handleLinkClick}
      {...props}
    />
  );
}
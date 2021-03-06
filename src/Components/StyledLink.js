import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledLink = styled(Link)`
  text-decoration: none;
  color: hsla(0, 0%, 100%, 0.5);
  &:focus,
  &:hover {
    color: white;
  }
  ,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default (props) => <StyledLink {...props} />;

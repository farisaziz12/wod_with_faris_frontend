import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const StyledDropdownLink = styled(Link)`
  text-decoration: none;
  color: black;
  &:focus,
  &:hover {
    color: grey;
  }
  ,
  &:visited,
  &:link,
  &:active {
    text-decoration: none;
  }
`;

export default (props) => <StyledDropdownLink {...props} />;

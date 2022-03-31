import React from "react";
import styled from "styled-components";
import { ReactComponent as DogsLogo } from "../assets/dogs-footer.svg";

const FooterStyled = styled.footer`
  background-color: #fb1;
  padding: 3rem 1rem 0 1rem;
  height: 10rem;
  text-align: center;
  color: #764701;

  p {
    margin-top: 1rem;
  }
`;

const Footer = () => {
  return (
    <FooterStyled>
      <DogsLogo />
      <p>Texto de Footer comum.</p>
    </FooterStyled>
  );
};

export default Footer;

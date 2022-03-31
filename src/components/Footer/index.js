import React from "react";

import { ReactComponent as DogsLogo } from "../../assets/dogs-footer.svg";
import { FooterStyled } from "./styles";

const Footer = () => {
  return (
    <FooterStyled>
      <DogsLogo />
      <p>Texto de Footer comum.</p>
    </FooterStyled>
  );
};

export default Footer;

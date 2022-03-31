import React from "react";
import { useSelector } from "react-redux";

import { ReactComponent as Dogs } from "../../assets/dogs.svg";
import { HeaderContainer, NavLinkLogin, NavLinkLogo } from "./styles";

const Header = () => {
  const { data } = useSelector((state) => state.user);

  const navUser = data ? (
    <NavLinkLogin to="/conta">{data.nome}</NavLinkLogin>
  ) : (
    <NavLinkLogin to="/login">Login / Criar</NavLinkLogin>
  );

  return (
    <HeaderContainer className="container">
      <nav>
        <NavLinkLogo to="/" aria-label="Dogs - Home">
          <Dogs />
        </NavLinkLogo>
        {navUser}
      </nav>
    </HeaderContainer>
  );
};

export default Header;

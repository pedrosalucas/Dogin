import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Dogs } from "../Assets/dogs.svg";
import UsuarioSVG from "../Assets/usuario.svg";

const HeaderContainer = styled.header`
  box-shadow: 0px 1px 1px rgba(0, 0, 0, 0.15);
  position: fixed;
  width: 100%;
  z-index: 100;
  background: #fff;
  top: 0;

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 4rem;
  }
`;

const NavLinkLogo = styled(NavLink)`
  padding: 0.5rem 0;
  width: max(3vw, 40px);
`;

const NavLinkLogin = styled(NavLink)`
  color: #333;
  display: flex;
  align-items: baseline;

  &:after {
    content: "";
    display: block;
    width: 14px;
    height: 17px;
    background: url(${UsuarioSVG}) no-repeat center center;
    margin: 0.5rem;
  }
`;

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

import styled from "styled-components";
import { NavLink } from "react-router-dom";

import UsuarioSVG from "../../assets/usuario.svg";

export const HeaderContainer = styled.header`
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

export const NavLinkLogo = styled(NavLink)`
  padding: 0.5rem 0;
  width: max(3vw, 40px);
`;

export const NavLinkLogin = styled(NavLink)`
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

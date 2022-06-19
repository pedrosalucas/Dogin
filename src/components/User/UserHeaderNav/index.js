import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { userLogout } from "../../../providers/user";
import useMedia from "../../../hooks/useMedia";

import { ReactComponent as MinhasFotos } from "../../../assets/feed.svg";
import { ReactComponent as Estatisticas } from "../../../assets/estatisticas.svg";
import { ReactComponent as AdicionarFoto } from "../../../assets/adicionar.svg";
import { ReactComponent as Sair } from "../../../assets/sair.svg";
import { MobileButton, NavUser } from "./styles";

const UserHeaderNav = () => {
  const dispatch = useDispatch();

  const mobile = useMedia("max-width: 40rem");
  const [mobileMenu, setMobileMenu] = React.useState(false);
  const { pathname } = useLocation();

  const mobileMenuElement = mobile ? (
    <MobileButton
      aria-label="Menu"
      className={mobileMenu ? "mobileButtonActive" : ""}
      onClick={() => setMobileMenu(!mobileMenu)}
    ></MobileButton>
  ) : null;

  React.useEffect(() => {
    setMobileMenu(false);
  }, [pathname]);

  return (
    <>
      {mobileMenuElement}
      <NavUser
        className={`
          ${mobile ? "navMobile" : "navDesktop"} 
          ${mobileMenu ? "navMobileActive" : ""}
        `}
      >
        <NavLink to="/conta" end activeClassName="activeNavUser">
          <MinhasFotos />
          {mobile && "Minhas Fotos"}
        </NavLink>
        <NavLink to="/conta/estatisticas" activeClassName="activeNavUser">
          <Estatisticas />
          {mobile && "Estatíscitcas"}
        </NavLink>
        <NavLink to="/conta/postar" activeClassName="activeNavUser">
          <AdicionarFoto />
          {mobile && "Adicionar Foto"}
        </NavLink>
        <button onClick={() => dispatch(userLogout())}>
          <Sair />
          {mobile && "Sair"}
        </button>
      </NavUser>
    </>
  );
};

export default UserHeaderNav;

import React from "react";
import { useLocation } from "react-router-dom";
import UserHeaderNav from "../UserHeaderNav";

import { UserHeaderStyled } from "./styles";



const UserHeader = () => {
  const [title, setTitle] = React.useState("");
  const location = useLocation();

  React.useEffect(() => {
    switch (location.pathname) {
      case "/conta/estatisticas":
        setTitle("Estatísticas");
        break;
      case "/conta/postar":
        setTitle("Poste Sua Foto");
        break;
      default:
        setTitle("Minha Conta");
    }
  }, [location]);

  return (
    <UserHeaderStyled>
      <h1 className="title">{title}</h1>
      <UserHeaderNav />
    </UserHeaderStyled>
  );
};

export default UserHeader;

import styled from "styled-components";
import { Link } from "react-router-dom";

export const FormStyled = styled.form`
  margin-bottom: 2rem;
`;

export const LinkPerdeuSenha = styled(Link)`
  display: inline-block;
  color: #666;
  padding: 0.5rem 0;
  line-height: 1;

  &:after {
    content: "";
    height: 2px;
    width: 100%;
    background-color: currentColor;
    display: block;
  }
`;

export const DivCadastreSe = styled.div`
  margin: 4rem 0;

  h2 {
    font-family: var(--type-secundary);

    &:after {
      content: "";
      display: block;
      background-color: #ddd;
      height: 0.5rem;
      width: 3rem;
      border-radius: 0.2rem;
    }
  }

  p {
    margin: 2rem 0;
  }
`;

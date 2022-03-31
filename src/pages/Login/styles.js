import styled from "styled-components";
import LoginImg from "../../assets/login.jpg";

export const LoginSection = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  min-height: 100vh;
  gap: 2rem;

  &:before {
    display: block;
    content: "";
    background: url(${LoginImg}) no-repeat center center;
    background-size: cover;
  }

  div.formDiv {
    max-width: 30rem;
    padding: 1rem;
    margin-top: 20vh;
  }

  @media (max-width: 610px) {
    grid-template-columns: 1fr;

    &:before {
      display: none;
    }

    div.formDiv {
      max-width: 100%;
    }
  }
`;
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import LoginCreate from "./LoginCreate";
import LoginForm from "./LoginForm";
import LoginPasswordLost from "./LoginPasswordLost";
import LoginPasswordReset from "./LoginPasswordReset";
import LoginImg from "../../assets/login.jpg";
import NotFound from "../NotFound";
import { useSelector } from "react-redux";
import Loading from "../Helper/Loading";

const LoginSection = styled.section`
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

const Login = () => {
  const { data, loading } = useSelector((state) => state.user);

  if (loading) return <Loading />;

  if (data) return <Navigate to="/conta" />;

  return (
    <LoginSection>
      <div className="formDiv">
        <Routes>
          <Route path="/" element={<LoginForm />} />
          <Route path="criar" element={<LoginCreate />} />
          <Route path="perdeu" element={<LoginPasswordLost />} />
          <Route path="resetar" element={<LoginPasswordReset />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </LoginSection>
  );
};

export default Login;

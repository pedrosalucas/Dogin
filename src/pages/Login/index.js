import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import NotFound from "../NotFound";
import LoginCreate from "../../components/Login/LoginCreate";
import LoginForm from "../../components/Login/LoginForm";
import LoginPasswordLost from "../../components/Login/LoginPasswordLost";
import LoginPasswordReset from "../../components/Login/LoginPasswordReset";
import Loading from "../../components/Helper/Loading";

import { LoginSection } from "./styles";

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

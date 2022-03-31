import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Button from "../Forms/Button";
import Input from "../Forms/Input";
import Error from "../Helper/Error";
import userForm from "../../hooks/useForm";
import Head from "../Helper/Head";
import { useDispatch, useSelector } from "react-redux";
import { userLogin } from "../../providers/user";

const FormStyled = styled.form`
  margin-bottom: 2rem;
`;

const LinkPerdeuSenha = styled(Link)`
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

const DivCadastreSe = styled.div`
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

const LoginForm = () => {
  const username = userForm();
  const password = userForm();

  const dispatch = useDispatch();
  const { token, user } = useSelector((state) => state);
  const loading = token.loading || user.loading;
  const error = token.error || user.error;

  async function handleLogin(event) {
    event.preventDefault();

    if (username.validate() && password.validate()) {
      dispatch(
        userLogin({ username: username.value, password: password.value })
      );
    }
  }

  return (
    <section className="animeLeft">
      <Head title="Login" />
      <h1 className="title">Login</h1>

      <FormStyled onSubmit={handleLogin}>
        <Input label="Usuário" type="text" id="username" {...username} />
        <Input label="Senha" type="password" id="password" {...password} />
        {loading ? <Button disabled>Entrar</Button> : <Button>Entrar</Button>}
        <Error error={error && "Dados Incorretos."} />
      </FormStyled>

      <LinkPerdeuSenha to="/login/perdeu">Perdeu a Senha?</LinkPerdeuSenha>

      <DivCadastreSe>
        <h2>Cadastre-se</h2>
        <p>Ainda não possui conta? Cadastre-se no site.</p>
        <Link className="btn" to="/login/criar">
          Cadastro
        </Link>
      </DivCadastreSe>
    </section>
  );
};

export default LoginForm;

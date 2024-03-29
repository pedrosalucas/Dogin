import React from "react";
import { useDispatch } from "react-redux";
import useForm from "../../../hooks/useForm";
import useFetch from "../../../hooks/useFetch";
import { userLogin } from "../../../providers/user";
import { USER_POST } from "../../../api/api";

import Button from "../../Forms/Button";
import Input from "../../Forms/Input";
import Error from "../../Helper/Error";
import Head from "../../Helper/Head";

const LoginCreate = () => {
  const username = useForm();
  const password = useForm();
  const email = useForm("email");

  const dispatch = useDispatch();
  const { loading, error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const { url, options } = USER_POST({
      username: username.value,
      email: email.value,
      password: password.value,
    });

    const { response } = await request(url, options);
    if (response.ok) {
      dispatch(
        userLogin({ username: username.value, password: password.value })
      );
    }
  }
  return (
    <section className="animeLeft">
      <Head title="Crie sua Conta." />
      <h1 className="title">Cadastre-se</h1>
      <form onSubmit={handleSubmit}>
        <Input type="text" label="Usuário" id="username" {...username} />
        <Input type="email" label="Email" id="email" {...email} />
        <Input type="password" label="Senha" id="password" {...password} />
        {loading ? (
          <Button disabled>Cadastrando...</Button>
        ) : (
          <Button>Cadastrar</Button>
        )}
        <Error error={error} />
      </form>
    </section>
  );
};

export default LoginCreate;

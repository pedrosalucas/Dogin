import React from 'react';
import useForm from '../../hooks/useForm';
import Button from '../Forms/Button';
import Input from '../Forms/Input';
import { PASSWORD_RESET } from '../../api/api';
import useFetch from '../../hooks/useFetch';
import Error from '../Helper/Error';
import { useNavigate } from 'react-router-dom';
import Head from '../Helper/Head';

const LoginPasswordReset = () => {
    const [login, setLogin] = React.useState('');
    const [key, setKey] = React.useState('');
    const password = useForm();
    const { data, error, loading, request } = useFetch();
    const navigate = useNavigate() ;

    React.useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const key = params.get('key');
        const login = params.get('login');
        if( key ) {
            setKey(key);
        }
        if( login ) {
            setLogin(login);
        }

    }, []);

    async function handleSubmit(event) {
        event.preventDefault();
        if( password.validate() ) {
            const { url, options } = PASSWORD_RESET({ login, key, password: password.value });
            const { response, json } = await request(url, options);
            if( response.ok ) {
                navigate('/login');
            }        
        }
    }

    return (
        <section className="animeLeft">
            <Head title="Restaurar Senha"/ >
            <h1 className="title">Resete a Senha</h1>
            <form onSubmit={handleSubmit}>
                <Input type="password" label="Nova Senha" id="password" {...password} />
                {loading ? (
                    <Button disabled>Resetando...</Button>
                ) : (
                    <Button>Resetar</Button>
                )}
            </form>
            <Error error={error} />
        </section>
    );
};

export default LoginPasswordReset;

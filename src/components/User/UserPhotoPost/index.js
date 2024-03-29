import React from 'react';
import useForm from '../../../hooks/useForm';
import useFetch from '../../../hooks/useFetch';
import Error from '../../Helper/Error';
import Input from '../../Forms/Input';
import Button from '../../Forms/Button';
import { PHOTO_POST } from '../../../api/api';
import { useNavigate } from 'react-router-dom';
import Head from '../../Helper/Head';
import { SectionPostPhoto } from './styles';


const UserPhotoPost = () => {
    const nome = useForm();
    const peso = useForm('number');
    const idade = useForm('number');
    const [img, setImg] = React.useState({});
    const { data, error, loading, request } = useFetch();
    const navigate = useNavigate();

    React.useEffect(() => {
        if( data ) {
            navigate('/conta');
        }
    }, [data, navigate])

    function handleSubmit(event) {
        event.preventDefault();
        const formData = new FormData();
        formData.append('nome', nome.value);
        formData.append('peso', peso.value);
        formData.append('idade', idade.value);
        formData.append('img', img.raw);

        const token = window.localStorage.getItem('token');
        const{ url, options } = PHOTO_POST( formData, token );
        request( url, options );
    }

    function handleImgChange({ target }) {
        setImg({
            preview: URL.createObjectURL(target.files[0]),
            raw: target.files[0],
        });
    }

    return (
        <SectionPostPhoto className="animeLeft">
            <Head title="Poste sua Foto." />
            <form onSubmit={handleSubmit}>
                <Input type="text" label="Nome" id="nome" {...nome} />
                <Input type="number" label="Peso" id="peso" {...peso} />
                <Input type="number" label="Idade" id="idade" {...idade} />
                <input type="file" name="imag" id="img" onChange={handleImgChange} />
                {loading ? ( <Button disabled>Enviando...</Button> ) : ( <Button>Enviar</Button> )}
                <Error error={error} />
            </form>
            <div>
                {img.preview &&
                    <div
                        className="previewImg" 
                        style={{ backgroundImage: `url(${img.preview})` }}
                    >
                    </div>
                }
            </div>
        </SectionPostPhoto>
    );
};

export default UserPhotoPost;
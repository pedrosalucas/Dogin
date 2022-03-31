import React from 'react';
import styled from 'styled-components';
import { POHOT_DELETE } from '../../api/api';
import useFetch from '../../hooks/useFetch';

const ButtonDeletePhoto = styled.button`
    background-color: #ddd;
    padding: .3rem .6rem;
    line-height: 1;
    border: 1px solid transparent;
    font-size: .875rem;
    font-family: var(--type-princial);
    cursor: pointer;
    border-radius: .4rem;
    transition: .1s;

    &:focus, &:hover {
        outline: none;
        background-color: #fff;
        box-shadow: 0 0 0 3px #eee;
        border-color: #333;
    }
`;

const PhotoDelete = ({ id }) => {
    const { loading, request } = useFetch();

    async function handleClick() {
        const confirm = window.confirm('Deseja deletar essa foto?');
        if( confirm ) {
            const token = window.localStorage.getItem('token');
            const { url, options } = POHOT_DELETE(id, token);
            const { response } = await request(url, options);
            if( response.ok ) {
                window.location.reload();
            }
        }
    }

    return (
        <div>
            {loading ? (
                <ButtonDeletePhoto disabled>Deletar</ButtonDeletePhoto>
            ) : (
                <ButtonDeletePhoto onClick={handleClick}>Deletar</ButtonDeletePhoto>
            )}
        </div>
    );
};

export default PhotoDelete;

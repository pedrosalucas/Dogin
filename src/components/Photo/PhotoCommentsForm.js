import React from 'react';
import Error from '../Helper/Error';
import { COMMENT_POST } from '../../api/api';
import { ReactComponent as EnviarSvg } from '../../assets/enviar.svg';
import useFetch from '../../hooks/useFetch';
import styled, { keyframes } from 'styled-components';

const latir = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const FormComment = styled.form`
    display: grid;
    grid-template-columns: 1fr auto;
    align-items: stretch;
    margin: 1rem;

    &.single {
        margin: 0 2px 1rem;
    }

    textarea {
        display: block;
        width: 100%;
        font-size: 1rem;
        font-family: var(--type-princial);
        resize: none;
        border: 1px solid #eee;
        border-radius: .2rem;
        background-color: #eee;
        padding: .5rem;
        transition: .2s;
    }

    textarea:hover, textarea:focus {
        outline: none;
        border-color: #fb1;
        background-color: #fff;
        box-shadow: 0 0 0 3px #fea;
    }

    button {
        border: none;
        cursor: pointer;
        color: #333;
        background-color: transparent;
        font-size: 1rem;
        padding: 0 1rem;
        overflow: hidden;
        outline: none !important;
    }

    button:focus svg path, button:hover svg path {
        fill: #fea;
        stroke: #fb1;
    }

    button:focus svg g, button:hover svg g {
        animation: ${latir} .6s infinite;
    }
`;

const PhotoCommentsForm = ({ single, id, setComments }) => {
    const [comment, setComment] = React.useState('');
    const { error, request } = useFetch();

    async function handleSubmit(event) {
        event.preventDefault();
        const token = window.localStorage.getItem('token');
        const { url, options } = COMMENT_POST(id, {comment}, token); 
        const { response, json } = await request(url, options);
        if( response.ok ) {
            setComment('');
            setComments((comments) => [...comments, json]);
        }
    }

    return (
        <FormComment onSubmit={handleSubmit} className={single ? 'single' : ''}>
            <textarea 
                id="comment"
                name="comment"
                placeholder="Comente..."
                value={comment}
                onChange={({ target }) => setComment(target.value)}
            />
            <button><EnviarSvg /></button>
            <Error error={error} />
        </FormComment>
    );
};

export default PhotoCommentsForm;

import React from 'react';
import styled from 'styled-components';

const InputWrapper = styled.div`
    margin-bottom: 1rem;

    input {
        border: 1px solid #eee;
        display: block;
        width: 100%;
        padding: 8px;
        font-size: 1rem;
        border-radius: .4rem;
        background-color: #eee;
        transition: .2s;

        &:focus, &:hover {
            outline: none;
            background-color: #fff;
            border-color: #fb1;
            box-shadow: 0 0 0 3px #fea;
        }  
    }

    label {
        display: block;
        font-size: 1rem;
        line-height: 1;
        padding-bottom: .5rem;
    }

    p {
        color: #f31;
        font-size: .875rem;
        margin-top: .25rem;
    }
`;

const Input = ({ label, type, id, value, onChange, error, onBlur }) => {
    const messageError = error ? ( <p>{error}</p> ) : null;

    return (
        <InputWrapper>
            <label htmlFor={id} >{label}</label>
            <input type={type} id={id} name={id} value={value} onChange={onChange} onBlur={onBlur} />
            {messageError}
        </InputWrapper>
    );
};

export default Input;

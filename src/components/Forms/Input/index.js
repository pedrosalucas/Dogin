import React from "react";

import { InputWrapper } from "./styles";

const Input = ({ label, type, id, value, onChange, error, onBlur }) => {
  const messageError = error ? <p>{error}</p> : null;

  return (
    <InputWrapper data-testid={`${id}Container`}>
      <label htmlFor={id}>{label}</label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
      />
      {messageError}
    </InputWrapper>
  );
};

export default Input;

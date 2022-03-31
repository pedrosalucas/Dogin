import styled from "styled-components";

export const InputWrapper = styled.div`
  margin-bottom: 1rem;

  input {
    border: 1px solid #eee;
    display: block;
    width: 100%;
    padding: 8px;
    font-size: 1rem;
    border-radius: 0.4rem;
    background-color: #eee;
    transition: 0.2s;

    &:focus,
    &:hover {
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
    padding-bottom: 0.5rem;
  }

  p {
    color: #f31;
    font-size: 0.875rem;
    margin-top: 0.25rem;
  }
`;

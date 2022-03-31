import styled, { keyframes } from "styled-components";

const latir = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const FormComment = styled.form`
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
    border-radius: 0.2rem;
    background-color: #eee;
    padding: 0.5rem;
    transition: 0.2s;
  }

  textarea:hover,
  textarea:focus {
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

  button:focus svg path,
  button:hover svg path {
    fill: #fea;
    stroke: #fb1;
  }

  button:focus svg g,
  button:hover svg g {
    animation: ${latir} 0.6s infinite;
  }
`;

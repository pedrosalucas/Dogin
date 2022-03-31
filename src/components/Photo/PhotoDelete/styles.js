import styled from "styled-components";

export const ButtonDeletePhoto = styled.button`
  background-color: #ddd;
  padding: 0.3rem 0.6rem;
  line-height: 1;
  border: 1px solid transparent;
  font-size: 0.875rem;
  font-family: var(--type-princial);
  cursor: pointer;
  border-radius: 0.4rem;
  transition: 0.1s;

  &:focus,
  &:hover {
    outline: none;
    background-color: #fff;
    box-shadow: 0 0 0 3px #eee;
    border-color: #333;
  }
`;

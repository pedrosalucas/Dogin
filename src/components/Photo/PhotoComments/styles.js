import styled from "styled-components";

export const CommentList = styled.ul`
  overflow-y: auto;
  word-break: break-word;
  padding: 0 2rem;

  &.single {
    padding: 0 0 2rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
`;

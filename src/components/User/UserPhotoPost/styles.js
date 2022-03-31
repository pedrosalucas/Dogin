import styled from "styled-components";

export const SectionPostPhoto = styled.section`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 2rem;
  margin-bottom: 2rem;

  #img {
    margin-bottom: 1rem;
  }

  .previewImg {
    border-radius: 1rem;
    background-size: cover;
    background-position: center center;
  }

  .previewImg::after {
    content: "";
    display: block;
    height: 0;
    padding-bottom: 100%;
  }

  @media (max-width: 40rem) {
    grid-template-columns: 1fr;
  }
`;

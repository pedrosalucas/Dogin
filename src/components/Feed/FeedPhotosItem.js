import React from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import VisualizacaoImg from "../../assets/visualizacao.svg";
import { getPhoto } from "../../providers/photo";
import { openModal } from "../../providers/modal";
import Image from "../Helper/Image";

const PhotoItem = styled.li`
  display: grid;
  border-radius: 0.2rem;
  overflow: hidden;
  cursor: pointer;

  .imgElement {
    grid-area: 1/1;
  }

  .visualizacao {
    grid-area: 1/1;
    background-color: rgba(0, 0, 0, 0.3);
    color: #fff;
    font-size: 1rem;
    text-align: center;
    display: none;
    align-items: center;
    justify-content: center;
  }

  .visualizacao::before {
    width: 16px;
    height: 10px;
    content: "";
    display: inline-block;
    margin-right: 0.25rem;
    background: url(${VisualizacaoImg}) no-repeat;
  }

  &:hover .visualizacao {
    display: flex;
  }

  &:nth-child(2) {
    grid-column: 2 / 4;
    grid-row: span 2;
  }

  @media (max-width: 40rem) {
    &:nth-child(2) {
      grid-column: initial;
      grid-row: initial;
    }
  }
`;

const FeedPhotosItem = ({ photo }) => {
  const dispatch = useDispatch();
  const {} = useSelector((state) => state);

  function handleClick() {
    dispatch(openModal());
    dispatch(getPhoto(photo.id));
  }

  return (
    <PhotoItem onClick={handleClick}>
      <Image classWrapper="imgElement" src={photo.src} alt={photo.title} />
      <span className="visualizacao">{photo.acessos}</span>
    </PhotoItem>
  );
};

export default FeedPhotosItem;

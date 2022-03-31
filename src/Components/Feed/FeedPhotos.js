import React from "react";
import FeedPhotosItem from "./FeedPhotosItem";
import useFetch from "../../Hooks/useFetch";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import { PHOTOS_GET } from "../../api";
import styled from "styled-components";
import { useSelector } from "react-redux";

const PhotosList = styled.ul`
  max-width: 1200px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;
  margin-bottom: 1rem;
  justify-items: center;

  @media (max-width: 40rem) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FeedPhotos = () => {
  const { list } = useSelector((state) => state.feed);

  return (
    <PhotosList className="animeLeft">
      {list.map((photo) => (
        <FeedPhotosItem
          key={photo.id}
          photo={photo}
        />
      ))}
    </PhotosList>
  );
};

export default FeedPhotos;

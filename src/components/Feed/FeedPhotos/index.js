import React from "react";
import { useSelector } from "react-redux";

import FeedPhotosItem from "../FeedPhotosItem";

import { PhotosList } from "./styles";

const FeedPhotos = () => {
  const { list } = useSelector((state) => state.feed);

  return (
    <PhotosList className="animeLeft">
      {list.map((photo) => (
        <FeedPhotosItem key={photo.id} photo={photo} />
      ))}
    </PhotosList>
  );
};

export default FeedPhotos;

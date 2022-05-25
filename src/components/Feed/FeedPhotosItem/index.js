import React from "react";
import { useDispatch } from "react-redux";
import { getPhoto } from "../../../providers/photo";
import { openModal } from "../../../providers/modal";

import Image from "../../Helper/Image";
import { PhotoItem } from "./styles";

const FeedPhotosItem = ({ photo }) => {
  const dispatch = useDispatch();

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

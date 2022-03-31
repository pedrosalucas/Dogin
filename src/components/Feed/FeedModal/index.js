import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../../providers/modal";

import Error from "../../Helper/Error";
import Loading from "../../Helper/Loading";
import PhotoContent from "../../Photo/PhotoContent";

import { ModalPost } from "./styles";

const FeedModal = () => {
  const { modal, photo } = useSelector((state) => state);
  const { data, error, loading } = photo;
  const dispatch = useDispatch();

  function handleOutSideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }

  useEffect(() => {
    dispatch(closeModal());
  }, [dispatch]);

  if (!modal.isOpen) return null;

  return (
    <ModalPost onClick={handleOutSideClick}>
      {data && <PhotoContent data={data} />}

      {loading && <Loading />}
      {error && <Error error={error} />}
    </ModalPost>
  );
};

export default FeedModal;

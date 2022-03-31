import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { closeModal } from "../../Store/modal";
import Error from "../Helper/Error";
import Loading from "../Helper/Loading";
import PhotoContent from "../Photo/PhotoContent";

const ModalPost = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  z-index: 1000;
  padding: 2rem calc(4rem + 15px) 2rem 4rem;

  @media (max-width: 40rem) {
    padding: 2rem calc(2rem + 15px) 2rem 2rem;
  }
`;

const FeedModal = () => {
  const { modal, photo } = useSelector((state) => state);
  const { data, error, loading } = photo;
  const dispatch = useDispatch();

  function handleOutSideClick(event) {
    if (event.target === event.currentTarget) dispatch(closeModal());
  }

  useEffect(() => {
    dispatch(closeModal())
  }, [dispatch])

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

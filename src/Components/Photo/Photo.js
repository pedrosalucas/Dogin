import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPhoto } from "../../Store/photo";
import Error from "../Helper/Error";
import Head from "../Helper/Head";
import Loading from "../Helper/Loading";
import PhotoContent from "./PhotoContent";

const Photo = () => {
  const { id } = useParams();
  const { data, error, loading } = useSelector((state) => state.photo);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getPhoto(id));
  }, [dispatch, id]);

  if (error) {
    return <Error error={error} />;
  } else if (loading) {
    return <Loading />;
  } else if (data) {
    return (
      <section className="container mainContainer">
        <Head title={data.photo.title} />
        <PhotoContent data={data} single={true} />
      </section>
    );
  } else {
    return null;
  }
};

export default Photo;

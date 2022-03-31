import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

import PhotoComments from "../PhotoComments";
import PhotoDelete from "../PhotoDelete";
import Image from "../../Helper/Image";

import { DivContent } from "./styles";

const PhotoContent = ({ data, single }) => {
  const { user } = useSelector((state) => state);
  const { photo, comments } = data;

  return (
    <DivContent className={single ? "single" : ""}>
      <div className="img">
        <Image src={photo.src} alt={photo.title} />
      </div>
      <div className="detalhes">
        <div>
          <div>
            <p className="autor">
              {user.data && user.data.username === photo.author ? (
                <PhotoDelete id={photo.id} />
              ) : (
                <Link to={`/perfil/${photo.author}`}>@{photo.author}</Link>
              )}
              <span className="visualizacoes">{photo.acessos}</span>
            </p>
            <h1 className="title">
              <Link to={`/foto/${photo.id}`}>{photo.title}</Link>
            </h1>
            <ul className="atributos">
              <li>{photo.peso} kg</li>
              <li>{photo.idade} anos</li>
            </ul>
          </div>
        </div>
      </div>
      <PhotoComments single={single} id={photo.id} comments={comments} />
    </DivContent>
  );
};

export default PhotoContent;

import React from "react";
import { POHOT_DELETE } from "../../../api/api";
import useFetch from "../../../hooks/useFetch";

import { ButtonDeletePhoto } from "./styles";

const PhotoDelete = ({ id }) => {
  const { loading, request } = useFetch();

  async function handleClick() {
    const confirm = window.confirm("Deseja deletar essa foto?");
    if (confirm) {
      const token = window.localStorage.getItem("token");
      const { url, options } = POHOT_DELETE(id, token);
      const { response } = await request(url, options);
      if (response.ok) {
        window.location.reload();
      }
    }
  }

  return (
    <div>
      {loading ? (
        <ButtonDeletePhoto disabled>Deletar</ButtonDeletePhoto>
      ) : (
        <ButtonDeletePhoto onClick={handleClick}>Deletar</ButtonDeletePhoto>
      )}
    </div>
  );
};

export default PhotoDelete;

import React from "react";
import Error from "../../Helper/Error";
import { COMMENT_POST } from "../../../api/api";
import useFetch from "../../../hooks/useFetch";

import { ReactComponent as EnviarSvg } from "../../../assets/enviar.svg";
import { FormComment } from "./styles";

const PhotoCommentsForm = ({ single, id, setComments }) => {
  const [comment, setComment] = React.useState("");
  const { error, request } = useFetch();

  async function handleSubmit(event) {
    event.preventDefault();
    const token = window.localStorage.getItem("token");
    const { url, options } = COMMENT_POST(id, { comment }, token);
    const { response, json } = await request(url, options);
    if (response.ok) {
      setComment("");
      setComments((comments) => [...comments, json]);
    }
  }

  return (
    <FormComment onSubmit={handleSubmit} className={single ? "single" : ""}>
      <textarea
        id="comment"
        name="comment"
        placeholder="Comente..."
        value={comment}
        onChange={({ target }) => setComment(target.value)}
      />
      <button>
        <EnviarSvg />
      </button>
      <Error error={error} />
    </FormComment>
  );
};

export default PhotoCommentsForm;

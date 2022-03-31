import React from "react";
import { useSelector } from "react-redux";
import PhotoCommentsForm from "../PhotoCommentsForm";

import { CommentList } from "./styles";

const PhotoComments = (props) => {
  const [comments, setComments] = React.useState(() => props.comments);
  const commentsSection = React.useRef(null);
  const { user } = useSelector((state) => state);

  React.useEffect(() => {
    commentsSection.current.scrollTop = commentsSection.current.scrollHeight;
  }, [comments]);

  return (
    <>
      <CommentList
        ref={commentsSection}
        className={props.single ? "single" : ""}
      >
        {comments.map((item) => (
          <li key={item.comment_ID}>
            <b>{item.comment_author}: </b>
            <span>{item.comment_content}</span>
          </li>
        ))}
      </CommentList>
      {user && (
        <PhotoCommentsForm
          single={props.single}
          id={props.id}
          setComments={setComments}
        />
      )}
    </>
  );
};

export default PhotoComments;

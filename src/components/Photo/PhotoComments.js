import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import PhotoCommentsForm from "./PhotoCommentsForm";

const CommentList = styled.ul`
  overflow-y: auto;
  word-break: break-word;
  padding: 0 2rem;

  &.single {
    padding: 0 0 2rem;
  }

  li {
    margin-bottom: 0.5rem;
    line-height: 1.2;
  }
`;

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

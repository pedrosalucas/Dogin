import React, { useEffect } from "react";
import FeedModal from "./FeedModal";
import FeedPhotos from "./FeedPhotos";
import propTypes from "prop-types";
import { useDispatch, useSelector } from "react-redux";
import { loadNewPhotos, resetFeedState } from "../../providers/feed";
import Loading from "../Helper/Loading";
import Error from "../Helper/Error";

const Feed = ({ user }) => {
  const dispatch = useDispatch();
  const { list, loading, hasContent, error } = useSelector(
    (state) => state.feed
  );

  useEffect(() => {
    dispatch(resetFeedState());
    dispatch(loadNewPhotos({ total: 6, user }));
  }, [dispatch, user]);

  React.useEffect(() => {
    let wait = false;
    function ifiniteScroll() {
      if (hasContent) {
        const scroll = window.scrollY;
        const height = document.body.offsetHeight - window.innerHeight;
        if (scroll > height * 0.75 && !wait) {
          dispatch(loadNewPhotos({ total: 6, user }));
          wait = true;
          setTimeout(() => {
            wait = false;
          }, 2000);
        }
      }
    }

    window.addEventListener("wheel", ifiniteScroll);
    window.addEventListener("scroll", ifiniteScroll);
    return () => {
      window.removeEventListener("wheel", ifiniteScroll);
      window.removeEventListener("scroll", ifiniteScroll);
    };
  }, [hasContent, user, dispatch]);

  return (
    <div
      style={{ display: "flex", flexDirection: "column", alignItems: "center" }}
    >
      <FeedModal />

      {list.length !== 0 && <FeedPhotos />}

      {loading && <Loading />}
      {error && <Error error={error} />}
    </div>
  );
};

Feed.defaultProps = {
  user: 0,
};

Feed.propTypes = {
  user: propTypes.oneOfType([
    propTypes.string.isRequired,
    propTypes.number.isRequired,
  ]),
};

export default Feed;

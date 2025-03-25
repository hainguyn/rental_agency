import React, { memo, useEffect, useState } from "react";
import { TinyItem } from "./index";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../store/actions";
const RelatedPost = ({ newPost }) => {
  const dispatch = useDispatch();
  const { newPosts, outStandingPost } = useSelector((state) => state.post);
  const [posts, setPosts] = useState(newPost ? newPosts : outStandingPost);

  useEffect(() => {
    newPost
      ? dispatch(actions.getNewPosts())
      : dispatch(actions.getOutStandingPosts());
  }, []);

  useEffect(() => {
    setPosts(newPost ? newPosts : outStandingPost);
  }, [newPosts, outStandingPost]);

  return (
    <div className="p-4 bg-stone-100 rounded-lg shadow w-full">
      <h3 className="font-semibold text-xl mb-4">
        {newPost ? " Tin mới đăng" : "Tin nổi bật"}
      </h3>
      <div className="w-full flex flex-col gap-4">
        {posts?.map((item) => {
          return (
            <TinyItem
              key={item.id}
              image={JSON.parse(item.images.image)}
              title={item.title}
              price={item?.attributes?.price}
              createdAt={item?.createdAt}
              id={item.id}
              star={+item?.star}
            />
          );
        })}
      </div>
    </div>
  );
};

export default memo(RelatedPost);

import React from "react";
import { useDispatch } from "react-redux";
import { CreatePost } from "../containers/System";
import * as actions from "../store/actions";

const UpdatePost = ({ setIsEdit }) => {
  const dispatch = useDispatch();
  const handleClose = (e) => {
    e.stopPropagation();
    setIsEdit(false);
    dispatch(actions.resetDataEdit());
  };
  return (
    <div
      className=" flex justify-center absolute top-0 left-0 right-0 bottom-0 bg-overlay-70"
      onClick={handleClose}
    >
      <div
        className=" bg-white w-full max-w-[1100px] mx-auto p-4 overflow-y-auto"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <CreatePost isEdit />
      </div>
    </div>
  );
};

export default UpdatePost;

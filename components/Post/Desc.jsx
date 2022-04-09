import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastLoading, ToastSuccess } from "../Toasts";
import { Router } from "next/router";
import moment from "moment";
import { AiFillHeart, AiOutlineEye, AiOutlineHeart } from "react-icons/ai";
import { nFormatter } from "../../utils/nFormater";
import { useSession } from "next-auth/react";

const Desc = ({ posts }) => {
  const { data: session } = useSession();
  let date = new Date(posts.createdAt);
  const [likes, setLikes] = React.useState({
    state: false,
    loading: false,
    count: posts.likes,
  });
  React.useEffect(() => {
    if (posts.likesBy.find((item) => item.userId === session?.userId)) {
      setLikes({ ...likes, state: true });
    }
  }, [session]);
  const handleDelete = async () => {
    const res = await axios({
      method: "delete",
      url: `/api/post/${posts.id}`,
      onUploadProgress: () => {
        ToastLoading("Deleting...", 0, { id: "Deleting" });
      },
      data: { hash: posts.file.deletehash },
    });
    if (res.status) {
      ToastSuccess("Post Deleted!", { id: "Deleting" });
      Router.push("/");
    }
  };
  return (
    <div className='w-full relative'>
      <div className='relative border rounded-2xl py-8 px-10 shrink-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className='flex flex-col gap-5'>
          {/* <hr className='w-full bg-black dark:bg-white opacity-20 h-[2px] rounded' /> */}
          <div className='relative w-full'>
            <h1 className='text-lg dark:text-white font-semibold mb-3'>
              {posts.title}
            </h1>
            <p className='text-sm font-light dark:text-white'>
              {posts.description}
            </p>
          </div>
          <hr className='w-full bg-black dark:bg-white opacity-20 h-[2px] rounded' />
          <div className='flex gap-2 justify-between items-center'>
            <span className='text-xs text-gray-400'>
              Uploaded {moment(date).fromNow()}
            </span>
            <div>
              <span className='text-sm text-gray-400 flex items-center gap-1'>
                <AiOutlineEye />
                {nFormatter(posts.views, 0)}
                {likes.state ? (
                  <AiFillHeart className='ml-1' />
                ) : (
                  <AiOutlineHeart className='ml-1' />
                )}
                {nFormatter(posts.likes, 0)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Desc;

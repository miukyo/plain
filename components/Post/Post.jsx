import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { ToastLoading, ToastSuccess } from "../../components/Toasts";
import { Router } from "next/router";
import { motion } from "framer-motion";
import moment from "moment";
import {
  AiFillHeart,
  AiOutlineHeart,
  AiOutlineLoading3Quarters,
} from "react-icons/ai";
import Head from "next/head";
import { useSession } from "next-auth/react";

const Post = ({ posts }) => {
  const { data: session } = useSession();
  let date = new Date(posts.createdAt);
  const [likes, setLikes] = useState({
    state: false,
    loading: false,
    count: posts.likes,
  });
  useEffect(() => {
    if (posts.likesBy.find((item) => item.userId === session?.userId)) {
      setLikes({ ...likes, state: true });
    }
  }, [session]);
  const addLike = async () => {
    setLikes({ ...likes, loading: true });
    const res = await axios({
      method: "put",
      url: `/api/post/${posts.id}`,
      data: { userId: session?.userId },
    });
    if (res.data.status === "success") {
      return setLikes({ count: likes.count + 1, state: true, loading: false });
    } else if (res.data.status === "deleted") {
      return setLikes({ count: likes.count - 1, state: false, loading: false });
    }
  };
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
    <div className='mt-[5rem] py-12 px-16 relative overflow-hidden'>
      <div className='flex w-full justify-center'>
        <div className='relative border rounded-2xl py-10 px-14 shrink-0 w-[70rem] dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex justify-between items-center'>
            <button className='text-2xl text-gray-400 dark:text-white p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition'>
              <BsThreeDots />
            </button>
            <div className='flex gap-3'>
              <Link href='/'>
                <a className='px-5 py-2 font-medium tracking-wide text-black dark:text-white transition-transform bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-opacity-80 active:scale-90'>
                  Cancel
                </a>
              </Link>
              <button className='px-5 py-2 font-medium tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
                Share
              </button>
            </div>
          </div>
          <div className='flex flex-col mt-5 gap-5'>
            <div className='relative aspect-[16/10] rounded-xl flex justify-center items-center overflow-hidden'>
              <img
                className='absolute w-full h-full object-cover rounded-xl'
                src={posts.file?.link}
              />
            </div>
            <div className='flex justify-between items-center text-sm text-gray-600 dark:text-gray-300'>
              <div className='flex gap-3 items-center'>
                <img
                  className='rounded-full object-cover h-[40px] w-[40px] select-none dark:ring-offset-gray-800'
                  style={{ fontSize: "0" }}
                  src={posts.author?.image}
                  alt='Profile Picture'></img>
                <span className='flex flex-col justify-center'>
                  <h1>{posts.author?.name}</h1>
                  <p className='text-xs text-gray-400'>15.5k followers</p>
                </span>
              </div>
              <div className='flex items-center gap-2'>
                {likes.loading ? (
                  <button className='p-2 text-lg font-medium tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
                    <AiOutlineLoading3Quarters className='animate-spin' />
                  </button>
                ) : (
                  <>
                    {likes.state ? (
                      <button
                        onClick={() => {
                          addLike();
                        }}
                        className='p-2 text-lg font-medium tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
                        <AiFillHeart />
                      </button>
                    ) : (
                      <button
                        onClick={() => {
                          addLike();
                        }}
                        className='p-2 text-lg font-medium tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
                        <AiOutlineHeart />
                      </button>
                    )}
                  </>
                )}

                <button className='px-5 py-2 font-medium tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
                  Follow
                </button>
              </div>
            </div>
            <div className='break-words relative'>
              <label className='font-medium text-gray-400'>Title</label>
              <h1 className='text-xl dark:text-white font-semibold'>
                {posts.title}
              </h1>
            </div>
            <div className='flex flex-col w-full'>
              <div className='grid mb-5 gap-5 grid-cols-4'>
                <div>
                  <label className='font-medium text-gray-400'>Category</label>
                  <h1 className='text-lg dark:text-white'>{posts.category}</h1>
                </div>
                <div>
                  <label className='font-medium text-gray-400'>
                    Uploaded at
                  </label>
                  <h1 className='text-lg dark:text-white'>
                    {moment(date).fromNow()}
                  </h1>
                </div>
                <div>
                  <label className='font-medium text-gray-400'>Likes</label>
                  <h1 className='text-lg dark:text-white'>
                    {likes.count?.toLocaleString()}
                  </h1>
                </div>
                <div>
                  <label className='font-medium text-gray-400'>Views</label>
                  <h1 className='text-lg dark:text-white'>{posts.views}</h1>
                </div>
              </div>

              {/* <hr className='w-full bg-black dark:bg-white opacity-20 h-[2px] rounded mb-5' /> */}
              <div className='mb-3'>
                <label className='text-lg font-medium text-gray-400'>
                  Description
                </label>
                <p className='text-base dark:text-white'>{posts.description}</p>
              </div>
              <div className='mb-3 relative'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { BsThreeDots } from "react-icons/bs";
import axios from "axios";
import { ToastLoading, ToastSuccess } from "../../components/Toasts";
import { Router } from "next/router";
import moment from "moment";

const Index = ({ posts }) => {
  let date = new Date(posts.createdAt);
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
    <div className='mt-[5rem] py-12 px-16 relative'>
      <div className='flex w-full justify-center'>
        <div className='border rounded-2xl py-10 px-14 shrink-0 w-[70rem] dark:bg-gray-800 dark:border-gray-700'>
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
            <div className='relative aspect-video rounded-xl flex justify-center items-center overflow-hidden'>
              <img
                className='absolute w-full h-full object-cover rounded-xl'
                src={posts.file?.link}
              />
            </div>
            <div className='break-words'>
              <label className='text-lg font-medium text-gray-400'>Title</label>
              <h1 className='text-xl text-white font-semibold '>{posts.title}</h1>
            </div>
            <div className='flex flex-col w-full'>
              <div className='flex justify-between mb-5 items-center text-sm text-gray-600 dark:text-gray-300'>
                <div className='flex gap-4 items-center'>
                  <img
                    className='rounded-full object-cover h-[35px] w-[35px] select-none ring-2 ring-purp ring-offset-2 dark:ring-offset-gray-800'
                    style={{ fontSize: "0" }}
                    src={posts.author?.image}
                    alt='Profile Picture'></img>
                  <span className='flex flex-col justify-center'>
                    <h1 className='mt-[-6px]'>{posts.author?.name}</h1>
                    <p className='text-xs text-gray-400'>15.5k followers</p>
                  </span>
                </div>
                <button className='px-5 py-2 font-medium tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
                  Follow
                </button>
              </div>
              <div className='grid mb-3 gap-5 grid-cols-4'>
                <div>
                  <label className='text-lg font-medium text-gray-400'>
                    Category
                  </label>
                  <h1 className='text-xl text-white'>{posts.category}</h1>
                </div>
                <div>
                  <label className='text-lg font-medium text-gray-400'>
                    Uploaded at
                  </label>
                  <h1 className='text-xl text-white'>
                    {moment(date).fromNow()}
                  </h1>
                </div>
              </div>
              <div className='mb-3'>
                <label className='text-lg font-medium text-gray-400'>
                  Description
                </label>
                <p className='text-xl text-white'>{posts.description}</p>
              </div>
              <div className='mb-3 relative'></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export const getServerSideProps = async (context) => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(
      `${process.env.DEV_URL}/api/post/${context.params.id}`
    );
    return { props: { posts: res.data } };
  } else {
    const res = await axios.get(
      `${process.env.PROD_URL}/api/post/${context.params.id}`
    );
    return { props: { posts: res.data } };
  }
};

export default Index;

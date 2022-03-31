import React from "react";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { useSession } from "next-auth/react";

const GetPost = ({ posts }) => {
  let date = new Date(posts.createdAt);
  return (
    <div className='flex flex-col gap-2 p-3 h-fit rounded-xl border dark:bg-gray-800 dark:border-gray-700 overflow-hidden'>
      {posts.file.type !== /^image\/[a-z]+/ ? (
        <img className='rounded-xl w-full h-fit' src={posts.file.link} alt='' />
      ) : (
        <video
          className='rounded-xl w-full h-fit'
          src={posts.file.link}
          autoPlay={true}
          muted={true}
          loop={true}
        />
      )}
      <div>
        <div className='flex gap-1'>
          <p className='text-sm text-gray-400'>
            Posted by <span className='text-purp'>{posts.author}</span>
          </p>
        </div>
        <h1 className='text-lg font-semibold'>{posts.name}</h1>
        <p className='text-sm text-gray-400 break-words text-ellipsis line-clamp-4'>
          {posts.description}
        </p>
      </div>
      <div className='flex gap-2 justify-between items-center'>
        <span className='text-sm text-gray-400'>
          {date.toLocaleDateString("ID-id")}
        </span>
        <span className='text-sm text-gray-400 flex items-center gap-1'>
          <AiOutlineEye />
          {posts.views}
          <AiOutlineHeart className='ml-1' />
          {posts.likes}
        </span>
      </div>
    </div>
  );
};

export default GetPost;

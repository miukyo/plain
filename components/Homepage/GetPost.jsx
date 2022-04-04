import React from "react";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import Link from "next/link";
import moment from "moment";

const GetPost = ({ posts }) => {
  let date = new Date(posts.createdAt);
  return (
    <Link href={`/p/${posts.id}`}>
      <a className='flex flex-col gap-2 p-3 h-fit rounded-xl border dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-[border,transform] hover:scale-[98%] hover:border-purp dark:hover:border-purp relative'>
        <div className='rounded-xl aspect-video overflow-hidden relative'>
          <img
            className='w-full h-full object-cover z-10'
            src={posts.file.link}
            alt=''
          />
        </div>
        <div className='cursor-pointer'>
          <div className='flex gap-1'>
            <p className='text-sm text-gray-400'>
              Posted by <span className='text-purp'>{posts.author.name}</span>
            </p>
          </div>

          <h1 className='text-lg font-semibold break-all text-ellipsis line-clamp-1'>{posts.title}</h1>

          {/* <p className='text-sm text-gray-400 break-words text-ellipsis line-clamp-4'>
            {posts.description}
          </p> */}
        </div>

        <div className='flex gap-2 justify-between items-center -mt-2'>
          <span className='text-sm text-gray-400'>
            {moment(date).fromNow()}
          </span>
          <span className='text-sm text-gray-400 flex items-center gap-1'>
            <AiOutlineEye />
            {posts.views}
            <AiOutlineHeart className='ml-1' />
            {posts.likes}
          </span>
        </div>
      </a>
    </Link>
  );
};

export default GetPost;

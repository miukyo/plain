import React from "react";
import { AiOutlineHeart, AiOutlineEye } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Link from "next/link";

const GetPost = ({ posts }) => {
  let date = new Date(posts.createdAt);
  return (
    <div className='flex flex-col gap-2 p-3 h-fit rounded-xl border dark:bg-gray-800 dark:border-gray-700 overflow-hidden transition-[border,transform] hover:scale-[98%] hover:border-purp dark:hover:border-purp'>
      <img
        className='rounded-xl w-full h-fit object-cover max-h-[500px]'
        src={posts.file.link}
        alt=''
      />
      <Link href={`/post/${posts._id}`}>
        <div className="cursor-pointer">
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
      </Link>
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

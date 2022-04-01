import React from "react";

const Post = ({ posts }) => {
  return (
    <div className='mt-[5rem] py-12 px-16 relative'>
      <div className='flex w-full justify-center'>
        <div className='border rounded-2xl py-10 px-14 shrink-0 w-[70rem] dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex justify-between items-center'>{posts.name}</div>
        </div>
      </div>
    </div>
  );
};

export default Post;

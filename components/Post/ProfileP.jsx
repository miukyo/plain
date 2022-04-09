import React, { useEffect, useState } from "react";

const ProfileP = ({ posts }) => {
  return (
    <div className='w-full relative'>
      <div className='relative border rounded-2xl py-8 px-10 shrink-0 dark:bg-gray-800 dark:border-gray-700'>
        <div className='flex flex-col gap-2 items-center mb-3'>
          <img
            className='rounded-full object-cover h-[80px] w-[80px] select-none dark:ring-offset-gray-800'
            style={{ fontSize: "0" }}
            src={posts?.image}
            alt='Profile Picture'></img>
          <span className='flex flex-col justify-center items-center'>
            <h1>{posts?.name}</h1>
            <p className='text-xs text-gray-400'>15.5k followers</p>
          </span>
          <button className='w-full px-5 py-2 font-medium tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
            Follow
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileP;

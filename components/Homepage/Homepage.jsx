import React from "react";
import { CgOptions } from "react-icons/cg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GetPost from "./GetPost";

export const Homepage = ({ posts }) => {
  return (
    <div className='mt-[5rem] py-10 px-16'>
      <div className='flex justify-between items-center'>
        <ul className='flex gap-10 text-lg font-semibold text-gray-400'>
          <li className="text-purp">All</li>
          <li>Animation</li>
          <li>Illustration</li>
          <li>Banner</li>
          <li>UI/UX</li>
          <li>Overlay</li>
          <li>Typography</li>
          <li>Other</li>
        </ul>
        <button className='p-3 text-xl tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
          <CgOptions />
        </button>
      </div>
      <div className='my-10'>
        <ResponsiveMasonry columnsCountBreakPoints={{ 400: 2, 700: 3, 900: 4, 1000: 5 }}>
          <Masonry gutter={'13px'}>
            {posts.map((post) => (
              <GetPost key={post._id} posts={post} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

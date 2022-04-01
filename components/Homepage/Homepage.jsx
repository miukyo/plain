import React, { useEffect, useState } from "react";
import { CgOptions } from "react-icons/cg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import GetPost from "./GetPost";
import axios from "axios";

export const Homepage = () => {
  const [posts, setPosts] = useState([]);
  const [category, setCategory] = useState();
  const categoryS = [
    "Animation",
    "Illustration",
    "Banner",
    "UI/UX",
    "Overlay",
    "Typography",
    "Other",
  ];
  useEffect(() => {
    async function getData() {
      const res = await axios({
        method: "get",
        url: "/api/posts",
        params: category && { category: category },
      });
      return setPosts(res.data.message);
    }
    getData();
  }, [category]);
  return (
    <div className='mt-[5rem] py-10 px-16'>
      <div className='flex justify-between items-center'>
        <ul className='flex gap-10 text-lg font-semibold text-gray-400'>
          <li onClick={() => setCategory(undefined)}>
            <span
              className={`${
                category === undefined && "text-purp"
              } cursor-pointer hover:text-purp transition-colors`}>
              All
            </span>
          </li>
          {categoryS.map((item, i) => (
            <li key={i} onClick={() => setCategory(item)}>
              <Category name={item} category={category} />
            </li>
          ))}
        </ul>
        <button className='p-3 text-xl tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
          <CgOptions />
        </button>
      </div>
      <div className='my-10'>
        <ResponsiveMasonry
          columnsCountBreakPoints={{ 400: 2, 700: 3, 900: 4, 1000: 5 }}>
          <Masonry gutter={"13px"}>
            {posts.map((post) => (
              <GetPost key={post._id} posts={post} />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>
    </div>
  );
};

const Category = ({ name, category }) => {
  return (
    <span
      className={`${
        category === name && "text-purp"
      } cursor-pointer hover:text-purp transition-colors`}>
      {name}
    </span>
  );
};

import Head from "next/head";
import "@fontsource/poppins";
import React, { useEffect, useState } from "react";
import { CgOptions } from "react-icons/cg";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { motion, AnimatePresence } from "framer-motion";
import GetPost from "../components/Homepage/GetPost";
import axios from "axios";

export default function Home({ feedD }) {
  const [posts, setPosts] = useState();
  const [category, setCategory] = useState();
  useEffect(() => {
    setPosts(category ? category : feedD);
  }, []);
  useEffect(() => {
    setPosts([]);
    setTimeout(async () => {
      if (category !== undefined) {
        const filter = (feedD || []).filter((post) => {
          return post.category === category;
        });
        return setPosts(filter);
      } else {
        return setPosts(feedD);
      }
    }, 10);
  }, [category]);
  const categoryS = [
    "Animation",
    "Illustration",
    "Banner",
    "UI/UX",
    "Overlay",
    "Typography",
    "Other",
  ];
  return (
    <div>
      <Head>
        <title>Plain</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <div className='mt-[5rem] py-10 px-16'>
          <div className='flex justify-between items-center'>
            <ul className='flex gap-10 text-lg font-semibold text-gray-400'>
              <li onClick={() => setCategory(undefined)}>
                <span
                  className={`${
                    category === undefined && "text-purp select-none"
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
          {posts ? (
            <div className='my-10 grid grid-cols-4 gap-3'>
              {posts?.map((posts, i) => (
                <motion.div
                  initial={{ opacity: 0, y: 100 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05, duration: 0.4 }}
                  key={posts.id}>
                  <GetPost posts={posts} />
                </motion.div>
              ))}
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

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

export const getServerSideProps = async () => {
  if (process.env.NODE_ENV === "development") {
    const res = await axios.get(`${process.env.DEV_URL}/api/feed`);
    return { props: { feedD: res.data } };
  } else {
    const res = await axios.get(`${process.env.PROD_URL}/api/feed`);
    return { props: { feedD: res.data } };
  }
};

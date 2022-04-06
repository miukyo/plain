import React from "react";
import { useSession } from "next-auth/react";
import { AiOutlineHeart, AiOutlineEye, AiFillHeart } from "react-icons/ai";
import { MdVerified } from "react-icons/md";
import Link from "next/link";
import moment from "moment";
import { nFormatter } from "../../utils/nFormater";

const GetPost = ({ posts }) => {
  let date = new Date(posts.createdAt);
  const { data: session } = useSession();
  const [likes, setLikes] = React.useState({
    state: false,
    count: posts.likes,
  });
  React.useEffect(() => {
    if (posts.likesBy.find((item) => item.userId === session?.userId)) {
      setLikes({ ...likes, state: true });
    }
  }, [session]);
  return (
    <Link href={`/p/${posts.id}`}>
      <a className='flex flex-col gap-2  h-fit rounded-xl border border-transparent overflow-hidden transition-transform hover:scale-[97%] relative'>
        <div className='rounded-xl aspect-[16/10] overflow-hidden relative bg-gray-200 dark:bg-gray-800'>
          <img
            className='w-full h-full object-cover z-10'
            src={posts.file.link}
            alt=''
          />
        </div>
        <div className='flex gap-2'>
          <img
            className='mt-1 rounded-full object-cover h-[40px] w-[40px] select-none dark:ring-offset-gray-800'
            style={{ fontSize: "0" }}
            src={posts.author?.image}
            alt='Profile Picture'></img>
          <div className='flex flex-col w-full'>
            <h1 className='text-lg font-semibold break-all text-ellipsis line-clamp-1'>
              {posts.title}
            </h1>
            <div className='flex gap-1'>
              <p className='text-sm text-gray-400 flex gap-1'>
                Posted by
                <span className='text-purp flex items-center gap-1'>
                  {posts.author.name}
                  <span>{posts.author.verified ? <MdVerified /> : null}</span>
                </span>
              </p>
            </div>
            {/* <p className='text-sm text-gray-400 break-words text-ellipsis line-clamp-4'>
            {posts.description}
            </p> */}
            <div className='flex gap-2 justify-between items-center'>
              <span className='text-sm text-gray-400'>
                {moment(date).fromNow()}
              </span>
              <div>
                <span className='text-sm text-gray-400 flex items-center gap-1'>
                  <AiOutlineEye />
                  {nFormatter(posts.views, 0)}
                  {likes.state ? (
                    <AiFillHeart className='ml-1' />
                  ) : (
                    <AiOutlineHeart className='ml-1' />
                  )}
                  {nFormatter(posts.likes, 0)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default GetPost;

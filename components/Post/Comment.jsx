import React from "react";
import { useSession } from "next-auth/react";

const Comment = () => {
  const { data: session } = useSession();
  const [height, setHeight] = React.useState();
  //   console.log(height);
  const changeHeight = () => {};
  return (
    <div className='pb-12 px-16 relative overflow-hidden'>
      <div className='flex w-full justify-center'>
        <div className='relative border rounded-2xl py-10 px-14 shrink-0 w-[70rem] dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex gap-3'>
            <img
              className='rounded-full object-cover h-[40px] w-[40px] select-none dark:ring-offset-gray-800'
              style={{ fontSize: "0" }}
              src={session?.user.image}
              alt='Profile Picture'></img>
            <textarea
              className='min-h-[45px] overflow-hidden resize-none bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:outline-none focus:border-purp block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-purp'
              style={{ height: `${height}` }}
              placeholder="What's on your mind?"
              onChange={(e) => {
                setHeight("auto");
                setHeight(e.target.scrollTop + "px");
              }}
              required
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Comment;

import React, { useState } from "react";
import { signIn, signOut, useSession } from "next-auth/react";
import { useTheme } from "next-themes";
import {
  BsMoonStarsFill,
  BsSunFill,
  BsPersonFill,
  BsGearFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import Link from "next/link";

export const Navbar = () => {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [menu, setMenu] = useState(false);
  return (
    <div className='fixed top-0 flex justify-between items-center w-full h-[5rem] px-16 py-2 bg-white border-b dark:bg-gray-800 dark:border-gray-700 z-[999]'>
      <div className='flex items-center gap-16'>
        <Link href='/'>
          <a className='font-bold text-2xl dark:text-white'>Plain.</a>
        </Link>
        <div className='flex gap-5 items-center'>
          <a
            href='#'
            className='text-slate-400 dark:hover:text-white hover:text-black text-base transition'>
            Home
          </a>
          <a
            href='#'
            className='text-slate-400 dark:hover:text-white  hover:text-black text-base transition'>
            About
          </a>
          <a
            href='#'
            className='text-slate-400 dark:hover:text-white  hover:text-black text-base transition'>
            Contact
          </a>
        </div>
      </div>

      <div className='flex gap-3 items-center justify-end'>
        <div className='relative'>
          <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              className='w-5 h-5 text-gray-400'
              viewBox='0 0 24 24'
              fill='none'>
              <path
                d='M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z'
                stroke='currentColor'
                strokeWidth='2'
                strokeLinecap='round'
                strokeLinejoin='round'></path>
            </svg>
          </span>

          <input
            type='text'
            className='w-full py-2 pl-10 pr-4 text-gray-700 bg-white border rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:outline-none focus:border-gray-500'
            placeholder='Search'
          />
        </div>
        <Link href='/upload'>
          <a className='px-5 py-2 font-medium tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
            Upload
          </a>
        </Link>
        <div className='relative inline-block'>
          <button
            onClick={() => setMenu(menu ? false : true)}
            className='rounded-full overflow-hidden ring-2 ring-purp ring-offset-2 dark:ring-offset-gray-800 mt-1'>
            <img
              className='rounded-full object-cover h-[40px] w-[40px] select-none'
              style={{ fontSize: "0" }}
              src={session ? session?.user?.image : "pfp.webp"}
              alt='Profile Picture'></img>
          </button>
          <div
            className={`${
              !menu
                ? "invisible -translate-y-10 opacity-0"
                : "visible translate-y-0 opacity-100"
            } absolute right-0 -z-10 w-48 py-2 mt-5 bg-white rounded-md dark:bg-gray-800 transition-dropdown border dark:border-gray-700`}>
            {session && (
              <>
                <div className='flex gap-3 items-center px-4 pb-3 text-sm text-gray-600 dark:text-gray-300'>
                  <img
                    className='rounded-full object-cover h-[30px] w-[30px] select-none'
                    style={{ fontSize: "0" }}
                    src={session ? session?.user?.image : "pfp.webp"}
                    alt='Profile Picture'></img>
                  <span className='flex flex-col justify-center'>
                    <p className='text-[10px]'>Signed in as</p>
                    <h1 className='mt-[-6px]'>{session?.user.name}</h1>
                  </span>
                </div>
                <hr className='border-gray-200 dark:border-gray-700'></hr>
                <a className='flex items-center gap-3 px-4 py-3 text-sm text-gray-600 capitalize transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
                  <span className='text-lg'>
                    <BsPersonFill />
                  </span>
                  Your profile
                </a>
              </>
            )}
            <a className='flex items-center gap-3 px-4 py-3 text-sm text-gray-600 capitalize transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
              <span className='text-lg'>
                <BsGearFill />
              </span>
              Settings
            </a>
            <hr className='border-gray-200 dark:border-gray-700'></hr>
            <div
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className='flex items-center gap-3 cursor-pointer px-4 py-3 text-sm text-gray-600 capitalize transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
              <span className='text-lg'>
                {theme === "dark" ? <BsSunFill /> : <BsMoonStarsFill />}
              </span>
              {theme === "dark" ? "Light Mode" : "Dark Mode"}
            </div>
            <div
              onClick={() => {
                session ? signOut() : signIn();
              }}
              className='flex cursor-pointer items-center gap-3 px-4 py-3 text-sm text-gray-600 capitalize transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 dark:hover:text-white'>
              <span className='text-lg'>
                <BsFillArrowRightSquareFill />
              </span>
              {session ? "Sign out" : "Sign in"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

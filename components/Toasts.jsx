import React from "react";
import toast, { CheckmarkIcon, ErrorIcon, LoaderIcon } from "react-hot-toast";

export const ToastErr = (msg, { id }) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-xs w-full border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <span className='flex gap-3 items-center py-3 px-5'>
          <ErrorIcon />
          {msg}
        </span>
      </div>
    ),
    { id: id, duration: 4000 }
  );
};

export const ToastSuccess = (msg, { id }) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-xs w-full border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <span className='flex gap-3 items-center py-3 px-5'>
          <CheckmarkIcon />
          {msg}
        </span>
      </div>
    ),
    {
      id: id,
      duration: 3000,
    }
  );
};

export const ToastLoading = (msg, { id }) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-xs w-full border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <span className='flex gap-3 items-center py-3 px-5'>
          <LoaderIcon />
          {msg}
        </span>
      </div>
    ),
    { duration: Infinity, id: id }
  );
};

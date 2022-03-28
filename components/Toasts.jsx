import React from "react";
import toast, { CheckmarkIcon, ErrorIcon, LoaderIcon } from "react-hot-toast";

export const ToastErr = (msg, { id }) => {
  return toast.custom(
    (t) => (
      <div
        className={`${
          t.visible ? "animate-enter" : "animate-leave"
        } max-w-xs w-full border bg-white dark:bg-gray-800 dark:border-gray-700 shadow-xl rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        <div className='flex gap-3 items-center py-3 px-5'>
          <span className="w-fit h-fit">
            <ErrorIcon />
          </span>
          <p>{msg}</p>
        </div>
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
        <div className='flex gap-3 items-center5  py-3 px-5'>
          <span className="w-fit h-fit">
            <CheckmarkIcon />
          </span>
          <p>{msg}</p>
        </div>
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
        <div className='flex gap-3 items-center py-3 px-5'>
          <span className="w-fit h-fit">
            <LoaderIcon />
          </span>
          <p>{msg}</p>
        </div>
      </div>
    ),
    { duration: Infinity, id: id }
  );
};

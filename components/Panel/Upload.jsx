import React, { useCallback, useState, useRef } from "react";
import Router from "next/router";
import {
  BsThreeDots,
  BsPlus,
  BsTrashFill,
  BsChevronDown,
} from "react-icons/bs";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";
import Link from "next/link";
import uploadImg from "../../utils/method/uploadimg";
import { ToastErr, ToastLoading, ToastSuccess } from "../Toasts";

const Upload = () => {
  const { data: session } = useSession();
  const categoryS = [
    { id: 1, name: "Animation" },
    { id: 2, name: "Illustration" },
    { id: 3, name: "Banner" },
    { id: 4, name: "UI/UX" },
    { id: 5, name: "Overlay" },
    { id: 6, name: "Typography" },
    { id: 7, name: "Other" },
  ];
  const [category, setCategory] = useState({
    text: "Select category",
    value: null,
    state: false,
  });
  const [convertImg, setConvertImg] = useState({
    img: null,
    preview: null,
  });
  const [preUpload, setPreUpload] = useState({
    name: "",
    img: null,
    description: "",
  });
  const onDrop = useCallback((e) => {
    const file = e[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      setConvertImg({
        img: e.target.result,
        preview: URL.createObjectURL(file),
      });
      const base = e.target.result;
      setPreUpload({
        ...preUpload,
        // img: base.replace(/^data:image\/[a-z]+;base64,/, ""),
        img: file,
      });
    };
    reader.readAsDataURL(file);
  });
  const handleUpload = async () => {
    if (
      (preUpload.img !== null) &
      (preUpload.name.length > 3 < 100) &
      (preUpload.description.length > 5)
    ) {
      ToastLoading("Uploading...", { id: "Uploading" });
      let data = await uploadImg({
        img: preUpload.img,
      });
      // console.log(data);
      // if (data.status) {
      //   ToastLoading("Finishing...", { id: "Uploading" });
      //   let upload = {
      //     img: data.data,
      //     name: preUpload.name,
      //     description: preUpload.description,
      //     category: category.value,
      //     author: session?.user.name,
      //     likes: 0,
      //     views: 0,
      //     createdAt: new Date().toISOString(),
      //   };
      //   let final = await fetch("/api/posts", {
      //     method: "POST",
      //     body: JSON.stringify(upload),
      //   })
      //     .then((res) => res.json())
      //     .then((res) => {
      //       return res;
      //     });
      //   if (final.success) {
      //     ToastSuccess("Uploaded", { id: "Uploading" });
      //     Router.push("/");
      //   } else {
      //     ToastErr("Upload Failed (internal error)", { id: "Uploading" });
      //   }
      // } else {
      //   ToastErr("Upload Failed (internal error)", { id: "Uploading" });
      // }
    } else {
      return ToastErr("Please fill all the fields", { id: "Uploading" });
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/jpeg,image/png",
    maxFiles: 1,
    noClick: convertImg.img ? true : false,
  });
  const handleClear = () => {
    setConvertImg({
      img: null,
      preview: null,
    });
    setPreUpload({
      ...preUpload,
      img: null,
    });
  };
  const handleClearInput = () => {
    setConvertImg({
      img: null,
      preview: null,
    });
    setPreUpload({
      name: "",
      img: null,
      description: "",
      author: session?.user.name,
    });
  };
  // console.log(preUpload);
  return (
    <div className='mt-[5rem] py-12 px-16 relative overflow-y-visible'>
      <div className='flex w-full justify-center'>
        <div className='border rounded-2xl py-10 px-14 shrink-0 w-[70rem] dark:bg-gray-800 dark:border-gray-700'>
          <div className='flex justify-between items-center'>
            <button className='text-2xl text-gray-400 dark:text-white p-1 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition'>
              <BsThreeDots />
            </button>
            <div className='flex gap-3'>
              <Link href='/'>
                <a className='px-5 py-2 font-medium tracking-wide text-black dark:text-white transition-transform bg-gray-300 dark:bg-gray-700 rounded-md hover:bg-opacity-80 active:scale-90'>
                  Cancel
                </a>
              </Link>
              <button
                type='submit'
                onClick={handleUpload}
                className='px-5 py-2 font-medium tracking-wide text-white transition bg-purp rounded-md hover:bg-opacity-80 active:scale-90'>
                Upload
              </button>
            </div>
          </div>
          <div className='flex mt-5 gap-8'>
            <div
              {...getRootProps()}
              className={`${
                !convertImg.img && "bg-gray-300 dark:bg-gray-700"
              } relative w-[35rem] h-[40rem]  rounded-xl flex justify-center items-center overflow-hidden`}>
              {convertImg.img && (
                <img
                  className='absolute w-full opacity-100 rounded-xl'
                  src={convertImg.preview}
                />
              )}
              <input {...getInputProps()} />
              {!convertImg.img ? (
                <>
                  <div className='z-10 flex flex-col gap-3 items-center'>
                    {isDragActive && (
                      <span className='absolute text-lg text-transparent bg-gray-400 dark:bg-gray-600 p-3 rounded-full w-fit animate-ping'>
                        <BsPlus />
                      </span>
                    )}
                    <span className='z-10 text-lg bg-gray-400 dark:bg-gray-600 p-3 rounded-full w-fit'>
                      <BsPlus />
                    </span>
                    <p className='w-[70%] text-center text-gray-400'>
                      {!isDragActive
                        ? "Drag & drop or click to upload your file"
                        : "Drop your file here..."}
                    </p>
                  </div>
                  <p className='absolute w-[70%] text-center bottom-3 text-xs text-gray-400'>
                    Recommendation : Use .jpg format with high quality
                    compression and file size under 20MB
                  </p>
                </>
              ) : (
                <div className='absolute flex flex-col items-center gap-1 bottom-7'>
                  <button
                    onClick={handleClear}
                    className='z-10 text-lg bg-gray-200 dark:bg-gray-600 p-3 rounded-full w-fit active:scale-90 transition-transform '>
                    <BsTrashFill />
                  </button>
                </div>
              )}
            </div>
            <form className='flex flex-col w-full'>
              <div className='flex mb-5 gap-3 items-center text-sm text-gray-600 dark:text-gray-300'>
                <img
                  className='rounded-full object-cover h-[40px] w-[40px] select-none ring-2 ring-purp ring-offset-2 dark:ring-offset-gray-800'
                  style={{ fontSize: "0" }}
                  src={session ? session?.user?.image : "pfp.webp"}
                  alt='Profile Picture'></img>
                <span className='flex flex-col justify-center'>
                  <h1 className='mt-[-6px] text-lg'>{session?.user.name}</h1>
                </span>
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-lg font-medium text-gray-400'>
                  Title
                </label>
                <input
                  value={preUpload.name}
                  onChange={(e) =>
                    setPreUpload({ ...preUpload, name: e.target.value })
                  }
                  className='bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:outline-none focus:border-purp block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-purp'
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-lg font-medium text-gray-400'>
                  Description
                </label>
                <textarea
                  value={preUpload.description}
                  onChange={(e) =>
                    setPreUpload({ ...preUpload, description: e.target.value })
                  }
                  className='min-h-[200px] resize-none bg-gray-50 border border-gray-300 text-gray-900 text-base rounded-lg focus:outline-none focus:border-purp block w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:border-purp'
                  required
                />
              </div>
              <div className='mb-3 relative'>
                <label className='block mb-2 text-lg font-medium text-gray-400'>
                  Category
                </label>
                <button
                  type='button'
                  onClick={() =>
                    setCategory({
                      ...category,
                      state: category.state ? false : true,
                    })
                  }
                  className='bg-gray-50 border relative z-20 border-gray-300 text-gray-900 text-base flex justify-between items-center rounded-lg focus:outline-none focus:ring-purp focus:border-purp w-full py-2.5 px-4 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-purp dark:focus:border-purp'>
                  {category.text}
                  <span
                    className={`${
                      category.state ? "-rotate-180" : "rotate-0"
                    } transition-transform`}>
                    <BsChevronDown />
                  </span>
                </button>
                <div
                  className={`${
                    category.state
                      ? "visible translate-y-0 opacity-100"
                      : "invisible -translate-y-10 opacity-0"
                  } absolute transition-dropdown pb-10 w-full`}>
                  <ul className='bg-gray-50 border border-gray-300 text-gray-900 overflow-hidden text-base rounded-lg mt-1.5 focus:outline-none w-full dark:bg-gray-700 dark:border-gray-600 dark:text-white'>
                    {categoryS.map((c, i) => (
                      <li
                        key={i}
                        onClick={(e) => {
                          setCategory({
                            text: e.target.innerText,
                            value: c,
                            state: false,
                          });
                        }}
                        className='py-2.5 px-4 hover:bg-gray-300 dark:hover:bg-gray-600 cursor-pointer'>
                        {c.name}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;
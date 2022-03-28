import React, { useCallback, useState, useRef } from "react";
import Router from "next/router";
import axios  from "axios";
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
  const [formWarn, setFormWarn] = useState({
    name: false,
    category: false,
    img: false,
  });
  const [convertImg, setConvertImg] = useState({
    img: null,
    vid: null,
    preview: null,
  });
  const [preUpload, setPreUpload] = useState({
    name: "",
    img: null,
    vid: null,
    description: "",
  });
  const onDrop = useCallback((e) => {
    const file = e[0];
    const reader = new FileReader();
    setFormWarn({ ...formWarn, img: false });
    reader.onload = (e) => {
      const base = e.target.result;
      if (base.indexOf("image") !== -1) {
        setPreUpload({
          ...preUpload,
          img: base.replace(/^data:image\/[a-z]+;base64,/, ""),
        });
        setConvertImg({
          img: e.target.result,
          preview: URL.createObjectURL(file),
        });
      } else {
        setConvertImg({
          vid: e.target.result,
          preview: URL.createObjectURL(file),
        });
        setPreUpload({
          ...preUpload,
          vid: base.replace(/^data:video\/[a-z]+;base64,/, ""),
        });
      }
    };
    reader.readAsDataURL(file);
  });
  const handleUpload = async () => {
    if (
      (convertImg.preview !== null) &
      (preUpload.name.length > 3 && preUpload.name.length < 100) &
      (category.value !== null) &
      (session !== null)
    ) {
      ToastLoading("Uploading...", { id: "Uploading" });
      let data = await uploadImg({
        img: preUpload.img,
        vid: preUpload.vid,
      });
      if (data.status) {
        ToastLoading("Finishing...", { id: "Uploading" });
        let upload = {
          file: data.data,
          name: preUpload.name,
          description: preUpload.description,
          category: category.value,
          author: session?.user.name,
          likes: 0,
          views: 0,
          createdAt: new Date().toISOString(),
        };
        let final = await axios({
          method: "POST",
          url: "/api/posts",
          data: JSON.stringify(upload),
        })
          .then((res) => res.json())
          .then((res) => {
            return res;
          });
        if (final.success) {
          ToastSuccess("Uploaded", { id: "Uploading" });
          Router.push("/");
        } else {
          ToastErr("Upload Failed (internal error)", { id: "Uploading" });
        }
      } else {
        ToastErr("Upload Failed (internal error)", { id: "Uploading" });
      }
    } else {
      if (convertImg.preview == null) {
        ToastErr("Please insert an image or video!", { id: "Uploading" });
        setFormWarn({ ...formWarn, img: true });
      } else if (preUpload.name.length < 3 || preUpload.name.length > 100) {
        ToastErr("Please insert the title between 3 to 100 character!", {
          id: "Uploading",
        });
        setFormWarn({ ...formWarn, name: true });
      } else if (category.value == null) {
        ToastErr("Please select the category!", { id: "Uploading" });
        setFormWarn({ ...formWarn, category: true });
      } else if (session == null) {
        ToastErr("Authentication Error", { id: "Uploading" });
      }
    }
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*,video/*",
    maxFiles: 1,
    noClick: convertImg.preview ? true : false,
  });
  const handleClear = () => {
    setConvertImg({
      img: null,
      vid: null,
      preview: null,
    });
    setPreUpload({
      ...preUpload,
      vid: null,
      img: null,
    });
  };
  // const handleClearInput = () => {
  //   setConvertImg({
  //     img: null,
  //     vid: null,
  //     preview: null,
  //   });
  //   setPreUpload({
  //     name: "",
  //     img: null,
  //     description: "",
  //     author: session?.user.name,
  //   });
  // };
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
                !convertImg.preview && "bg-gray-300 dark:bg-gray-700"
              } ${
                formWarn.img ? "border-red-500 border" : ""
              } relative w-[35rem] h-[40rem]  rounded-xl flex justify-center items-center overflow-hidden`}>
              {convertImg.preview &&
                (convertImg.img ? (
                  <img
                    className='absolute w-full rounded-xl'
                    src={convertImg.preview}
                  />
                ) : (
                  <video
                    loop={true}
                    autoPlay={true}
                    muted={true}
                    className='absolute w-full rounded-xl'
                    src={convertImg.preview}
                  />
                ))}
              <input {...getInputProps()} />
              {!convertImg.preview ? (
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
                    Max file sizes for images is 10MB and for videos is 100MB
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
                  onChange={(e) => {
                    setPreUpload({ ...preUpload, name: e.target.value });
                    setFormWarn({ ...formWarn, name: false });
                  }}
                  className={`bg-gray-50 border ${
                    formWarn.name
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } text-gray-900 text-base rounded-lg focus:outline-none focus:border-purp block w-full py-2.5 px-4 dark:bg-gray-700 dark:text-white dark:focus:border-purp`}
                  required
                />
              </div>
              <div className='mb-3'>
                <label className='block mb-2 text-lg font-medium text-gray-400'>
                  Description
                </label>
                <textarea
                  value={preUpload.description}
                  onChange={(e) => {
                    setPreUpload({ ...preUpload, description: e.target.value });
                  }}
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
                  onClick={() => {
                    setCategory({
                      ...category,
                      state: category.state ? false : true,
                    });
                    setFormWarn({ ...formWarn, category: false });
                  }}
                  className={`bg-gray-50 border relative z-20 ${
                    formWarn.category
                      ? "border-red-500"
                      : "border-gray-300 dark:border-gray-600"
                  } text-gray-900 text-base flex justify-between items-center rounded-lg focus:outline-none focus:border-purp w-full py-2.5 px-4 dark:bg-gray-700 dark:text-white dark:focus:ring-purp dark:focus:border-purp`}>
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

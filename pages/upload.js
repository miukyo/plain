import React from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "../components/Homepage/Navbar";
import Upload from "../components/Panel/Upload";
import uploadImg from "../utils/method/uploadimg";

export default function upload() {
  return (
    <>
      <Navbar />
      <Upload />
    </>
  );
}

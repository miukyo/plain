import React from "react";
import { Toaster } from "react-hot-toast";
import { Navbar } from "../components/Homepage/Navbar";
import Upload from "../components/Panel/Upload";

export default function upload() {
  return (
    <>
      <Navbar />
      <Upload />
    </>
  );
}

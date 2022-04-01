import axios from "axios";
import Router from "next/router";
import { ToastErr, ToastLoading, ToastSuccess } from "../components/Toasts";

export async function handleUpload({
  file,
  preview,
  name,
  category,
  description,
  session,
}) {
  if (
    (preview !== null) &
    (name?.length > 3 && name?.length < 100) &
    (category !== null) &
    (session !== null)
  ) {
    const body = new FormData();
    body.append("image", file);
    const res = await axios({
      method: "post",
      data: body,
      onUploadProgress: (progressEvent) => {
        const { loaded, total } = progressEvent;
        const percent = Math.floor((loaded * 100) / total);
        ToastLoading("Uploading...", percent, { id: "Uploading" });
      },
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: `Client-ID a4b77fdc42f4140`,
      },
    });
    if (res.status) {
      let upload = {
        file: res.data.data,
        name: name,
        description: description,
        category: category,
        author: session?.user.name,
        likes: 0,
        views: 0,
        createdAt: new Date().toISOString(),
      };
      ToastLoading("Finishing...", 0, { id: "Uploading" });
      let final = await axios({
        method: "POST",
        url: "/api/posts",
        data: upload,
      }).then((res) => {
        return res.data;
      });
      if (final.success) {
        ToastSuccess("Uploaded", { id: "Uploading" });
        Router.push("/");
      } else {
        ToastErr("Upload Failed (internal error) 2", { id: "Uploading" });
      }
    } else {
      ToastErr(`Upload Failed (internal error) 1`, { id: "Uploading" });
    }
  } else {
    if (preview === null) {
      ToastErr("Please insert an image", { id: "Uploading" });
    } else if (name?.length < 3 && name?.length > 100) {
      ToastErr("Please insert the title between 3 to 100 character!", {
        id: "Uploading",
      });
    } else if (category === null) {
      ToastErr("Please select the category!", { id: "Uploading" });
    } else if (session === null) {
      ToastErr("Authentication Error", { id: "Uploading" });
    }
  }
}

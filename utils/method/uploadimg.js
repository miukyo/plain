import axios from "axios";

export default async function uploadImg({ img }) {
  try {
    const body = new FormData();
    body.append("image", img);
    const res = await axios({
      method: "post",
      data: body,
      url: "https://api.imgur.com/3/image",
      headers: {
        Authorization: `Client-ID a4b77fdc42f4140`,
        ...body.getHeaders(),
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

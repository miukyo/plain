import axios from "axios";

export default async function uploadImg({ img }) {
  try {
    const body = new FormData();
    body.append('image', img);
    console.log(body)
    const res = await axios({
      method: "post",
      body: body,
      url: "https://api.imgur.com/3/upload",
      headers: {
        Authorization: `Client-ID ${process.env.IMGUR_CLIENT_ID}`,
      },
    });
    return res;
  } catch (error) {
    return error;
  }
}

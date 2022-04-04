import axios from "axios";
import Prisma from "../../../utils/prisma";

export default async function handle(req, res) {
  switch (req.method) {
    case "GET": {
      return handleGet(req, res);
    }
    case "DELETE": {
      return handleDelete(req, res);
    }
  }
}

async function handleGet(req, res) {
  const { postId } = req.query;
  const e = await Prisma.post.findUnique({
    where: { id: postId },
    include: { author: true },
  });
  res.json(e);
}

async function handleDelete(req, res) {
  const { postId } = req.query;
  const deleteHash = req.body.hash;
  const d = await axios({
    method: "delete",
    url: `https://api.imgur.com/3/image/${deleteHash}`,
    headers: {
      Authorization: `Client-ID a4b77fdc42f4140`,
    },
  });
  const e = await Prisma.post.delete({
    where: { id: postId },
  });
  const f = [d.data, e];
  res.json(f);
}

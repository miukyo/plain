import axios from "axios";
import Prisma from "../../../utils/prisma";

export default async function handle(req, res) {
  switch (req.method) {
    case "GET": {
      return handleGet(req, res);
    }
    case "PUT": {
      return handleUpdate(req, res);
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
    include: { author: true, likesBy: true },
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

async function handleUpdate(req, res) {
  const { postId } = req.query;
  const { userId } = req.body;
  const a = await Prisma.likes.findFirst({
    where: { postId: postId, userId: userId },
  });
  if (a) {
    await Prisma.likes.delete({
      where: { id: a.id },
    });
    await Prisma.post.update({
      where: { id: postId },
      data: { likes: { increment: -1 } },
    });
    res.json({ status: "deleted" });
  } else {
    await Prisma.likes.create({
      data: {
        post: { connect: { id: postId } },
        user: { connect: { id: userId } },
      },
    });
    await Prisma.post.update({
      where: { id: postId },
      data: { likes: { increment: 1 } },
    });
    res.json({ status: "success" });
  }
}

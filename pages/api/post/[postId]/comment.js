import Prisma from "../../../../utils/prisma";

export default async function handle(req, res) {
  switch (req.method) {
    case "GET": {
      return handleGet(req, res);
    }
    case "POST": {
      return handleCreate(req, res);
    }
    case "DELETE": {
      return handleDelete(req, res);
    }
  }
}

async function handleGet(req, res) {
  const { postId } = req.query;
  const e = await Prisma.comments.findMany({
    where: { postId: postId },
    include: { author: true, reply: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(e);
}

async function handleCreate(req, res) {
  const { text, session } = req.body;
  const date = new Date();
  const e = await Prisma.comments.create({
    include: { author: true, reply: true },
    data: {
      text: text,
      createdAt: date,
      author: { connect: { id: session } },
      post: { connect: { id: req.query.postId } },
    },
  });
  return res.json(e);
}

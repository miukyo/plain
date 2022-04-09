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
  const { id } = req.body;
  const e = await Prisma.commentsReply.findMany({
    where: { postId: postId, comments: id },
    orderBy: { createdAt: "desc" },
  });
  res.json(e);
}

async function handleCreate(req, res) {
  const { id, session, text } = req.body;
  const date = new Date();
  const e = await Prisma.commentsReply.create({
    include: { author: true },
    data: {
      text: text,
      createdAt: date,
      author: { connect: { id: session } },
      comment: { connect: { id: id } },
      post: { connect: { id: req.query.postId } },
    },
  });
  return res.json(e);
}

import Prisma from "../../utils/prisma";

export default async function handle(req, res) {
  switch (req.method) {
    case "GET": {
      return getPosts(req, res);
    }
    case "POST": {
      return filterPosts(req, res);
    }
  }
}

async function getPosts(req, res) {
  const e = await Prisma.post.findMany({
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(e);
}

async function filterPosts(req, res) {
  const category = req.body.category;
  const e = await Prisma.post.findMany({
    where: { category: category },
    include: { author: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(e);
}

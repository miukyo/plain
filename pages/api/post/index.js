import Prisma from "../../../utils/prisma";

export default async function handle(req, res) {
  const { title, description, file, category, published, createdAt, session } = req.body;
  const e = await Prisma.post.create({
    include: { author: true },
    data: {
      title: title,
      description: description,
      file: file,
      category: category,
      published: published,
      createdAt: createdAt,
      author: { connect: { id: session } },
    },
  });
  return res.json(e);
}

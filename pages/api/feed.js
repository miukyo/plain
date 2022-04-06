import Prisma from "../../utils/prisma";

// export default async function handle(req, res) {
//   switch (req.method) {
//     case "GET": {
//       return getPosts(req, res);
//     }
//     case "POST": {
//       return filterPosts(req, res);
//     }
//   }
// }

export default async function handle(req, res) {
  const e = await Prisma.post.findMany({
    include: { author: true, likesBy: true },
    orderBy: { createdAt: "desc" },
  });
  res.json(e);
}

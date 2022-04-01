import { connectToDatabase } from "../../utils/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  // switch the methods
  switch (req.method) {
    case "GET": {
      return getPosts(req, res);
    }

    case "POST": {
      return addPost(req, res);
    }

    case "PUT": {
      return updatePost(req, res);
    }

    case "DELETE": {
      return deletePost(req, res);
    }
  }
}

async function getPosts(req, res) {
  let params;
  async function query() {
    if (req.query.id) {
      return (params = { _id: new ObjectId(req.query.id) });
    } else if (req.query.category) {
      return (params = { category: req.query.category });
    } else {
      return (params = {});
    }
  }
  try {
    query();
    let { db } = await connectToDatabase();
    let posts = await db
      .collection("posts")
      .find(params)
      .sort({ createdAt: -1 })
      .toArray();
    return res.json({
      message: JSON.parse(JSON.stringify(posts)),
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function addPost(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection("posts").insertOne(req.body);
    return res.json({
      message: "Post added successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function updatePost(req, res) {
  try {
    let { db } = await connectToDatabase();
    await db.collection("posts").updateOne(
      {
        _id: new ObjectId(req.body),
      },
      { $add: { published: true } }
    );

    return res.json({
      message: "Post updated successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

async function deletePost(req, res) {
  try {
    let { db } = await connectToDatabase();

    await db.collection("posts").deleteOne({
      _id: new ObjectId(req.body),
    });

    return res.json({
      message: "Post deleted successfully",
      success: true,
    });
  } catch (error) {
    return res.json({
      message: new Error(error).message,
      success: false,
    });
  }
}

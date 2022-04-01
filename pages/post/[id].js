import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Post from "../../components/Post/Post";

const Index = () => {
  const [id, setId] = useState();
  const [posts, setPosts] = useState();
  useEffect(() => {
    const id = window.location.pathname.split("/")[2];
    setId(id);
  }, []);
  useEffect(() => {
    if (id !== undefined) {
      async function getData() {
        const res = await axios({
          method: "get",
          url: "/api/posts",
          params: { id },
        });
        return setPosts(res.data.message[0]);
      }
      return getData();
    }
  }, [id]);
  return <>{posts && <Post posts={posts} />}</>;
};

export default Index;

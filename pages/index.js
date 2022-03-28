import Head from "next/head";
import "@fontsource/poppins";
import { Homepage } from "../components/Homepage/Homepage";
import { Navbar } from "../components/Homepage/Navbar";
import { Toaster } from "react-hot-toast";

export default function Home({ posts }) {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main>
        <Navbar />
        <Homepage posts={posts} />
      </main>
    </div>
  );
}

export async function getServerSideProps(ctx) {
  let dev = process.env.NODE_ENV !== "production";
  let { DEV_URL, PROD_URL } = process.env;

  let response = await fetch(`${dev ? DEV_URL : PROD_URL}/api/posts`);
  let data = await response.json();

  return {
    props: {
      posts: data["message"],
    },
  };
}

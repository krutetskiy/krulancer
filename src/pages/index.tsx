import { type NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KRULANCER</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-regular-2">
        <div className="flex flex-col p-20 rounded-2xl w-[600px] h-[700px] bg-gray-regular-1">
          <h1 className="font-mono self-center font-medium text-4xl tracking-widest">KRULANCER</h1>
          <hr className="border-1 my-6" />
          <h2 className="font-mono self-center font-medium text-2xl tracking-widest text-gray-light-1">SIGN IN</h2>
          <button onClick={() => signIn("yandex", {
            callbackUrl: "/profile",
            redirect: true
          })} className="p-2 w-full text-2xl font-medium tracking-widest rounded-2xl bg-yellow-500 text-white hover:border-yellow-500 border-2 hover:bg-gray-regular-1 hover:text-black" type="submit">YANDEX</button>
        </div>
      </div>
    </>
  );
};

export default Home; 
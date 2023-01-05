import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";

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
          <form className="flex flex-col my-12">
            <input placeholder="Username" className="text-xl rounded-2xl px-4 py-2 w-full border-2 hover:border-blue-500 bg-gray-regular-1" type="text" />
            <input placeholder="Password" className="text-xl rounded-2xl px-4 py-2 my-3 w-full border-2 hover:border-blue-500 bg-gray-regular-1" type="text" />
            <button className="p-2 w-full text-2xl font-medium tracking-widest rounded-2xl bg-blue-500 text-white hover:border-blue-500 border-2 hover:bg-gray-regular-1 hover:text-black" type="submit">LogIn</button>
          </form>
          <hr className="border-1" />
          <button onClick={() => signIn("yandex", {
            callbackUrl: "/dashboard",
            redirect: true
          })} className="my-4 p-2 w-full text-2xl font-medium tracking-widest rounded-2xl bg-yellow-500 text-white hover:border-yellow-500 border-2 hover:bg-gray-regular-1 hover:text-black" type="submit">YANDEX</button>
        </div>
      </div>
    </>
  );
};

export default Home; 
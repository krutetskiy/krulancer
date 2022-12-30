import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { signIn, signOut, useSession } from "next-auth/react";

import { trpc } from "../utils/trpc";

import Header from "../components/Header"
import ProjectDashboard from "../components/ProjectDashboard";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>KRULANCER</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col justify-start bg-white">
        <Header />
        <ProjectDashboard />
      </main>
    </>
  );
};

export default Home;
import { type NextPage } from "next";
import Head from "next/head";
import { signIn } from "next-auth/react";
import { useState, FormEvent } from "react";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const [credits, setCredits] = useState<{ login: string, password: string }>({ login: "kingsemyn@gmail.com", password: "pwdpwdpwd" });
  const mutateCredits = trpc.auth.signUp.useMutation()

  const handleLoginInput = (event: FormEvent<HTMLInputElement>) => setCredits({
    login: event.currentTarget.value,
    password: credits.password
  })

  const handlePasswordInput = (event: FormEvent<HTMLInputElement>) => setCredits({
    login: credits.login,
    password: event.currentTarget.value
  })

  const handleCredentialSignUp = (e: FormEvent<HTMLButtonElement>) => {
    mutateCredits.mutate({ login: credits.login, password: credits.password })
    handleCredentialSignIn(e)
  }

  const handleCredentialSignIn = (e: FormEvent<HTMLButtonElement>) => {
    signIn("credentials", { callbackUrl: "/dashboard", redirect: true, email: credits.login, password: credits.password })
  }

  return (
    <>
      <Head>
        <title>KRULANCER</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex flex-col justify-center items-center w-screen h-screen bg-gray-regular-2">
        <div className="flex flex-col p-20 rounded-2xl w-[600px] h-[700px] bg-gray-regular-1">
          <h1 className="font-mono self-center font-medium text-4xl tracking-widest">KRULANCER</h1>
          <form className="flex flex-col mt-12 mb-4">
            <input value={"kingsemyn@gmail.com"} onChange={handleLoginInput} placeholder="Username" className="text-xl rounded-2xl px-4 py-2 w-full border-2 hover:border-blue-500 bg-gray-regular-1" type="text" />
            <input value={"pwdpwdpwd"} onChange={handlePasswordInput} placeholder="Password" className="text-xl rounded-2xl px-4 py-2 my-3 w-full border-2 hover:border-blue-500 bg-gray-regular-1" type="password" />
            <div className="flex justify-between">
              <button onClick={handleCredentialSignUp} className="p-2 w-full text-2xl font-medium tracking-widest rounded-2xl bg-blue-500 text-white hover:border-blue-500 border-2 hover:bg-gray-regular-1 hover:text-black" type="submit">Sign Up</button>
              <button onClick={handleCredentialSignIn} className="p-2 w-full text-2xl font-medium tracking-widest rounded-2xl bg-blue-500 text-white hover:border-blue-500 border-2 hover:bg-gray-regular-1 hover:text-black" type="submit">Sign In</button>
            </div>
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
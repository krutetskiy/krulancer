import AuthGuard from "../components/AuthGuard";
import Header from "../components/UI/Header";
import Avatar from "../components/Profile/Avatar";
import { GetServerSidePropsContext } from "next";
import { prisma } from "../server/db/client"
import { Project, User } from "@prisma/client";
import ProjectsWidget from "../components/Profile/ProjectsWidget";

export async function getServerSideProps({ req }: GetServerSidePropsContext) {
  const sessionToken = req.cookies["next-auth.session-token"]
  const session = await prisma.session.findUnique({ where: { sessionToken: sessionToken }, include: { user: true } })
  const projects = await prisma.project.findMany({
    where: { startedBy: { id: session?.userId } },
    include: { startedBy: true }
  })

  return {
    props: {
      user: session?.user,
      projects: JSON.parse(JSON.stringify(projects)),
    }
  }
}

const ProfilePage = ({ projects, user }: { projects: (Project & { startedBy: User })[], user: User }) => {

  return (
    <>
      <AuthGuard />
      <main className="flex min-h-screen flex-col justify-start bg-white">
        <Header />
        <h1 className="mx-9 my-4 font-mono font-semibold text-4xl">{user.name}</h1>
        <div className="flex h-screen mx-7 p-3">
          <div className="flex flex-col justify-between w-1/3 mr-3">
            <Avatar />
          </div>
          <div className="flex flex-col w-full ml-3">
            <ProjectsWidget projects={projects} />
          </div>
        </div>
      </main>
    </>
  )
}

export default ProfilePage;
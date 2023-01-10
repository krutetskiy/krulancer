import AuthGuard from "../../components/AuthGuard";
import Header from "../../components/UI/Header"
import ProjectDashboard from "../../components/ProjectDashboard/Dashboard";
import { prisma } from "../../server/db/client";
import { Project, User } from "@prisma/client";
import { GetServerSidePropsContext } from "next";

interface ServerSideProps {
  project: Project,
  startedBy: User,
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const project = await prisma.project.findUnique({
    where: { id: +(context.params!.id ?? -1) },
    include: { startedBy: true }
  })

  return {
    props: {
      project: JSON.parse(JSON.stringify(project)),
      startedBy: project?.startedBy
    }
  }
}

const DashboardPage = (props: ServerSideProps) => {

  return (
    <>
      <AuthGuard />
      <main className="flex min-h-screen flex-col justify-start bg-white">
        <Header />
        <ProjectDashboard {...props} />
      </main>
    </>
  )
}

export default DashboardPage;
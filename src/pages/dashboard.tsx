import AuthGuard from "../components/AuthGuard";
import Header from "../components/Header"
import ProjectDashboard from "../components/ProjectDashboard/Dashboard";

const Dashboard = () => {
  return (
    <>
      <AuthGuard />
      <main className="flex min-h-screen flex-col justify-start bg-white">
        <Header />
        <ProjectDashboard />
      </main>
    </>
  )
}

export default Dashboard;
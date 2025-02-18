import Sidebar from "../components/Sidebar";
const Dashboard = () => {
  return (
    <div className="container">
      <Sidebar/>
      <main className="content">
        <h1>Dashboard</h1>
        <p>Welcome to your dashboard!</p>
      </main>
    </div>
  );
};

export default Dashboard;
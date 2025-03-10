import Sidebar from "../components/Sidebar";
import DashboardTable from "../components/DashboardTable"
const Dashboard = () => {
  return (
    <div className="container">
      <Sidebar/>
      <main>
       <DashboardTable/>
      </main>
    </div>
  );
};

export default Dashboard;
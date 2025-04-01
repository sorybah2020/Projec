import Sidebar from "../components/Sidebar";
import DashboardTable from "../components/DashboardTable"
import Charts from "../components/Charts";
const Dashboard = () => {
  return (
    <div className="container">
      <Sidebar/>
      <main>
       <DashboardTable/>
       <Charts />
      </main>
    </div>
  );
};

export default Dashboard;
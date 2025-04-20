import Sidebar from "../components/Sidebar";
import DashboardTable from "../components/DashboardTable";
import Charts from "../components/Charts";
import NavigationProvider from "../context/NavigationProvider";

const Dashboard = () => {
  return (
    <div className="container">
      <NavigationProvider>
        <Sidebar />
        <main>
          <div className="page-content">
            <DashboardTable />
            <Charts />
          </div>
        </main>
      </NavigationProvider>
    </div>
  );
};

export default Dashboard;

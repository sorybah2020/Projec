import React, { useState, useEffect, useContext } from "react";
import { Box } from "@mui/material";
import { AuthContext } from "../context/AuthContext";
import NavigationProvider from "../context/NavigationProvider";
import Sidebar from "../components/Sidebar";
import DashboardDateRangeSelector from "../components/DashboardDateRangeSelector";
import DashboardTable from "../components/DashboardTable";
import Charts from "../components/Charts";
import TransactionsAPI from "../services/TransactionsAPI";
import Header from "../components/Header";

function isInRange(date, range) {
  if (!range[0] || !range[1]) return true;
  const d = new Date(date);
  const start = new Date(range[0]);
  const end = new Date(range[1]);
  start.setHours(0, 0, 0, 0);
  end.setHours(23, 59, 59, 999);
  return d >= start && d <= end;
}

export default function Dashboard() {
  const { auth } = useContext(AuthContext);
  const [dateRange, setDateRange] = useState([null, null]);
  const [preset, setPreset] = useState("lastMonth");
  const [transactions, setTransactions] = useState([]);
  const [filteredTransactions, setFilteredTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTx() {
      setLoading(true);
      try {
        if (auth?._id) {
          const data = await TransactionsAPI.getTransactionsById(auth._id, {
            method: "GET",
          });
          setTransactions(Array.isArray(data) ? data : []);
        }
      } finally {
        setLoading(false);
      }
    }
    fetchTx();
  }, [auth?._id]);

  useEffect(() => {
    if (!transactions.length) {
      setFilteredTransactions([]);
      return;
    }
    setFilteredTransactions(
      transactions.filter((tx) => isInRange(tx.date, dateRange))
    );
  }, [transactions, dateRange]);

  const handleDateRangeChange = (range, selectedPreset) => {
    setDateRange(range);
    setPreset(selectedPreset);
  };

  return (
    <NavigationProvider>
      <div className="page profile-page">
        <Box sx={{ display: "flex" }}>
          <Sidebar />
          <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
            <Header />
            <Box
              sx={{
                width: "100%",
                display: "flex",
                justifyContent: "flex-end",
                alignItems: "flex-start",
                mt: 2,
                pr: 3,
              }}
            >
              <DashboardDateRangeSelector onChange={handleDateRangeChange} />
            </Box>
            <DashboardTable
              transactions={filteredTransactions}
              loading={loading}
              auth={auth}
            />
            <Charts transactions={filteredTransactions} />
          </Box>
        </Box>
      </div>
    </NavigationProvider>
  );
}

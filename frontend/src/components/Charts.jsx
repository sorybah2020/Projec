import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import TransactionsAPI from "../services/TransactionsAPI";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

const Charts = () => {
  const [balanceData, setBalanceData] = useState([]);
  const [incomeExpenseData, setIncomeExpenseData] = useState([]);
   const { auth } = useContext(AuthContext);

  // Fetch balance and income-expense data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = auth?._id; 
        const transactions = await TransactionsAPI.getTransactionsById(userId, {
          method: "GET",
        });
  
        console.log("Fetched transactions:", transactions);
  
        if (transactions && transactions.length > 0) {
          // Group transactions by month
          const groupedByMonth = transactions.reduce((acc, transaction) => {
            const month = new Date(transaction.date).toLocaleString("default", {
              month: "short",
            });
  
            if (!acc[month]) {
              acc[month] = { income: 0, expense: 0, balance: 0 };
            }
  
            // Update income, expense, and balance
            if (transaction.cashflow === "Income") {
              acc[month].income += transaction.amount;
              acc[month].balance += transaction.amount;
            } else if (transaction.cashflow === "Expense") {
              acc[month].expense += transaction.amount;
              acc[month].balance -= transaction.amount;
            }
  
            return acc;
          }, {});
  
          console.log("Grouped transactions by month:", groupedByMonth);
  
          // Prepare data for charts
          const processedBalanceData = Object.keys(groupedByMonth).map((month) => ({
            month,
            amount: groupedByMonth[month].balance,
          }));
  
          const processedIncomeExpenseData = Object.keys(groupedByMonth).map(
            (month) => ({
              month,
              income: groupedByMonth[month].income,
              expense: groupedByMonth[month].expense,
            })
          );
  
          setBalanceData(processedBalanceData);
          setIncomeExpenseData(processedIncomeExpenseData);
        } else {
          console.warn("No transaction data returned from API.");
        }
      } catch (error) {
        console.error("Error fetching transaction data:", error);
      }
    };
  
    fetchData();
  }, []);

  return (
    <div className="charts-container">
      {/* Account Balance (Line Chart) */}
      <div className="chart-box">
        <h3>Account - Balance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={balanceData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5584f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#5584f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#5584f6"
              fillOpacity={1}
              fill="url(#colorBalance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Income vs Expense (Bar Chart) */}
      <div className="chart-box">
        <h3>Income - Expense</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={incomeExpenseData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="income" fill="#8a5cf6" />
            <Bar dataKey="expense" fill="#3654f6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Charts;
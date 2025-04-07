import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area, BarChart, Bar, Legend } from "recharts";

const balanceData = [
  { month: "May", amount: 0 },
  { month: "Jun", amount: 500 },
  { month: "Jul", amount: 750 },
  { month: "Aug", amount: 600 },
  { month: "Sep", amount: 1200 },
  { month: "Oct", amount: 1000 },
  { month: "Nov", amount: 1250 },
];

const incomeExpenseData = [
  { month: "Apr", income: 3000, expense: 0 },
  { month: "May", income: 7500, expense: 7000 },
  { month: "Jun", income: 7000, expense: 6500 },
  { month: "Jul", income: 6000, expense: 5000 },
  { month: "Aug", income: 8500, expense: 6000 },
  { month: "Sep", income: 7200, expense: 6500 },
  { month: "Oct", income: 7500, expense: 6000 },
];

const Charts = () => {
  return (
    <div className="charts-container">
      {/* Account Balance (Line Chart) */}
      <div className="chart-box">
        <h3>Account - Balance</h3>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={balanceData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
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
            <Area type="monotone" dataKey="amount" stroke="#5584f6" fillOpacity={1} fill="url(#colorBalance)" />
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
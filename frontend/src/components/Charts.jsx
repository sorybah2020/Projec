import React from "react";
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
import { Box, Typography, Paper } from "@mui/material";


function formatNumber(num) {
  if (Math.abs(num) >= 1e6) return (num / 1e6).toFixed(1) + "M";
  if (Math.abs(num) >= 1e3) return (num / 1e3).toFixed(1) + "K";
  return num?.toLocaleString?.() ?? num;
}


function groupAndSortByMonth(transactions) {
  const grouped = {};

  transactions.forEach((tx) => {
    const date = new Date(tx.date);
    const year = date.getFullYear();
    const month = date.getMonth(); 
    const key = `${year}-${String(month + 1).padStart(2, "0")}`;
    if (!grouped[key]) {
      grouped[key] = {
        income: 0,
        expense: 0,
        balance: 0,
        display: date.toLocaleString("default", { month: "short" }) + " " + year,
        sortKey: key,
      };
    }
    if (tx.cashflow === "Income") {
      grouped[key].income += tx.amount;
      grouped[key].balance += tx.amount;
    } else if (tx.cashflow === "Expense") {
      grouped[key].expense += tx.amount;
      grouped[key].balance -= tx.amount;
    }
  });

  return Object.values(grouped)
    .sort((a, b) => a.sortKey.localeCompare(b.sortKey))
    .map(({ income, expense, balance, display }) => ({
      month: display,
      income,
      expense,
      balance: Math.max(0, balance), 
    }));
}

export default function Charts({ transactions = [] }) {
  const grouped = groupAndSortByMonth(transactions);

  const balanceData = grouped.map(({ month, balance }) => ({
    month,
    amount: balance,
  }));
  const incomeExpenseData = grouped.map(({ month, income, expense }) => ({
    month,
    income,
    expense,
  }));

  return (
    <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" ,mt: 4}}>
      <Paper className="chart-box" sx={{ flex: "1 1 400px", minWidth: 350, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Account - Balance</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart
            data={balanceData}
            margin={{ top: 10, right: 30, left: 40, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorBalance" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#5584f6" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#5584f6" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" />
            <YAxis width={70} tickFormatter={formatNumber} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip formatter={formatNumber} />
            <Area
              type="monotone"
              dataKey="amount"
              stroke="#5584f6"
              fillOpacity={1}
              fill="url(#colorBalance)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </Paper>
      <Paper className="chart-box" sx={{ flex: "1 1 400px", minWidth: 350, p: 2 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Income - Expense</Typography>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={incomeExpenseData}
            margin={{ left: 40, right: 30 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis width={70} tickFormatter={formatNumber} />
            <Tooltip formatter={formatNumber} />
            <Legend />
            <Bar dataKey="income" fill="#8a5cf6" />
            <Bar dataKey="expense" fill="#3654f6" />
          </BarChart>
        </ResponsiveContainer>
      </Paper>
    </Box>
  );
}
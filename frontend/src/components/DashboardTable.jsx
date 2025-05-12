import React from "react";
import Card from "./Card";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

function groupByCategory(transactions) {
  const grouped = {};
  transactions.forEach((tx) => {
    const category = tx.category || "Unknown";
    if (!grouped[category]) {
      grouped[category] = 0;
    }
    grouped[category] += Number(tx.amount || 0);
  });
  return Object.entries(grouped).map(([name, value]) => ({ name, value }));
}

const CATEGORY_COLORS = [
  "#ff80ab", "#80b3ff", "#b2f59c", "#84c1b1", "#ffd580", "#c299fc", "#ffb347", "#b5ead7"
];
function getCategoryColor(cat, idx) {
  return CATEGORY_COLORS[idx % CATEGORY_COLORS.length];
}

const RADIAN = Math.PI / 180;
function renderCustomLabel({ cx, cy, midAngle, outerRadius, percent, name }) {
  if (percent < 0.02) return null;
  const radius = outerRadius + 24;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const maxLen = 12;
  const display = name.length > maxLen ? name.slice(0, maxLen) + "…" : name;
  return (
    <text
      x={x}
      y={y}
      fill="#333"
      fontSize={13}
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      style={{ pointerEvents: "none", userSelect: "none" }}
    >
      {display}
    </text>
  );
}

export default function DashboardTable({ transactions = [], loading = false, auth = {} }) {
  const totalIncome = transactions
    .filter((tx) => tx.cashflow === "Income" && tx.amount)
    .reduce((sum, tx) => sum + Number(tx.amount), 0);
  const totalExpenses = transactions
    .filter((tx) => tx.cashflow === "Expense" && tx.amount)
    .reduce((sum, tx) => sum + Number(tx.amount), 0);

  const chartData = groupByCategory(transactions.filter((tx) => tx.cashflow === "Expense"));
  const chartTotal = chartData.reduce((sum, d) => sum + d.value, 0);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="p">
      <div className="row">
        <Card className="Income">
          <h2 className="Total Income">${totalIncome.toLocaleString()}</h2>
          <p>Income</p>
        </Card>
        <Card className="Expenses">
          <h2 className="Total Expenses">${totalExpenses.toLocaleString()}</h2>
          <p>Expenses</p>
        </Card>
        <Card className="Balance">
          <h2 className="Total Balances">${auth?.budget ?? (totalIncome - totalExpenses).toLocaleString()}</h2>
          <p>Balance</p>
        </Card>
        <Card className="Transactions">
          <h2 className="Total Transactions">{transactions.length}</h2>
          <p>Transactions</p>
        </Card>
      </div>
      <Card
        className="pie-chart-container"
        style={{
          minHeight: 420,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "flex-start"
        }}
      >
        <h3 style={{ textAlign: "center", marginTop: 20 }}>Total Expenses Breakdown</h3>
        {chartData.length > 0 ? (
          <PieChart width={700} height={340}>
          <Pie
            data={chartData}
            cx={230}
            cy={170}
            innerRadius={90}
            outerRadius={130}
            minAngle={4}
            dataKey="value"
            paddingAngle={1}
            labelLine={false}
          >
          {chartData.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={getCategoryColor(entry.name, index)} />
          ))}
          </Pie>
  <Tooltip />
  <Legend
    layout="vertical"
    align="right"
    verticalAlign="middle"
    iconType="circle"
    formatter={(value, entry) => {
      const slice = chartData.find((d) => d.name === value);
      const percent = slice
        ? ((slice.value / chartTotal) * 100).toFixed(2)
        : "0.00";
      return (
        <span>
          {value} ${slice?.value || 0} ({percent}%)
        </span>
      );
    }}
    wrapperStyle={{ right: -120, width: 250 }}
  />
      </PieChart>
        ) : (
          <div
            style={{
              width: 700,
              height: 340,
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            <span>No expense transactions to display.</span>
          </div>
        )}
      </Card>
    </div>
  );
}
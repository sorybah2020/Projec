import Card from "./Card";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Mortgage / Rent", value: 2000, color: "#66D9EF" },
  { name: "Food", value: 1, color: "#A6E22E" },
  { name: "Utilities", value: 4160, color: "#FD971F" },
  { name: "Bills", value: 3960, color: "#A368FC" },
  { name: "Shopping", value: 3375, color: "#FF79C6" },
  { name: "Transport", value: 3230, color: "#E91E63" },
  { name: "Insurance", value: 2890, color: "#673AB7" },
  { name: "Health Care", value: 2480, color: "#009688" },
  { name: "Clothing", value: 2255, color: "#3F51B5" },
  { name: "Others", value: 4844, color: "#FFEB3B" },
];

export default function Dashboard() {
  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="p">
      {/* Income, Expenses, Balance */}
      <div className="row">
      <Card className="Income">
          <h2 className="Total Income">$43,300</h2>
          <p>Income</p>
        </Card>
        <Card className="Expenses">
        <h2 className="Total Expenses">${totalExpenses.toLocaleString()}</h2>
          <p>Expenses</p>
        </Card>
        <Card className="Balance">
          <h2 className="Total Balances">$5,247</h2>
          <p> Balance</p>
        </Card>
        <Card className="Transactions">
          <h2 className="Total Transactions">1,283</h2>
          <p>Transactions</p>
        </Card>
      </div>

      {/* Pie Chart with Labels on the Right */}
      <Card className="pie-chart-container">
      <h3>Total Expenses</h3>
      <PieChart width={700} height={400} margin={{ left: 200 }}>
        <Pie
          data={data}
          cx="20%"
          cy="50%"
          innerRadius={100}  
          outerRadius={150}
          dataKey="value"
          label={({ name }) => name}
          labelLine
          
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip />
        <Legend
          layout="vertical"
          align="right"
          verticalAlign="middle"
          wrapperStyle={{ right: -150 }} 
          formatter={(value, entry) => {
            const total = data.reduce((sum, item) => sum + item.value, 0);
            const percent = ((entry.payload.value / total) * 100).toFixed(2);
            return `${value} $${entry.payload.value} (${percent}%)`;
          }}
        />
      </PieChart>
    </Card>
    </div>
  );
}
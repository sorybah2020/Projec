import Card from "./Card";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

const data = [
  { name: "Mortgage / Rent", value: 2000, color: "#66D9EF" },
  { name: "Food", value: 1, color: "#A6E22E" },
  { name: "Utilities", value: 4160, color: "#FD971F" },
  { name: "Bills", value: 3960, color: "#A368FC" },
  { name: "Shopping", value: 3375, color: "#FF79C6" },
  { name: "Transportation", value: 3230, color: "#E91E63" },
  { name: "Insurance", value: 2890, color: "#673AB7" },
  { name: "Health Care", value: 2480, color: "#009688" },
  { name: "Clothing", value: 2255, color: "#3F51B5" },
  { name: "Others", value: 4844, color: "#FFEB3B" },
];

export default function Dashboard() {
  const totalExpenses = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <div className="p-6">
      {/* Income, Expenses, Balance */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <Card className="p-4 text-center bg-blue-50 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-blue-600">$43,300</h2>
          <p className="text-gray-500">Income</p>
        </Card>
        <Card className="p-4 text-center bg-red-50 shadow-md rounded-lg">
        <h2 className="text-2xl font-bold text-red-600">${totalExpenses.toLocaleString()}</h2>
          <p className="text-gray-500">Expenses</p>
        </Card>
        <Card className="p-4 text-center bg-green-50 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-green-600">$5,247</h2>
          <p className="text-gray-500">Balance</p>
        </Card>
        <Card className="p-4 text-center bg-gray-50 shadow-md rounded-lg">
          <h2 className="text-2xl font-bold text-gray-700">1,283</h2>
          <p className="text-gray-500">Transactions</p>
        </Card>
      </div>

      {/* Pie Chart with Labels on the Right */}
      <div className="bg-white p-6 rounded-lg shadow-md flex flex-col md:flex-row">
        <div className="w-full md:w-2/3 flex justify-center">
          <PieChart width={400} height={400}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              outerRadius={120}
              innerRadius={60} 
              dataKey="value"
              label
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
        <div className="w-full md:w-1/3 flex flex-col justify-center">
          <Legend layout="vertical" align="left" verticalAlign="middle" />
        </div>
      </div>
    </div>
  );
}
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import Card from "./Card";
import { PieChart, Pie, Cell, Legend, Tooltip } from "recharts";

export default function DashboardTable() {
  const { auth } = useContext(AuthContext); // Access auth data from context
  const [transactions, setTransactions] = useState([]); // Transactions data
  const [totalIncome, setTotalIncome] = useState(0); // Total income
  const [totalExpenses, setTotalExpenses] = useState(0); // Total expenses
  const [balance, setBalance] = useState(0); // Balance
  const [isLoading, setIsLoading] = useState(true); // Loading state

  const fetchTransactions = async () => {
    if (auth?._id) {
      try {
        const response = await fetch(`http://localhost:3000/api/get/transactions/${auth._id}`);
        const data = await response.json();

        // Log the fetched transactions to debug
        console.log("Fetched Transactions:", data);

        if (Array.isArray(data)) {
          setTransactions(data);
          calculateTotals(data);
        } else {
          setTransactions([]);
          calculateTotals([]);
        }
      } catch (error) {
        console.error("Failed to fetch transactions:", error);
        setTransactions([]);
        calculateTotals([]);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const getRandomColor = () => {
    const getRandomValue = () => Math.floor(Math.random() * 156) + 100;
    const r = getRandomValue();
    const g = getRandomValue();
    const b = getRandomValue();
    return `rgb(${r}, ${g}, ${b})`; 
  };

  const calculateTotals = (transactionsData) => {
    // Filter and sum income transactions
    const income = transactionsData
      .filter((transaction) => transaction.cashflow === "Income" && transaction.amount)
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    // Filter and sum expense transactions
    const expenses = transactionsData
      .filter((transaction) => transaction.cashflow === "Expense" && transaction.amount)
      .reduce((sum, transaction) => sum + Number(transaction.amount), 0);

    // Update state with calculated values
    setTotalIncome(income);
    setTotalExpenses(expenses);
    setBalance(income - expenses);

    // Log calculated totals to debug
    console.log("Income:", income, "Expenses:", expenses, "Balance:", income - expenses);
  };

  useEffect(() => {
    fetchTransactions();
  }, [auth?._id]);

  if (isLoading) {
    return <p>Loading...</p>; // Show a loading indicator while fetching data
  }

  return (
    <div className="p">
      {/* Income, Expenses, Balance */}
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
          <h2 className="Total Balances">${auth?.budget}</h2>
          <p>Balance</p>
        </Card>
        <Card className="Transactions">
          <h2 className="Total Transactions">{transactions.length}</h2>
          <p>Transactions</p>
        </Card>
      </div>

      {/* Pie Chart with Labels on the Right */}
      <Card className="pie-chart-container">
        <h3>Total Expenses Breakdown</h3>
        {transactions.length > 0 ? (
          <PieChart width={700} height={400} margin={{ left: 200 }}>
            <Pie
              data={transactions.map((transaction) => ({
                name: transaction.category || "Unknown",
                value: transaction.amount || 0,
                color: transaction.color || "#8884d8",
              }))}
              cx="20%"
              cy="50%"
              innerRadius={100}
              outerRadius={150}
              dataKey="value"
              label={({ name }) => name}
              labelLine
            >
              {transactions.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || getRandomColor()} />
              ))}
            </Pie>
            <Tooltip />
            <Legend
              layout="vertical"
              align="right"
              verticalAlign="middle"
              wrapperStyle={{ right: -150 }}
              formatter={(value, entry) => {
                const total = transactions.reduce((sum, item) => sum + Number(item.amount || 0), 0);
                const percent = ((entry.payload.value / total) * 100).toFixed(2);
                return `${value} $${entry.payload.value} (${percent}%)`;
              }}
            />
          </PieChart>
        ) : (
          <p>No transactions to display.</p> // Default message if no data
        )}
      </Card>
    </div>
  );
}
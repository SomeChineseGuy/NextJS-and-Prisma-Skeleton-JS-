import TransactionList from "@/components/ui/TransactionsList";
import { PrismaClient } from "@prisma/client";

import { getDateByMonthYear, getTransactions } from "../../helpers/selectors";
import axios from "axios";
import { useState } from "react";

export default function Transactions({ month, year, transactions }) {
  const [currentTransactions, setCurrentTransactions] = useState(transactions);
  const [currentMonth, setCurrentMonth] = useState(month);
  const [currentYear, setCurrentYear] = useState(year);

  const getTransactionsAPI = (month, year) => {
    if (month === 0) {
      month = 12;
      year--;
    }

    if (month === 13) {
      month = 1;
      year++;
    }

    axios
      .get("../api/transactions", { params: { month, year } })
      .then((res) => {
        setCurrentMonth(Number(res.data.month));
        setCurrentYear(Number(res.data.year));
        setCurrentTransactions(res.data.transactions);
      });
  };

  console.log(currentMonth, currentYear);

  return (
    <main className="flex flex-col p-5">
      <div className="flex flex-row mb-5 space-x-5">
        <div className="flex-1 bg-nav-gray rounded-lg p-5">Checkings</div>
        <div className="flex-1 bg-nav-gray rounded-lg p-5">Savings</div>
      </div>
      <div className="flex space-x-5 justify-center mb-5">
        <button
          className="flex"
          onClick={() => getTransactionsAPI(currentMonth - 1, currentYear)}
        >
          Previous month
        </button>
        <h1 className="flex">
          {getDateByMonthYear(currentMonth, currentYear)}
        </h1>
        <button
          className="flex"
          onClick={() => getTransactionsAPI(currentMonth + 1, currentYear)}
        >
          Next month
        </button>
      </div>
      <TransactionList transactions={currentTransactions} />
    </main>
  );
}

export async function getServerSideProps() {
  const prisma = new PrismaClient();

  const currentMonth = new Date().getMonth() + 1;
  const currentYear = new Date().getFullYear();
  const transactions = await getTransactions(1, currentMonth, currentYear);

  return {
    props: {
      month: currentMonth,
      year: currentYear,
      transactions: transactions,
    },
  };
}

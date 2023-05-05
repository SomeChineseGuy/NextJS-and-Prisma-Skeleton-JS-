import { PrismaClient } from "@prisma/client";
import TransactionList from "../../components/ui/TransactionsList";

export async function getServerSideProps() {
  const prisma = new PrismaClient();
  const transactions = await prisma.transaction.findMany({
    include: { sources: true, categories: true },
  });

  const formattedTransactions = transactions.map((transaction) => {
    return {
      ...transaction,
      date: transaction.date.toLocaleDateString(),
    };
  });

  return {
    props: {
      transactions: formattedTransactions,
    },
  };
}

export default function Transactions({ transactions }) {
  return <TransactionList transactions={transactions} />;
}

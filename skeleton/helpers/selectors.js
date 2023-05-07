import { PrismaClient } from "@prisma/client";

export function getDateByMonthYear(month, year) {
  const monthName = new Date(year, month - 1, 1).toLocaleString("default", {
    month: "long",
  });

  return `${monthName} ${year}`;
}

export async function getTransactions(userId, month, year) {
  const prisma = new PrismaClient();
  const transactions = await prisma.transaction.findMany({
    where: {
      sources: { user: { id: userId } },
      AND: [
        { date: { gte: new Date(year, month - 1, 1) } },
        { date: { lt: new Date(year, month, 1) } },
      ],
    },
    include: { sources: true, categories: true },
  });

  const formattedTransactions = transactions.map((transaction) => {
    return {
      ...transaction,
      date: transaction.date.toLocaleDateString(),
    };
  });

  const groupedTransactions = formattedTransactions.reduce(
    (result, transaction) => {
      !result[transaction.date]
        ? (result[transaction.date] = [transaction])
        : result[transaction.date].push(transaction);

      return result;
    },
    {}
  );

  const sortedKeys = Object.keys(groupedTransactions).sort((a, b) => {
    return new Date(b) - new Date(a);
  });

  const sortedTransactions = sortedKeys.map((date) => {
    return {
      date: date,
      transactions: groupedTransactions[date],
    };
  });

  return sortedTransactions;
}

import { users } from "../prisma/users.js";
import { accounts } from "../prisma/accounts.js";
import { sources } from "../prisma/sources.js";
import { categories } from "../prisma/categories.js";
import { transactions } from "../prisma/transactions.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // npx prisma db push --force-reset && npx prisma db push && npx prisma db seed

  // Users run first
  await Promise.all(
    users.map(async (user) => {
      await prisma.user.create({ data: user });
    })
  );

  // Accounts
  const accountPromises = accounts.map(async (account) => {
    return prisma.account.create({ data: account });
  });

  // Sources
  const sourcePromises = sources.map(async (source) => {
    return prisma.source.create({ data: source });
  });

  // Categories
  const categoryPromises = categories.map(async (category) => {
    return prisma.category.create({ data: category });
  });

  // Wait for all the promises to complete before continuing
  await Promise.all([
    ...accountPromises,
    ...sourcePromises,
    ...categoryPromises,
  ]);

  const transactionPromises = transactions.map(async (transaction) => {
    return prisma.transaction.create({ data: transaction });
  });
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

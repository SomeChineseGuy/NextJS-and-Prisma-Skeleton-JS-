// import { users } from "../prisma/users.js";
// import { accounts } from "../prisma/accounts.js";
// import { sources } from "../prisma/sources.js";
// import { categories } from "../prisma/categories.js";
// import { transactions } from "../prisma/transactions.js";
const { PrismaClient } = require("@prisma/client");
const users = require("./users.json");
const accounts = require("./accounts.json");
const categories = require("./categories.json");
const sources = require("./sources.json");
const transactions = require("./transactions.json");

const prisma = new PrismaClient();

async function main() {
  // npx prisma db push --force-reset && npx prisma db push && npx prisma db seed

  // // Users run first
  // await Promise.all(
  //   users.map(async (user) => {
  //     await prisma.user.create({ data: user });
  //   })
  // );

  // // Accounts
  // const accountPromises = accounts.map(async (account) => {
  //   return prisma.account.create({ data: account });
  // });

  // // Sources
  // const sourcePromises = sources.map(async (source) => {
  //   return prisma.source.create({ data: source });
  // });

  // // Categories
  // const categoryPromises = categories.map(async (category) => {
  //   return prisma.category.create({ data: category });
  // });

  // // Wait for all the promises to complete before continuing
  // await Promise.all([
  //   ...accountPromises,
  //   ...sourcePromises,
  //   ...categoryPromises,
  // ]);

  // const transactionPromises = transactions.map(async (transaction) => {
  //   return prisma.transaction.create({ data: transaction });
  // });

  for (const user of users) {
    await prisma.user.create({
      data: user,
    });
  }

  for (const account of accounts) {
    await prisma.account.create({
      data: account,
    });
  }

  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }

  for (const source of sources) {
    await prisma.source.create({
      data: source,
    });
  }

  for (const transaction of transactions) {
    await prisma.transaction.create({
      data: transaction,
    });
  }
}

main()
  .catch((e) => {
    console.log(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

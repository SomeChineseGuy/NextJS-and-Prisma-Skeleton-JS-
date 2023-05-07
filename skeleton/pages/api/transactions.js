import { getTransactions } from "@/helpers/selectors";

export default async function handler(req, res) {
  const userId = 1;
  const month = req.query.month;
  const year = req.query.year;

  const transactions = await getTransactions(userId, month, year);

  res.send(JSON.stringify({ month, year, transactions }));
}

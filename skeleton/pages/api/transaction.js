//see the outputs of console.log() here in the terminal

import { PrismaClient } from '@prisma/client'

export default async function Adding (req, res) {
  const inputValue = req.body;
  console.log('inputValue', inputValue);
  res.status(200).json({home: 'here'});
}

/* inputValue = {
  accounts: "Checking",
  amountDecimal: 1200,
  categories: "Clothing",
  sources: "Presto",
  title: "da"
}
*/
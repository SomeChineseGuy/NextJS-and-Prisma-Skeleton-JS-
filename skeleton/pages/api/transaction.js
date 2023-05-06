//see the outputs of console.log() here in the terminal

import { PrismaClient } from '@prisma/client'

export default async function Adding (req, res) {
  const prisma = new PrismaClient();
  const inputValue = req.body;
  const inputSource = inputValue.sourceId //user's input of source in text
  const sources = await prisma.source.findMany();

  //check if the recorded source is already in the source table. If not, we'll add a new row to the source table with the recorded source name as well.
  let sourceID = 0
  sources.forEach(item => item.name === inputSource ? sourceID = item.id : false); //record the sourceID when we find it in the sources array
  if (sourceID) { //the recorded source exists in the source table
    inputValue.sourceId = sourceID
    await prisma.transaction.create({data: inputValue});
    console.log('inputValue', inputValue);
  } else { //the recorded source doesn't exist in the source table
    const NewSource = await prisma.source.create({data: { //create a new source row
      name: inputSource,
      userId: 1
    }});
    
    inputValue.sourceId = NewSource.id
    await prisma.transaction.create({data: inputValue}); //create a new transaction row with the new source row's id
    console.log('inputValue', inputValue);
  }

  res.status(200).json({add: 'transaction'});
}

/* inputValue = { (passed in from the front-end)
  title: "da",
  accountId: 1 ("Checking"),
  amountDecimal: 1200,
  categoryId: 1 ("Clothing"),
  sourceId: "Presto",
  date: ("today's time")
}
*/
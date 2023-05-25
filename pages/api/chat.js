import { PrismaClient } from "@prisma/client";

export default async function handler(req, res) {
  const { dataActiveChat, dataSender, dataMessage } = req.body;
  const id = parseInt(dataActiveChat);
  const prisma = new PrismaClient();
  const message = await prisma.message.create({
    data: {
      chat_id: { connect: { id: id } },
      message_content: dataMessage,
      sender: dataSender,
    },
  });
  res.send(message);
}

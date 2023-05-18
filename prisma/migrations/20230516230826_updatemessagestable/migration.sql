/*
  Warnings:

  - You are about to drop the column `message_content_receiver` on the `Message` table. All the data in the column will be lost.
  - You are about to drop the column `message_content_sender` on the `Message` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat" INTEGER NOT NULL,
    "message_content" TEXT,
    "sender" BOOLEAN,
    CONSTRAINT "Message_chat_fkey" FOREIGN KEY ("chat") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("chat", "id") SELECT "chat", "id" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

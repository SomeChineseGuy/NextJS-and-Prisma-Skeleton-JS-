/*
  Warnings:

  - You are about to alter the column `sender` on the `Message` table. The data in that column could be lost. The data in that column will be cast from `String` to `Boolean`.

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
INSERT INTO "new_Message" ("chat", "id", "message_content", "sender") SELECT "chat", "id", "message_content", "sender" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

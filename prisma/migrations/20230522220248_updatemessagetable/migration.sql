-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat" INTEGER NOT NULL,
    "message_content" TEXT,
    "sender" TEXT,
    CONSTRAINT "Message_chat_fkey" FOREIGN KEY ("chat") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Message" ("chat", "id", "message_content", "sender") SELECT "chat", "id", "message_content", "sender" FROM "Message";
DROP TABLE "Message";
ALTER TABLE "new_Message" RENAME TO "Message";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

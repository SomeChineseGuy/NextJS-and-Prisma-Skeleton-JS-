/*
  Warnings:

  - Added the required column `profile_photo` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Chat" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "adventure" INTEGER NOT NULL,
    "match" INTEGER NOT NULL,
    "active" BOOLEAN NOT NULL,
    CONSTRAINT "Chat_adventure_fkey" FOREIGN KEY ("adventure") REFERENCES "Adventure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Chat_match_fkey" FOREIGN KEY ("match") REFERENCES "Match" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "chat" INTEGER NOT NULL,
    "message_content" TEXT NOT NULL,
    CONSTRAINT "Message_chat_fkey" FOREIGN KEY ("chat") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT,
    "about_me" TEXT,
    "current_location" TEXT,
    "open_to_travel" BOOLEAN NOT NULL,
    "profile_photo" BLOB NOT NULL
);
INSERT INTO "new_User" ("about_me", "age", "current_location", "email", "first_name", "gender", "id", "open_to_travel", "password") SELECT "about_me", "age", "current_location", "email", "first_name", "gender", "id", "open_to_travel", "password" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

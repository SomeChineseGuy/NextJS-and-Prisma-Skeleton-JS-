/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "about_me" TEXT,
    "current_location" TEXT,
    "open_to_travel" BOOLEAN,
    "profile_photo" BLOB
);
INSERT INTO "new_User" ("about_me", "age", "current_location", "email", "first_name", "gender", "id", "open_to_travel", "profile_photo") SELECT "about_me", "age", "current_location", "email", "first_name", "gender", "id", "open_to_travel", "profile_photo" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
CREATE TABLE "new_Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL,
    "user_1" INTEGER NOT NULL,
    "user_2" INTEGER NOT NULL,
    "adventure" INTEGER NOT NULL,
    CONSTRAINT "Match_user_1_fkey" FOREIGN KEY ("user_1") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_user_2_fkey" FOREIGN KEY ("user_2") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_adventure_fkey" FOREIGN KEY ("adventure") REFERENCES "Adventure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Match" ("active", "adventure", "id", "user_1", "user_2") SELECT "active", "adventure", "id", "user_1", "user_2" FROM "Match";
DROP TABLE "Match";
ALTER TABLE "new_Match" RENAME TO "Match";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

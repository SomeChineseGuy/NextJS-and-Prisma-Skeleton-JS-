/*
  Warnings:

  - You are about to drop the `Destinations` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Users` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Destinations";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Users";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT,
    "password" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" TEXT,
    "about_me" TEXT,
    "current_location" TEXT,
    "open_to_travel" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "Destination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "photo" BLOB,
    "description" TEXT
);

-- CreateTable
CREATE TABLE "Match" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "active" BOOLEAN NOT NULL,
    "user_1" INTEGER NOT NULL,
    "user_2" INTEGER NOT NULL,
    "adventure" INTEGER NOT NULL,
    CONSTRAINT "Match_user_1_fkey" FOREIGN KEY ("user_1") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Match_adventure_fkey" FOREIGN KEY ("adventure") REFERENCES "Adventure" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Adventure" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "gender_preference" TEXT NOT NULL,
    "destination" INTEGER NOT NULL,
    "user" INTEGER NOT NULL,
    CONSTRAINT "Adventure_destination_fkey" FOREIGN KEY ("destination") REFERENCES "Destination" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Adventure_user_fkey" FOREIGN KEY ("user") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

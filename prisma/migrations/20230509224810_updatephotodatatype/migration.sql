-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Destination" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "city" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "photo" TEXT,
    "description" TEXT
);
INSERT INTO "new_Destination" ("city", "country", "description", "id", "photo") SELECT "city", "country", "description", "id", "photo" FROM "Destination";
DROP TABLE "Destination";
ALTER TABLE "new_Destination" RENAME TO "Destination";
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "age" INTEGER,
    "gender" TEXT,
    "about_me" TEXT,
    "current_location" TEXT,
    "open_to_travel" BOOLEAN,
    "profile_photo" TEXT
);
INSERT INTO "new_User" ("about_me", "age", "current_location", "email", "first_name", "gender", "id", "open_to_travel", "profile_photo") SELECT "about_me", "age", "current_location", "email", "first_name", "gender", "id", "open_to_travel", "profile_photo" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "first_name" TEXT NOT NULL,
    "age" TEXT,
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

/*
  Warnings:

  - You are about to drop the `MenuItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MenuItem";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "JidelniPolozka" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kategorie" TEXT NOT NULL,
    "nazev" TEXT NOT NULL,
    "popis" TEXT,
    "cena" INTEGER NOT NULL,
    "alergeny" TEXT,
    "gram" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "OteviraciDoba" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "den" TEXT NOT NULL,
    "cas" TEXT NOT NULL
);

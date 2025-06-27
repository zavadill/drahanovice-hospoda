/*
  Warnings:

  - You are about to drop the `Menu` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Menu";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MenuData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kategorie" TEXT NOT NULL,
    "nazev" TEXT NOT NULL,
    "popis" TEXT,
    "cena" INTEGER NOT NULL,
    "alergeny" TEXT,
    "gram" TEXT
);

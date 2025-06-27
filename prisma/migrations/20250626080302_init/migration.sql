/*
  Warnings:

  - You are about to drop the `MenuData` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OteviraciDoba` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "MenuData";
PRAGMA foreign_keys=on;

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "OteviraciDoba";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "MenuItem" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nazev" TEXT NOT NULL,
    "popis" TEXT,
    "cena" INTEGER NOT NULL,
    "gram" TEXT NOT NULL,
    "alergeny" TEXT,
    "kategorie" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

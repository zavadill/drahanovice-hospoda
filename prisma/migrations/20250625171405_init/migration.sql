-- CreateTable
CREATE TABLE "Menu" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kategorie" TEXT NOT NULL,
    "nazev" TEXT NOT NULL,
    "popis" TEXT,
    "cena" INTEGER NOT NULL,
    "alergeny" TEXT,
    "gram" TEXT
);

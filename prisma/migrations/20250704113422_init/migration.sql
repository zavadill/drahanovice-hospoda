-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_MenuData" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "kategorie" TEXT NOT NULL,
    "nazev" TEXT NOT NULL,
    "popis" TEXT,
    "cena" INTEGER,
    "alergeny" TEXT,
    "gram" TEXT NOT NULL
);
INSERT INTO "new_MenuData" ("alergeny", "cena", "gram", "id", "kategorie", "nazev", "popis") SELECT "alergeny", "cena", "gram", "id", "kategorie", "nazev", "popis" FROM "MenuData";
DROP TABLE "MenuData";
ALTER TABLE "new_MenuData" RENAME TO "MenuData";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

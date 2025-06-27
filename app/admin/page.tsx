"use client";

import React, { useEffect, useState } from "react";

type MenuItem = {
  id: number;
  kategorie: string;
  nazev: string;
  popis: string;
  cena: number;
  alergeny: string;
  gram: string;
};

type OteviraciDen = {
  id: number;
  den: string;
  cas: string;
};

const kategorieMap: Record<string, string> = {
  PREDKRMY: "Předkrmy",
  POLEVKY: "Polévky",
  HLAVNI_JIDLA: "Hlavní jídla",
  DEZERTY: "Dezerty",
  NAPOJE: "Nápoje",
};

export default function AdminPage() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [newMenuItem, setNewMenuItem] = useState<Omit<MenuItem, "id">>({
    kategorie: "PREDKRMY",
    nazev: "",
    popis: "",
    cena: 0,
    alergeny: "",
    gram: "",
  });

  const [oteviraciDoba, setOteviraciDoba] = useState<OteviraciDen[]>([]);
  const [newOteviraciDen, setNewOteviraciDen] = useState<Omit<OteviraciDen, "id">>({
    den: "",
    cas: "",
  });

  useEffect(() => {
    fetchMenu();
    fetchOteviraciDoba();
  }, []);

  async function fetchMenu() {
    const res = await fetch("/api/menu");
    if (res.ok) {
      const data = await res.json();
      setMenuData(data);
    }
  }

  async function fetchOteviraciDoba() {
    const res = await fetch("/api/oteviraci-doba");
    if (res.ok) {
      const data = await res.json();
      setOteviraciDoba(data);
    }
  }

  async function addMenuItem() {
    if (!newMenuItem.nazev.trim() || newMenuItem.cena <= 0) return;
    const res = await fetch("/api/menu", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMenuItem),
    });
    if (res.ok) {
      setNewMenuItem({
        kategorie: "PREDKRMY",
        nazev: "",
        popis: "",
        cena: 0,
        alergeny: "",
        gram: "",
      });
      fetchMenu();
    }
  }

  async function updateMenuItem(id: number, updated: Partial<MenuItem>) {
    await fetch(`/api/menu/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    fetchMenu();
  }

  async function deleteMenuItem(id: number) {
    await fetch(`/api/menu/${id}`, { method: "DELETE" });
    fetchMenu();
  }

  async function addOteviraciDen() {
    if (!newOteviraciDen.den || !newOteviraciDen.cas) return;
    const res = await fetch("/api/oteviraci-doba", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newOteviraciDen),
    });
    if (res.ok) {
      setNewOteviraciDen({ den: "", cas: "" });
      fetchOteviraciDoba();
    }
  }

  async function updateOteviraciDen(id: number, updated: Partial<OteviraciDen>) {
    await fetch(`/api/oteviraci-doba/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updated),
    });
    fetchOteviraciDoba();
  }

  async function deleteOteviraciDen(id: number) {
    await fetch(`/api/oteviraci-doba/${id}`, { method: "DELETE" });
    fetchOteviraciDoba();
  }

  return (
    <div className="w-full mx-auto p-6">
      <h1 className="text-3xl font-bold mb-10 text-center">Admin Panel</h1>

      {/* MENU SEKCE */}
      <section className="mb-16">
        <h2 className="text-2xl font-semibold mb-6">Menu</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addMenuItem();
            }}
            className="space-y-4 bg-white p-6 rounded-xl shadow-md"
          >
            <select
              value={newMenuItem.kategorie}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, kategorie: e.target.value })}
              className="w-full p-2 border rounded"
            >
              {Object.entries(kategorieMap).map(([key, label]) => (
                <option key={key} value={key}>
                  {label}
                </option>
              ))}
            </select>

            <input
              type="text"
              placeholder="Název"
              value={newMenuItem.nazev}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, nazev: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Popis"
              value={newMenuItem.popis}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, popis: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="number"
              placeholder="Cena"
              value={newMenuItem.cena}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, cena: Number(e.target.value) })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Alergeny"
              value={newMenuItem.alergeny}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, alergeny: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Gramáž"
              value={newMenuItem.gram}
              onChange={(e) => setNewMenuItem({ ...newMenuItem, gram: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Přidat položku
            </button>
          </form>

          {/* MENU LIST */}
          <div className="space-y-4 max-h-[500px] overflow-y-auto">
            {menuData.map((item) => (
              <div
                key={item.id}
                className="flex flex-wrap md:flex-nowrap items-center gap-2 bg-gray-100 p-4 rounded shadow-sm"
              >
                <div className="w-full md:w-1/6 font-medium">{kategorieMap[item.kategorie]}</div>
                <input
                  value={item.nazev}
                  onChange={(e) => updateMenuItem(item.id, { nazev: e.target.value })}
                  className="w-full md:w-1/4 p-2 border rounded"
                />
                <input
                  value={item.popis}
                  onChange={(e) => updateMenuItem(item.id, { popis: e.target.value })}
                  className="w-full md:w-1/4 p-2 border rounded"
                />
                <input
                  type="number"
                  value={item.cena}
                  onChange={(e) => updateMenuItem(item.id, { cena: Number(e.target.value) })}
                  className="w-20 p-2 border rounded"
                />
                <input
                  value={item.alergeny}
                  onChange={(e) => updateMenuItem(item.id, { alergeny: e.target.value })}
                  className="w-24 p-2 border rounded"
                />
                <input
                  value={item.gram}
                  onChange={(e) => updateMenuItem(item.id, { gram: e.target.value })}
                  className="w-24 p-2 border rounded"
                />
                <button
                  onClick={() => deleteMenuItem(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Smazat
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* OTEVÍRACÍ DOBA */}
      <section>
        <h2 className="text-2xl font-semibold mb-6">Otevírací doba</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {/* FORM */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              addOteviraciDen();
            }}
            className="space-y-4 bg-white p-6 rounded-xl shadow-md"
          >
            <input
              type="text"
              placeholder="Den (např. Pondělí)"
              value={newOteviraciDen.den}
              onChange={(e) => setNewOteviraciDen({ ...newOteviraciDen, den: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <input
              type="text"
              placeholder="Čas (např. 8:00 - 17:00)"
              value={newOteviraciDen.cas}
              onChange={(e) => setNewOteviraciDen({ ...newOteviraciDen, cas: e.target.value })}
              className="w-full p-2 border rounded"
            />
            <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Přidat den
            </button>
          </form>

          {/* ZOBRAZENÍ */}
          <div className="space-y-4 max-h-[300px] overflow-y-auto">
            {oteviraciDoba.map((den) => (
              <div
                key={den.id}
                className="flex flex-wrap md:flex-nowrap items-center gap-2 bg-gray-100 p-4 rounded shadow-sm"
              >
                <input
                  value={den.den}
                  onChange={(e) => updateOteviraciDen(den.id, { den: e.target.value })}
                  className="w-full md:w-1/2 p-2 border rounded"
                />
                <input
                  value={den.cas}
                  onChange={(e) => updateOteviraciDen(den.id, { cas: e.target.value })}
                  className="w-full md:w-1/3 p-2 border rounded"
                />
                <button
                  onClick={() => deleteOteviraciDen(den.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Smazat
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

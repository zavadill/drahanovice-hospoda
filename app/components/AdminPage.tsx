// app/components/AdminPage.tsx
"use client";

import React, { useEffect, useState, useMemo, FC, FormEvent } from "react";
import { Pencil, Trash2, Save, X, LoaderCircle } from "lucide-react";

// --- TYPY ---
type MenuItem = {
  id: number;
  kategorie: string;
  nazev: string;
  popis: string | null; // Může být null
  cena: number;
  alergeny: string | null; // Může být null
  gram: string;
};

type OteviraciDen = {
  id: number;
  den: string;
  cas: string;
};

type Notification = {
  message: string;
  type: "success" | "error";
};

const kategorieMap: Record<string, string> = {
  PREDKRMY: "Předkrmy",
  POLEVKY: "Polévky",
  HLAVNI_JIDLA: "Hlavní jídla",
  DEZERTY: "Dezerty",
  NAPOJE: "Nápoje",
};

// --- POMOCNÉ KOMPONENTY ---

const NotificationBanner: FC<{ notification: Notification | null; onDismiss: () => void }> = ({
  notification,
  onDismiss,
}) => {
  if (!notification) return null;

  const baseStyle =
    "fixed top-5 right-5 p-4 rounded-lg shadow-lg text-white flex items-center z-50 animate-fade-in-down max-w-xs";
  const styles = {
    success: "bg-green-500",
    error: "bg-red-500",
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, 4000);
    return () => clearTimeout(timer);
  }, [notification, onDismiss]);

  return (
    <div className={`${baseStyle} ${styles[notification.type]}`}>
      <p className="truncate">{notification.message}</p>
      <button onClick={onDismiss} className="ml-4 p-1 rounded-full hover:bg-white/20">
        <X size={16} />
      </button>
    </div>
  );
};

const MenuItemRow: FC<{
  item: MenuItem;
  onUpdate: (id: number, data: Partial<MenuItem>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isProcessing: boolean;
}> = ({ item, onUpdate, onDelete, isProcessing }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedItem, setEditedItem] = useState(item);

  useEffect(() => {
    setEditedItem(item);
  }, [item]);

  const handleSave = async () => {
    // Odstraníme 'id' a 'kategorie' z odesílaných dat, pokud je nechceme měnit v řádku
    const { id, kategorie, ...updateData } = editedItem;
    await onUpdate(item.id, updateData);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedItem(item);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Opravdu si přejete smazat položku "${item.nazev}"?`)) {
      onDelete(item.id);
    }
  };

  if (isEditing) {
    return (
      <div className="bg-white p-4 rounded-lg shadow-sm flex flex-col md:grid md:grid-cols-6 gap-3 items-center md:items-start">
        <input
          value={editedItem.nazev}
          onChange={(e) => setEditedItem({ ...editedItem, nazev: e.target.value })}
          className="p-2 border rounded col-span-2 w-full md:w-auto"
          placeholder="Název"
        />
        <input
          value={editedItem.popis || ''} // Handle null for popis
          onChange={(e) => setEditedItem({ ...editedItem, popis: e.target.value })}
          className="p-2 border rounded col-span-2 w-full md:w-auto"
          placeholder="Popis"
        />
        <div className="flex gap-2 w-full md:w-auto">
          <input
            type="number"
            value={editedItem.cena}
            onChange={(e) => setEditedItem({ ...editedItem, cena: Number(e.target.value) })}
            className="p-2 border rounded w-24 flex-shrink-0"
            placeholder="Cena"
          />
          <input
            value={editedItem.gram}
            onChange={(e) => setEditedItem({ ...editedItem, gram: e.target.value })}
            className="p-2 border rounded w-24 flex-shrink-0"
            placeholder="Gramáž"
          />
        </div>
        <input
          value={editedItem.alergeny || ''} // Handle null for alergeny
          onChange={(e) => setEditedItem({ ...editedItem, alergeny: e.target.value })}
          className="p-2 border rounded col-span-2 w-full md:w-auto"
          placeholder="Alergeny"
        />
        <div className="flex items-center gap-2 justify-end w-full md:w-auto mt-2 md:mt-0">
          <button
            onClick={handleSave}
            disabled={isProcessing}
            className="p-2 text-green-600 hover:text-green-800 disabled:opacity-50"
          >
            <Save />
          </button>
          <button
            onClick={handleCancel}
            disabled={isProcessing}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
          >
            <X />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 p-4 rounded-lg flex flex-col md:grid md:grid-cols-6 gap-3 items-center md:items-start hover:bg-gray-100 transition-colors">
      <div className="col-span-2 font-semibold truncate w-full md:w-auto">{item.nazev}</div>
      <div className="col-span-2 text-sm text-gray-600 break-words w-full md:w-auto">{item.popis}</div>
      <div className="flex gap-4 w-full md:w-auto">
        <span className="font-bold">{item.cena} Kč</span>
        <span className="text-gray-500">{item.gram}</span>
      </div>
      <div className="text-sm text-gray-500 w-full md:w-auto">{item.alergeny}</div> {/* Display alergeny */}
      <div className="flex items-center gap-2 justify-end w-full md:w-auto mt-2 md:mt-0">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isProcessing}
          className="p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
          aria-label={`Upravit položku ${item.nazev}`}
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={handleDelete}
          disabled={isProcessing}
          className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50"
          aria-label={`Smazat položku ${item.nazev}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

const OpeningHoursRow: FC<{
  den: OteviraciDen;
  onUpdate: (id: number, data: Partial<OteviraciDen>) => Promise<void>;
  onDelete: (id: number) => Promise<void>;
  isProcessing: boolean;
}> = ({ den, onUpdate, onDelete, isProcessing }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedDen, setEditedDen] = useState(den);

  useEffect(() => {
    setEditedDen(den);
  }, [den]);

  const handleSave = async () => {
    await onUpdate(den.id, editedDen);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditedDen(den);
    setIsEditing(false);
  };

  const handleDelete = () => {
    if (window.confirm(`Opravdu si přejete smazat den "${den.den}"?`)) {
      onDelete(den.id);
    }
  };

  if (isEditing) {
    return (
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-white p-3 rounded-lg shadow-sm">
        <input
          value={editedDen.den}
          onChange={(e) => setEditedDen({ ...editedDen, den: e.target.value })}
          className="p-2 border rounded w-full md:w-2/5"
          placeholder="Den"
        />
        <input
          value={editedDen.cas}
          onChange={(e) => setEditedDen({ ...editedDen, cas: e.target.value })}
          className="p-2 border rounded w-full md:flex-grow"
          placeholder="Čas"
        />
        <div className="flex items-center gap-2 justify-end w-full md:w-auto mt-2 md:mt-0">
          <button
            onClick={handleSave}
            disabled={isProcessing}
            className="p-2 text-green-600 hover:text-green-800 disabled:opacity-50"
            aria-label={`Uložit den ${den.den}`}
          >
            <Save />
          </button>
          <button
            onClick={handleCancel}
            disabled={isProcessing}
            className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50"
            aria-label={`Zrušit úpravu dne ${den.den}`}
          >
            <X />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row items-start md:items-center gap-3 bg-gray-50 p-3 rounded-lg hover:bg-gray-100 transition-colors">
      <strong className="w-full md:w-2/5 truncate">{den.den}</strong>
      <span className="flex-grow break-words w-full md:w-auto">{den.cas}</span>
      <div className="flex items-center gap-2 justify-end w-full md:w-auto mt-2 md:mt-0">
        <button
          onClick={() => setIsEditing(true)}
          disabled={isProcessing}
          className="p-2 text-blue-600 hover:text-blue-800 disabled:opacity-50"
          aria-label={`Upravit den ${den.den}`}
        >
          <Pencil size={18} />
        </button>
        <button
          onClick={handleDelete}
          disabled={isProcessing}
          className="p-2 text-red-600 hover:text-red-800 disabled:opacity-50"
          aria-label={`Smazat den ${den.den}`}
        >
          <Trash2 size={18} />
        </button>
      </div>
    </div>
  );
};

export default function AdminPage() {
  const [menuData, setMenuData] = useState<MenuItem[]>([]);
  const [oteviraciDoba, setOteviraciDoba] = useState<OteviraciDen[]>([]);

  const [newMenuItem, setNewMenuItem] = useState<Omit<MenuItem, "id">>({
    kategorie: "PREDKRMY",
    nazev: "",
    popis: "",
    cena: 0,
    alergeny: "",
    gram: "",
  });
  const [newOteviraciDen, setNewOteviraciDen] = useState<Omit<OteviraciDen, "id">>({
    den: "",
    cas: "",
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState<Notification | null>(null);

  const showNotification = (message: string, type: "success" | "error") => {
    setNotification({ message, type });
  };

  const groupedMenu = useMemo(() => {
    return menuData.reduce((acc, item) => {
      const categoryLabel = kategorieMap[item.kategorie] || "Ostatní";
      if (!acc[categoryLabel]) {
        acc[categoryLabel] = [];
      }
      acc[categoryLabel].push(item);
      return acc;
    }, {} as Record<string, MenuItem[]>);
  }, [menuData]);

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const [menuRes, oteviraciDobaRes] = await Promise.all([fetch("/api/menu"), fetch("/api/oteviraci-doba")]);
      if (!menuRes.ok || !oteviraciDobaRes.ok) throw new Error("Nepodařilo se načíst data ze serveru.");
      const menu = await menuRes.json();
      const doba = await oteviraciDobaRes.json();
      setMenuData(menu);
      setOteviraciDoba(doba);
    } catch (error) {
      showNotification(error instanceof Error ? error.message : "Neznámá chyba při načítání dat.", "error");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleApiCall = async (apiCall: () => Promise<Response>, successMessage: string, errorMessage: string) => {
    setIsProcessing(true);
    try {
      const res = await apiCall();
      if (!res.ok) {
        const errorData = await res.text();
        throw new Error(errorData || errorMessage);
      }
      showNotification(successMessage, "success");
      await fetchData();
    } catch (error) {
      showNotification(error instanceof Error ? error.message : errorMessage, "error");
    } finally {
      setIsProcessing(false);
    }
  };

  const addMenuItem = async (e: FormEvent) => {
    e.preventDefault();
    if (!newMenuItem.nazev.trim() || newMenuItem.cena <= 0) {
      showNotification("Název a cena musí být vyplněny.", "error");
      return;
    }
    await handleApiCall(
      () =>
        fetch("/api/menu", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newMenuItem),
        }),
      "Položka menu byla úspěšně přidána.",
      "Chyba při přidávání položky menu."
    );
    setNewMenuItem({ kategorie: "PREDKRMY", nazev: "", popis: "", cena: 0, alergeny: "", gram: "" });
  };

  const updateMenuItem = async (id: number, updated: Partial<MenuItem>) => {
    await handleApiCall(
      () =>
        fetch(`/api/menu/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "update", payload: updated }),
        }),
      "Položka menu byla aktualizována.",
      "Chyba při aktualizaci položky menu."
    );
  };

  const deleteMenuItem = async (id: number) => {
    await handleApiCall(
      () =>
        fetch(`/api/menu/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "delete" }),
        }),
      "Položka menu byla smazána.",
      "Chyba při mazání položky menu."
    );
  };

  const addOteviraciDen = async (e: FormEvent) => {
    e.preventDefault();
    if (!newOteviraciDen.den || !newOteviraciDen.cas) {
      showNotification("Den a čas musí být vyplněny.", "error");
      return;
    }
    await handleApiCall(
      () =>
        fetch("/api/oteviraci-doba", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newOteviraciDen),
        }),
      "Den byl úspěšně přidán.",
      "Chyba při přidávání dne."
    );
    setNewOteviraciDen({ den: "", cas: "" });
  };

  const updateOteviraciDen = async (id: number, updated: Partial<OteviraciDen>) => {
    await handleApiCall(
      () =>
        fetch(`/api/oteviraci-doba/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "update", payload: updated }),
        }),
      "Otevírací doba byla aktualizována.",
      "Chyba při aktualizaci otevírací doby."
    );
  };

  const deleteOteviraciDen = async (id: number) => {
    await handleApiCall(
      () =>
        fetch(`/api/oteviraci-doba/${id}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: "delete" }),
        }),
      "Den byl smazán.",
      "Chyba při mazání dne."
    );
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <LoaderCircle className="animate-spin text-gray-500" size={48} />
      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen p-4 sm:p-6 lg:p-8 mt-16">
      <NotificationBanner notification={notification} onDismiss={() => setNotification(null)} />
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-gray-800 text-center">Admin Panel</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEVÝ SLOUPEC - FORMULÁŘE */}
          <aside className="lg:col-span-1 space-y-8">
            {/* FORMULÁŘ PRO MENU */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Přidat položku do menu</h2>
              <form onSubmit={addMenuItem} className="space-y-4">
                <select
                  value={newMenuItem.kategorie}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, kategorie: e.target.value })}
                  className="w-full p-2 border rounded-md bg-gray-50"
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
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Popis"
                  value={newMenuItem.popis || ''}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, popis: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="number"
                  placeholder="Cena"
                  value={newMenuItem.cena}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, cena: Number(e.target.value) })}
                  className="w-full p-2 border rounded-md"
                  required
                  min={1}
                />
                <input
                  type="text"
                  placeholder="Alergeny"
                  value={newMenuItem.alergeny || ''}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, alergeny: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
                <input
                  type="text"
                  placeholder="Gramáž"
                  value={newMenuItem.gram}
                  onChange={(e) => setNewMenuItem({ ...newMenuItem, gram: e.target.value })}
                  className="w-full p-2 border rounded-md"
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-2 bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-md disabled:opacity-50 transition-colors"
                >
                  Přidat položku
                </button>
              </form>
            </div>

            {/* FORMULÁŘ PRO OTEVÍRACÍ DOBU */}
            <div className="bg-white p-6 rounded-xl shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700">Přidat otevírací den</h2>
              <form onSubmit={addOteviraciDen} className="space-y-4">
                <input
                  type="text"
                  placeholder="Den"
                  value={newOteviraciDen.den}
                  onChange={(e) => setNewOteviraciDen({ ...newOteviraciDen, den: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
                <input
                  type="text"
                  placeholder="Čas"
                  value={newOteviraciDen.cas}
                  onChange={(e) => setNewOteviraciDen({ ...newOteviraciDen, cas: e.target.value })}
                  className="w-full p-2 border rounded-md"
                  required
                />
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full mt-2 bg-green-600 hover:bg-green-700 text-white py-2 rounded-md disabled:opacity-50 transition-colors"
                >
                  Přidat den
                </button>
              </form>
            </div>
          </aside>

          {/* PRAVÝ SLOUPEC - SEZNAMY */}
          <section className="lg:col-span-2 space-y-12">
            {/* MENU SEZNAM */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Menu</h2>
              {Object.entries(groupedMenu).map(([category, items]) => (
                <div key={category} className="mb-10">
                  <h3 className="text-2xl font-semibold mb-4 text-gray-700">{category}</h3>
                  <div className="space-y-3">
                    {items.map((item) => (
                      <MenuItemRow
                        key={item.id}
                        item={item}
                        onUpdate={updateMenuItem}
                        onDelete={deleteMenuItem}
                        isProcessing={isProcessing}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* OTEVÍRACÍ DOBA SEZNAM */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Otevírací doba</h2>
              <div className="space-y-3">
                {oteviraciDoba.map((den) => (
                  <OpeningHoursRow
                    key={den.id}
                    den={den}
                    onUpdate={updateOteviraciDen}
                    onDelete={deleteOteviraciDen}
                    isProcessing={isProcessing}
                  />
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
// app/access-denied/page.tsx
import Link from 'next/link';

export default function AccessDeniedPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-4">Přístup Odepřen</h1>
      <p className="text-lg text-gray-700 mb-8">Nemáte oprávnění k zobrazení této stránky.</p>
      <Link href="/" className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
        Zpět na domovskou stránku
      </Link>
    </div>
  );
}
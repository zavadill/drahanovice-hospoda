// middleware.ts
import { auth } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server"; // Ujistěte se, že NextRequest je importován

export default auth((req: NextRequest & { auth: any }) => { // <--- ZMĚNA: Přidání explicitního typu pro req
    const { pathname } = req.nextUrl;
    const session = req.auth; // TypeScript by nyní měl vědět, že req.auth existuje

    // Your existing logic
    if (!session && pathname.startsWith('/admin')) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (pathname.startsWith('/admin')) {
        // Here, 'session' is already typed based on your lib/auth.ts declaration
        // but 'req.auth' might still need a hint if 'session' is not directly assigned from 'req.auth'
        if (!session || (session.user as any)?.role !== 'admin') { // Keep (session.user as any) if your Session interface isn't fully updated
            return NextResponse.redirect(new URL('/access-denied', req.url));
        }
    }

    if (session && pathname === '/login') {
        return NextResponse.redirect(new URL('/admin', req.url));
    }

    return NextResponse.next();
});

export const config = {
    matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
import { NextResponse } from 'next/server';

export async function middleware(request) {
    try {
        const publicPages = ['/login', '/register', '/', '/about'];
        const isPublicPage = publicPages.includes(request.nextUrl.pathname);

        const accessToken = request.cookies.get('access')?.value;

        if (!accessToken && !isPublicPage) {
            return NextResponse.redirect(new URL('/login', request.url));
        }

        if (accessToken && isPublicPage) {
            return NextResponse.redirect(new URL('/dashboard', request.url));
        }

        return NextResponse.next();
    } catch (error) {
        console.error('Middleware error:', error);
        return NextResponse.error();
    }
}

export const config = {
    matcher: ['/', '/login', '/register', '/about', '/dashboard/:path*'],
};

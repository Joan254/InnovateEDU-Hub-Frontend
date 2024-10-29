import { NextResponse } from "next/server";
import { jwtVerify } from "jose";  

async function verifyToken(token) {
    try {
        const secretKey = new TextEncoder().encode(process.env.JWT_SECRET);  
        const { payload } = await jwtVerify(token, secretKey);  
        return payload; 
    } catch (error) {
        return null;
    }
}

export async function middleware(request) {
     try {
        const publicPages = ['/login', '/register', '/', '/about'];
        const isPublicPage = publicPages.includes(request.nextUrl.pathname);
        
        const researchereducatorPages= ['/dashboard/my_publications'];

        const isresearchereducatorPage = researchereducatorPages.includes(request.nextUrlpathname);
 
        const token = request.cookies.get('token')?.value;
        if (!token && !isPublicPage) {
            return NextResponse.redirect(new URL('/login', request.nextUrl));
        }

        if (token) {
            const payload = await verifyToken(token);  
            if (!payload) {
            
                return NextResponse.redirect(new URL('/login', request.nextUrl));
            }

            const { role } = payload; 

            if (isPublicPage && token ) {
                return NextResponse.redirect(new URL('/dashboard', request.nextUrl)); 
            }

            if (isresearchereducatorPage && (role!=='researcher' && role!=='educator')) {
                return NextResponse.redirect(new URL('/unauthorized', request.nextUrl)); 
            }

        }

        return NextResponse.next();
    } catch (error) {
        return NextResponse.error();
    }
}

export const config = {
 
    matcher: ['/', '/about', '/login', '/register', '/dashboard/my_publications', '/dashboard/mentorship', '/dashboard/collaboration'
        ],
};

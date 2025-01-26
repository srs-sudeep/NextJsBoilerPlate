import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export function routeAuthentication(req: NextRequest) {
    const token = req.cookies.get('token')?.value;

    if (!token) {
        return NextResponse.redirect(new URL('/login', req.url));
    }

    try {
        const secret = process.env.JWT_SECRET;
        if (!secret) {
            throw new Error('JWT_SECRET is not defined');
        }
        const decodedToken = jwt.verify(token, secret);
        const userRole = (decodedToken as jwt.JwtPayload).role;

        if (req.nextUrl.pathname.startsWith('/admin') && userRole !== 'ROLE_ADMIN') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        else if (req.nextUrl.pathname.startsWith('/doctor') && userRole !== 'ROLE_DOCTOR') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        else if (req.nextUrl.pathname.startsWith('/operator') && userRole !== 'ROLE_OPERATOR') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        else if (req.nextUrl.pathname.startsWith('/patient') && userRole !== 'ROLE_PATIENT') {
            return NextResponse.redirect(new URL('/unauthorized', req.url));
        }
        else {
            return NextResponse.next();
        }

        
    } catch (error) {
        return NextResponse.redirect(new URL('/login', req.url));
    }
}
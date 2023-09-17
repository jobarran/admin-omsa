import { getToken } from 'next-auth/jwt';
import { NextRequest, NextResponse } from 'next/server';

export default async function middleware(req: NextRequest) {

  const session = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
    cookieName: process.env.NODE_ENV === 'production' ? '__Secure-next-auth.session-token' : 'next-auth.session-token'
})

//console.log(session)

if (!session) {
    const requestedPage = req.nextUrl.pathname;
    const url = req.nextUrl.clone();

    url.pathname = `/auth/login`;
    //url.searchParams.append("callbackUrl", req.url)
    //console.log(url)
    return NextResponse.redirect(url);
  }
 
  return NextResponse.next();

}

export const config = { matcher: [ "/user/:legajo*" ]}

//http://localhost:3000/auth/login?callbackUrl=http%3A%2F%2Flocalhost%3A3000%2Fuser%2F123

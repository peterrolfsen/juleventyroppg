import { NextResponse } from 'next/server'
import { getUserFromEventyrApi, isProgressRegistered, updateSublevel } from "./helper"

export async function middleware(request) {
  const username = request.nextUrl.searchParams.get("username");

  if (!username) {
    return redirectToErrorPage(request);
  }
 
  try {
    const user = await getUserFromEventyrApi(username);

    if (!user) {
      return redirectToErrorPage(request);
    }

    if (user) {
      const progressRegistered = isProgressRegistered(user);

      if (!progressRegistered) {
        await updateSublevel(0, username);
      }
    }

  } catch (err) {
    return redirectToErrorPage(request);
  }

  return NextResponse.next();
}
 

function redirectToErrorPage(request) {
  return NextResponse.redirect(new URL('/authfeil', request.url))
}

export const config = {
  matcher: "/((?!authfeil|api|images|Images|public|_next).*)",
};

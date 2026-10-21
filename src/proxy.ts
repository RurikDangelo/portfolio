import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/content/site";

// "/" e qualquer caminho sem idioma vão sempre para o português; o inglês fica no botão EN.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  request.nextUrl.pathname = `/pt${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};

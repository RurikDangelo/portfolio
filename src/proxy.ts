import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/content/site";

// "/" e qualquer caminho sem idioma vão para /pt ou /en conforme o navegador.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (locales.some((l) => pathname === `/${l}` || pathname.startsWith(`/${l}/`))) return;

  const aceita = request.headers.get("accept-language") ?? "";
  const lang = /^\s*pt/i.test(aceita) || !/^\s*en/i.test(aceita) ? "pt" : "en";
  request.nextUrl.pathname = `/${lang}${pathname}`;
  return NextResponse.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!_next|api|favicon.ico|.*\\..*).*)"],
};

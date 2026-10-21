import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Geist, Geist_Mono } from "next/font/google";
import { dicionarios, hasLocale, locales } from "@/content/site";
import "../globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({ params }: LayoutProps<"/[lang]">): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { meta } = dicionarios[lang];
  return {
    title: meta.titulo,
    description: meta.descricao,
    alternates: { languages: { "pt-BR": "/pt", en: "/en" } },
    openGraph: { title: meta.titulo, description: meta.descricao, type: "website" },
  };
}

// Roda antes da primeira pintura: aplica o tema salvo ou o do sistema, sem piscar.
const temaInicial = `try{var t=localStorage.getItem("tema");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){}`;

export default async function RootLayout({ children, params }: LayoutProps<"/[lang]">) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return (
    <html
      lang={lang === "pt" ? "pt-BR" : "en"}
      data-theme="dark"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} antialiased`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: temaInicial }} />
      </head>
      <body className="min-h-[100dvh] overflow-x-clip">
        <div className="grain" aria-hidden />
        {children}
      </body>
    </html>
  );
}

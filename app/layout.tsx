import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "ArcBuilder - AI-Powered Website Generator",
  description: "Transform high-level briefs into production-ready React applications with our sophisticated AI-powered platform",
  keywords: "AI website builder, React generator, Next.js, web development, automated coding",
  authors: [{ name: "ArcBuilder Team" }],
  creator: "ArcBuilder",
  publisher: "ArcBuilder",
  metadataBase: new URL("https://arcbuilder.ai"),
  openGraph: {
    title: "ArcBuilder - AI-Powered Website Generator",
    description: "Transform high-level briefs into production-ready React applications",
    url: "https://arcbuilder.ai",
    siteName: "ArcBuilder",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "ArcBuilder - AI-Powered Website Generator",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "ArcBuilder - AI-Powered Website Generator",
    description: "Transform high-level briefs into production-ready React applications",
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

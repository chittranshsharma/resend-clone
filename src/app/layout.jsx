import "./globals.css";
import { Inter } from "next/font/google";
import localFont from "next/font/local";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
});

const domaine = localFont({
  src: "./fonts/domaine.otf",
  variable: "--font-domaine",
  display: "swap",
});

export const metadata = {
  title: "Resend — Email for developers",
  description: "The best way to reach humans instead of spam folders. Send transactional and marketing emails at scale.",
  keywords: ["email API", "transactional email", "developer email", "email delivery"],
  openGraph: {
    title: "Resend — Email for developers",
    description: "The best way to reach humans instead of spam folders.",
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${domaine.variable}`}>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
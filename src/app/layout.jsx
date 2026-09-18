import "./globals.css";
import { Inter } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
  variable: "--font-inter",
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
    <html lang="en" className={inter.variable}>
      <body className="bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
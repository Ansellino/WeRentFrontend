import type { Metadata } from "next";
import { Inter, Marcellus } from "next/font/google"; 
import "./globals.css";
import { Providers } from "./providers";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });


const marcellus = Marcellus({ 
  weight: "400",
  subsets: ["latin"],
  variable: "--font-marcellus",
});

export const metadata: Metadata = {
  title: "WeRent — We Rent, We Return, We Repeat",
  description: "Fashion rental platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      {/* 3. Sisipkan variabel marcellus ke dalam class body */}
      <body className={`${inter.className} ${marcellus.variable}`}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
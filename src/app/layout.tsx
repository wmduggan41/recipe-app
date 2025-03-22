import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./styles/globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Recipe App",
  description: "A simple recipe browsing app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <div className="min-h-screen flex flex-col">
          {/* Navigation bar */}
          <header className="bg-green-700 text-white py-4 text-center text-2xl font-bold">
            Recipe App
          </header>

          {/* Main content */}
          <main className="flex-grow container mx-auto p-6">{children}</main>

          {/* Footer */}
          <footer className="bg-gray-900 text-white text-center py-4">
            &copy; {new Date().getFullYear()} Recipe App
          </footer>
        </div>
      </body>
    </html>
  );
}


'use client'
import "./globals.css";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { Inter } from "next/font/google";
import { MenuProvider } from '../context/MenuContext'
import { AuthProvider } from '@/context/AuthContext';
import { usePathname } from 'next/navigation';

const inter = Inter({ subsets: ["latin"] });

// export const metadata = {
//   title: "Restaurant",
//   description:
//     "This is an application to show how a digital menu would look like.",
// };

export default function RootLayout({ children }) {
  const pathname = usePathname();
  const showNavFooter = !(pathname === "/login" || pathname === "/signup");

  return (
    <html lang="en">
      <body className={inter.className}>  
      <AuthProvider>
        <MenuProvider>
            {showNavFooter && <Nav />}
            {children}
            {showNavFooter && <Footer />}
        </MenuProvider>    
        </AuthProvider>  
      </body>
    </html>
  );
}

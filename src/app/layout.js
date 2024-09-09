import { Inter } from "next/font/google";
import "./globals.css";
import { MenuProvider } from '../context/MenuContext'
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import { AuthProvider } from '@/context/AuthContext';

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Restaurant",
  description:
    "This is an application to show how a digital menu would look like.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>  
      <AuthProvider>
        <MenuProvider>
          <Nav />
          {children}
          <Footer />  
        </MenuProvider>    
        </AuthProvider>  
      </body>
    </html>
  );
}

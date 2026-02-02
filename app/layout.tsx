import type { Metadata } from "next";
import { Roboto } from 'next/font/google';
import Header from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import TanStackProvider from '@/components/TanStackProvider/TanStackProvider';
import { Toaster } from 'react-hot-toast';
import AuthProvider from '@/components/AuthProvider/AuthProvider'


const roboto = Roboto({
  subsets: ["latin"],
  weight: ['400', '700'],
  variable: '--font-roboto', 
  display: 'swap', 
});

export const metadata: Metadata = {
  title: "Create Next App",
  description: "NoteHub — application for creating, searching and managing notes.",
  openGraph: {
    title: "NoteHub",
      description: "NoteHub — application for creating, searching and managing notes.", 
    url: "https://notehub.app",
      images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: "NoteHub application preview",
      },
      ],
},
};

export default function RootLayout({
  modal,
  children,
}: Readonly<{
  modal: React.ReactNode;
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${roboto.variable}`}>
        <TanStackProvider>
          <AuthProvider>
        <Header />
        
          {children}
          {modal}
    <Toaster />
            <Footer />
            </AuthProvider>
      </TanStackProvider>
       
      </body>
    </html>
  );
}

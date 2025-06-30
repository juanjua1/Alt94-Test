import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import MainLayout from "@/components/layout/MainLayout";
import { NavigationProvider } from "@/contexts/NavigationContext";
import { PropertiesProvider } from "@/contexts/PropertiesContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import ToastProvider from "@/components/providers/ToastProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PropiedadesAR - Sistema de Recomendaciones Inmobiliarias",
  description: "Encuentra tu propiedad ideal con nuestro sistema inteligente de recomendaciones",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          <ToastProvider>
            <FavoritesProvider>
              <NavigationProvider>
                <PropertiesProvider>
                  <MainLayout>
                    {children}
                  </MainLayout>
                </PropertiesProvider>
              </NavigationProvider>
            </FavoritesProvider>
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

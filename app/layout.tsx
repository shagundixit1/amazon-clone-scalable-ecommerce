
import "./globals.css";
import { CartProvider } from "../context/CartContext";
import LayoutWrapper from "./LayoutWrapper";

export const metadata = {
  title: "Amazon Clone",
  description: "E-commerce app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-full font-sans">
        <CartProvider>
          <LayoutWrapper>
            {children}
          </LayoutWrapper>
        </CartProvider>
      </body>
    </html>
  );
}
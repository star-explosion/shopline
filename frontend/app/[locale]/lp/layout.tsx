import { CartProvider } from "@/context/CartContext";
import CartDrawer from "@/components/CartDrawer";

export default function LpLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <CartDrawer />
      {children}
    </CartProvider>
  );
}

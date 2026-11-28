import { createContext, useContext, useEffect, useState } from 'react';
import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

type CartContextType = {
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number | string) => void;
  isInCart: (productId: number | string) => boolean;
  increaseQuantity: (productId: number | string) => void;
  decreaseQuantity: (productId: number | string) => void;
  cartItems: CartItem[];
  totalPrice: number;
  totalQuantity: number;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [cartItems, setCartItems] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('cartItems');

    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: Product) => {
    setCartItems(prev => {
      if (prev.some(item => item.id === product.id)) {
        return prev;
      }

      return [...prev, { id: product.id, product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number | string) => {
    setCartItems(prev => prev.filter(p => p.id !== productId));
  };

  const isInCart = (productId: number | string) => {
    return cartItems.some(item => item.id === productId);
  };

  const increaseQuantity = (productId: number | string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item,
      ),
    );
  };

  const decreaseQuantity = (productId: number | string) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      ),
    );
  };

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0,
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        addToCart,
        removeFromCart,
        isInCart,
        decreaseQuantity,
        increaseQuantity,
        totalPrice,
        totalQuantity,
        cartItems,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }

  return context;
};

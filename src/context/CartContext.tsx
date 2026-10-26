import { createContext, useCallback, useContext, useMemo, useReducer, type ReactNode } from 'react';
import type { CartLine, MenuItem } from '@/types';

interface CartState {
  lines: CartLine[];
}

type Action =
  | { type: 'add'; item: MenuItem; qty?: number }
  | { type: 'inc'; id: string }
  | { type: 'dec'; id: string }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

function reducer(state: CartState, action: Action): CartState {
  switch (action.type) {
    case 'add': {
      const existing = state.lines.find((l) => l.item.id === action.item.id);
      if (existing) {
        return {
          lines: state.lines.map((l) =>
            l.item.id === action.item.id ? { ...l, qty: l.qty + (action.qty ?? 1) } : l
          ),
        };
      }
      return { lines: [...state.lines, { item: action.item, qty: action.qty ?? 1 }] };
    }
    case 'inc':
      return {
        lines: state.lines.map((l) =>
          l.item.id === action.id ? { ...l, qty: l.qty + 1 } : l
        ),
      };
    case 'dec':
      return {
        lines: state.lines
          .map((l) => (l.item.id === action.id ? { ...l, qty: l.qty - 1 } : l))
          .filter((l) => l.qty > 0),
      };
    case 'remove':
      return { lines: state.lines.filter((l) => l.item.id !== action.id) };
    case 'clear':
      return { lines: [] };
    default:
      return state;
  }
}

interface CartContextValue {
  lines: CartLine[];
  count: number;
  subtotal: number;
  deliveryFee: number;
  taxes: number;
  total: number;
  add: (item: MenuItem, qty?: number) => void;
  inc: (id: string) => void;
  dec: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  qtyOf: (id: string) => number;
}

const CartContext = createContext<CartContextValue | null>(null);

const FREE_DELIVERY_THRESHOLD = 499;
const DELIVERY_FEE = 40;
const TAX_RATE = 0.05; // 5% GST

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { lines: [] });

  const subtotal = useMemo(
    () => state.lines.reduce((s, l) => s + l.item.price * l.qty, 0),
    [state.lines]
  );
  const count = useMemo(
    () => state.lines.reduce((s, l) => s + l.qty, 0),
    [state.lines]
  );
  const deliveryFee = subtotal === 0 || subtotal >= FREE_DELIVERY_THRESHOLD ? 0 : DELIVERY_FEE;
  const taxes = Math.round(subtotal * TAX_RATE);
  const total = subtotal + deliveryFee + taxes;

  const qtyOf = useCallback((id: string) => {
    return state.lines.find((l) => l.item.id === id)?.qty ?? 0;
  }, [state.lines]);

  const value: CartContextValue = {
    lines: state.lines,
    count,
    subtotal,
    deliveryFee,
    taxes,
    total,
    add: (item, qty) => dispatch({ type: 'add', item, qty }),
    inc: (id) => dispatch({ type: 'inc', id }),
    dec: (id) => dispatch({ type: 'dec', id }),
    remove: (id) => dispatch({ type: 'remove', id }),
    clear: () => dispatch({ type: 'clear' }),
    qtyOf,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

export { FREE_DELIVERY_THRESHOLD, DELIVERY_FEE, TAX_RATE };

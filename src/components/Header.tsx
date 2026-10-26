import { ShoppingBag, UtensilsCrossed } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export function Header({ onCartClick }: { onCartClick: () => void }) {
  const { count } = useCart();

  return (
    <header className="sticky top-0 z-30 border-b border-stone-200/80 bg-cream/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <a href="#home" className="flex items-center gap-2.5">
          <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-600 text-white shadow-md">
            <UtensilsCrossed className="h-5 w-5" />
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-serif text-xl font-bold tracking-tight text-stone-900">
              Swaad Saagar
            </span>
            <span className="text-[11px] text-amber-700">స్వాద్ సాగర్ · Taste of Andhra</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 text-sm font-medium text-stone-600 md:flex">
          <a href="#home" className="transition-colors hover:text-amber-700">Home</a>
          <a href="#menu" className="transition-colors hover:text-amber-700">Menu</a>
          <a href="#about" className="transition-colors hover:text-amber-700">About</a>
        </nav>

        <button
          onClick={onCartClick}
          className="relative flex items-center gap-2 rounded-full bg-stone-900 px-4 py-2 text-sm font-semibold text-white transition-all hover:bg-stone-800 active:scale-[0.97]"
        >
          <ShoppingBag className="h-4 w-4" />
          <span className="hidden sm:inline">Cart</span>
          {count > 0 && (
            <span className="absolute -right-1.5 -top-1.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-amber-500 px-1 text-xs font-bold text-white ring-2 ring-cream">
              {count}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}

import { useEffect } from 'react';
import { Minus, Plus, ShoppingBag, Trash2, X } from 'lucide-react';
import { useCart, FREE_DELIVERY_THRESHOLD } from '@/context/CartContext';
import { inr } from '@/utils/format';

export function CartDrawer({
  open,
  onClose,
  onCheckout,
}: {
  open: boolean;
  onClose: () => void;
  onCheckout: () => void;
}) {
  const { lines, count, subtotal, deliveryFee, taxes, total, inc, dec, remove } = useCart();

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  const remaining = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const progress = Math.min(100, (subtotal / FREE_DELIVERY_THRESHOLD) * 100);

  return (
    <>
      <div
        onClick={onClose}
        className={`fixed inset-0 z-40 bg-stone-900/50 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'pointer-events-none opacity-0'
        }`}
      />
      <aside
        className={`fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ${
          open ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <header className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-5 w-5 text-amber-700" />
            <h2 className="font-serif text-xl font-semibold text-stone-900">Your Cart</h2>
            <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-800">
              {count} {count === 1 ? 'item' : 'items'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100"
            aria-label="Close cart"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        {lines.length > 0 && (
          <div className="border-b border-stone-200 bg-amber-50/60 px-5 py-3">
            {remaining > 0 ? (
              <p className="text-xs text-stone-600">
                Add <span className="font-semibold text-amber-800">{inr(remaining)}</span> more for
                free delivery
              </p>
            ) : (
              <p className="text-xs font-semibold text-green-700">Free delivery unlocked!</p>
            )}
            <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-stone-200">
              <div
                className="h-full rounded-full bg-amber-500 transition-all duration-500"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        )}

        <div className="flex-1 overflow-y-auto px-5 py-4">
          {lines.length === 0 ? (
            <div className="flex h-full flex-col items-center justify-center text-center">
              <div className="flex h-20 w-20 items-center justify-center rounded-full bg-amber-100">
                <ShoppingBag className="h-10 w-10 text-amber-500" />
              </div>
              <p className="mt-4 font-serif text-lg text-stone-700">Your cart is empty</p>
              <p className="mt-1 text-sm text-stone-400">Add some delicious Telugu thali items!</p>
            </div>
          ) : (
            <ul className="space-y-3">
              {lines.map((line) => (
                <li
                  key={line.item.id}
                  className="flex gap-3 rounded-xl bg-white p-3 shadow-sm ring-1 ring-stone-200/60"
                >
                  <img
                    src={line.item.image}
                    alt={line.item.name}
                    className="h-16 w-16 shrink-0 rounded-lg object-cover"
                  />
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <h3 className="text-sm font-semibold leading-tight text-stone-900">
                        {line.item.name}
                      </h3>
                      <button
                        onClick={() => remove(line.item.id)}
                        className="text-stone-300 transition-colors hover:text-red-500"
                        aria-label={`Remove ${line.item.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-xs text-stone-400">{inr(line.item.price)} each</p>
                    <div className="mt-auto flex items-center justify-between pt-1.5">
                      <div className="flex items-center gap-1 rounded-full bg-stone-100">
                        <button
                          onClick={() => dec(line.item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="h-3.5 w-3.5" />
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{line.qty}</span>
                        <button
                          onClick={() => inc(line.item.id)}
                          className="flex h-7 w-7 items-center justify-center rounded-full text-stone-700 transition-colors hover:bg-stone-200"
                          aria-label="Increase quantity"
                        >
                          <Plus className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <span className="font-semibold text-stone-900">
                        {inr(line.item.price * line.qty)}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {lines.length > 0 && (
          <footer className="border-t border-stone-200 bg-white px-5 py-4">
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between text-stone-500">
                <dt>Subtotal</dt>
                <dd>{inr(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-stone-500">
                <dt>Taxes (5% GST)</dt>
                <dd>{inr(taxes)}</dd>
              </div>
              <div className="flex justify-between text-stone-500">
                <dt>Delivery</dt>
                <dd>{deliveryFee === 0 ? 'FREE' : inr(deliveryFee)}</dd>
              </div>
              <div className="mt-2 flex justify-between border-t border-dashed border-stone-200 pt-2 font-serif text-lg font-semibold text-stone-900">
                <span>Total</span>
                <span className="text-amber-700">{inr(total)}</span>
              </div>
            </dl>
            <button
              onClick={onCheckout}
              className="mt-4 w-full rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-700 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>
          </footer>
        )}
      </aside>
    </>
  );
}

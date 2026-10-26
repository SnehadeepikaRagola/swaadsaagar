import { CheckCircle2, Clock, Home, MapPin } from 'lucide-react';
import type { OrderInfo } from '@/components/CheckoutModal';
import { estDelivery, inr } from '@/utils/format';
import { useCart } from '@/context/CartContext';

export function ConfirmationModal({
  order,
  onClose,
  onHome,
}: {
  order: OrderInfo | null;
  onClose: () => void;
  onHome: () => void;
}) {
  const { lines, total } = useCart();
  if (!order) return null;

  const eta = estDelivery();

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/50 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="flex max-h-[92vh] w-full max-w-md flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl">
        <div className="flex flex-col items-center bg-gradient-to-b from-green-50 to-cream px-6 py-8 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-100 shadow-inner">
            <CheckCircle2 className="h-10 w-10 text-green-600" />
          </div>
          <h2 className="mt-4 font-serif text-2xl font-semibold text-stone-900">Order Confirmed!</h2>
          <p className="mt-1 text-sm text-stone-500">
            Dhanyavaadam, {order.name.split(' ')[0]}! We're preparing your meal.
          </p>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          <div className="flex items-center justify-between rounded-2xl bg-white p-4 ring-1 ring-stone-200/70">
            <div>
              <p className="text-xs uppercase tracking-wide text-stone-400">Order ID</p>
              <p className="font-mono text-sm font-semibold text-stone-900">{order.orderId}</p>
            </div>
            <div className="text-right">
              <p className="text-xs uppercase tracking-wide text-stone-400">Total</p>
              <p className="font-serif text-lg font-semibold text-amber-700">{inr(total)}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 rounded-2xl bg-amber-50 p-4">
            <Clock className="h-5 w-5 shrink-0 text-amber-700" />
            <div>
              <p className="text-sm font-semibold text-stone-800">Estimated delivery by {eta}</p>
              <p className="text-xs text-stone-500">Our rider will call before arriving</p>
            </div>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
              Items Ordered
            </h3>
            <ul className="space-y-1.5 rounded-2xl bg-white p-4 ring-1 ring-stone-200/70">
              {lines.map((l) => (
                <li key={l.item.id} className="flex justify-between text-sm">
                  <span className="text-stone-700">
                    <span className="font-medium">{l.qty}×</span> {l.item.name}
                  </span>
                  <span className="text-stone-500">{inr(l.item.price * l.qty)}</span>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-stone-400">
              Delivering To
            </h3>
            <div className="flex gap-2.5 rounded-2xl bg-white p-4 ring-1 ring-stone-200/70">
              <MapPin className="h-5 w-5 shrink-0 text-amber-700" />
              <div className="text-sm text-stone-700">
                <p className="font-medium">{order.name} · {order.phone}</p>
                <p>{order.address}</p>
                <p>{order.city} — {order.pincode}</p>
                {order.notes && <p className="mt-1 text-xs italic text-stone-400">Note: {order.notes}</p>}
              </div>
            </div>
          </div>
        </div>

        <footer className="space-y-2 border-t border-stone-200 bg-white px-6 py-4">
          <button
            onClick={onHome}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-700 active:scale-[0.98]"
          >
            <Home className="h-4 w-4" /> Back to Menu
          </button>
          <button
            onClick={onClose}
            className="w-full rounded-full px-6 py-2 text-sm font-medium text-stone-500 transition-colors hover:bg-stone-100"
          >
            Close
          </button>
        </footer>
      </div>
    </div>
  );
}

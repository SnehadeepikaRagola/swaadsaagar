import { useEffect, useState } from 'react';
import { CheckCircle2, MapPin, Receipt, X } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { estDelivery, inr } from '@/utils/format';

export interface OrderInfo {
  orderId: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  pincode: string;
  notes?: string;
}

export function CheckoutModal({
  open,
  onClose,
  onConfirmed,
}: {
  open: boolean;
  onClose: () => void;
  onConfirmed: (info: OrderInfo) => void;
}) {
  const { subtotal, deliveryFee, taxes, total, lines } = useCart();
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: '',
    notes: '',
  });

  useEffect(() => {
    if (open) {
      setErrors({});
      setSubmitting(false);
    }
  }, [open]);

  function update(field: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [field]: value }));
    if (errors[field]) setErrors((e) => ({ ...e, [field]: '' }));
  }

  function validate(): boolean {
    const next: Record<string, string> = {};
    if (!form.name.trim()) next.name = 'Please enter your name';
    if (!/^[6-9]\d{9}$/.test(form.phone.trim())) next.phone = 'Enter a valid 10-digit Indian mobile';
    if (form.address.trim().length < 8) next.address = 'Enter your full address';
    if (!form.city.trim()) next.city = 'Enter your city';
    if (!/^\d{6}$/.test(form.pincode.trim())) next.pincode = 'Enter a valid 6-digit pincode';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    const orderId = 'SWD' + Math.floor(100000 + Math.random() * 900000);
    setTimeout(() => {
      onConfirmed({ orderId, ...form });
      setSubmitting(false);
    }, 700);
  }

  if (!open) return null;

  const fieldBase =
    'w-full rounded-xl border bg-white px-4 py-2.5 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:ring-2 focus:ring-amber-400';
  const fieldClass = (field: keyof typeof form) =>
    `${fieldBase} ${errors[field] ? 'border-red-400' : 'border-stone-300'}`;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-stone-900/50 p-0 backdrop-blur-sm sm:items-center sm:p-4">
      <div className="flex max-h-[92vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-cream shadow-2xl sm:rounded-3xl">
        <header className="flex items-center justify-between border-b border-stone-200 px-5 py-4">
          <div className="flex items-center gap-2">
            <Receipt className="h-5 w-5 text-amber-700" />
            <h2 className="font-serif text-xl font-semibold text-stone-900">Checkout</h2>
          </div>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-full text-stone-500 transition-colors hover:bg-stone-100"
            aria-label="Close checkout"
          >
            <X className="h-5 w-5" />
          </button>
        </header>

        <div className="flex-1 overflow-y-auto">
          <div className="grid gap-5 p-5 md:grid-cols-2">
            <form id="checkout-form" onSubmit={handleSubmit} className="md:col-span-2 space-y-4" noValidate>
              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Full Name
                </label>
                <input
                  className={fieldClass('name')}
                  placeholder="e.g. Ramesh Kumar"
                  value={form.name}
                  onChange={(e) => update('name', e.target.value)}
                  autoComplete="name"
                />
                {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Mobile Number
                </label>
                <input
                  className={fieldClass('phone')}
                  placeholder="10-digit mobile"
                  inputMode="numeric"
                  maxLength={10}
                  value={form.phone}
                  onChange={(e) => update('phone', e.target.value.replace(/\D/g, ''))}
                  autoComplete="tel"
                />
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Delivery Address
                </label>
                <textarea
                  className={`${fieldClass('address')} min-h-[80px] resize-y`}
                  placeholder="House / Flat no, Street, Area, Landmark"
                  value={form.address}
                  onChange={(e) => update('address', e.target.value)}
                  rows={3}
                />
                {errors.address && <p className="mt-1 text-xs text-red-500">{errors.address}</p>}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                    City
                  </label>
                  <input
                    className={fieldClass('city')}
                    placeholder="e.g. Vijayawada"
                    value={form.city}
                    onChange={(e) => update('city', e.target.value)}
                    autoComplete="address-level2"
                  />
                  {errors.city && <p className="mt-1 text-xs text-red-500">{errors.city}</p>}
                </div>
                <div>
                  <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                    Pincode
                  </label>
                  <input
                    className={fieldClass('pincode')}
                    placeholder="6-digit"
                    inputMode="numeric"
                    maxLength={6}
                    value={form.pincode}
                    onChange={(e) => update('pincode', e.target.value.replace(/\D/g, ''))}
                    autoComplete="postal-code"
                  />
                  {errors.pincode && <p className="mt-1 text-xs text-red-500">{errors.pincode}</p>}
                </div>
              </div>

              <div className="md:col-span-2">
                <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-stone-500">
                  Cooking Notes (optional)
                </label>
                <input
                  className={fieldBase}
                  placeholder="e.g. less spicy, extra chutney"
                  value={form.notes}
                  onChange={(e) => update('notes', e.target.value)}
                />
              </div>
            </form>
          </div>

          <div className="mx-5 mb-4 rounded-2xl bg-white p-4 ring-1 ring-stone-200/70">
            <h3 className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-stone-500">
              <MapPin className="h-3.5 w-3.5" /> Order Summary
            </h3>
            <ul className="mb-3 max-h-32 space-y-1 overflow-y-auto text-sm">
              {lines.map((l) => (
                <li key={l.item.id} className="flex justify-between text-stone-600">
                  <span className="truncate pr-2">
                    {l.qty} × {l.item.name}
                  </span>
                  <span className="shrink-0 font-medium">{inr(l.item.price * l.qty)}</span>
                </li>
              ))}
            </ul>
            <dl className="space-y-1 text-sm">
              <div className="flex justify-between text-stone-500">
                <dt>Subtotal</dt>
                <dd>{inr(subtotal)}</dd>
              </div>
              <div className="flex justify-between text-stone-500">
                <dt>Taxes (5%)</dt>
                <dd>{inr(taxes)}</dd>
              </div>
              <div className="flex justify-between text-stone-500">
                <dt>Delivery</dt>
                <dd>{deliveryFee === 0 ? 'FREE' : inr(deliveryFee)}</dd>
              </div>
              <div className="mt-1 flex justify-between border-t border-dashed border-stone-200 pt-2 font-serif text-base font-semibold text-stone-900">
                <span>Total</span>
                <span className="text-amber-700">{inr(total)}</span>
              </div>
            </dl>
          </div>
        </div>

        <footer className="border-t border-stone-200 bg-white px-5 py-4">
          <button
            type="submit"
            form="checkout-form"
            disabled={submitting || lines.length === 0}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-md transition-all hover:bg-amber-700 disabled:opacity-60 active:scale-[0.98]"
          >
            {submitting ? (
              <>
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
                Placing Order...
              </>
            ) : (
              <>
                <CheckCircle2 className="h-5 w-5" /> Place Order · {inr(total)}
              </>
            )}
          </button>
          <p className="mt-2 text-center text-xs text-stone-400">
            Cash on delivery · No online payment
          </p>
        </footer>
      </div>
    </div>
  );
}

export { estDelivery };

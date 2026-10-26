import { Flame, Star } from 'lucide-react';
import type { MenuItem } from '@/types';
import { inr } from '@/utils/format';
import { useCart } from '@/context/CartContext';

function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}
      className={`flex h-5 w-5 items-center justify-center rounded border ${
        veg ? 'border-green-600 text-green-600' : 'border-red-600 text-red-600'
      }`}
    >
      <span className={`h-2 w-2 rounded-full ${veg ? 'bg-green-600' : 'bg-red-600'}`} />
    </span>
  );
}

function SpiceLevel({ level }: { level: 0 | 1 | 2 | 3 }) {
  if (level === 0) return null;
  return (
    <span className="inline-flex items-center gap-0.5">
      {Array.from({ length: level }).map((_, i) => (
        <Flame key={i} className="h-3 w-3 text-amber-500" />
      ))}
    </span>
  );
}

export function MenuCard({ item }: { item: MenuItem }) {
  const { add, inc, dec, qtyOf } = useCart();
  const qty = qtyOf(item.id);

  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-stone-200/70 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {item.popular && (
          <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-amber-500 px-2.5 py-1 text-xs font-semibold text-white shadow">
            <Star className="h-3 w-3 fill-white" /> Popular
          </span>
        )}
        <div className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full bg-white/90 px-2 py-1 shadow-sm backdrop-blur">
          <VegMark veg={item.veg} />
          <SpiceLevel level={item.spicy} />
        </div>
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-serif text-lg font-semibold leading-tight text-stone-900">
            {item.name}
          </h3>
          <span className="shrink-0 font-semibold text-amber-700">{inr(item.price)}</span>
        </div>
        <p className="mt-0.5 text-sm text-orange-700/80">{item.telugu}</p>
        <p className="mt-2 text-sm leading-relaxed text-stone-500">{item.description}</p>

        <div className="mt-4 pt-1">
          {qty === 0 ? (
            <button
              onClick={() => add(item)}
              className="w-full rounded-full bg-amber-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-amber-700 active:scale-[0.98]"
            >
              Add to Cart
            </button>
          ) : (
            <div className="flex items-center justify-between rounded-full bg-amber-600 text-white">
              <button
                onClick={() => dec(item.id)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition-colors hover:bg-amber-700 active:scale-95"
                aria-label={`Decrease ${item.name}`}
              >
                −
              </button>
              <span className="text-sm font-semibold">{qty} in cart</span>
              <button
                onClick={() => inc(item.id)}
                className="flex h-10 w-10 items-center justify-center rounded-full text-lg font-bold transition-colors hover:bg-amber-700 active:scale-95"
                aria-label={`Increase ${item.name}`}
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}

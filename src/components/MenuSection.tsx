import { useMemo, useState } from 'react';
import { categories } from '@/data/menu';
import { menu } from '@/data/menu';
import type { CategoryId } from '@/types';
import { MenuCard } from '@/components/MenuCard';
import { Search } from 'lucide-react';

type Filter = 'all' | 'veg' | 'non-veg' | CategoryId;

export function MenuSection() {
  const [active, setActive] = useState<Filter>('all');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    let list = menu;
    if (active === 'veg') list = list.filter((m) => m.veg);
    else if (active === 'non-veg') list = list.filter((m) => !m.veg);
    else if (active !== 'all') list = list.filter((m) => m.category === active);

    const q = query.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (m) =>
          m.name.toLowerCase().includes(q) ||
          m.telugu.includes(q) ||
          m.description.toLowerCase().includes(q)
      );
    }
    return list;
  }, [active, query]);

  const tabs: { id: Filter; label: string }[] = [
    { id: 'all', label: 'All' },
    ...categories.map((c) => ({ id: c.id as Filter, label: c.name })),
  ];

  return (
    <section id="menu" className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="text-center">
        <span className="text-xs font-semibold uppercase tracking-widest text-amber-700">
          Our Menu
        </span>
        <h2 className="mt-2 font-serif text-3xl font-bold text-stone-900 sm:text-4xl">
          Pick your favourites
        </h2>
        <p className="mx-auto mt-2 max-w-xl text-sm text-stone-500">
          From crispy starters to sweet endings — every dish is freshly prepared by our
          Telugu-speaking kitchen team.
        </p>
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-stone-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search dishes..."
            className="w-full rounded-full border border-stone-300 bg-white py-2.5 pl-10 pr-4 text-sm text-stone-900 placeholder-stone-400 outline-none transition-colors focus:ring-2 focus:ring-amber-400"
          />
        </div>

        <div className="inline-flex rounded-full bg-stone-100 p-1 text-sm">
          {(['all', 'veg', 'non-veg'] as Filter[]).map((f) => (
            <button
              key={f}
              onClick={() => setActive(f)}
              className={`rounded-full px-4 py-1.5 font-medium capitalize transition-all ${
                active === f ? 'bg-white text-amber-700 shadow-sm' : 'text-stone-500 hover:text-stone-700'
              }`}
            >
              {f === 'non-veg' ? 'Non-Veg' : f}
            </button>
          ))}
        </div>
      </div>

      <div className="mt-5 flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActive(tab.id)}
            className={`shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-all ${
              active === tab.id
                ? 'bg-amber-600 text-white shadow-sm'
                : 'bg-white text-stone-600 ring-1 ring-stone-200 hover:bg-stone-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="py-16 text-center text-stone-400">
          No dishes found. Try a different search or filter.
        </div>
      ) : (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      )}
    </section>
  );
}

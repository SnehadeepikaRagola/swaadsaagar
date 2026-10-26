import { ChevronDown, Flame, Leaf, Star, Truck } from 'lucide-react';

const HERO_IMG =
  'https://images.pexels.com/photos/5775684/pexels-photo-5775684.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="relative">
        <img
          src={HERO_IMG}
          alt="A traditional Indian thali spread"
          className="h-[560px] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-900/60 to-stone-900/30" />

        <div className="absolute inset-0 flex items-center">
          <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
            <div className="max-w-xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-amber-200 ring-1 ring-amber-300/30 backdrop-blur">
                <Star className="h-3 w-3 fill-amber-300" /> Authentic Andhra Kitchen
              </span>
              <h1 className="mt-4 font-serif text-4xl font-bold leading-[1.1] text-white drop-shadow-md sm:text-5xl md:text-6xl">
                Swaad Saagar
                <span className="block text-amber-400">స్వాద్ సాగర్</span>
              </h1>
              <p className="mt-4 max-w-md text-base leading-relaxed text-stone-200 sm:text-lg">
                A sea of taste — home-style Telugu thalis, fiery Andhra curries, fragrant
                biryanis and crispy dosas, delivered hot to your doorstep.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <a
                  href="#menu"
                  className="inline-flex items-center gap-2 rounded-full bg-amber-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all hover:bg-amber-500 active:scale-[0.97]"
                >
                  Explore Menu <ChevronDown className="h-4 w-4" />
                </a>
                <a
                  href="#about"
                  className="inline-flex items-center gap-2 rounded-full bg-white/10 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 backdrop-blur transition-colors hover:bg-white/20"
                >
                  Our Story
                </a>
              </div>

              <div className="mt-7 flex flex-wrap gap-5 text-sm text-stone-200">
                <span className="inline-flex items-center gap-1.5">
                  <Leaf className="h-4 w-4 text-green-400" /> Pure veg options
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Flame className="h-4 w-4 text-orange-400" /> Made to order
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Truck className="h-4 w-4 text-amber-300" /> Free delivery over ₹499
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

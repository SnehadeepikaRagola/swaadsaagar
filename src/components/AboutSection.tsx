import { Clock, Leaf, MapPin, Phone, ShieldCheck, Truck } from 'lucide-react';

const ABOUT_IMG =
  'https://images.pexels.com/photos/13871340/pexels-photo-13871340.jpeg?auto=compress&cs=tinysrgb&h=650&w=940';

const features = [
  { icon: Leaf, title: 'Fresh & Local', desc: 'Sourced every morning from Vijayawada mandi.' },
  { icon: Clock, title: 'Hot in 35 min', desc: 'Average delivery time across the twin cities.' },
  { icon: ShieldCheck, title: 'Hygiene First', desc: 'FSSAI-certified kitchen, no reused oil.' },
  { icon: Truck, title: 'Free Delivery', desc: 'On all orders above ₹499 within city limits.' },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-stone-900 text-stone-100">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
        <div className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-amber-400">
              Our Story
            </span>
            <h2 className="mt-2 font-serif text-3xl font-bold sm:text-4xl">
              Born in Andhra, served with love
            </h2>
            <p className="mt-4 max-w-md leading-relaxed text-stone-300">
              Swaad Saagar began in 1998 as a tiny tiffin centre in Vijayawada. Three generations
              later, we still grind our own masala, churn fresh paneer each dawn, and temper
              every dal the same way Ammamma taught us — slow, patient, generous with ghee.
            </p>
            <div className="mt-6 grid grid-cols-2 gap-4">
              {features.map((f) => (
                <div key={f.title} className="flex gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-600/20 text-amber-400">
                    <f.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-semibold text-white">{f.title}</p>
                    <p className="text-xs text-stone-400">{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <img
              src={ABOUT_IMG}
              alt="Warm restaurant dining room"
              className="h-[380px] w-full rounded-3xl object-cover shadow-2xl ring-1 ring-white/10"
            />
            <div className="absolute -bottom-5 -left-5 hidden rounded-2xl bg-amber-600 px-5 py-4 text-white shadow-xl sm:block">
              <p className="font-serif text-2xl font-bold">25+</p>
              <p className="text-xs text-amber-100">years of serving Andhra</p>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-4 border-t border-white/10 pt-10 sm:grid-cols-3">
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-amber-400" />
            <div className="text-sm">
              <p className="font-semibold text-white">Call to Order</p>
              <p className="text-stone-400">+91 90000 12345</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-amber-400" />
            <div className="text-sm">
              <p className="font-semibold text-white">Visit Us</p>
              <p className="text-stone-400">MG Road, Vijayawada, AP</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="h-5 w-5 text-amber-400" />
            <div className="text-sm">
              <p className="font-semibold text-white">Open Daily</p>
              <p className="text-stone-400">7:00 AM – 11:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="bg-stone-950 py-8 text-center text-xs text-stone-500">
      <p>
        Swaad Saagar · స్వాద్ సాగర్ — A sample online food ordering site. Prices in INR.
        No real payments are processed.
      </p>
    </footer>
  );
}

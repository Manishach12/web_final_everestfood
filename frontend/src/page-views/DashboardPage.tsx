import type { User } from '@/services/api';
import { DashboardShell } from '@/components/DashboardShell';

interface DashboardPageProps {
  user: User;
}

const heroItems = [
  { emoji: '🍗', name: 'Tandoori Chicken' },
  { emoji: '🥩', name: 'Flank Steak Cheddar' },
  { emoji: '🐟', name: 'Salmon' },
];

const featuredRestaurants = [
  { name: '4 Corners - Detroit Style Pizza', location: '', image: '🍕' },
  { name: 'Fire And Ice Pizzeria - Thamel', location: '', image: '🔥' },
  { name: 'The Workshop Eatery - Bakhundole', location: '', image: '🍽️' },
  { name: 'Le Trio - Jhamsikhel', location: '', image: '🍴' },
  { name: 'Burger Shack - Bakhundol', location: '', image: '🍔' },
  { name: 'Koto Restaurant - Durbarmarg', location: '', image: '🍣' },
];

export default function DashboardPage({ user }: User) {
  return (
    <DashboardShell user={user}>
      <div className="min-h-screen bg-white">
        {/* Top Header Bar - Foodmandu Style */}
        <div className="border-b border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              {/* Logo */}
              <div className="flex items-center gap-2">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-600 text-white font-bold text-xl">
                  F
                </div>
                <span className="text-xl font-bold text-slate-800">Foodmandu</span>
              </div>

              {/* Find Restaurants Search */}
              <div className="hidden md:flex flex-1 max-w-xl mx-8">
                <div className="flex w-full items-center rounded-lg border border-slate-300 overflow-hidden">
                  <input
                    type="text"
                    placeholder="Find Restaurants"
                    className="flex-1 px-4 py-2 text-sm outline-none"
                  />
                  <button className="bg-slate-100 px-4 py-2 text-sm font-medium text-slate-600 hover:bg-slate-200">
                    Find Restaurant
                  </button>
                </div>
              </div>

              {/* Right Nav */}
              <div className="flex items-center gap-4">
                <button className="text-sm font-medium text-slate-600 hover:text-red-600">Login</button>
              </div>
            </div>
          </div>
        </div>

        {/* Hero Section */}
        <div className="relative bg-gradient-to-b from-slate-50 to-white overflow-hidden">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center">
              <h1 className="text-3xl md:text-4xl font-bold text-slate-900">
                Order food from the widest range of restaurants.
              </h1>

              {/* Hero Food Images */}
              <div className="mt-8 flex items-center justify-center gap-4 overflow-hidden">
                {heroItems.map((item, idx) => (
                  <div
                    key={item.name}
                    className={`flex h-24 w-24 items-center justify-center rounded-full bg-white text-4xl shadow-lg ${
                      idx === 1 ? 'h-32 w-32 text-5xl z-10' : ''
                    }`}
                  >
                    {item.emoji}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Foodmandu Fresh Banner */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
          <div className="rounded-2xl bg-gradient-to-r from-red-600 to-red-500 p-8 text-white shadow-lg">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold">FOODMANDU FRESH</h3>
                <p className="mt-2 text-red-100">Fresh ingredients, delivered to your doorstep</p>
              </div>
              <div className="text-6xl">🥬</div>
            </div>
          </div>
        </div>

        {/* Featured Restaurants */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-slate-900">FEATURED RESTAURANTS</h2>
              <div className="mt-2 h-1 w-20 bg-red-600"></div>
            </div>
            <button className="text-sm font-semibold text-red-600 hover:text-red-700">
              View all →
            </button>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredRestaurants.map((restaurant) => (
              <div
                key={restaurant.name}
                className="group overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm transition hover:shadow-lg"
              >
                <div className="flex h-40 items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 text-6xl transition group-hover:scale-105">
                  {restaurant.image}
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-bold text-slate-900 group-hover:text-red-600 transition-colors">
                    {restaurant.name}
                  </h3>
                  {restaurant.location && (
                    <p className="mt-1 text-sm text-slate-500">{restaurant.location}</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* About Us */}
        <div className="bg-slate-50">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-2xl font-bold text-slate-900">About Us</h2>
                <div className="mt-2 h-1 w-20 bg-red-600"></div>
                <p className="mt-6 text-slate-600 leading-relaxed">
                  Foodmandu is the fastest, easiest and most convenient way to enjoy the best food
                  of your favourite restaurants at home, at the office or wherever you want.
                </p>
                <p className="mt-4 text-slate-600">
                  We know that your time is valuable and sometimes every minute in the day counts.
                  That&apos;s why we deliver! So you can spend more time doing the things you love.
                </p>
                <button className="mt-6 rounded-lg bg-red-600 px-6 py-3 font-semibold text-white transition hover:bg-red-700">
                  Learn More
                </button>
              </div>
              <div className="flex justify-center">
                <div className="rounded-3xl bg-white p-8 shadow-lg text-center">
                  <span className="text-8xl">🏔️</span>
                  <p className="mt-4 text-xl font-bold text-slate-800">Everest Food</p>
                  <p className="mt-1 text-sm text-slate-500">Delivering happiness since 2025</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Download App CTA */}
        <div className="bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <h2 className="text-3xl font-bold text-white">Download the app</h2>
                <p className="mt-3 text-lg text-slate-300">
                  Always on the go. Food whenever and wherever you want it!
                </p>
                <div className="mt-8 flex items-center gap-4">
                  <button className="flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-900 border border-slate-700">
                    <span className="text-2xl">🍎</span>
                    <div className="text-left">
                      <p className="text-xs text-slate-300">Download on the</p>
                      <p className="text-sm font-bold">App Store</p>
                    </div>
                  </button>
                  <button className="flex items-center gap-3 rounded-xl bg-black px-5 py-3 text-white transition hover:bg-gray-900 border border-slate-700">
                    <span className="text-2xl">▶️</span>
                    <div className="text-left">
                      <p className="text-xs text-slate-300">Get it on</p>
                      <p className="text-sm font-bold">Google Play</p>
                    </div>
                  </button>
                </div>
              </div>
              <div className="flex justify-center">
                <div className="text-9xl">📱</div>
              </div>
            </div>
          </div>
        </div>

        {/* List your Restaurant CTA */}
        <div className="bg-white">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-slate-900">
                List your Restaurant at Foodmandu!
              </h2>
              <p className="mt-2 text-slate-600">Reach 5,00,000+ new customers.</p>
              <button className="mt-6 rounded-lg bg-red-600 px-8 py-3 font-semibold text-white transition hover:bg-red-700">
                Send a request
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-slate-900 text-slate-300">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Brand */}
              <div>
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded bg-red-600 text-white font-bold text-sm">
                    F
                  </div>
                  <span className="text-lg font-bold text-white">Foodmandu</span>
                </div>
                <p className="mt-4 text-sm text-slate-400">
                  The fastest, easiest and most convenient way to enjoy the best food.
                </p>
              </div>

              {/* We're Foodmandu */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white">We&apos;re Foodmandu</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">About Us</a></li>
                  <li><a href="#" className="hover:text-white">Delivery Charges</a></li>
                  <li><a href="#" className="hover:text-white">Blog</a></li>
                </ul>
              </div>

              {/* Get Help */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Get Help</h4>
                <ul className="mt-4 space-y-2 text-sm">
                  <li><a href="#" className="hover:text-white">How to Order?</a></li>
                  <li><a href="#" className="hover:text-white">FAQs</a></li>
                  <li><a href="#" className="hover:text-white">Contact Us</a></li>
                </ul>
              </div>

              {/* Contact */}
              <div>
                <h4 className="text-sm font-semibold uppercase tracking-wider text-white">Call us</h4>
                <p className="mt-4 text-sm text-slate-400">5970477, 4544177, 4540979, 9802034008</p>
                <p className="mt-2 text-xs text-slate-500">07:00 AM to 12:00 AM (NST)</p>
              </div>
            </div>

            <div className="mt-12 border-t border-slate-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
              <p className="text-sm text-slate-400">
                © 2025 Foodmandu Pvt. Ltd. All Rights Reserved.
              </p>
              <div className="flex items-center gap-4">
                <a href="#" className="text-slate-400 hover:text-white text-sm">Terms of Usage</a>
                <a href="#" className="text-slate-400 hover:text-white text-sm">Privacy Policy</a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </DashboardShell>
  );
}

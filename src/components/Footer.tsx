import React, { useState } from 'react';
import { Sprout, Mail, Check, ShieldCheck, HeartHandshake, Trees, MapPin, Phone } from 'lucide-react';
import { sound } from '../utils/audio';
import { BrandLogo } from './BrandLogo';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.includes('@')) {
      sound.playSporeBloom();
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="relative bg-[#020503] border-t border-emerald-950/70 pt-16 pb-12 overflow-hidden text-zinc-400">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] bg-emerald-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative w-full max-w-[1760px] 2xl:max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 xl:px-14">
        <div className="rounded-3xl bg-gradient-to-r from-[#04130a] via-[#071c10] to-[#04130a] border border-emerald-500/30 p-8 sm:p-10 mb-16 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            <div className="lg:col-span-7 space-y-2">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-bold uppercase tracking-wider">
                <Sprout className="w-3.5 h-3.5 text-[#22c55e]" />
                Join the GREENLIFE Living Arboretum Guild
              </div>
              <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-['Plus_Jakarta_Sans',sans-serif]">
                Acquire 10% Off Your First Living Specimen
              </h3>
              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed max-w-xl">
                Receive monthly arbor cultivation calendars, early access to rare specimen trees, and rootstock nutrition guides directly from our master nursery arborists.
              </p>
            </div>

            <div className="lg:col-span-5">
              {subscribed ? (
                <div className="p-4 rounded-2xl bg-emerald-950/80 border border-[#22c55e] text-white flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#22c55e] text-black flex items-center justify-center font-bold flex-shrink-0">
                    <Check className="w-5 h-5 stroke-[3]" />
                  </div>
                  <div className="text-xs">
                    <span className="font-bold text-[#4ade80] block">Welcome to the Arboretum Guild!</span>
                    <span className="text-zinc-300">Your voucher code <strong>GREEN10</strong> is active.</span>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2.5">
                  <div className="relative flex-1">
                    <Mail className="w-4 h-4 text-zinc-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email address..."
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 rounded-xl bg-[#020703] border border-emerald-900/80 text-white text-xs placeholder-zinc-500 focus:outline-none focus:border-[#22c55e]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-6 py-3 rounded-xl bg-[#22c55e] hover:bg-[#4ade80] text-black font-extrabold text-xs tracking-wider uppercase transition-all shadow-[0_0_15px_rgba(34,197,94,0.4)] cursor-pointer"
                  >
                    Subscribe
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 pb-12 border-b border-emerald-950/60">
          <div className="col-span-2 space-y-4">
            <div>
              <BrandLogo size="md" variant="horizontal" showTagline={true} />
            </div>

            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Specializing in legacy specimen trees, architectural ornamental cultivars, and micro-nursery bonsai art. Dedicated to arboreal biodiversity and regenerative landscapes.
            </p>

            <div className="flex items-center gap-4 text-xs text-zinc-400 pt-1">
              <span className="flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-emerald-400" />
                Arboretum Sanctuary Grounds, Cascade Bioregion
              </span>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Collections</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#popular-picks" className="hover:text-emerald-300 transition-colors">Japanese Red Maples</a></li>
              <li><a href="#popular-picks" className="hover:text-emerald-300 transition-colors">Sakura Cherry Blossoms</a></li>
              <li><a href="#popular-picks" className="hover:text-emerald-300 transition-colors">Dwarf Meyer Lemons</a></li>
              <li><a href="#popular-picks" className="hover:text-emerald-300 transition-colors">Saucer Magnolias</a></li>
              <li><a href="#popular-picks" className="hover:text-emerald-300 transition-colors">Colorado Blue Spruces</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Cultivation & Guides</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Arborist Pruning Manual</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">USDA Microclimate Matrix</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Mycorrhizal Soil Biology</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Rootstock Acclimatization FAQ</a></li>
              <li><a href="#" className="hover:text-emerald-300 transition-colors">Winterization Protocol</a></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">Arbor Pledge</h4>
            <ul className="space-y-2.5 text-xs sm:text-sm">
              <li className="flex items-center gap-2 text-emerald-400">
                <ShieldCheck className="w-4 h-4" /> 365-Day Rootstock Vitality Warranty
              </li>
              <li className="flex items-center gap-2 text-emerald-400">
                <Trees className="w-4 h-4" /> 1 Legacy Arbor Planted Per Order
              </li>
              <li className="flex items-center gap-2 text-emerald-400">
                <HeartHandshake className="w-4 h-4" /> Master Arborist Consultation
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-zinc-400">
          <div>
            © {new Date().getFullYear()} GREENLIFE Living Arboretum & Nursery. All botanical rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span className="hover:text-zinc-200 cursor-pointer">Arbor Privacy Policy</span>
            <span className="hover:text-zinc-200 cursor-pointer">Climate Freight & Transit</span>
            <span className="hover:text-zinc-200 cursor-pointer">Cultivation Terms</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

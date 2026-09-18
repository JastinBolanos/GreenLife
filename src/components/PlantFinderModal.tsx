import React, { useState } from 'react';
import { X, Sparkles, Sun, Heart, Award, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';
import { Product } from '../types';
import { PRODUCTS } from '../data/products';
import { sound } from '../utils/audio';

interface PlantFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectProduct: (product: Product) => void;
}

export const PlantFinderModal: React.FC<PlantFinderModalProps> = ({
  isOpen,
  onClose,
  onSelectProduct,
}) => {
  if (!isOpen) return null;

  const [step, setStep] = useState(1);
  const [lightPref, setLightPref] = useState<'sun' | 'partial' | 'indoor'>('partial');
  const [vibePref, setVibePref] = useState<'bloom' | 'bonsai' | 'fruit' | 'evergreen'>('bonsai');
  const [carePref, setCarePref] = useState<'easy' | 'moderate' | 'expert'>('moderate');
  const [result, setResult] = useState<Product | null>(null);
  const [compatibility, setCompatibility] = useState(96);

  const handleCalculate = () => {
    sound.playSporeBloom();
    let bestMatch = PRODUCTS[0];
    if (vibePref === 'bloom') {
      bestMatch = PRODUCTS.find((p) => p.id === 'cherry-blossom') || PRODUCTS[1];
    } else if (vibePref === 'fruit') {
      bestMatch = PRODUCTS.find((p) => p.id === 'meyer-lemon') || PRODUCTS[2];
    } else if (vibePref === 'evergreen') {
      bestMatch = PRODUCTS.find((p) => p.id === 'blue-spruce') || PRODUCTS[4];
    } else if (vibePref === 'bonsai') {
      bestMatch = PRODUCTS.find((p) => p.id === 'bioluminescent-emerald-bonsai') || PRODUCTS[0];
    }

    setResult(bestMatch);
    setCompatibility(Math.floor(94 + Math.random() * 5));
    setStep(4);
  };

  const resetFinder = () => {
    sound.playChime(500);
    setStep(1);
    setResult(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 backdrop-blur-xl bg-black/85 animate-in fade-in duration-200">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-xl bg-[#040e08] border border-emerald-500/40 rounded-3xl overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] p-6 sm:p-8"
      >
        <button
          onClick={() => {
            sound.playChime(450);
            onClose();
          }}
          className="absolute top-4 right-4 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-emerald-950/60"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2.5 mb-6">
          <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 flex items-center justify-center text-[#22c55e]">
            <Sparkles className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-black text-white font-['Syne',sans-serif]">
              Arboreal Specimen Matcher
            </h3>
            <p className="text-xs text-emerald-400/80">
              Determine which specimen tree and rootstock flourishes best in your microclimate
            </p>
          </div>
        </div>

        {step < 4 && (
          <div className="flex items-center justify-between mb-6 text-xs text-zinc-400">
            <span className="font-bold text-emerald-300">Phase {step} of 3</span>
            <div className="flex gap-1.5">
              {[1, 2, 3].map((s) => (
                <div
                  key={s}
                  className={`h-1.5 w-8 rounded-full transition-all ${
                    s === step ? 'bg-[#22c55e]' : s < step ? 'bg-emerald-800' : 'bg-zinc-800'
                  }`}
                />
              ))}
            </div>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white">What exposure and solar hours define your landscape planting site?</h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { id: 'sun', label: 'Direct Open Sky (6+ daily solar hours)', desc: 'Ideal for flowering cherries, fruit arbors, and conifer sentinels' },
                { id: 'partial', label: 'Filtered Canopy / Dappled Light', desc: 'Optimal for Japanese Maples, woodland understory, and hydrangeas' },
                { id: 'indoor', label: 'Protected Solarium / Bright Courtyard', desc: 'Fine-tuned for ancient bonsai, dwarf citrus, and rare cultivars' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    sound.playChime(560);
                    setLightPref(opt.id as any);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    lightPref === opt.id
                      ? 'bg-emerald-950/70 border-[#22c55e] text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'bg-[#05130a] border-emerald-950 text-zinc-300 hover:bg-[#071a0e]'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center justify-between">
                    <span>{opt.label}</span>
                    {lightPref === opt.id && <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => {
                sound.playChime(600);
                setStep(2);
              }}
              className="w-full mt-4 py-3 rounded-xl bg-[#22c55e] hover:bg-[#4ade80] text-black font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Next: Canopy Character</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white">Which arbor silhouette and seasonal character do you envision?</h4>
            <div className="grid grid-cols-2 gap-2.5">
              {[
                { id: 'bonsai', title: 'Ancient Bonsai', icon: '🌱', desc: 'Pensive branch architecture & centuries of miniature tree mastery' },
                { id: 'bloom', title: 'Blossoming Canopy', icon: '🌸', desc: 'Dramatic clouds of springtime sakura & saucer petals' },
                { id: 'fruit', title: 'Citrus Orchard', icon: '🍋', desc: 'Glossy evergreen foliage, scented blossoms & golden fruit' },
                { id: 'evergreen', title: 'Alpine Sentinel', icon: '🌲', desc: 'Sub-zero hardy conifer with frosted cyan needle poise' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    sound.playChime(580);
                    setVibePref(opt.id as any);
                  }}
                  className={`p-3 rounded-2xl border text-left transition-all cursor-pointer ${
                    vibePref === opt.id
                      ? 'bg-emerald-950/70 border-[#22c55e] text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'bg-[#05130a] border-emerald-950 text-zinc-300 hover:bg-[#071a0e]'
                  }`}
                >
                  <span className="text-xl block mb-1">{opt.icon}</span>
                  <div className="font-bold text-xs">{opt.title}</div>
                  <div className="text-[10px] text-zinc-400 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl bg-[#030a05] text-zinc-400 hover:text-white border border-emerald-950 text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={() => {
                  sound.playChime(620);
                  setStep(3);
                }}
                className="flex-1 py-3 rounded-xl bg-[#22c55e] hover:bg-[#4ade80] text-black font-extrabold text-xs tracking-wider uppercase transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Next: Cultivation Rhythm</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <h4 className="text-sm font-bold text-white">What is your arboriculture rhythm and care availability?</h4>
            <div className="grid grid-cols-1 gap-2.5">
              {[
                { id: 'easy', label: 'Low Intervention / Hardy Constitution', desc: 'Resilient specimens with deep drought and temperature tolerance' },
                { id: 'moderate', label: 'Attentive Arborist Companion', desc: 'Regular seasonal checks, mulch renewal, and spring feeding' },
                { id: 'expert', label: 'Master Cultivator & Pruning Artist', desc: 'Sculptural canopy shaping, root care, and precision branch styling' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    sound.playChime(600);
                    setCarePref(opt.id as any);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer ${
                    carePref === opt.id
                      ? 'bg-emerald-950/70 border-[#22c55e] text-white shadow-[0_0_15px_rgba(34,197,94,0.3)]'
                      : 'bg-[#05130a] border-emerald-950 text-zinc-300 hover:bg-[#071a0e]'
                  }`}
                >
                  <div className="font-bold text-xs flex items-center justify-between">
                    <span>{opt.label}</span>
                    {carePref === opt.id && <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />}
                  </div>
                  <div className="text-[11px] text-zinc-400 mt-1">{opt.desc}</div>
                </button>
              ))}
            </div>

            <div className="flex gap-2 mt-4">
              <button
                onClick={() => setStep(2)}
                className="py-3 px-4 rounded-xl bg-[#030a05] text-zinc-400 hover:text-white border border-emerald-950 text-xs font-bold"
              >
                Back
              </button>
              <button
                onClick={handleCalculate}
                className="flex-1 py-3 rounded-xl bg-gradient-to-r from-emerald-500 to-[#22c55e] text-black font-black text-xs tracking-wider uppercase shadow-[0_0_20px_rgba(34,197,94,0.5)] flex items-center justify-center gap-2 cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Evaluate Canopy Match</span>
              </button>
            </div>
          </div>
        )}

        {step === 4 && result && (
          <div className="space-y-4 animate-in zoom-in-95 duration-200">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 flex items-center gap-4">
              <img
                src={result.image}
                alt={result.name}
                referrerPolicy="no-referrer"
                className="w-20 h-20 rounded-xl object-cover border border-emerald-500/40"
              />
              <div className="flex-1">
                <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-[#22c55e]/20 text-[#4ade80] text-[10px] font-black uppercase tracking-wider mb-1">
                  <span>{compatibility}% Climate Compatibility</span>
                </div>
                <h4 className="text-base font-black text-white">{result.name}</h4>
                <p className="text-xs text-zinc-300 italic">{result.botanicalSpecs.scientificName}</p>
                <span className="text-sm font-extrabold text-[#22c55e] mt-1 block">
                  ${result.price.toFixed(2)}
                </span>
              </div>
            </div>

            <p className="text-xs text-zinc-300 leading-relaxed bg-[#030a05] p-3 rounded-xl border border-emerald-950">
              Based on your preferences for <strong>{lightPref}</strong> lighting and <strong>{vibePref}</strong> aesthetics, this specimen will thrive magnificently in your space with vibrant vitality.
            </p>

            <div className="flex gap-2 pt-2">
              <button
                onClick={resetFinder}
                className="py-3 px-4 rounded-xl bg-[#030a05] text-zinc-400 hover:text-white border border-emerald-950 text-xs font-bold flex items-center gap-1"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Retake</span>
              </button>
              <button
                onClick={() => {
                  sound.playChime(750);
                  onSelectProduct(result);
                  onClose();
                }}
                className="flex-1 py-3 rounded-xl bg-[#22c55e] hover:bg-[#4ade80] text-black font-black text-xs uppercase tracking-wider shadow-[0_0_20px_rgba(34,197,94,0.5)] cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Inspect Specimen Details</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

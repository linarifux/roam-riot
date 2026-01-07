import React from 'react';
import { Camera, CreditCard, Share2, MapPin } from 'lucide-react';
import GlassCard from '../common/GlassCard';

const features = [
  {
    icon: <Camera className="w-6 h-6 text-purple-400" />,
    title: "Memory Collection",
    desc: "We auto-sort your chaotic gallery into organized timelines. No more scrolling through 500 blurry screenshots.",
  },
  {
    icon: <Share2 className="w-6 h-6 text-cyan-400" />,
    title: "Auto-Socials",
    desc: "Our AI writes the caption, picks the best photo, and posts it. You just focus on not missing your flight.",
  },
  {
    icon: <CreditCard className="w-6 h-6 text-pink-400" />,
    title: "Wallet Watchdog",
    desc: "Real-time budget tracking. We'll respectfully yell at you when you spend too much on souvenirs.",
  },
  {
    icon: <MapPin className="w-6 h-6 text-yellow-400" />,
    title: "Smart Suggestions",
    desc: "Ran out of ideas? We suggest nearby hidden gems based on your mood and remaining cash.",
  }
];

const FeaturesSection = () => {
  return (
    <section className="py-20 relative bg-[#0f172a]">
      <div className="container mx-auto px-6">
        
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Everything you need to <br />
            <span className="text-gradient">Travel Like a Pro</span>
          </h2>
          <p className="text-slate-400">
            A complete suite of tools designed for the modern, social-media-savvy traveler who is terrible at budgeting.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => (
            <GlassCard key={idx} hoverEffect={true} className="border-t border-white/10">
              <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">
                {feature.desc}
              </p>
            </GlassCard>
          ))}
        </div>

      </div>
    </section>
  );
};

export default FeaturesSection;
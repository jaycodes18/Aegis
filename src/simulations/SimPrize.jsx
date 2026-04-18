import { useState, useEffect, memo } from 'react';
import { motion } from 'framer-motion';
import { Gift, X } from 'lucide-react';

export default memo(function SimPrize({ config, hasTremor, onPass, onFail }) {
  const [seconds, setSeconds] = useState(527);
  const t = hasTremor;

  useEffect(() => {
    const id = setInterval(() => setSeconds(s => Math.max(0, s - 1)), 1000);
    return () => clearInterval(id);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, '0');
  const ss = String(seconds % 60).padStart(2, '0');

  return (
    <div className="w-full max-w-sm mx-auto">
      {/* Browser chrome */}
      <div className="bg-[#e8eaed] rounded-t-xl px-3 py-2 flex items-center gap-2 border border-gray-300 border-b-0">
        <div className="flex gap-1.5">
          <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
          <div className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
        </div>
        <span className="font-mono text-xs text-gray-500 ml-2 truncate">facebook-rewards-partner.com/congratulations</span>
      </div>

      {/* Prize scam page */}
      <div className="rounded-b-xl border-x border-b border-gray-300 overflow-hidden shadow-2xl bg-[#1877F2]">
        {/* Facebook-blue header */}
        <div className="relative px-5 pt-6 pb-4 text-center overflow-hidden">
          {/* Confetti */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-sm"
              style={{
                backgroundColor: ['#FFD700','#FF6B6B','#4ECDC4','#FFF','#96CEB4'][i % 5],
                left: `${(i * 10 + 5) % 95}%`,
                top: `${(i * 17) % 80}%`,
              }}
              animate={{ y: [0, -10, 0], rotate: [0, 180, 360], opacity: [0.7, 1, 0.7] }}
              transition={{ repeat: Infinity, duration: 1.5 + (i * 0.2), ease: 'easeInOut' }}
            />
          ))}
          <div className="relative z-10">
            <div className="text-5xl mb-2">🎉</div>
            <h2 className={`font-extrabold text-white leading-tight ${t ? 'text-2xl' : 'text-xl'}`}>
              {config.title}
            </h2>
            <p className={`text-yellow-300 font-bold mt-1 ${t ? 'text-lg' : 'text-base'}`}>{config.subtitle}</p>
          </div>
        </div>

        {/* Fake brand badge */}
        <div className="mx-4 mb-3 bg-white rounded-xl px-4 py-3 flex items-center gap-3 shadow-sm">
          <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
            <span className="text-white font-black text-sm">W</span>
          </div>
          <div>
            <p className={`font-bold text-gray-900 ${t ? 'text-base' : 'text-sm'}`}>{config.logo}</p>
            <p className={`text-gray-500 ${t ? 'text-sm' : 'text-xs'}`}>Official Partner Rewards</p>
          </div>
          <div className="ml-auto">
            <span className="bg-green-100 text-green-700 text-xs font-semibold px-2 py-0.5 rounded-full">Verified</span>
          </div>
        </div>

        {/* Countdown timer */}
        <div className="mx-4 mb-3 bg-red-600 rounded-xl px-4 py-2.5 flex items-center justify-between">
          <p className={`text-white font-medium ${t ? 'text-base' : 'text-sm'}`}>Offer expires in:</p>
          <p className={`text-white font-mono font-black tabular-nums ${t ? 'text-2xl' : 'text-xl'}`}>{mm}:{ss}</p>
        </div>

        {/* Form fields */}
        <div className="mx-4 mb-3 bg-white/15 rounded-xl px-4 py-4 space-y-2.5">
          {config.formFields.map((field) => (
            <div key={field}>
              <p className={`text-blue-100 mb-1 ${t ? 'text-sm' : 'text-xs'}`}>{field}</p>
              <div className={`bg-white/20 rounded-lg ${t ? 'h-11' : 'h-9'}`} />
            </div>
          ))}
        </div>

        {/* Claim button */}
        <div className="px-4 pb-5">
          <motion.button
            onClick={onFail}
            className={`w-full rounded-xl bg-yellow-400 text-black font-extrabold mb-3 flex items-center justify-center gap-2 hover:bg-yellow-300 transition-colors ${t ? 'py-4 text-xl' : 'py-3 text-sm'}`}
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(250,204,21,0.7)',
                '0 0 0 12px rgba(250,204,21,0)',
                '0 0 0 0 rgba(250,204,21,0)',
              ],
            }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            whileTap={{ scale: 0.97 }}
          >
            <Gift className={t ? 'w-6 h-6' : 'w-4 h-4'} />
            {config.claimButtonText}
          </motion.button>

          <motion.button
            onClick={onPass}
            className={`w-full rounded-xl border-2 border-white/30 text-white/70 font-semibold flex items-center justify-center gap-2 hover:bg-white/10 transition-colors ${t ? 'py-3 text-base' : 'py-2 text-xs'}`}
            whileTap={{ scale: 0.97 }}
          >
            <X className={t ? 'w-5 h-5' : 'w-3.5 h-3.5'} /> Close this window
          </motion.button>
        </div>
      </div>
    </div>
  );
});

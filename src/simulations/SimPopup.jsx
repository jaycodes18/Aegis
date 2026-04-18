import { memo } from 'react';
import { motion } from 'framer-motion';
import { Phone, X, ShieldAlert, AlertTriangle } from 'lucide-react';

export default memo(function SimPopup({ config, hasTremor, onPass, onFail }) {
  const t = hasTremor;

  return (
    <div className="w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-2xl border border-gray-300">
      {/* Realistic browser chrome */}
      <div className="bg-[#dee1e6] px-3 py-2 flex items-center gap-2">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        <div className="flex-1 flex items-center gap-1 bg-white rounded-md px-2.5 py-1 ml-2 border border-gray-300">
          <svg className="w-3 h-3 text-gray-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
          </svg>
          <span className="text-xs text-gray-500 font-mono truncate">
            {config.urlBar || 'https://news-today-update.com/health/top-tips'}
          </span>
        </div>
        <div className="flex gap-2 ml-1">
          <div className="w-6 h-3 rounded bg-gray-300 opacity-60" />
          <div className="w-6 h-3 rounded bg-gray-300 opacity-60" />
        </div>
      </div>

      {/* Page content with popup overlay */}
      <div className="relative bg-gray-100 min-h-[420px] flex items-center justify-center overflow-hidden">
        {/* Blurred page content behind */}
        <div className="absolute inset-0 p-6 opacity-25 select-none pointer-events-none blur-sm">
          <div className="h-4 bg-gray-500 rounded mb-2 w-3/4" />
          <div className="h-4 bg-gray-500 rounded mb-2 w-full" />
          <div className="h-4 bg-gray-500 rounded mb-4 w-5/6" />
          <div className="h-24 bg-gray-400 rounded mb-4 w-full" />
          <div className="h-4 bg-gray-500 rounded mb-2 w-2/3" />
          <div className="h-4 bg-gray-500 rounded mb-2 w-full" />
          <div className="h-4 bg-gray-500 rounded mb-2 w-4/5" />
        </div>

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/50" />

        {/* THE POPUP */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="relative z-10 w-11/12 max-w-sm rounded-xl overflow-hidden shadow-2xl"
        >
          {/* Red alarm header */}
          <div className="bg-red-600 px-5 py-4">
            <div className="flex items-center gap-3 mb-1">
              <ShieldAlert className={`text-white flex-shrink-0 ${t ? 'w-7 h-7' : 'w-6 h-6'}`} />
              <p className={`font-extrabold text-white ${t ? 'text-2xl' : 'text-lg'}`}>{config.title}</p>
            </div>
            <p className={`text-red-100 ${t ? 'text-base' : 'text-sm'}`}>{config.subtitle}</p>
          </div>

          <div className="bg-gray-950 px-5 py-5">
            <div className="flex items-start gap-2 mb-5">
              <AlertTriangle className="w-4 h-4 text-yellow-400 flex-shrink-0 mt-0.5" />
              <p className={`text-gray-200 leading-relaxed ${t ? 'text-base' : 'text-sm'}`}>{config.body}</p>
            </div>

            {/* Phone number - the dangerous bait */}
            <motion.button
              onClick={onFail}
              className={`w-full flex items-center justify-center gap-3 rounded-xl bg-red-600 text-white font-bold mb-3 hover:bg-red-500 transition-colors ${t ? 'py-4 text-xl' : 'py-3 text-sm'}`}
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(239,68,68,0.6)',
                  '0 0 0 10px rgba(239,68,68,0)',
                  '0 0 0 0 rgba(239,68,68,0)',
                ],
              }}
              transition={{ repeat: Infinity, duration: 1.8 }}
              whileTap={{ scale: 0.97 }}
            >
              <Phone className={t ? 'w-6 h-6' : 'w-4 h-4'} />
              {config.phoneLabel}: {config.phoneNumber}
            </motion.button>

            {/* Close - the safe action */}
            <motion.button
              onClick={onPass}
              className={`w-full flex items-center justify-center gap-2 rounded-xl border border-gray-700 text-gray-500 hover:text-white hover:border-gray-500 transition-colors ${t ? 'py-3 text-base' : 'py-2 text-xs'}`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
            >
              <X className={t ? 'w-4 h-4' : 'w-3.5 h-3.5'} /> Close this alert
            </motion.button>
          </div>
        </motion.div>
      </div>
    </div>
  );
});

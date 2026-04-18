import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowRight, AlertTriangle, X } from 'lucide-react';

export default memo(function SimLogin({ config, hasTremor, onPass, onFail }) {
  const [values, setValues] = useState({});
  const [showPw, setShowPw] = useState(false);
  const t = hasTremor;

  // Determine appearance based on bank/service
  const isCrypto = config.subText?.includes('Return') || config.logoColor?.includes('emerald');
  const isInvestment = isCrypto;

  return (
    <div className="w-full max-w-md mx-auto">
      {/* Realistic browser address bar */}
      <div className="bg-[#e8eaed] rounded-t-xl px-3 py-2 flex items-center gap-2 border border-gray-300 border-b-0">
        <div className="flex gap-1.5 flex-shrink-0">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
          <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
          <div className="w-3 h-3 rounded-full bg-[#28c840]" />
        </div>
        {/* URL bar with subtle warning */}
        <div className={`flex-1 flex items-center gap-1.5 rounded-md px-2 py-1 ml-1.5 border text-xs font-mono ${
          t ? 'bg-slate-800 border-slate-600 text-slate-300' : 'bg-white border-gray-300 text-gray-600'
        }`}>
          <AlertTriangle className={`w-3 h-3 flex-shrink-0 ${t ? 'text-yellow-400' : 'text-yellow-500'}`} />
          <span className="truncate">{config.fakeUrl}</span>
        </div>
      </div>

      {/* Login page */}
      <div className={`rounded-b-xl border-x border-b border-gray-300 shadow-xl overflow-hidden ${t ? 'bg-ag-surface' : 'bg-white'}`}>
        <div className="px-8 py-8">
          {/* Brand logo */}
          <div className="flex flex-col items-center mb-7">
            <div className={`${config.logoColor} w-14 h-14 rounded-2xl flex items-center justify-center text-white font-extrabold text-lg mb-3 shadow-lg`}>
              {config.logoText}
            </div>
            <p className={`font-bold ${t ? 'text-ag-text text-xl' : 'text-gray-900 text-xl'}`}>{config.bankName}</p>
            <p className={`mt-0.5 text-center ${t ? 'text-ag-muted text-sm' : 'text-gray-500 text-sm'}`}>{config.subText || 'Sign In'}</p>
          </div>

          {/* Form */}
          <div className="space-y-4 mb-6">
            {config.inputLabels.map((label, i) => (
              <div key={label}>
                <label className={`block font-medium mb-1.5 ${t ? 'text-ag-muted text-sm' : 'text-gray-600 text-sm'}`}>{label}</label>
                <div className="relative">
                  <input
                    type={label.toLowerCase().includes('password') && !showPw ? 'password' : 'text'}
                    placeholder={label.includes('$') ? 'e.g. 5000' : `Enter your ${label.toLowerCase()}`}
                    onChange={e => setValues(v => ({ ...v, [label]: e.target.value }))}
                    className={`w-full rounded-xl border px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-blue-300 ${
                      t
                        ? 'bg-ag-surface2 border-ag-border text-ag-text placeholder-ag-faint focus:border-ag-accent'
                        : 'bg-gray-50 border-gray-200 text-gray-900 placeholder-gray-400 focus:border-blue-300'
                    }`}
                  />
                  {label.toLowerCase().includes('password') && (
                    <button
                      type="button"
                      onClick={() => setShowPw(v => !v)}
                      className={`absolute right-3 top-1/2 -translate-y-1/2 ${t ? 'text-ag-muted' : 'text-gray-400'}`}
                    >
                      {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Submit = fail */}
          <motion.button
            onClick={onFail}
            className={`w-full flex items-center justify-center gap-2 rounded-xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors mb-3 ${t ? 'py-4 text-lg' : 'py-3 text-sm'}`}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
          >
            <Lock className={t ? 'w-5 h-5' : 'w-4 h-4'} />
            {isInvestment ? 'Create Account' : 'Sign In'}
            <ArrowRight className={t ? 'w-5 h-5' : 'w-4 h-4'} />
          </motion.button>

          {/* Leave = pass */}
          <motion.button
            onClick={onPass}
            className={`w-full flex items-center justify-center gap-2 rounded-xl border-2 font-semibold transition-colors ${
              t
                ? 'py-3.5 text-base border-ag-border text-ag-muted hover:bg-ag-surface2'
                : 'py-2.5 text-xs border-gray-200 text-gray-500 hover:bg-gray-50'
            }`}
            whileTap={{ scale: 0.97 }}
          >
            <X className={t ? 'w-4 h-4' : 'w-3.5 h-3.5'} /> Something looks wrong - leave this page
          </motion.button>

          {config.footerNote && (
            <p className={`text-center mt-4 ${t ? 'text-ag-faint text-xs' : 'text-gray-400 text-[10px]'}`}>
              {config.footerNote}
            </p>
          )}
        </div>
      </div>
    </div>
  );
});

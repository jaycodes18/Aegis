import { useState, memo } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Lock, CreditCard, ChevronRight, Shield } from 'lucide-react';

export default memo(function SimCheckout({ config, hasTremor, onPass, onFail }) {
  const [subscribed, setSubscribed] = useState(true);
  const [loading, setLoading] = useState(false);
  const t = hasTremor;

  const handleBuy = async () => {
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));
    setLoading(false);
    subscribed ? onFail() : onPass();
  };

  return (
    <div className={`w-full max-w-md mx-auto rounded-2xl overflow-hidden shadow-card border border-gray-200 bg-white ${t ? 'text-lg' : ''}`}>
      {/* Store header */}
      <div className="bg-gray-900 px-5 py-3.5 flex items-center gap-3">
        <ShoppingCart className="w-5 h-5 text-blue-400" />
        <div>
          <p className="font-bold text-white text-sm">{config.storeName}</p>
          <p className="text-gray-400 text-xs">{config.storeTagline}</p>
        </div>
        <div className="ml-auto flex items-center gap-1.5 text-green-400 text-xs">
          <Shield className="w-3.5 h-3.5" />
          Secure
        </div>
      </div>

      <div className="p-5 bg-white">
        {/* Order summary */}
        <p className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">Order Summary</p>

        <div className="flex items-center gap-3 pb-4 mb-4 border-b border-gray-100">
          <div className="w-12 h-12 rounded-lg bg-emerald-50 flex items-center justify-center flex-shrink-0">
            <span className="text-xl">💊</span>
          </div>
          <div className="flex-1">
            <p className={`font-semibold text-gray-900 ${t ? 'text-base' : 'text-sm'}`}>{config.item}</p>
            <p className={`text-gray-400 ${t ? 'text-sm' : 'text-xs'}`}>Qty: 1</p>
          </div>
          <p className={`font-bold text-gray-900 ${t ? 'text-base' : 'text-sm'}`}>{config.itemPrice}</p>
        </div>

        {/* Price breakdown */}
        <div className="bg-gray-50 rounded-xl p-4 mb-4 space-y-2">
          {[['Subtotal', config.itemPrice], ['Shipping', config.shipping], ['Tax', config.tax]].map(([l, v]) => (
            <div key={l} className={`flex justify-between text-gray-600 ${t ? 'text-base' : 'text-sm'}`}>
              <span>{l}</span><span>{v}</span>
            </div>
          ))}
          <div className={`flex justify-between font-bold text-gray-900 border-t border-gray-200 pt-2 mt-2 ${t ? 'text-base' : 'text-sm'}`}>
            <span>Total</span><span>{config.total}</span>
          </div>
        </div>

        {/* DARK PATTERN - pre-checked subscription buried in small print */}
        <div className="mb-4">
          <label className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={subscribed}
              onChange={e => setSubscribed(e.target.checked)}
              className={`mt-0.5 flex-shrink-0 ${t ? 'w-5 h-5 accent-blue-600' : 'w-3 h-3 accent-gray-400'}`}
            />
            <span className={`leading-tight ${t ? 'text-gray-700 text-sm' : 'text-gray-400 text-[10px]'}`}>
              {config.subscriptionLabel}
            </span>
          </label>
        </div>

        {/* Payment info note */}
        <div className="flex items-center gap-3 mb-4 p-3 bg-gray-50 rounded-xl border border-gray-100">
          <CreditCard className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <div>
            <p className={`text-gray-700 font-medium ${t ? 'text-sm' : 'text-xs'}`}>Visa ending in 4821</p>
            <p className={`text-gray-400 ${t ? 'text-sm' : 'text-[10px]'}`}>Default payment method</p>
          </div>
        </div>

        {/* Purchase button */}
        <motion.button
          onClick={handleBuy}
          disabled={loading}
          className={`w-full flex items-center justify-center gap-2 rounded-xl bg-yellow-500 hover:bg-yellow-400 text-black font-bold transition-colors
            ${t ? 'py-4 text-lg' : 'py-3 text-sm'} ${loading ? 'opacity-70' : ''}`}
          whileHover={loading ? {} : { scale: 1.01 }}
          whileTap={loading ? {} : { scale: 0.98 }}
        >
          {loading
            ? <motion.span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full inline-block" animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
            : <><Lock className={t ? 'w-5 h-5' : 'w-4 h-4'} />{config.buttonText}<ChevronRight className="w-4 h-4" /></>
          }
        </motion.button>

        <p className={`text-center mt-2 text-gray-400 flex items-center justify-center gap-1 ${t ? 'text-sm' : 'text-[10px]'}`}>
          <Lock className="w-3 h-3" /> 256-bit SSL encrypted checkout
        </p>
      </div>
    </div>
  );
});

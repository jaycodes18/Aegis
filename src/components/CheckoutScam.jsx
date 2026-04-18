import { useState, useCallback, memo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingCart, Lock, ChevronRight, AlertTriangle, X } from "lucide-react";

// ---------------------------------------------------------------------------
// Sub-components (memoised for performance per Vercel react-best-practices)
// ---------------------------------------------------------------------------

const OrderItem = memo(({ hasTremor }) => (
  <div
    className={`flex items-center justify-between border-b border-gray-200 pb-4 mb-4
      ${hasTremor ? "border-blue-300" : ""}`}
  >
    <div className="flex items-center gap-3">
      <div
        className={`rounded-md bg-sky-100 flex items-center justify-center
          ${hasTremor ? "w-16 h-16" : "w-12 h-12"}`}
      >
        <ShoppingCart
          className={`text-sky-600 ${hasTremor ? "w-8 h-8" : "w-5 h-5"}`}
        />
      </div>
      <div>
        <p className={`font-semibold ${hasTremor ? "text-xl text-white" : "text-gray-800 text-sm"}`}>
          Premium Wellness Kit
        </p>
        <p className={`${hasTremor ? "text-blue-200 text-base" : "text-gray-500 text-xs"}`}>
          Qty: 1
        </p>
      </div>
    </div>
    <p className={`font-bold ${hasTremor ? "text-xl text-white" : "text-gray-800"}`}>
      $29.99
    </p>
  </div>
));
OrderItem.displayName = "OrderItem";

const TrustBadge = memo(({ hasTremor }) => (
  <div
    className={`flex items-center gap-2 justify-center mt-4
      ${hasTremor ? "text-blue-200 text-base" : "text-gray-400 text-xs"}`}
  >
    <Lock className={hasTremor ? "w-5 h-5" : "w-3 h-3"} />
    <span>256-bit SSL Secure Checkout</span>
  </div>
));
TrustBadge.displayName = "TrustBadge";

// The deceptive subscription checkbox — the core dark pattern
const HiddenSubscriptionCheckbox = memo(({ checked, onChange, hasTremor }) => {
  const containerClass = hasTremor
    ? "mt-6 p-4 rounded-xl border-2 border-blue-400 bg-blue-900"
    : "mt-5 p-2 rounded border border-gray-200 bg-gray-50 opacity-75";

  const labelClass = hasTremor
    ? "text-white text-lg font-medium leading-snug"
    : "text-gray-400 text-[10px] leading-tight font-normal";

  const checkboxClass = hasTremor
    ? "w-8 h-8 accent-sky-400 cursor-pointer flex-shrink-0 mt-0.5"
    : "w-3 h-3 accent-gray-400 cursor-pointer flex-shrink-0 mt-0.5";

  return (
    <motion.div
      layout
      className={containerClass}
      // Intentionally subtle entrance in normal mode, obvious in tremor mode
      initial={{ opacity: 0 }}
      animate={{ opacity: hasTremor ? 1 : 0.7 }}
      transition={{ duration: 0.4 }}
    >
      <label className="flex items-start gap-2 cursor-pointer select-none">
        <input
          type="checkbox"
          checked={checked}
          onChange={onChange}
          className={checkboxClass}
          aria-label="Subscribe to VitalCare+ monthly plan"
        />
        <span className={labelClass}>
          {hasTremor ? (
            // Accessibility mode: clearly worded warning
            <>
              <span className="text-yellow-300 font-bold block mb-1">
                ⚠ SUBSCRIPTION DETECTED
              </span>
              By checking this box you agree to enroll in VitalCare+ for{" "}
              <strong>$99/month</strong>, billed automatically. Uncheck to
              decline.
            </>
          ) : (
            // Dark-pattern mode: buried legalese
            <>
              By completing your purchase you agree to our{" "}
              <span className="underline">Terms &amp; Conditions</span> and
              consent to enroll in VitalCare+ Wellness Membership ($99/mo, auto-renewing,
              cancel anytime), providing exclusive member discounts on future
              orders. See{" "}
              <span className="underline">subscription details</span> for full
              terms.
            </>
          )}
        </span>
      </label>
    </motion.div>
  );
});
HiddenSubscriptionCheckbox.displayName = "HiddenSubscriptionCheckbox";

// Failure overlay
const FailOverlay = memo(({ onDismiss }) => (
  <AnimatePresence>
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 p-8 relative text-center"
        initial={{ scale: 0.8, y: 40 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.8, y: 40 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
      >
        <button
          onClick={onDismiss}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close"
        >
          <X className="w-5 h-5" />
        </button>

        <motion.div
          className="flex items-center justify-center w-16 h-16 rounded-full bg-red-100 mx-auto mb-4"
          initial={{ rotate: -10 }}
          animate={{ rotate: [0, -10, 10, -6, 6, 0] }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </motion.div>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          You were charged a hidden fee!
        </h2>
        <p className="text-gray-600 text-sm leading-relaxed mb-6">
          A <strong>$99/month subscription</strong> was quietly added to your
          order. This is a common dark pattern called a{" "}
          <strong>"pre-checked trap."</strong> Always scroll through the full
          checkout and uncheck any boxes you didn't consciously select.
        </p>
        <motion.button
          onClick={onDismiss}
          className="w-full py-3 rounded-xl bg-[#0f172a] text-white font-semibold text-sm hover:bg-slate-700 transition-colors"
          whileTap={{ scale: 0.97 }}
        >
          Got it — try again
        </motion.button>
      </motion.div>
    </motion.div>
  </AnimatePresence>
));
FailOverlay.displayName = "FailOverlay";

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export default function CheckoutScam({ hasTremor = false, onFail, onSuccess }) {
  // Subscription checkbox starts CHECKED — the dark pattern
  const [subscribed, setSubscribed] = useState(true);
  const [showFail, setShowFail] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = useCallback(
    (e) => setSubscribed(e.target.checked),
    []
  );

  const handlePurchase = useCallback(async () => {
    setLoading(true);
    // Brief simulated network delay for realism
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);

    if (subscribed) {
      setShowFail(true);
      onFail?.();
    } else {
      onSuccess?.();
    }
  }, [subscribed, onFail, onSuccess]);

  const handleDismiss = useCallback(() => {
    setShowFail(false);
    setSubscribed(true); // Reset to pre-checked for replay
  }, []);

  // Dynamic theme tokens
  const bg = hasTremor ? "bg-[#0f172a]" : "bg-[#fdfbf7]";
  const cardBg = hasTremor ? "bg-slate-800" : "bg-white";
  const headingColor = hasTremor ? "text-white" : "text-[#0f172a]";
  const subColor = hasTremor ? "text-blue-200" : "text-gray-500";
  const dividerColor = hasTremor ? "border-blue-400" : "border-gray-200";
  const summaryBg = hasTremor ? "bg-slate-700" : "bg-[#f3ece1]";

  return (
    <>
      {showFail && <FailOverlay onDismiss={handleDismiss} />}

      <motion.div
        className={`min-h-screen flex items-center justify-center px-4 py-12 transition-colors duration-500 ${bg}`}
        layout
      >
        <motion.div
          className={`w-full max-w-md rounded-2xl shadow-xl overflow-hidden ${cardBg}`}
          layout
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          {/* Header */}
          <div className="bg-[#0f172a] px-6 py-5 flex items-center gap-3">
            <ShoppingCart className="text-[#e0f2fe] w-6 h-6" />
            <div>
              <h1
                className={`font-bold text-[#e0f2fe] ${
                  hasTremor ? "text-2xl" : "text-lg"
                }`}
              >
                Secure Checkout
              </h1>
              <p
                className={`text-blue-300 ${
                  hasTremor ? "text-base" : "text-xs"
                }`}
              >
                VitalShop &mdash; Trusted since 2008
              </p>
            </div>
          </div>

          {/* Body */}
          <div className="px-6 pt-6 pb-8">
            {/* Section title */}
            <p
              className={`font-semibold mb-4 ${headingColor} ${
                hasTremor ? "text-xl" : "text-sm uppercase tracking-wide"
              }`}
            >
              Order Summary
            </p>

            <OrderItem hasTremor={hasTremor} />

            {/* Price breakdown */}
            <div className={`rounded-xl p-4 ${summaryBg} mb-1`}>
              {[
                ["Subtotal", "$29.99"],
                ["Shipping", "FREE"],
                ["Tax", "$2.47"],
              ].map(([label, value]) => (
                <div
                  key={label}
                  className={`flex justify-between mb-2 last:mb-0 ${
                    hasTremor ? "text-lg text-white" : "text-sm text-gray-600"
                  }`}
                >
                  <span>{label}</span>
                  <span>{value}</span>
                </div>
              ))}
              <div className={`border-t mt-3 pt-3 flex justify-between font-bold ${dividerColor} ${
                hasTremor ? "text-xl text-white" : "text-gray-900"
              }`}>
                <span>Total</span>
                <span>$32.46</span>
              </div>
            </div>

            {/* ── DARK PATTERN: pre-checked subscription ── */}
            <HiddenSubscriptionCheckbox
              checked={subscribed}
              onChange={handleCheckboxChange}
              hasTremor={hasTremor}
            />

            {/* CTA button */}
            <motion.button
              onClick={handlePurchase}
              disabled={loading}
              className={`mt-6 w-full flex items-center justify-center gap-2 rounded-xl font-bold transition-colors
                ${hasTremor ? "py-5 text-xl" : "py-3 text-sm"}
                ${
                  loading
                    ? "bg-slate-400 cursor-not-allowed text-white"
                    : "bg-[#0f172a] hover:bg-slate-700 text-white"
                }`}
              whileHover={loading ? {} : { scale: 1.02 }}
              whileTap={loading ? {} : { scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
            >
              {loading ? (
                <motion.span
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
                  className="inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
              ) : (
                <>
                  <Lock className={hasTremor ? "w-6 h-6" : "w-4 h-4"} />
                  Complete Purchase
                  <ChevronRight className={hasTremor ? "w-6 h-6" : "w-4 h-4"} />
                </>
              )}
            </motion.button>

            <TrustBadge hasTremor={hasTremor} />
          </div>
        </motion.div>
      </motion.div>
    </>
  );
}

/**
 * TacticVisual.jsx
 * Renders a unique inline UI mockup for each of the 8 scam tactics.
 * Each visual highlights the exact deceptive element with a pulsing red annotation arrow.
 */
import { memo } from 'react';
import { motion } from 'framer-motion';
import {
  ShoppingCart, Lock, Mail, Phone, Gift, Heart,
  Monitor, AlertTriangle, CreditCard, CheckSquare,
  ExternalLink, Shield, Star, User
} from 'lucide-react';

// ─── Shared annotation arrow ──────────────────────────────────────────────────
const Arrow = ({ label, side = 'right', className = '' }) => (
  <motion.div
    initial={{ opacity: 0, x: side === 'right' ? -8 : 8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: 0.6, duration: 0.4 }}
    className={`absolute flex items-center gap-1.5 z-20 ${className}`}
  >
    {side === 'left' && (
      <div className="w-6 h-0.5 bg-red-500" />
    )}
    <motion.div
      animate={{ scale: [1, 1.15, 1] }}
      transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
      className="bg-red-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap shadow-lg"
    >
      {label}
    </motion.div>
    {side === 'right' && (
      <div className="w-6 h-0.5 bg-red-500" />
    )}
    <motion.div
      animate={{ scale: [1, 1.3, 1] }}
      transition={{ repeat: Infinity, duration: 1.4, ease: 'easeInOut' }}
      className="w-2.5 h-2.5 rounded-full bg-red-500 flex-shrink-0"
    />
  </motion.div>
);

// ─── 1. FALSE URGENCY — fake Amazon email ─────────────────────────────────────
const UrgencyVisual = () => (
  <div className="relative w-full bg-white rounded-xl overflow-hidden shadow-lg border border-gray-200">
    {/* Email header */}
    <div className="bg-[#232F3E] px-4 py-2.5 flex items-center gap-2">
      <div className="w-6 h-6 bg-[#FF9900] rounded flex items-center justify-center">
        <span className="text-black font-extrabold text-xs">a</span>
      </div>
      <span className="text-white text-xs font-semibold">Amazon</span>
    </div>
    <div className="px-4 pt-3 pb-1">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-500 font-mono">From: security@amazon-accounts.net</span>
      </div>
      {/* Fake subject line */}
      <p className="text-sm font-bold text-gray-900 mb-2">⚠️ Your account will be deleted in</p>
      {/* Countdown box */}
      <div className="relative">
        <div className="bg-red-600 rounded-lg p-3 text-center mb-3">
          <p className="text-white text-xs mb-1 font-medium">Account suspended. Time remaining:</p>
          <p className="text-white font-mono font-extrabold text-2xl tracking-widest">23:47:12</p>
        </div>
        <Arrow label="⏰ FAKE DEADLINE" side="right" className="-top-2 -right-1" />
      </div>
      <div className="bg-[#FF9900] rounded-lg py-2 text-center mb-3">
        <span className="text-black font-bold text-xs">Verify My Account Now →</span>
      </div>
    </div>
    {/* Domain annotation */}
    <div className="relative px-4 pb-3">
      <div className="bg-gray-100 rounded px-2 py-1.5 font-mono text-[10px] text-gray-500">
        amazon-<span className="text-red-600 font-bold underline">accounts.net</span> ← not amazon.com
      </div>
      <Arrow label="FAKE DOMAIN" side="left" className="-bottom-1 left-2" />
    </div>
  </div>
);

// ─── 2. IMPERSONATION — fake IRS caller ID ────────────────────────────────────
const ImpersonationVisual = () => (
  <div className="relative w-full max-w-xs mx-auto">
    {/* Phone mockup */}
    <div className="bg-gray-900 rounded-3xl border-4 border-gray-700 overflow-hidden shadow-xl">
      <div className="bg-gray-900 px-4 pt-3 pb-1 flex justify-between">
        <span className="text-white text-xs">9:41 AM</span>
        <span className="text-white text-xs">●●●</span>
      </div>
      <div className="bg-gray-800 px-4 py-6 text-center">
        <div className="w-16 h-16 bg-green-700 rounded-full flex items-center justify-center mx-auto mb-3 border-2 border-green-500">
          <Phone className="w-7 h-7 text-white" />
        </div>
        {/* Spoofed caller ID */}
        <div className="relative inline-block">
          <p className="text-green-400 text-xs mb-1">Incoming Call</p>
          <p className="text-white font-bold text-lg">IRS — Washington DC</p>
          <p className="text-gray-400 font-mono text-xs mt-0.5">+1 (202) 555-0147</p>
          <Arrow label="SPOOFED CALLER ID" side="right" className="top-0 -right-32" />
        </div>
      </div>
      <div className="bg-gray-800 px-4 pb-4 pt-1">
        <div className="bg-gray-700 rounded-xl p-3 text-xs text-gray-200 leading-relaxed">
          "You owe $2,400 in back taxes. Pay NOW with Google Play gift cards or face <span className="text-red-400 font-bold">immediate arrest.</span>"
        </div>
        <div className="flex justify-around mt-4">
          <div className="w-12 h-12 rounded-full bg-red-600 flex items-center justify-center">
            <Phone className="w-5 h-5 text-white rotate-135" />
          </div>
          <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
            <Phone className="w-5 h-5 text-white" />
          </div>
        </div>
      </div>
    </div>
    <Arrow label="GIFT CARDS = ALWAYS SCAM" side="left" className="-bottom-2 -left-4" />
  </div>
);

// ─── 3. TOO GOOD TO BE TRUE — prize popup ─────────────────────────────────────
const TooGoodVisual = () => (
  <div className="relative w-full bg-gradient-to-b from-blue-600 to-blue-800 rounded-xl overflow-hidden shadow-xl p-4">
    <div className="text-center mb-3">
      <div className="text-4xl mb-1">🎉</div>
      <p className="text-white font-extrabold text-base">You've been SELECTED!</p>
      <p className="text-yellow-300 font-bold text-sm">Win a $500 Walmart Gift Card</p>
    </div>
    {/* Fake timer */}
    <div className="relative bg-red-600 rounded-lg py-2 px-3 flex items-center justify-between mb-3">
      <span className="text-white text-xs font-semibold">Expires in:</span>
      <span className="text-white font-mono font-extrabold text-lg">04:59</span>
      <Arrow label="FAKE TIMER" side="right" className="-top-3 -right-1" />
    </div>
    {/* Fee trap */}
    <div className="relative bg-white/10 rounded-lg p-3 mb-3 text-white text-xs space-y-1">
      <p className="font-semibold text-yellow-200">To claim your prize:</p>
      <p>Full Name: ___________</p>
      <p>Date of Birth: ___________</p>
      <p className="relative">
        Credit Card (shipping: <span className="text-yellow-300 font-bold">$1.99</span>): ___________
        <Arrow label="CARD THEFT" side="right" className="top-0 -right-2" />
      </p>
    </div>
    <div className="bg-yellow-400 rounded-lg py-2.5 text-center">
      <span className="text-black font-extrabold text-sm">🎁 Claim My Prize Now →</span>
    </div>
  </div>
);

// ─── 4. DARK PATTERNS — checkout hidden checkbox ──────────────────────────────
const DarkPatternVisual = () => (
  <div className="relative w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    <div className="bg-[#0f172a] px-4 py-2.5 flex items-center gap-2">
      <ShoppingCart className="text-sky-300 w-4 h-4" />
      <span className="text-sky-300 text-xs font-semibold">Secure Checkout</span>
      <Lock className="text-sky-300 w-3 h-3 ml-auto" />
    </div>
    <div className="px-4 py-3">
      {/* Order row */}
      <div className="flex justify-between items-center border-b border-gray-100 pb-2 mb-2">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-sky-100 rounded flex items-center justify-center">
            <ShoppingCart className="w-4 h-4 text-sky-600" />
          </div>
          <div>
            <p className="text-xs font-semibold text-gray-800">Premium Wellness Kit</p>
            <p className="text-[10px] text-gray-400">Qty: 1</p>
          </div>
        </div>
        <p className="text-xs font-bold">$29.99</p>
      </div>
      {/* Totals */}
      <div className="text-xs text-gray-500 space-y-1 mb-2">
        <div className="flex justify-between"><span>Subtotal</span><span>$29.99</span></div>
        <div className="flex justify-between"><span>Shipping</span><span>FREE</span></div>
        <div className="flex justify-between font-bold text-gray-900 border-t pt-1"><span>Total</span><span>$32.46</span></div>
      </div>
      {/* THE DARK PATTERN */}
      <div className="relative bg-gray-50 rounded border border-gray-200 p-2 mb-3 opacity-80">
        <div className="flex items-start gap-1.5">
          <CheckSquare className="w-3 h-3 text-gray-400 mt-0.5 flex-shrink-0" />
          <p className="text-[9px] text-gray-400 leading-tight">
            By completing your purchase you agree to enroll in VitalCare+
            <span className="text-red-500 font-bold"> ($99/mo, auto-renewing)</span>…
          </p>
        </div>
        <Arrow label="PRE-CHECKED TRAP" side="right" className="-top-3 -right-1" />
      </div>
      <div className="bg-[#0f172a] rounded-lg py-2 text-center">
        <span className="text-white text-xs font-bold">Complete Purchase →</span>
      </div>
    </div>
  </div>
);

// ─── 5. ROMANCE SCAM — DM from stranger ───────────────────────────────────────
const RomanceVisual = () => (
  <div className="relative w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    {/* Messenger header */}
    <div className="bg-[#0866FF] px-4 py-2.5 flex items-center gap-2">
      <div className="w-7 h-7 bg-white/20 rounded-full flex items-center justify-center">
        <User className="w-4 h-4 text-white" />
      </div>
      <div>
        <p className="text-white text-xs font-bold">Robert Harrington</p>
        <p className="text-blue-200 text-[10px]">Active 2 min ago</p>
      </div>
      <Heart className="ml-auto w-4 h-4 text-red-300" />
    </div>
    {/* Messages */}
    <div className="px-3 py-3 bg-gray-50 space-y-2">
      <div className="flex gap-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">R</div>
        <div className="bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[80%]">
          <p className="text-xs text-gray-700">Good morning my darling 🌹 I've been thinking of you all night.</p>
        </div>
      </div>
      <div className="flex gap-2">
        <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white text-[10px] font-bold flex-shrink-0">R</div>
        <div className="relative bg-white rounded-2xl rounded-tl-sm px-3 py-2 shadow-sm max-w-[80%]">
          <p className="text-xs text-gray-700">I'm stranded in London, wallet stolen. Please wire me <span className="text-red-600 font-bold">$800</span> via Western Union 💔</p>
          <Arrow label="MONEY REQUEST" side="right" className="-top-3 -right-2" />
        </div>
      </div>
      {/* "Never video called" flag */}
      <div className="relative bg-yellow-50 border border-yellow-200 rounded-lg px-3 py-2">
        <p className="text-[10px] text-yellow-700 font-semibold">📹 Robert has never agreed to a video call</p>
        <Arrow label="RED FLAG" side="right" className="-top-3 -right-2" />
      </div>
    </div>
    {/* Reply bar */}
    <div className="px-3 py-2 border-t border-gray-200 flex gap-2">
      <div className="flex-1 bg-gray-100 rounded-full px-3 py-1 text-[10px] text-gray-400">Message…</div>
      <div className="w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
        <ExternalLink className="w-3 h-3 text-white" />
      </div>
    </div>
  </div>
);

// ─── 6. TECH SUPPORT SCAM — browser popup ─────────────────────────────────────
const TechSupportVisual = () => (
  <div className="relative w-full rounded-xl overflow-hidden shadow-xl border border-gray-300">
    {/* Browser chrome */}
    <div className="bg-gray-200 px-3 py-1.5 flex items-center gap-2">
      <div className="flex gap-1">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
      </div>
      <div className="flex-1 bg-white rounded px-2 py-0.5 text-[10px] text-gray-400 font-mono ml-1">
        news-today.com/article
      </div>
    </div>
    {/* Scam alert overlay */}
    <div className="bg-red-700 px-4 py-3">
      <div className="flex items-center gap-2 mb-2">
        <AlertTriangle className="w-6 h-6 text-white flex-shrink-0" />
        <div>
          <p className="text-white font-extrabold text-sm">⚠ MICROSOFT SECURITY ALERT</p>
          <p className="text-red-200 text-xs">Your computer has been LOCKED</p>
        </div>
      </div>
      <p className="text-red-100 text-xs leading-relaxed mb-3">
        Suspicious activity detected. Your passwords and banking details may be compromised. Do <strong>NOT</strong> restart.
      </p>
      {/* The phone number — the bait */}
      <div className="relative bg-red-900 rounded-lg py-2.5 text-center mb-2">
        <motion.div
          animate={{ opacity: [1, 0.6, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
        >
          <p className="text-white font-bold text-sm">📞 Call Now: 1-855-999-0001</p>
        </motion.div>
        <Arrow label="FAKE PHONE NUMBER" side="right" className="-top-3 -right-1" />
      </div>
      <div className="relative bg-gray-800 rounded-lg py-1.5 text-center">
        <p className="text-gray-400 text-xs">Close</p>
        <Arrow label="REAL ACTION" side="right" className="-top-3 -right-1" />
      </div>
    </div>
  </div>
);

// ─── 7. GIFT CARD PAYMENT — fake invoice ─────────────────────────────────────
const GiftCardVisual = () => (
  <div className="relative w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
    {/* Email header */}
    <div className="bg-[#003087] px-4 py-2.5 flex items-center gap-2">
      <div className="w-5 h-5 bg-white rounded-sm flex items-center justify-center">
        <span className="text-[#003087] font-extrabold text-[10px]">P</span>
      </div>
      <span className="text-white text-xs font-semibold">PayPal Billing</span>
    </div>
    <div className="px-4 py-3">
      <p className="text-xs text-gray-400 font-mono mb-1">From: noreply@paypal-billing-center.com</p>
      <p className="text-sm font-bold text-gray-900 mb-3">Invoice #PP-88241 — <span className="text-red-600">$349.00 charged</span></p>
      <div className="bg-red-50 border border-red-200 rounded-lg p-3 text-xs text-red-700 mb-3 leading-relaxed">
        A payment of <strong>$349.00</strong> was processed. If you did NOT authorize this,
        call our fraud line <strong>immediately</strong> at 1-800-555-0192.
      </div>
      {/* Gift card instruction */}
      <div className="relative bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
        <p className="text-xs text-gray-700 font-semibold mb-1">To dispute — purchase:</p>
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-green-600 rounded flex items-center justify-center">
            <CreditCard className="w-4 h-4 text-white" />
          </div>
          <p className="text-xs text-green-800 font-bold">$349 in Google Play gift cards</p>
        </div>
        <Arrow label="NO REAL BILLER USES GIFT CARDS" side="right" className="-top-3 -right-1" />
      </div>
      {/* Fake domain */}
      <div className="relative bg-gray-100 rounded px-2 py-1">
        <p className="font-mono text-[10px] text-gray-500">paypal-<span className="text-red-600 font-bold underline">billing-center.com</span></p>
        <Arrow label="NOT PAYPAL.COM" side="right" className="-top-3 -right-1" />
      </div>
    </div>
  </div>
);

// ─── 8. PHISHING — fake login page ────────────────────────────────────────────
const PhishingVisual = () => (
  <div className="relative w-full rounded-xl overflow-hidden shadow-xl border border-gray-300">
    {/* Browser chrome with red URL warning */}
    <div className="bg-gray-200 px-3 py-1.5 flex items-center gap-2">
      <div className="flex gap-1">
        <div className="w-2.5 h-2.5 rounded-full bg-red-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
        <div className="w-2.5 h-2.5 rounded-full bg-green-400" />
      </div>
      {/* Suspicious URL */}
      <div className="relative flex-1 flex items-center gap-1 bg-red-50 border border-red-300 rounded px-2 py-0.5 ml-1">
        <AlertTriangle className="w-3 h-3 text-red-500 flex-shrink-0" />
        <span className="font-mono text-[10px] text-red-600 truncate">wellsfargo-secure-login.com/verify</span>
        <Arrow label="FAKE URL" side="right" className="-top-5 right-0" />
      </div>
    </div>
    {/* Cloned bank login */}
    <div className="bg-white px-5 py-4">
      <div className="flex flex-col items-center mb-4">
        <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center text-white font-extrabold text-lg mb-2">WF</div>
        <p className="text-gray-900 font-bold text-sm">Wells Fargo</p>
        <p className="text-gray-400 text-xs">Sign in to Online Banking</p>
      </div>
      <div className="space-y-2 mb-3">
        {['Username', 'Password', 'PIN'].map((f, i) => (
          <div key={f} className="relative">
            <p className="text-xs text-gray-500 mb-0.5">{f}</p>
            <div className="bg-gray-100 border border-gray-200 rounded px-3 py-1.5 text-xs text-gray-300">Enter your {f.toLowerCase()}</div>
            {f === 'PIN' && <Arrow label="BANKS NEVER ASK FOR PIN ONLINE" side="right" className="-top-1 -right-1" />}
          </div>
        ))}
      </div>
      <div className="bg-red-600 rounded-lg py-2 text-center">
        <span className="text-white text-xs font-bold">Sign In</span>
      </div>
    </div>
  </div>
);

// ─── Visual registry ─────────────────────────────────────────────────────────
const VISUALS = {
  urgency:      UrgencyVisual,
  impersonation: ImpersonationVisual,
  'too-good':   TooGoodVisual,
  'dark-patterns': DarkPatternVisual,
  romance:      RomanceVisual,
  'tech-support': TechSupportVisual,
  'gift-card':  GiftCardVisual,
  phishing:     PhishingVisual,
};

export default memo(function TacticVisual({ tacticId }) {
  const Visual = VISUALS[tacticId];
  if (!Visual) return null;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full"
    >
      <Visual />
    </motion.div>
  );
});

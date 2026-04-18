import { memo } from 'react';
import { motion } from 'framer-motion';
import { Mail, Star, Archive, Trash2, ReplyAll, ExternalLink, Flag, MoreHorizontal } from 'lucide-react';

export default memo(function SimEmail({ config, hasTremor, onPass, onFail }) {
  const t = hasTremor;

  // Determine brand accent color based on sender
  const isAmazon = config.senderName.toLowerCase().includes('amazon');
  const isPayPal = config.senderName.toLowerCase().includes('paypal');
  const isApple = config.senderName.toLowerCase().includes('apple');

  const brandColor = isAmazon ? '#FF9900' : isPayPal ? '#003087' : isApple ? '#1d1d1f' : '#4F46E5';
  const brandInitial = config.senderName[0];

  return (
    <div className={`w-full max-w-lg mx-auto rounded-2xl overflow-hidden shadow-card border ${t ? 'border-ag-border bg-ag-surface' : 'border-gray-200 bg-white'}`}>
      {/* Gmail-style toolbar */}
      <div className={`px-4 py-2.5 flex items-center gap-2 border-b ${t ? 'border-ag-border bg-ag-bg' : 'border-gray-100 bg-gray-50'}`}>
        <Mail className={`w-4 h-4 ${t ? 'text-ag-accent' : 'text-blue-500'}`} />
        <span className={`font-semibold ${t ? 'text-ag-text text-base' : 'text-gray-700 text-sm'}`}>Inbox</span>
        <div className="ml-auto flex items-center gap-3">
          <Star className={`w-4 h-4 ${t ? 'text-ag-faint' : 'text-gray-300'}`} />
          <Archive className={`w-4 h-4 ${t ? 'text-ag-faint' : 'text-gray-300'}`} />
          <Trash2 className={`w-4 h-4 ${t ? 'text-ag-faint' : 'text-gray-300'}`} />
          <MoreHorizontal className={`w-4 h-4 ${t ? 'text-ag-faint' : 'text-gray-300'}`} />
        </div>
      </div>

      {/* Email subject */}
      <div className={`px-5 pt-5 pb-3 border-b ${t ? 'border-ag-border bg-ag-surface' : 'border-gray-100 bg-white'}`}>
        <p className={`font-bold leading-snug mb-3 ${t ? 'text-ag-text text-xl' : 'text-gray-900 text-base'}`}>{config.subject}</p>

        <div className="flex items-center gap-3">
          {/* Sender avatar */}
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: brandColor }}
          >
            {brandInitial}
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className={`font-semibold ${t ? 'text-ag-text text-base' : 'text-gray-900 text-sm'}`}>{config.senderName}</p>
            </div>
            {/* The suspicious "from" address - subtle in normal mode */}
            <p className={`font-mono truncate ${t ? 'text-ag-muted text-sm' : 'text-gray-400 text-xs'}`}>
              &lt;{config.senderAddress}&gt;
            </p>
          </div>
          <span className={`flex-shrink-0 ${t ? 'text-ag-muted text-sm' : 'text-gray-400 text-xs'}`}>{config.timestamp}</span>
        </div>
      </div>

      {/* Email body */}
      <div className={`px-5 py-5 ${t ? 'bg-ag-surface' : 'bg-white'}`}>
        <div className="space-y-3">
          {config.body.map((para, i) => (
            <p key={i} className={`leading-relaxed ${t ? 'text-ag-text text-base' : 'text-gray-700 text-sm'}`}>{para}</p>
          ))}
        </div>

        {/* CTA button - the bait */}
        <div className="mt-5">
          <motion.button
            onClick={onFail}
            className={`flex items-center gap-2 rounded-lg font-semibold text-white transition-colors ${t ? 'px-6 py-3.5 text-base' : 'px-5 py-2.5 text-sm'}`}
            style={{ backgroundColor: brandColor }}
            whileHover={{ opacity: 0.9 }}
            whileTap={{ scale: 0.97 }}
          >
            <ExternalLink className={t ? 'w-5 h-5' : 'w-4 h-4'} />
            {config.buttonText}
          </motion.button>
          {/* The deceptive URL shown small beneath the button */}
          <p className={`mt-1.5 font-mono ${t ? 'text-ag-muted text-sm' : 'text-gray-400 text-[10px]'}`}>
            {config.buttonUrl}
          </p>
        </div>

        {/* Footer note for harder levels */}
        {config.hasFooter && (
          <p className={`mt-6 pt-4 border-t ${t ? 'border-ag-border text-ag-faint text-sm' : 'border-gray-100 text-gray-300 text-[10px]'}`}>
            {config.footerText}
          </p>
        )}
      </div>

      {/* Action bar */}
      <div className={`px-5 py-3 border-t flex gap-2 ${t ? 'border-ag-border bg-ag-bg' : 'border-gray-100 bg-gray-50'}`}>
        <motion.button
          onClick={onFail}
          className={`flex items-center gap-2 px-3 rounded-lg font-semibold border transition-colors ${t ? 'py-2.5 text-base border-ag-border text-ag-muted hover:bg-ag-surface2' : 'py-2 text-xs border-gray-200 text-gray-500 hover:bg-white'}`}
          whileTap={{ scale: 0.97 }}
        >
          <ReplyAll className={t ? 'w-4 h-4' : 'w-3.5 h-3.5'} /> Reply
        </motion.button>
        <motion.button
          onClick={onPass}
          className={`flex items-center gap-2 px-3 rounded-lg font-semibold bg-ag-danger text-white hover:bg-ag-danger-d transition-colors ${t ? 'py-2.5 text-base' : 'py-2 text-xs'}`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.97 }}
        >
          <Flag className={t ? 'w-4 h-4' : 'w-3.5 h-3.5'} /> Report as Phishing
        </motion.button>
      </div>
    </div>
  );
});

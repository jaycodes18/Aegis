import { memo } from 'react';
import { motion } from 'framer-motion';
import { Phone, Video, Info, Send, ChevronLeft } from 'lucide-react';

export default memo(function SimDM({ config, hasTremor, onPass, onFail }) {
  const t = hasTremor;

  const handleAction = (option) => {
    option.danger ? onFail() : onPass();
  };

  return (
    <div className="w-full max-w-sm mx-auto">
      <div className={`rounded-2xl overflow-hidden shadow-xl border ${t ? 'border-ag-border' : 'border-gray-200'}`}>

        {/* Messenger-style header */}
        <div className="bg-[#0866FF] px-4 py-3">
          <div className="flex items-center gap-3">
            <ChevronLeft className="text-white w-5 h-5 flex-shrink-0" />
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-white font-extrabold text-sm flex-shrink-0 bg-white/20">
              {config.avatar}
            </div>
            <div className="flex-1 min-w-0">
              <p className={`text-white font-bold truncate ${t ? 'text-base' : 'text-sm'}`}>{config.contactName}</p>
              <p className={`text-blue-200 truncate ${t ? 'text-sm' : 'text-xs'}`}>{config.contactSubtitle}</p>
            </div>
            <div className="flex items-center gap-3 flex-shrink-0">
              <Phone className={`text-white ${t ? 'w-5 h-5' : 'w-4 h-4'}`} />
              <Video className={`text-white ${t ? 'w-5 h-5' : 'w-4 h-4'}`} />
              <Info  className={`text-white ${t ? 'w-5 h-5' : 'w-4 h-4'}`} />
            </div>
          </div>
        </div>

        {/* Chat thread */}
        <div className={`px-4 py-4 space-y-3 min-h-[280px] ${t ? 'bg-ag-bg' : 'bg-white'}`}>
          {/* Date label */}
          <p className={`text-center ${t ? 'text-ag-faint text-xs' : 'text-gray-400 text-xs'}`}>3 weeks ago</p>
          {config.messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.3 }}
              className={`flex ${msg.from === 'them' ? 'justify-start' : 'justify-end'} gap-2`}
            >
              {msg.from === 'them' && (
                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0 self-end ${config.avatarColor}`}>
                  {config.avatar[0]}
                </div>
              )}
              <div className={`max-w-[78%] rounded-2xl px-3.5 py-2.5 ${
                msg.from === 'them'
                  ? t ? 'bg-ag-surface2 rounded-tl-sm' : 'bg-gray-100 rounded-tl-sm'
                  : 'bg-[#0866FF] rounded-tr-sm'
              }`}>
                <p className={`leading-snug ${t ? 'text-sm' : 'text-sm'} ${
                  msg.from === 'them' ? (t ? 'text-ag-text' : 'text-gray-800') : 'text-white'
                }`}>{msg.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Input bar */}
        <div className={`px-3 py-2.5 border-t flex items-center gap-2 ${t ? 'bg-ag-surface border-ag-border' : 'bg-white border-gray-200'}`}>
          <div className={`flex-1 rounded-full px-4 py-2 text-sm ${t ? 'bg-ag-surface2 text-ag-faint' : 'bg-gray-100 text-gray-400'}`}>
            Aa
          </div>
          <div className="w-8 h-8 rounded-full bg-[#0866FF] flex items-center justify-center flex-shrink-0">
            <Send className="w-3.5 h-3.5 text-white" />
          </div>
        </div>

        {/* Response choices */}
        <div className={`px-4 pb-4 pt-2 space-y-2 border-t ${t ? 'bg-ag-surface border-ag-border' : 'bg-gray-50 border-gray-200'}`}>
          <p className={`font-semibold mb-2 ${t ? 'text-ag-muted text-sm' : 'text-gray-500 text-xs uppercase tracking-wide'}`}>
            What do you do?
          </p>
          {config.replyOptions.map((opt) => (
            <motion.button
              key={opt.id}
              onClick={() => handleAction(opt)}
              className={`w-full text-left rounded-xl px-4 font-semibold border-2 transition-colors ${t ? 'py-3.5 text-base' : 'py-2.5 text-sm'} ${
                opt.danger
                  ? t
                    ? 'border-ag-danger/40 bg-ag-danger-dim text-ag-danger hover:bg-red-900/40'
                    : 'border-red-200 bg-red-50 text-red-700 hover:bg-red-100'
                  : t
                    ? 'border-ag-success/40 bg-ag-success-dim text-ag-success hover:bg-green-900/30'
                    : 'border-green-200 bg-green-50 text-green-700 hover:bg-green-100'
              }`}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.97 }}
            >
              {opt.label}
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );
});

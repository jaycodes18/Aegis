import { memo } from 'react';
import { motion } from 'framer-motion';
import { Trash2, Phone, MoreVertical, ChevronLeft, Video } from 'lucide-react';

export default memo(function SimSMS({ config, hasTremor, onPass, onFail }) {
  const t = hasTremor;
  const isUnknown = config.sender.toLowerCase().includes('unknown');
  const initials = isUnknown ? '?' : config.sender.slice(0, 2).toUpperCase();

  return (
    <div className="w-full max-w-xs mx-auto">
      {/* Realistic iPhone frame */}
      <div className={`rounded-[2.8rem] overflow-hidden border-[6px] shadow-2xl ${t ? 'border-ag-border' : 'border-gray-800'} bg-gray-950`}>
        {/* iOS-style notch status bar */}
        <div className="bg-gray-950 px-5 pt-2.5 pb-1 flex justify-between items-center">
          <span className="text-white text-xs font-semibold">9:41</span>
          <div className="w-24 h-4 bg-black rounded-full mx-auto absolute left-1/2 -translate-x-1/2 top-1.5 opacity-90" />
          <div className="flex items-center gap-1.5">
            <svg className="w-4 h-3 text-white" fill="currentColor" viewBox="0 0 18 12">
              <rect x="0" y="3" width="3" height="9" rx="0.5" opacity="0.3"/>
              <rect x="4" y="2" width="3" height="10" rx="0.5" opacity="0.5"/>
              <rect x="8" y="1" width="3" height="11" rx="0.5" opacity="0.7"/>
              <rect x="12" y="0" width="3" height="12" rx="0.5"/>
            </svg>
            <span className="text-white text-xs">100%</span>
          </div>
        </div>

        {/* iMessage header */}
        <div className="bg-gray-950 px-4 py-2 flex items-center gap-2">
          <button className="text-blue-400 flex items-center gap-0.5">
            <ChevronLeft className="w-5 h-5" />
            <span className="text-sm">Texts</span>
          </button>
          <div className="flex-1 text-center">
            <div className={`w-9 h-9 rounded-full mx-auto flex items-center justify-center font-bold text-sm text-white ${isUnknown ? 'bg-gray-600' : 'bg-blue-500'}`}>
              {initials}
            </div>
            <p className="text-white text-xs font-semibold mt-0.5">{config.sender}</p>
            <p className="text-gray-500 text-[10px]">{isUnknown ? 'Unknown Sender' : 'No FaceTime'}</p>
          </div>
          <Video className="w-5 h-5 text-blue-400" />
        </div>

        {/* Message thread */}
        <div className="bg-white px-3 py-4 min-h-[200px] space-y-3">
          {/* Timestamp */}
          <p className="text-center text-gray-400 text-xs">Today 9:38 AM</p>
          {config.messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.35 }}
              className={`flex ${msg.from === 'them' ? 'justify-start' : 'justify-end'}`}
            >
              <div className={`max-w-[82%] rounded-2xl px-3.5 py-2 ${
                msg.from === 'them'
                  ? 'bg-gray-200 rounded-tl-sm'
                  : 'bg-[#0a84ff] rounded-tr-sm'
              }`}>
                <p className={`leading-snug ${t ? 'text-sm' : 'text-[13px]'} ${msg.from === 'them' ? 'text-gray-900' : 'text-white'}`}>
                  {msg.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action buttons */}
        <div className="bg-gray-100 px-3 py-3 space-y-2 border-t border-gray-200">
          <motion.button
            onClick={onFail}
            className={`w-full flex items-center justify-center gap-2 rounded-2xl bg-blue-500 text-white font-semibold ${t ? 'py-3.5 text-base' : 'py-2.5 text-sm'}`}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
          >
            <Phone className={t ? 'w-5 h-5' : 'w-4 h-4'} /> Call the number
          </motion.button>
          <motion.button
            onClick={onPass}
            className={`w-full flex items-center justify-center gap-2 rounded-2xl bg-red-500 text-white font-semibold ${t ? 'py-3.5 text-base' : 'py-2.5 text-sm'}`}
            whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
          >
            <Trash2 className={t ? 'w-5 h-5' : 'w-4 h-4'} /> Delete and Block
          </motion.button>
        </div>
      </div>
    </div>
  );
});

import { useState, useEffect, useRef, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Phone, PhoneOff, PhoneCall, MicOff, Volume2 } from 'lucide-react';

export default memo(function SimPhone({ config, hasTremor, onPass, onFail }) {
  const [phase, setPhase] = useState('ringing'); // ringing | answered | done
  const [visibleLines, setVisibleLines] = useState(0);
  const [callDuration, setCallDuration] = useState(0);
  const t = hasTremor;
  const passedRef = useRef(false);

  // Auto-answer after 2.2s
  useEffect(() => {
    if (phase !== 'ringing') return;
    const id = setTimeout(() => setPhase('answered'), 2200);
    return () => clearTimeout(id);
  }, [phase]);

  // Show transcript line by line
  useEffect(() => {
    if (phase !== 'answered') return;
    if (visibleLines >= config.transcript.length) return;
    const id = setTimeout(() => setVisibleLines(v => v + 1), 1600);
    return () => clearTimeout(id);
  }, [phase, visibleLines, config.transcript.length]);

  // Call duration counter
  useEffect(() => {
    if (phase !== 'answered') return;
    const id = setInterval(() => setCallDuration(d => d + 1), 1000);
    return () => clearInterval(id);
  }, [phase]);

  const fmt = (s) => `${String(Math.floor(s / 60)).padStart(2,'0')}:${String(s % 60).padStart(2,'0')}`;

  const handleAction = (action) => {
    if (passedRef.current) return;
    passedRef.current = true;
    setPhase('done');
    if (action.danger) onFail();
    else onPass();
  };

  return (
    <div className="w-full max-w-[280px] mx-auto">
      {/* iPhone-style phone body */}
      <div className={`rounded-[2.5rem] overflow-hidden border-[5px] shadow-2xl ${t ? 'border-ag-border' : 'border-gray-800'} bg-black`}>
        {/* Lock screen bg */}
        <div className="relative bg-gradient-to-b from-gray-900 via-gray-950 to-black min-h-[560px]">
          {/* Status bar */}
          <div className="px-6 pt-3 pb-0 flex justify-between items-center">
            <span className="text-white text-xs font-semibold">9:41 AM</span>
            <div className="absolute left-1/2 -translate-x-1/2 top-2 w-20 h-3.5 bg-black rounded-full" />
            <div className="flex items-center gap-1">
              <span className="text-white text-xs">100%</span>
              <svg className="w-5 h-3 text-white" fill="currentColor" viewBox="0 0 20 12">
                <rect x="0" y="2" width="3.5" height="8" rx="0.5" opacity="0.4"/>
                <rect x="4.5" y="1" width="3.5" height="10" rx="0.5" opacity="0.6"/>
                <rect x="9" y="0" width="3.5" height="12" rx="0.5" opacity="0.8"/>
                <rect x="13.5" y="0" width="3.5" height="12" rx="0.5"/>
                <rect x="18" y="3.5" width="1.5" height="5" rx="0.5"/>
              </svg>
            </div>
          </div>

          {/* Caller info */}
          <div className="px-5 pt-8 pb-4 text-center">
            <p className={`text-green-400 font-medium mb-2 ${t ? 'text-base' : 'text-sm'}`}>
              {phase === 'ringing' ? 'incoming call' : phase === 'answered' ? fmt(callDuration) : 'Call Ended'}
            </p>

            <motion.div
              className="w-20 h-20 rounded-full mx-auto mb-4 bg-slate-700 flex items-center justify-center border-2 border-slate-600"
              animate={phase === 'ringing' ? {
                boxShadow: [
                  '0 0 0 0 rgba(74,222,128,0.4)',
                  '0 0 0 20px rgba(74,222,128,0)',
                  '0 0 0 0 rgba(74,222,128,0)',
                ],
              } : {}}
              transition={{ repeat: Infinity, duration: 1.2 }}
            >
              <Phone className="w-8 h-8 text-gray-400" />
            </motion.div>

            <p className={`text-white font-bold ${t ? 'text-2xl' : 'text-xl'}`}>{config.callerId}</p>
            <p className={`text-gray-500 font-mono mt-0.5 ${t ? 'text-sm' : 'text-xs'}`}>{config.callerNumber}</p>
          </div>

          {/* Transcript - shows when answered */}
          <AnimatePresence>
            {phase === 'answered' && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="mx-3 mb-3 bg-gray-900/80 rounded-2xl px-3 py-3 max-h-48 overflow-y-auto space-y-2"
              >
                {config.transcript.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-green-400 flex-shrink-0 mt-2" />
                    <p className={`text-gray-200 leading-snug ${t ? 'text-sm' : 'text-xs'}`}>{line.text}</p>
                  </motion.div>
                ))}
                {phase === 'answered' && visibleLines < config.transcript.length && (
                  <div className="flex gap-1 pl-3.5">
                    {[0,1,2].map(i => (
                      <motion.div key={i} className="w-1.5 h-1.5 rounded-full bg-gray-600"
                        animate={{ opacity: [0.3, 1, 0.3] }}
                        transition={{ repeat: Infinity, duration: 1, delay: i * 0.22 }}
                      />
                    ))}
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Call controls */}
          <div className="px-4 pb-6">
            {phase === 'ringing' ? (
              <div className="flex items-center justify-around mt-4">
                <div className="text-center">
                  <motion.button
                    onClick={() => setPhase('answered')}
                    className="w-16 h-16 rounded-full bg-green-600 flex items-center justify-center"
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ repeat: Infinity, duration: 0.9 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <PhoneCall className="w-7 h-7 text-white" />
                  </motion.button>
                  <p className="text-gray-400 text-xs mt-1.5">Accept</p>
                </div>
                <div className="text-center">
                  <motion.button
                    onClick={onPass}
                    className="w-16 h-16 rounded-full bg-red-600 flex items-center justify-center"
                    whileTap={{ scale: 0.95 }}
                  >
                    <PhoneOff className="w-7 h-7 text-white" />
                  </motion.button>
                  <p className="text-gray-400 text-xs mt-1.5">Decline</p>
                </div>
              </div>
            ) : phase === 'answered' ? (
              <div className="space-y-2 mt-2">
                {/* Quick controls row */}
                <div className="flex justify-around mb-3">
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                      <MicOff className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="text-gray-500 text-[10px]">Mute</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
                      <Volume2 className="w-5 h-5 text-gray-400" />
                    </div>
                    <span className="text-gray-500 text-[10px]">Speaker</span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <motion.button
                      onClick={() => handleAction({ danger: false })}
                      className="w-10 h-10 rounded-full bg-red-600 flex items-center justify-center"
                    >
                      <PhoneOff className="w-5 h-5 text-white" />
                    </motion.button>
                    <span className="text-gray-500 text-[10px]">End</span>
                  </div>
                </div>
                {/* Response choices */}
                {config.actions.filter(a => a.id !== 'hangup').map(action => (
                  <motion.button
                    key={action.id}
                    onClick={() => handleAction(action)}
                    className={`w-full flex items-center justify-center gap-2 rounded-2xl font-semibold ${t ? 'py-3.5 text-base' : 'py-2.5 text-sm'} ${
                      action.danger
                        ? 'bg-red-700 text-white hover:bg-red-600'
                        : 'bg-slate-700 text-white hover:bg-slate-600'
                    } transition-colors`}
                    whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.97 }}
                  >
                    {action.label}
                  </motion.button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
});

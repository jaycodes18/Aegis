import { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, Lightbulb, AlertCircle, BookOpen, Eye, Rocket } from 'lucide-react';
import { TACTICS } from '../data/scamData';
import TacticVisual from './TacticVisual';

// ─── Progress dots ─────────────────────────────────────────────────────────────
const ProgressDots = memo(({ total, current, hasTremor }) => (
  <div className="flex items-center justify-center gap-2">
    {Array.from({ length: total }).map((_, i) => (
      <motion.div
        key={i}
        animate={{
          width: i === current ? (hasTremor ? 28 : 22) : hasTremor ? 10 : 8,
          backgroundColor:
            i < current
              ? '#22d67a'
              : i === current
              ? '#00c8ff'
              : '#262b38',
        }}
        transition={{ duration: 0.3 }}
        className={`rounded-full ${hasTremor ? 'h-3' : 'h-2'}`}
      />
    ))}
  </div>
));
ProgressDots.displayName = 'ProgressDots';

// ─── Single tactic card ────────────────────────────────────────────────────────
const TacticCard = memo(({ tactic, hasTremor, onNext, onPrev, isFirst, isLast, index, total }) => {
  const [tipRevealed, setTipRevealed] = useState(false);
  const t = hasTremor;

  return (
    <motion.div
      key={tactic.id}
      initial={{ opacity: 0, x: 50 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -50 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="w-full rounded-2xl border border-ag-border bg-ag-surface overflow-hidden shadow-card"
    >
      {/* Header */}
      <div className="px-6 py-4 border-b border-ag-border bg-ag-surface2 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className={t ? 'text-4xl' : 'text-3xl'}>{tactic.emoji}</span>
          <div>
            <h2 className={`font-bold text-ag-text leading-tight ${t ? 'text-2xl' : 'text-lg'}`}>{tactic.title}</h2>
            <p className={`text-ag-muted ${t ? 'text-base' : 'text-xs'}`}>{tactic.subtitle}</p>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full font-semibold border border-ag-accent/30 bg-ag-accent/10 text-ag-accent flex-shrink-0 ${t ? 'text-sm' : 'text-xs'}`}>
          {index + 1} / {total}
        </span>
      </div>

      {/* Split layout */}
      <div className="flex flex-col lg:flex-row">

        {/* LEFT - visual mockup */}
        <div className="lg:w-[45%] flex-shrink-0 p-5 flex flex-col gap-3 bg-ag-bg border-b lg:border-b-0 lg:border-r border-ag-border">
          <div className="flex items-center gap-1.5 mb-1 text-ag-muted">
            <Eye className="w-3.5 h-3.5" />
            <span className={`font-semibold uppercase tracking-wider ${t ? 'text-sm' : 'text-xs'}`}>
              What it looks like
            </span>
          </div>
          <TacticVisual tacticId={tactic.id} />
        </div>

        {/* RIGHT - explanation */}
        <div className="flex-1 p-5 flex flex-col gap-4">
          <p className={`leading-relaxed text-ag-text ${t ? 'text-lg' : 'text-sm'}`}>
            {tactic.description}
          </p>

          {/* Real-world example */}
          <div className="rounded-xl p-4 border border-ag-border bg-ag-surface2">
            <div className="flex items-start gap-2">
              <AlertCircle className={`flex-shrink-0 mt-0.5 text-ag-danger ${t ? 'w-5 h-5' : 'w-4 h-4'}`} />
              <div>
                <p className={`font-bold text-ag-danger mb-1 ${t ? 'text-sm' : 'text-[11px] uppercase tracking-wide'}`}>
                  Real-world example
                </p>
                <p className={`italic leading-snug text-ag-muted ${t ? 'text-base' : 'text-sm'}`}>
                  "{tactic.realExample}"
                </p>
              </div>
            </div>
          </div>

          {/* Protection tip - hidden until clicked */}
          <AnimatePresence mode="wait">
            {!tipRevealed ? (
              <motion.button
                key="reveal"
                exit={{ opacity: 0, scale: 0.95 }}
                onClick={() => setTipRevealed(true)}
                className={`w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-ag-warn/40 text-ag-warn font-semibold hover:bg-ag-warn-dim transition-colors ${t ? 'py-4 text-lg' : 'py-3 text-sm'}`}
                whileTap={{ scale: 0.97 }}
              >
                <Lightbulb className={t ? 'w-5 h-5' : 'w-4 h-4'} />
                Reveal Protection Tip
              </motion.button>
            ) : (
              <motion.div
                key="tip"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl p-4 border border-ag-warn/30 bg-ag-warn-dim"
              >
                <div className="flex items-start gap-2">
                  <Lightbulb className={`flex-shrink-0 mt-0.5 text-ag-warn ${t ? 'w-5 h-5' : 'w-4 h-4'}`} />
                  <div>
                    <p className={`font-bold text-ag-warn mb-1 ${t ? 'text-base' : 'text-[11px] uppercase tracking-wide'}`}>
                      {tactic.tipTitle}
                    </p>
                    <p className={`leading-relaxed text-ag-text ${t ? 'text-base' : 'text-sm'}`}>
                      {tactic.tip}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Nav footer */}
      <div className="px-6 py-4 border-t border-ag-border bg-ag-surface2 flex items-center justify-between">
        <button
          onClick={onPrev}
          disabled={isFirst}
          className={`flex items-center gap-1.5 rounded-xl font-semibold transition-colors ${t ? 'px-5 py-3 text-lg' : 'px-4 py-2 text-sm'} ${
            isFirst
              ? 'opacity-25 cursor-not-allowed text-ag-faint'
              : 'text-ag-muted hover:text-ag-text hover:bg-ag-border/40'
          }`}
        >
          <ChevronLeft className={t ? 'w-5 h-5' : 'w-4 h-4'} /> Previous
        </button>

        <motion.button
          onClick={onNext}
          className={`flex items-center gap-2 rounded-xl font-bold bg-ag-accent text-ag-bg hover:bg-[#1ad4ff] transition-colors shadow-glow-sm ${t ? 'px-8 py-4 text-xl' : 'px-6 py-2.5 text-sm'}`}
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
        >
          {isLast ? (
            <><Rocket className={t ? 'w-5 h-5' : 'w-4 h-4'} /> Start Challenges</>
          ) : (
            <>Next Tactic <ChevronRight className={t ? 'w-5 h-5' : 'w-4 h-4'} /></>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
});
TacticCard.displayName = 'TacticCard';

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function LearnPage({ hasTremor, onComplete }) {
  const [index, setIndex] = useState(0);
  const t = hasTremor;

  const handleNext = useCallback(() => {
    if (index < TACTICS.length - 1) setIndex(i => i + 1);
    else onComplete?.();
  }, [index, onComplete]);

  const handlePrev = useCallback(() => setIndex(i => Math.max(0, i - 1)), []);

  return (
    <div className="min-h-screen flex flex-col bg-ag-bg">
      {/* Topbar */}
      <div className="bg-ag-surface border-b border-ag-border px-6 py-3.5 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-ag-accent/10 border border-ag-accent/20 flex items-center justify-center">
          <BookOpen className="w-3.5 h-3.5 text-ag-accent" />
        </div>
        <span className={`font-bold text-ag-text ${t ? 'text-xl' : 'text-sm'}`}>Aegis - Scam Tactics</span>
        <span className={`ml-auto font-mono text-ag-accent ${t ? 'text-base' : 'text-sm'}`}>
          {index + 1} / {TACTICS.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-6 max-w-4xl mx-auto w-full">
        {/* Title + dots */}
        <div className="text-center mb-5 w-full">
          <h1 className={`font-extrabold text-ag-text ${t ? 'text-3xl' : 'text-2xl'}`}>
            Know What to Look For
          </h1>
          <p className={`mt-1 text-ag-muted ${t ? 'text-lg' : 'text-sm'}`}>
            Each lesson shows you a real example and how to spot it.
          </p>
          <div className="mt-4">
            <ProgressDots total={TACTICS.length} current={index} hasTremor={t} />
          </div>
        </div>

        <div className="w-full">
          <AnimatePresence mode="wait">
            <TacticCard
              key={TACTICS[index].id}
              tactic={TACTICS[index]}
              hasTremor={t}
              onNext={handleNext}
              onPrev={handlePrev}
              isFirst={index === 0}
              isLast={index === TACTICS.length - 1}
              index={index}
              total={TACTICS.length}
            />
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

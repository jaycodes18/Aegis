import { useState, useCallback, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Trophy, ChevronRight, CheckCircle, XCircle,
  AlertTriangle, Eye, Lightbulb, Zap, Target, Flame
} from 'lucide-react';
import { SIMULATIONS } from '../data/simulations';

import SimCheckout from '../simulations/SimCheckout';
import SimEmail    from '../simulations/SimEmail';
import SimPopup    from '../simulations/SimPopup';
import SimSMS      from '../simulations/SimSMS';
import SimLogin    from '../simulations/SimLogin';
import SimPrize    from '../simulations/SimPrize';
import SimPhone    from '../simulations/SimPhone';
import SimDM       from '../simulations/SimDM';

const SIM_MAP = {
  checkout: SimCheckout,
  email:    SimEmail,
  popup:    SimPopup,
  sms:      SimSMS,
  login:    SimLogin,
  prize:    SimPrize,
  phone:    SimPhone,
  dm:       SimDM,
};

// Difficulty config
const DIFF = {
  easy:   { label: 'Easy',   color: 'text-ag-easy',   bg: 'bg-ag-easy/10 border-ag-easy/30',   Icon: Zap },
  medium: { label: 'Medium', color: 'text-ag-medium', bg: 'bg-ag-medium/10 border-ag-medium/30', Icon: Target },
  hard:   { label: 'Hard',   color: 'text-ag-hard',   bg: 'bg-ag-hard/10 border-ag-hard/30',   Icon: Flame },
};

// ─── Progress bar ─────────────────────────────────────────────────────────────
const LinearProgress = memo(({ current, total, hasTremor }) => (
  <div className={`w-full rounded-full overflow-hidden bg-ag-border ${hasTremor ? 'h-3' : 'h-1.5'}`}>
    <motion.div
      className="h-full rounded-full bg-ag-accent"
      animate={{ width: `${(current / total) * 100}%` }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      style={{ boxShadow: '0 0 8px rgba(0,200,255,0.4)' }}
    />
  </div>
));
LinearProgress.displayName = 'LinearProgress';

// ─── Difficulty badge ─────────────────────────────────────────────────────────
const DiffBadge = memo(({ difficulty, hasTremor }) => {
  const d = DIFF[difficulty] || DIFF.easy;
  return (
    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full border font-semibold ${d.bg} ${d.color} ${hasTremor ? 'text-sm' : 'text-xs'}`}>
      <d.Icon className={hasTremor ? 'w-3.5 h-3.5' : 'w-3 h-3'} />
      {d.label}
    </span>
  );
});
DiffBadge.displayName = 'DiffBadge';

// ─── Red flag item ─────────────────────────────────────────────────────────────
const RedFlagItem = memo(({ text, index, hasTremor }) => (
  <motion.li
    initial={{ opacity: 0, x: -8 }}
    animate={{ opacity: 1, x: 0 }}
    transition={{ delay: index * 0.08 + 0.2 }}
    className={`flex items-start gap-2 ${hasTremor ? 'text-base text-ag-text' : 'text-sm text-ag-muted'}`}
  >
    <AlertTriangle className={`flex-shrink-0 mt-0.5 text-ag-danger ${hasTremor ? 'w-5 h-5' : 'w-4 h-4'}`} />
    {text}
  </motion.li>
));
RedFlagItem.displayName = 'RedFlagItem';

// ─── Explanation panel ─────────────────────────────────────────────────────────
const ExplanationPanel = memo(({ sim, passed, hasTremor, onNext, isLast }) => {
  const t = hasTremor;
  const SimComponent = SIM_MAP[sim.type];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full rounded-2xl border border-ag-border bg-ag-surface overflow-hidden shadow-card"
    >
      {/* Result banner */}
      <div className={`px-6 py-4 flex items-center gap-3 border-b border-ag-border ${
        passed ? 'bg-ag-success-dim' : 'bg-ag-danger-dim'
      }`}>
        {passed
          ? <CheckCircle className={`flex-shrink-0 text-ag-success ${t ? 'w-8 h-8' : 'w-6 h-6'}`} />
          : <XCircle    className={`flex-shrink-0 text-ag-danger ${t ? 'w-8 h-8' : 'w-6 h-6'}`} />
        }
        <div>
          <p className={`font-extrabold ${t ? 'text-2xl' : 'text-lg'} ${passed ? 'text-ag-success' : 'text-ag-danger'}`}>
            {passed ? 'You spotted it!' : 'The scam got you.'}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <p className={`text-ag-muted ${t ? 'text-base' : 'text-xs'}`}>
              {sim.category} - {sim.title}
            </p>
            <DiffBadge difficulty={sim.difficulty} hasTremor={false} />
          </div>
        </div>
      </div>

      {/* Split: frozen sim left / breakdown right */}
      <div className="flex flex-col lg:flex-row">

        {/* LEFT - frozen sim visual */}
        <div className="lg:w-[45%] flex-shrink-0 p-5 flex flex-col gap-2 pointer-events-none select-none bg-ag-bg border-b lg:border-b-0 lg:border-r border-ag-border">
          <div className="flex items-center gap-1.5 mb-1 text-ag-muted">
            <Eye className="w-3.5 h-3.5" />
            <span className={`font-semibold uppercase tracking-wider ${t ? 'text-sm' : 'text-xs'}`}>
              What you just saw
            </span>
          </div>
          <div className="opacity-75 scale-95 origin-top">
            <SimComponent config={sim.config} hasTremor={t} onPass={() => {}} onFail={() => {}} />
          </div>
        </div>

        {/* RIGHT - explanation */}
        <div className="flex-1 p-5 flex flex-col gap-4">
          {/* What happened */}
          <div>
            <div className="flex items-center gap-1.5 mb-2 text-ag-muted">
              <Lightbulb className="w-3.5 h-3.5" />
              <span className={`font-semibold uppercase tracking-wider ${t ? 'text-sm' : 'text-xs'}`}>
                What happened
              </span>
            </div>
            <p className={`leading-relaxed text-ag-text ${t ? 'text-base' : 'text-sm'}`}>
              {sim.explanation}
            </p>
          </div>

          {/* Red flags */}
          <div className="rounded-xl p-4 border border-ag-danger/20 bg-ag-danger-dim">
            <p className={`font-bold text-ag-danger mb-3 ${t ? 'text-base' : 'text-xs uppercase tracking-wide'}`}>
              Red flags in this scenario
            </p>
            <ul className="space-y-2">
              {sim.redFlags.map((flag, i) => (
                <RedFlagItem key={i} text={flag} index={i} hasTremor={t} />
              ))}
            </ul>
          </div>

          {/* Next button */}
          <motion.button
            onClick={onNext}
            className={`mt-auto w-full flex items-center justify-center gap-2 rounded-xl bg-ag-accent text-ag-bg font-bold hover:bg-[#1ad4ff] transition-colors shadow-glow-sm ${t ? 'py-5 text-xl' : 'py-3 text-sm'}`}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
          >
            {isLast ? 'See My Results' : 'Next Challenge'}
            <ChevronRight className={t ? 'w-6 h-6' : 'w-4 h-4'} />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
});
ExplanationPanel.displayName = 'ExplanationPanel';

// ─── Tier divider ─────────────────────────────────────────────────────────────
function getTierLabel(simIndex) {
  if (simIndex === 0) return { show: true, tier: 'easy' };
  if (simIndex === 5) return { show: true, tier: 'medium' };
  if (simIndex === 10) return { show: true, tier: 'hard' };
  return { show: false };
}

const TIER_INFO = {
  easy:   { label: 'Easy - Obvious Once You Look', Icon: Zap,    color: 'text-ag-easy',   bg: 'bg-ag-easy/10 border-ag-easy/30' },
  medium: { label: 'Medium - Subtler Tactics',      Icon: Target, color: 'text-ag-medium', bg: 'bg-ag-medium/10 border-ag-medium/30' },
  hard:   { label: 'Hard - Near-Perfect Fakes',     Icon: Flame,  color: 'text-ag-hard',   bg: 'bg-ag-hard/10 border-ag-hard/30' },
};

const TierDivider = memo(({ tier, hasTremor }) => {
  const info = TIER_INFO[tier];
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      className={`w-full flex items-center gap-3 rounded-xl px-5 py-3 border ${info.bg} ${hasTremor ? 'mb-4' : 'mb-3'}`}
    >
      <info.Icon className={`${info.color} ${hasTremor ? 'w-5 h-5' : 'w-4 h-4'}`} />
      <span className={`font-bold ${info.color} ${hasTremor ? 'text-base' : 'text-sm'}`}>{info.label}</span>
    </motion.div>
  );
});
TierDivider.displayName = 'TierDivider';

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ChallengesPage({ hasTremor, onComplete }) {
  const [simIndex, setSimIndex] = useState(0);
  const [phase, setPhase]       = useState('sim');   // 'sim' | 'explain'
  const [passed, setPassed]     = useState(null);
  const [results, setResults]   = useState([]);

  const sim    = SIMULATIONS[simIndex];
  const isLast = simIndex === SIMULATIONS.length - 1;
  const t      = hasTremor;

  const handlePass = useCallback(() => { setPassed(true); setPhase('explain'); }, []);
  const handleFail = useCallback(() => { setPassed(false); setPhase('explain'); }, []);

  const handleNext = useCallback(() => {
    const record = {
      id:          sim.id,
      difficulty:  sim.difficulty,
      category:    sim.category,
      emoji:       sim.emoji,
      title:       sim.title,
      isRight:     passed,
      explanation: sim.explanation,
      redFlags:    sim.redFlags,
    };
    const updated = [...results, record];
    if (isLast) {
      onComplete?.(updated);
    } else {
      setResults(updated);
      setSimIndex(i => i + 1);
      setPassed(null);
      setPhase('sim');
    }
  }, [sim, passed, results, isLast, onComplete]);

  const SimComponent = SIM_MAP[sim.type];
  const tierInfo = getTierLabel(simIndex);

  return (
    <div className="min-h-screen flex flex-col bg-ag-bg">
      {/* Header */}
      <div className="bg-ag-surface border-b border-ag-border px-6 py-3.5 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-ag-accent/10 border border-ag-accent/20 flex items-center justify-center">
          <Trophy className="w-3.5 h-3.5 text-ag-accent" />
        </div>
        <span className={`font-bold text-ag-text ${t ? 'text-xl' : 'text-sm'}`}>
          Aegis - Challenges
        </span>
        <DiffBadge difficulty={sim.difficulty} hasTremor={t} />
        <span className={`ml-auto font-mono text-ag-accent ${t ? 'text-base' : 'text-sm'}`}>
          {simIndex + 1} / {SIMULATIONS.length}
        </span>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-6 w-full max-w-4xl mx-auto">
        {/* Progress */}
        <div className="w-full mb-5">
          <LinearProgress current={simIndex} total={SIMULATIONS.length} hasTremor={t} />
          <div className={`flex justify-between mt-1.5 text-ag-muted ${t ? 'text-sm' : 'text-xs'}`}>
            <span>Challenge {simIndex + 1}</span>
            <span>{SIMULATIONS.length - simIndex - 1} remaining</span>
          </div>
        </div>

        <AnimatePresence mode="wait">
          {phase === 'sim' ? (
            <motion.div
              key={`sim-${simIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35 }}
              className="w-full flex flex-col gap-4"
            >
              {/* Tier divider on first of each tier */}
              {tierInfo.show && phase === 'sim' && (
                <TierDivider tier={tierInfo.tier} hasTremor={t} />
              )}

              {/* Briefing card */}
              <div className="rounded-2xl px-5 py-4 border border-ag-border bg-ag-surface">
                <div className="flex items-start gap-3">
                  <span className={t ? 'text-3xl' : 'text-2xl'}>{sim.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <DiffBadge difficulty={sim.difficulty} hasTremor={t} />
                      <span className={`px-2.5 py-0.5 rounded-full bg-ag-accent/10 border border-ag-accent/20 text-ag-accent font-semibold ${t ? 'text-sm' : 'text-xs'}`}>
                        {sim.category}
                      </span>
                    </div>
                    <p className={`font-extrabold text-ag-text mt-1 ${t ? 'text-xl' : 'text-base'}`}>
                      {sim.title}
                    </p>
                    <p className={`mt-0.5 text-ag-muted ${t ? 'text-base' : 'text-sm'}`}>
                      {sim.briefing}
                    </p>
                  </div>
                </div>
              </div>

              {/* The interactive simulation */}
              <SimComponent
                config={sim.config}
                hasTremor={t}
                onPass={handlePass}
                onFail={handleFail}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`explain-${simIndex}`}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.35 }}
              className="w-full"
            >
              <ExplanationPanel
                sim={sim}
                passed={passed}
                hasTremor={t}
                onNext={handleNext}
                isLast={isLast}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

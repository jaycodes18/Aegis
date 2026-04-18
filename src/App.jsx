import { useState, useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useTremor } from './hooks/useTremor';
import CustomCursor from './components/CustomCursor';
import LandingPage from './components/LandingPage';
import LearnPage from './components/LearnPage';
import ChallengesPage from './components/ChallengesPage';
import ResultsPage from './components/ResultsPage';
import { Accessibility } from 'lucide-react';

// ─────────────────────────────────────────────────────────────────────────────
// Scenes
// ─────────────────────────────────────────────────────────────────────────────

const SCENES = {
  LANDING:    'landing',
  LEARN:      'learn',
  CHALLENGES: 'challenges',
  RESULTS:    'results',
};

const pageVariants = {
  initial: { opacity: 0, x: 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] } },
  exit:    { opacity: 0, x: -40, transition: { duration: 0.25, ease: 'easeIn' } },
};

// ─────────────────────────────────────────────────────────────────────────────
// Accessibility toggle - always visible, bottom-right
// ─────────────────────────────────────────────────────────────────────────────

function AccessibilityToggle({ hasTremor, onToggle }) {
  return (
    <motion.button
      onClick={onToggle}
      layout
      className={`fixed bottom-5 right-5 z-50 flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold shadow-card transition-all duration-300 ${
        hasTremor
          ? 'bg-ag-accent text-ag-bg shadow-glow-sm hover:shadow-glow-md'
          : 'bg-ag-surface border border-ag-border text-ag-muted hover:border-ag-accent/30 hover:text-ag-text'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      title={hasTremor ? 'Turn off accessibility mode' : 'Turn on accessibility mode'}
    >
      <Accessibility className={hasTremor ? 'w-5 h-5' : 'w-4 h-4'} />
      <span className={hasTremor ? 'text-base' : 'text-xs'}>
        {hasTremor ? 'Accessibility ON' : 'Accessibility OFF'}
      </span>
      {hasTremor && (
        <span className="w-2 h-2 rounded-full bg-ag-bg/70 animate-pulse" />
      )}
    </motion.button>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Main App
// ─────────────────────────────────────────────────────────────────────────────

export default function App() {
  const { hasTremor, toggle: toggleTremor, reset: resetTremor } = useTremor(15);
  const [scene, setScene]   = useState(SCENES.LANDING);
  const [answers, setAnswers] = useState([]);

  const goTo = useCallback((nextScene) => setScene(nextScene), []);

  const handleLearnComplete = useCallback(() => goTo(SCENES.CHALLENGES), [goTo]);

  const handleChallengesComplete = useCallback((challengeAnswers) => {
    setAnswers(challengeAnswers);
    goTo(SCENES.RESULTS);
  }, [goTo]);

  const handleRetry = useCallback(() => {
    setAnswers([]);
    goTo(SCENES.LEARN);
  }, [goTo]);

  const handleHome = useCallback(() => {
    setAnswers([]);
    resetTremor();
    goTo(SCENES.LANDING);
  }, [goTo, resetTremor]);

  return (
    <>
      <CustomCursor hasTremor={hasTremor} />
      <AccessibilityToggle hasTremor={hasTremor} onToggle={toggleTremor} />

      <AnimatePresence mode="wait">
        {scene === SCENES.LANDING && (
          <motion.div key="landing" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <LandingPage hasTremor={hasTremor} onStart={() => goTo(SCENES.LEARN)} />
          </motion.div>
        )}
        {scene === SCENES.LEARN && (
          <motion.div key="learn" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <LearnPage hasTremor={hasTremor} onComplete={handleLearnComplete} />
          </motion.div>
        )}
        {scene === SCENES.CHALLENGES && (
          <motion.div key="challenges" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ChallengesPage hasTremor={hasTremor} onComplete={handleChallengesComplete} />
          </motion.div>
        )}
        {scene === SCENES.RESULTS && (
          <motion.div key="results" variants={pageVariants} initial="initial" animate="animate" exit="exit">
            <ResultsPage
              hasTremor={hasTremor}
              answers={answers}
              onRetry={handleRetry}
              onHome={handleHome}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

import { memo } from 'react';
import { motion } from 'framer-motion';
import { Shield, ChevronRight, BookOpen, Trophy, BarChart2, Lock, AlertTriangle } from 'lucide-react';

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  }),
};

const StepCard = memo(({ icon: Icon, step, title, desc, delay, hasTremor }) => {
  const t = hasTremor;
  return (
    <motion.div
      variants={fadeUp} custom={delay} initial="hidden" animate="show"
      className={`flex flex-col gap-3 rounded-2xl p-6 border transition-all duration-200 hover:border-ag-accent/30 hover:-translate-y-0.5 ${
        t
          ? 'bg-ag-surface2 border-ag-border'
          : 'bg-ag-surface border-ag-border hover:bg-ag-surface2'
      }`}
    >
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-xl bg-ag-accent/10 border border-ag-accent/20 flex items-center justify-center flex-shrink-0">
          <Icon className={`text-ag-accent ${t ? 'w-5 h-5' : 'w-4 h-4'}`} />
        </div>
        <span className={`text-ag-muted font-medium uppercase tracking-wider ${t ? 'text-sm' : 'text-xs'}`}>
          Step {step}
        </span>
      </div>
      <h3 className={`font-bold text-ag-text ${t ? 'text-lg' : 'text-sm'}`}>{title}</h3>
      <p className={`text-ag-muted leading-relaxed ${t ? 'text-base' : 'text-xs'}`}>{desc}</p>
    </motion.div>
  );
});
StepCard.displayName = 'StepCard';

// Animated grid background
const GridBg = () => (
  <div className="absolute inset-0 overflow-hidden pointer-events-none">
    {/* Grid pattern */}
    <div className="absolute inset-0 grid-pattern opacity-60" />
    {/* Radial glow */}
    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-ag-accent/5 rounded-full blur-3xl" />
    <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-ag-indigo/5 rounded-full blur-3xl" />
  </div>
);

// Floating threat indicators
const ThreatPill = memo(({ label, icon: Icon, delay, x, y }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    className="absolute hidden lg:flex items-center gap-2 bg-ag-surface border border-ag-border rounded-full px-3 py-1.5 shadow-card"
    style={{ left: x, top: y }}
  >
    <Icon className="w-3.5 h-3.5 text-ag-danger" />
    <span className="text-ag-muted text-xs font-medium">{label}</span>
  </motion.div>
));
ThreatPill.displayName = 'ThreatPill';

export default function LandingPage({ hasTremor, onStart }) {
  const t = hasTremor;

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 py-16 bg-ag-bg">
      <GridBg />

      {/* Threat pills floating */}
      <ThreatPill label="Phishing Detected" icon={AlertTriangle} delay={1.2} x="5%" y="20%" />
      <ThreatPill label="SMS Scam" icon={Lock} delay={1.5} x="75%" y="15%" />
      <ThreatPill label="Fake Login" icon={Lock} delay={1.8} x="80%" y="72%" />

      <div className="relative z-10 max-w-2xl w-full text-center space-y-8">
        {/* Badge */}
        <motion.div
          variants={fadeUp} custom={0} initial="hidden" animate="show"
          className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border font-medium border-ag-accent/30 bg-ag-accent/5 text-ag-accent ${t ? 'text-sm' : 'text-xs'}`}
        >
          <Shield className={t ? 'w-4 h-4' : 'w-3.5 h-3.5'} />
          Digital Safety Training - GenLink Hackathon
        </motion.div>

        {/* Headline */}
        <motion.div variants={fadeUp} custom={1} initial="hidden" animate="show">
          <h1 className={`font-extrabold tracking-tight leading-[1.1] text-ag-text ${t ? 'text-4xl' : 'text-5xl'}`}>
            Train your instincts to{' '}
            <span className="shimmer-text">outsmart scammers.</span>
          </h1>
        </motion.div>

        <motion.p
          variants={fadeUp} custom={2} initial="hidden" animate="show"
          className={`text-ag-muted leading-relaxed max-w-lg mx-auto ${t ? 'text-xl' : 'text-base'}`}
        >
          Aegis is a realistic scam simulator that trains you to recognize and avoid
          the tricks digital scammers use - through hands-on interactive scenarios.
        </motion.p>

        {/* CTA */}
        <motion.div variants={fadeUp} custom={3} initial="hidden" animate="show" className="flex flex-col items-center gap-3">
          <motion.button
            onClick={onStart}
            className={`inline-flex items-center gap-2.5 rounded-2xl bg-ag-accent text-ag-bg font-bold shadow-glow-md hover:shadow-glow-lg hover:bg-[#1ad4ff] transition-all duration-200 ${t ? 'px-10 py-5 text-xl' : 'px-8 py-4 text-sm'}`}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            Start Training
            <ChevronRight className={t ? 'w-6 h-6' : 'w-4 h-4'} />
          </motion.button>
          <p className={`text-ag-faint ${t ? 'text-sm' : 'text-xs'}`}>
            Use the button in the corner to toggle accessibility mode at any time.
          </p>
        </motion.div>

        {/* Step cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <StepCard icon={BookOpen} step={1}
            title="Learn the Tactics"
            desc="Study 8 scam techniques with realistic examples and protection tips."
            delay={4} hasTremor={t}
          />
          <StepCard icon={Trophy} step={2}
            title="15 Challenges"
            desc="Easy, Medium, and Hard simulations - from obvious scams to near-perfect fakes."
            delay={5} hasTremor={t}
          />
          <StepCard icon={BarChart2} step={3}
            title="Full Report"
            desc="Score, category breakdown, mistake review, and a PDF export of your results."
            delay={6} hasTremor={t}
          />
        </div>

        {/* Trust badges */}
        <motion.div
          variants={fadeUp} custom={7} initial="hidden" animate="show"
          className="flex items-center justify-center gap-6 pt-2"
        >
          {[
            '15 Simulations',
            '5 Scam Categories',
            'Free Training',
          ].map((label) => (
            <div key={label} className="flex items-center gap-1.5">
              <div className="w-1.5 h-1.5 rounded-full bg-ag-accent" />
              <span className={`text-ag-faint ${t ? 'text-sm' : 'text-xs'}`}>{label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

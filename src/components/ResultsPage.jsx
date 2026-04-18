import { useState, memo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ShieldCheck, AlertTriangle, ChevronRight, RotateCcw,
  Home, CheckCircle, XCircle, FileText, ChevronDown, ChevronUp,
  Download, Zap, Target, Flame, Star
} from 'lucide-react';
import jsPDF from 'jspdf';

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getRating(score, total) {
  const pct = score / total;
  if (pct === 1)  return { label: 'Perfect Score',   icon: '🏆', color: 'text-ag-easy',   bg: 'bg-ag-easy/10 border-ag-easy/30' };
  if (pct >= 0.8) return { label: 'Scam Defender',   icon: '🛡️', color: 'text-ag-accent', bg: 'bg-ag-accent/10 border-ag-accent/30' };
  if (pct >= 0.6) return { label: 'Getting There',   icon: '📈', color: 'text-ag-medium', bg: 'bg-ag-medium/10 border-ag-medium/30' };
  return              { label: 'Needs Practice',  icon: '🎯', color: 'text-ag-danger',  bg: 'bg-ag-danger/10 border-ag-danger/30' };
}

const DIFF_ICONS = { easy: Zap, medium: Target, hard: Flame };
const DIFF_COLORS = { easy: 'text-ag-easy', medium: 'text-ag-medium', hard: 'text-ag-hard' };

// ─── PDF Export ───────────────────────────────────────────────────────────────
function exportPDF(answers, score, total) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const W = doc.internal.pageSize.getWidth();
  const margin = 50;
  let y = 60;

  const pct = Math.round((score / total) * 100);
  const wrong = answers.filter(a => !a.isRight);
  const rating = getRating(score, total);

  // Header bar
  doc.setFillColor(13, 14, 18);
  doc.rect(0, 0, W, 80, 'F');

  doc.setTextColor(0, 200, 255);
  doc.setFontSize(22);
  doc.setFont('helvetica', 'bold');
  doc.text('AEGIS', margin, 40);

  doc.setTextColor(200, 200, 210);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.text('Digital Safety Training - Results Report', margin, 58);

  doc.setTextColor(100, 110, 130);
  doc.setFontSize(9);
  const dateStr = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  doc.text(`Generated: ${dateStr}`, W - margin, 58, { align: 'right' });

  y = 110;

  // Score summary box
  doc.setFillColor(19, 21, 28);
  doc.setDrawColor(38, 43, 56);
  doc.roundedRect(margin, y, W - margin * 2, 100, 8, 8, 'FD');

  doc.setTextColor(0, 200, 255);
  doc.setFontSize(48);
  doc.setFont('helvetica', 'bold');
  doc.text(`${pct}%`, margin + 20, y + 62);

  doc.setTextColor(200, 200, 210);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text(rating.label, margin + 100, y + 36);

  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  doc.setTextColor(130, 140, 160);
  doc.text(`${score} correct out of ${total} challenges`, margin + 100, y + 56);
  doc.text(`${wrong.length} mistake${wrong.length !== 1 ? 's' : ''}`, margin + 100, y + 72);

  y += 120;

  // Performance by difficulty
  doc.setTextColor(200, 200, 210);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Performance by Difficulty', margin, y);
  y += 16;

  const difficulties = ['easy', 'medium', 'hard'];
  const diffLabels = { easy: 'Easy (5 challenges)', medium: 'Medium (5 challenges)', hard: 'Hard (5 challenges)' };
  const diffColors = { easy: [34, 214, 122], medium: [245, 158, 11], hard: [240, 71, 71] };

  difficulties.forEach((diff) => {
    const group = answers.filter(a => a.difficulty === diff);
    const groupScore = group.filter(a => a.isRight).length;
    const groupPct = group.length ? Math.round((groupScore / group.length) * 100) : 0;

    doc.setFillColor(19, 21, 28);
    doc.setDrawColor(38, 43, 56);
    doc.roundedRect(margin, y, W - margin * 2, 36, 4, 4, 'FD');

    const [r, g, b] = diffColors[diff];
    doc.setTextColor(r, g, b);
    doc.setFontSize(10);
    doc.setFont('helvetica', 'bold');
    doc.text(diffLabels[diff], margin + 12, y + 14);

    doc.setTextColor(200, 200, 210);
    doc.setFont('helvetica', 'normal');
    doc.text(`${groupScore}/${group.length} (${groupPct}%)`, W - margin - 12, y + 14, { align: 'right' });

    // Mini progress bar
    const barW = W - margin * 2 - 24;
    doc.setFillColor(38, 43, 56);
    doc.roundedRect(margin + 12, y + 20, barW, 8, 2, 2, 'F');
    if (groupPct > 0) {
      doc.setFillColor(r, g, b);
      doc.roundedRect(margin + 12, y + 20, barW * (groupPct / 100), 8, 2, 2, 'F');
    }

    y += 44;
  });

  y += 12;

  // Category breakdown
  const categories = {};
  answers.forEach(a => {
    if (!categories[a.category]) categories[a.category] = { right: 0, total: 0 };
    categories[a.category].total++;
    if (a.isRight) categories[a.category].right++;
  });

  doc.setTextColor(200, 200, 210);
  doc.setFontSize(13);
  doc.setFont('helvetica', 'bold');
  doc.text('Performance by Category', margin, y);
  y += 16;

  Object.entries(categories).forEach(([cat, stats]) => {
    const catPct = Math.round((stats.right / stats.total) * 100);
    const [r2, g2, b2] = catPct >= 80 ? [34, 214, 122] : catPct >= 50 ? [245, 158, 11] : [240, 71, 71];

    doc.setFillColor(19, 21, 28);
    doc.setDrawColor(38, 43, 56);
    doc.roundedRect(margin, y, W - margin * 2, 30, 4, 4, 'FD');

    doc.setTextColor(200, 200, 210);
    doc.setFontSize(9);
    doc.setFont('helvetica', 'normal');
    doc.text(cat, margin + 10, y + 12);

    doc.setTextColor(r2, g2, b2);
    doc.setFont('helvetica', 'bold');
    doc.text(`${stats.right}/${stats.total}`, W - margin - 10, y + 12, { align: 'right' });

    // Bar
    const bw = W - margin * 2 - 20;
    doc.setFillColor(38, 43, 56);
    doc.roundedRect(margin + 10, y + 16, bw, 6, 2, 2, 'F');
    if (catPct > 0) {
      doc.setFillColor(r2, g2, b2);
      doc.roundedRect(margin + 10, y + 16, bw * (catPct / 100), 6, 2, 2, 'F');
    }

    y += 38;
  });

  // Mistakes section
  if (wrong.length > 0) {
    // Check if we need a new page
    if (y > 600) {
      doc.addPage();
      y = 60;
    }

    y += 16;
    doc.setTextColor(200, 200, 210);
    doc.setFontSize(13);
    doc.setFont('helvetica', 'bold');
    doc.text(`Mistakes to Review (${wrong.length})`, margin, y);
    y += 16;

    wrong.forEach((a, idx) => {
      // Check page break
      if (y > 680) {
        doc.addPage();
        y = 60;
      }

      doc.setFillColor(45, 15, 15);
      doc.setDrawColor(90, 30, 30);
      doc.roundedRect(margin, y, W - margin * 2, 80, 4, 4, 'FD');

      // Badge
      doc.setTextColor(240, 71, 71);
      doc.setFontSize(8);
      doc.setFont('helvetica', 'bold');
      doc.text(a.category.toUpperCase(), margin + 10, y + 14);

      doc.setTextColor(200, 200, 210);
      doc.setFontSize(10);
      doc.text(a.title || a.category, margin + 10, y + 27);

      // Explanation (wrapped)
      doc.setTextColor(160, 165, 185);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(8.5);
      const lines = doc.splitTextToSize(a.explanation || '', W - margin * 2 - 20);
      const truncated = lines.slice(0, 3);
      doc.text(truncated, margin + 10, y + 41);

      y += 90;
    });
  }

  // Footer on last page
  const totalPages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setDrawColor(38, 43, 56);
    doc.line(margin, doc.internal.pageSize.getHeight() - 40, W - margin, doc.internal.pageSize.getHeight() - 40);
    doc.setTextColor(80, 85, 100);
    doc.setFontSize(8);
    doc.setFont('helvetica', 'normal');
    doc.text('Aegis Digital Safety Training - GenLink Hackathon', margin, doc.internal.pageSize.getHeight() - 26);
    doc.text(`Page ${p} of ${totalPages}`, W - margin, doc.internal.pageSize.getHeight() - 26, { align: 'right' });
  }

  doc.save('aegis-results.pdf');
}

// ─── Score circle ──────────────────────────────────────────────────────────────
const ScoreCircle = memo(({ score, total, hasTremor }) => {
  const pct = score / total;
  const R = 44;
  const circumference = 2 * Math.PI * R;
  const dash = circumference * pct;

  const strokeColor = pct === 1 ? '#22d67a' : pct >= 0.8 ? '#00c8ff' : pct >= 0.6 ? '#f59e0b' : '#f04747';

  return (
    <div className="relative flex items-center justify-center">
      <svg width={hasTremor ? 140 : 110} height={hasTremor ? 140 : 110} viewBox="0 0 100 100">
        <circle cx="50" cy="50" r={R} fill="none" stroke="#262b38" strokeWidth="8" />
        <motion.circle
          cx="50" cy="50" r={R}
          fill="none" stroke={strokeColor} strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: circumference - dash }}
          transition={{ duration: 1.4, ease: 'easeOut', delay: 0.3 }}
          transform="rotate(-90 50 50)"
          style={{ filter: `drop-shadow(0 0 6px ${strokeColor}60)` }}
        />
      </svg>
      <div className="absolute text-center">
        <p className={`font-extrabold leading-none text-ag-text ${hasTremor ? 'text-4xl' : 'text-3xl'}`}>{score}</p>
        <p className={`text-ag-muted ${hasTremor ? 'text-base' : 'text-xs'}`}>/ {total}</p>
      </div>
    </div>
  );
});
ScoreCircle.displayName = 'ScoreCircle';

// ─── Mistake card ─────────────────────────────────────────────────────────────
const MistakeCard = memo(({ answer, hasTremor }) => {
  const [expanded, setExpanded] = useState(false);
  const t = hasTremor;
  const DiffIcon = DIFF_ICONS[answer.difficulty] || Zap;

  return (
    <div className="rounded-xl border border-ag-border bg-ag-surface overflow-hidden">
      <button
        onClick={() => setExpanded(v => !v)}
        className={`w-full flex items-center gap-3 p-4 text-left hover:bg-ag-surface2 transition-colors`}
      >
        <span className={t ? 'text-2xl' : 'text-xl'}>{answer.emoji}</span>
        <div className="flex-1 min-w-0">
          <p className={`font-semibold truncate text-ag-text ${t ? 'text-base' : 'text-sm'}`}>
            #{answer.id}: {answer.category}
          </p>
          <div className="flex items-center gap-2 mt-0.5">
            <DiffIcon className={`w-3 h-3 ${DIFF_COLORS[answer.difficulty]}`} />
            <p className={`truncate text-ag-muted ${t ? 'text-sm' : 'text-xs'}`}>
              {answer.title || answer.category}
            </p>
          </div>
        </div>
        <XCircle className={`flex-shrink-0 text-ag-danger ${t ? 'w-6 h-6' : 'w-4 h-4'}`} />
        {expanded
          ? <ChevronUp className={`flex-shrink-0 text-ag-muted ${t ? 'w-5 h-5' : 'w-4 h-4'}`} />
          : <ChevronDown className={`flex-shrink-0 text-ag-muted ${t ? 'w-5 h-5' : 'w-4 h-4'}`} />
        }
      </button>

      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.28 }}
            className="border-t border-ag-border"
          >
            <div className="p-4 space-y-3">
              <div className="rounded-lg p-3 border border-ag-danger/20 bg-ag-danger-dim">
                <p className={`font-semibold text-ag-danger mb-1 ${t ? 'text-sm' : 'text-xs'}`}>What happened</p>
                <p className={`text-ag-text ${t ? 'text-base' : 'text-sm'}`}>
                  You fell for the {answer.category} scam in the "{answer.title || answer.category}" simulation.
                </p>
              </div>
              <div className="rounded-lg p-3 border border-ag-warn/20 bg-ag-warn-dim">
                <p className={`font-semibold text-ag-warn mb-1 ${t ? 'text-sm' : 'text-xs'}`}>Why?</p>
                <p className={`leading-relaxed text-ag-text ${t ? 'text-base' : 'text-sm'}`}>{answer.explanation}</p>
              </div>
              {answer.redFlags?.length > 0 && (
                <div className="rounded-lg p-3 border border-ag-danger/10 bg-ag-danger-dim">
                  <p className={`font-semibold text-ag-danger mb-2 ${t ? 'text-sm' : 'text-xs'}`}>Red flags you missed</p>
                  <ul className="space-y-1.5">
                    {answer.redFlags.map((flag, i) => (
                      <li key={i} className={`flex items-start gap-1.5 text-ag-muted ${t ? 'text-sm' : 'text-xs'}`}>
                        <span className="text-ag-danger mt-0.5 flex-shrink-0">▸</span>{flag}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});
MistakeCard.displayName = 'MistakeCard';

// ─── Category breakdown ──────────────────────────────────────────────────────
const CategoryBreakdown = memo(({ answers, hasTremor }) => {
  const categories = {};
  answers.forEach(a => {
    if (!categories[a.category]) categories[a.category] = { right: 0, total: 0, emoji: a.emoji };
    categories[a.category].total++;
    if (a.isRight) categories[a.category].right++;
  });

  return (
    <div className="space-y-2">
      {Object.entries(categories).map(([cat, stats]) => {
        const pct = Math.round((stats.right / stats.total) * 100);
        const barColor = pct >= 80 ? 'bg-ag-success' : pct >= 50 ? 'bg-ag-warn' : 'bg-ag-danger';
        const barGlow = pct >= 80 ? 'shadow-[0_0_8px_rgba(34,214,122,0.5)]' : pct >= 50 ? 'shadow-[0_0_8px_rgba(245,158,11,0.5)]' : 'shadow-[0_0_8px_rgba(240,71,71,0.5)]';
        return (
          <div key={cat} className={`flex items-center gap-3 p-3 rounded-xl bg-ag-surface2 ${hasTremor ? 'text-base' : ''}`}>
            <span className={hasTremor ? 'text-2xl' : 'text-xl'}>{stats.emoji}</span>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between mb-1.5">
                <p className={`font-semibold truncate text-ag-text ${hasTremor ? 'text-base' : 'text-xs'}`}>{cat}</p>
                <p className={`font-mono ml-2 flex-shrink-0 text-ag-muted ${hasTremor ? 'text-base' : 'text-xs'}`}>{stats.right}/{stats.total}</p>
              </div>
              <div className={`w-full rounded-full overflow-hidden bg-ag-border ${hasTremor ? 'h-2.5' : 'h-1.5'}`}>
                <motion.div
                  className={`h-full rounded-full ${barColor} ${barGlow}`}
                  initial={{ width: 0 }}
                  animate={{ width: `${pct}%` }}
                  transition={{ duration: 0.9, ease: 'easeOut', delay: 0.2 }}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
});
CategoryBreakdown.displayName = 'CategoryBreakdown';

// ─── Difficulty breakdown ─────────────────────────────────────────────────────
const DiffBreakdown = memo(({ answers, hasTremor }) => {
  const diffs = ['easy', 'medium', 'hard'];
  const diffLabels = { easy: 'Easy', medium: 'Medium', hard: 'Hard' };
  const diffColors = { easy: 'text-ag-easy', medium: 'text-ag-medium', hard: 'text-ag-hard' };
  const diffBarColors = { easy: 'bg-ag-easy', medium: 'bg-ag-warn', hard: 'bg-ag-hard' };

  return (
    <div className="grid grid-cols-3 gap-3 mb-5">
      {diffs.map(diff => {
        const group = answers.filter(a => a.difficulty === diff);
        const groupScore = group.filter(a => a.isRight).length;
        const groupPct = group.length ? Math.round((groupScore / group.length) * 100) : 0;
        const DiffIcon = DIFF_ICONS[diff];
        return (
          <div key={diff} className="rounded-xl p-3 bg-ag-surface2 border border-ag-border">
            <div className="flex items-center gap-1.5 mb-2">
              <DiffIcon className={`w-3.5 h-3.5 ${diffColors[diff]}`} />
              <p className={`font-semibold ${diffColors[diff]} ${hasTremor ? 'text-sm' : 'text-xs'}`}>{diffLabels[diff]}</p>
            </div>
            <p className={`font-extrabold text-ag-text ${hasTremor ? 'text-2xl' : 'text-xl'}`}>{groupScore}<span className={`font-normal text-ag-muted ${hasTremor ? 'text-base' : 'text-sm'}`}>/{group.length}</span></p>
            <div className={`w-full rounded-full overflow-hidden bg-ag-border mt-2 ${hasTremor ? 'h-2' : 'h-1.5'}`}>
              <motion.div
                className={`h-full rounded-full ${diffBarColors[diff]}`}
                initial={{ width: 0 }}
                animate={{ width: `${groupPct}%` }}
                transition={{ duration: 0.9, ease: 'easeOut', delay: 0.3 }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
});
DiffBreakdown.displayName = 'DiffBreakdown';

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function ResultsPage({ hasTremor, answers = [], onRetry, onHome }) {
  const [activeTab, setActiveTab] = useState('report');
  const [exporting, setExporting] = useState(false);
  const t = hasTremor;

  const total = answers.length;
  const score = answers.filter(a => a.isRight).length;
  const wrong = answers.filter(a => !a.isRight);
  const rating = getRating(score, total);

  const handleExport = useCallback(async () => {
    setExporting(true);
    await new Promise(r => setTimeout(r, 100));
    exportPDF(answers, score, total);
    setExporting(false);
  }, [answers, score, total]);

  const tabs = [
    { id: 'report',   label: 'Full Report',               icon: FileText },
    { id: 'mistakes', label: `Mistakes (${wrong.length})`, icon: AlertTriangle },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ag-bg">
      {/* Header */}
      <div className="bg-ag-surface border-b border-ag-border px-6 py-3.5 flex items-center gap-3">
        <div className="w-7 h-7 rounded-lg bg-ag-accent/10 border border-ag-accent/20 flex items-center justify-center">
          <ShieldCheck className="w-3.5 h-3.5 text-ag-accent" />
        </div>
        <span className={`font-bold text-ag-text ${t ? 'text-xl' : 'text-sm'}`}>Aegis - Results</span>
        <motion.button
          onClick={handleExport}
          disabled={exporting}
          className={`ml-auto flex items-center gap-2 rounded-xl bg-ag-surface2 border border-ag-border text-ag-muted hover:text-ag-text hover:border-ag-accent/30 transition-colors font-semibold ${t ? 'px-5 py-2.5 text-base' : 'px-4 py-2 text-xs'}`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          {exporting
            ? <motion.span className={`rounded-full border-2 border-ag-muted border-t-transparent inline-block ${t ? 'w-5 h-5' : 'w-4 h-4'}`} animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 0.8, ease: 'linear' }} />
            : <Download className={t ? 'w-5 h-5' : 'w-4 h-4'} />
          }
          Export PDF
        </motion.button>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-8 max-w-2xl mx-auto w-full">

        {/* Hero score card */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full rounded-2xl border border-ag-border bg-ag-surface p-8 mb-6 text-center"
        >
          <ScoreCircle score={score} total={total} hasTremor={t} />

          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}>
            <span className={`inline-flex items-center gap-2 mt-4 px-4 py-1.5 rounded-full border font-bold ${rating.bg} ${rating.color} ${t ? 'text-base' : 'text-sm'}`}>
              <span>{rating.icon}</span>{rating.label}
            </span>
            <h1 className={`font-extrabold mt-3 text-ag-text ${t ? 'text-3xl' : 'text-xl'}`}>
              {score === total
                ? 'Perfect. You are a scam defender.'
                : score >= total * 0.8
                ? 'Strong performance. A few tactics to review.'
                : score >= total * 0.6
                ? 'Decent start. Let\'s go over your mistakes.'
                : 'Keep training. Scammers rely on surprise.'}
            </h1>
            <p className={`mt-2 text-ag-muted ${t ? 'text-lg' : 'text-sm'}`}>
              {score} correct out of {total} - {Math.round((score / total) * 100)}% accuracy
            </p>
          </motion.div>

          {/* Stat row */}
          <div className="grid grid-cols-3 gap-3 mt-6">
            {[
              { label: 'Correct', value: score,        color: 'text-ag-success', bg: 'bg-ag-success-dim border-ag-success/20' },
              { label: 'Wrong',   value: wrong.length, color: 'text-ag-danger',  bg: 'bg-ag-danger-dim border-ag-danger/20' },
              { label: 'Accuracy',value: `${Math.round((score/total)*100)}%`, color: 'text-ag-accent', bg: 'bg-ag-accent/5 border-ag-accent/20' },
            ].map(({ label, value, color, bg }) => (
              <div key={label} className={`rounded-xl p-3 border ${bg}`}>
                <p className={`font-extrabold ${color} ${t ? 'text-3xl' : 'text-2xl'}`}>{value}</p>
                <p className={`text-ag-muted mt-0.5 ${t ? 'text-base' : 'text-xs'}`}>{label}</p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Tabs */}
        <div className={`w-full flex rounded-xl overflow-hidden mb-4 border border-ag-border bg-ag-surface`}>
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex-1 flex items-center justify-center gap-2 py-3 font-semibold transition-colors ${t ? 'text-base' : 'text-sm'} ${
                activeTab === id
                  ? 'bg-ag-accent text-ag-bg'
                  : 'text-ag-muted hover:text-ag-text hover:bg-ag-surface2'
              }`}
            >
              <Icon className={t ? 'w-5 h-5' : 'w-4 h-4'} />
              {label}
            </button>
          ))}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          {activeTab === 'report' && (
            <motion.div key="report" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.28 }} className="w-full">
              <div className="rounded-2xl border border-ag-border bg-ag-surface p-6">
                <h2 className={`font-bold text-ag-text mb-4 ${t ? 'text-xl' : 'text-base'}`}>Difficulty Breakdown</h2>
                <DiffBreakdown answers={answers} hasTremor={t} />

                <h2 className={`font-bold text-ag-text mb-4 ${t ? 'text-xl' : 'text-base'}`}>Performance by Category</h2>
                <CategoryBreakdown answers={answers} hasTremor={t} />

                {wrong.length > 0 && (
                  <div className="mt-5 rounded-xl p-4 border border-ag-warn/20 bg-ag-warn-dim">
                    <p className={`font-bold text-ag-warn mb-1 ${t ? 'text-base' : 'text-xs uppercase tracking-wide'}`}>Focus Areas</p>
                    <p className={`text-ag-text leading-relaxed ${t ? 'text-base' : 'text-sm'}`}>
                      You missed challenges in:{' '}
                      <strong className="text-ag-warn">{[...new Set(wrong.map(a => a.category))].join(', ')}</strong>.
                      Switch to the Mistakes tab to review each one in detail.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {activeTab === 'mistakes' && (
            <motion.div key="mistakes" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.28 }} className="w-full">
              {wrong.length === 0 ? (
                <div className="rounded-2xl border border-ag-border bg-ag-surface p-8 text-center">
                  <CheckCircle className={`mx-auto mb-3 text-ag-success ${t ? 'w-16 h-16' : 'w-10 h-10'}`} />
                  <p className={`font-bold text-ag-text ${t ? 'text-2xl' : 'text-lg'}`}>No mistakes!</p>
                  <p className={`mt-1 text-ag-muted ${t ? 'text-lg' : 'text-sm'}`}>Perfect score - nothing to review.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {wrong.map(answer => (
                    <MistakeCard key={answer.id} answer={answer} hasTremor={t} />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="w-full flex flex-col sm:flex-row gap-3 mt-6"
        >
          <motion.button
            onClick={onRetry}
            className={`flex-1 flex items-center justify-center gap-2 rounded-2xl bg-ag-accent text-ag-bg font-bold hover:bg-[#1ad4ff] transition-colors shadow-glow-sm ${t ? 'py-5 text-xl' : 'py-3 text-sm'}`}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          >
            <RotateCcw className={t ? 'w-6 h-6' : 'w-4 h-4'} /> Train Again
          </motion.button>
          <motion.button
            onClick={onHome}
            className={`flex-1 flex items-center justify-center gap-2 rounded-2xl border-2 border-ag-border font-bold transition-colors text-ag-muted hover:text-ag-text hover:border-ag-accent/30 ${t ? 'py-5 text-xl' : 'py-3 text-sm'}`}
            whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
          >
            <Home className={t ? 'w-6 h-6' : 'w-4 h-4'} /> Back to Home
          </motion.button>
        </motion.div>
      </div>
    </div>
  );
}

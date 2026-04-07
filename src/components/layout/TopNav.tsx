import React from 'react';
import { MessageSquare, BarChart3, Tag, Eye, ShoppingCart, LayoutGrid, Check } from 'lucide-react';
import { useApp } from '../../context/AppContext';

const PHASES = [
  { id: 1, label: 'Job Details', icon: MessageSquare },
  { id: 2, label: 'Market Analysis', icon: BarChart3 },
  { id: 3, label: 'Pricing', icon: Tag },
  { id: 4, label: 'Performance', icon: Eye },
  { id: 5, label: 'Checkout', icon: ShoppingCart },
  { id: 6, label: 'Ad Manager', icon: LayoutGrid },
];

export default function TopNav() {
  const { state, dispatch, activeSession } = useApp();

  const maxUnlockedPhase = activeSession?.phase ?? 1;

  function handlePhaseClick(phaseId: number) {
    if (!activeSession) return;
    if (phaseId > maxUnlockedPhase) return;
    dispatch({ type: 'SET_PHASE', payload: phaseId });
  }

  return (
    <nav className="bg-white border-b border-slate-200 px-6 py-3 flex items-center gap-1 overflow-x-auto shrink-0">
      {PHASES.map(phase => {
        const Icon = phase.icon;
        const isActive = state.activePhase === phase.id;
        const isCompleted = maxUnlockedPhase > phase.id;
        const isLocked = !activeSession || phase.id > maxUnlockedPhase;

        let cls = 'phase-tab ';
        if (isActive) cls += 'phase-tab-active';
        else if (isCompleted) cls += 'phase-tab-completed cursor-pointer';
        else if (isLocked) cls += 'phase-tab-locked';
        else cls += 'text-slate-600 hover:bg-slate-100 cursor-pointer';

        return (
          <button
            key={phase.id}
            onClick={() => handlePhaseClick(phase.id)}
            disabled={isLocked}
            className={cls}
            title={isLocked ? 'Complete previous phases first' : phase.label}
          >
            {isCompleted && !isActive ? (
              <Check size={14} className="text-green-600" />
            ) : (
              <Icon size={14} />
            )}
            <span className="whitespace-nowrap">{phase.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

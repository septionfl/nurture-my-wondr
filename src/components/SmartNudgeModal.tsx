import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useHabitStore } from "@/stores/useHabitStore";
import { NudgeIcon } from "./NudgeIcon";

export function SmartNudgeModal() {
  const nudge = useHabitStore((s) => s.pendingNudge);
  const dismiss = useHabitStore((s) => s.dismissNudge);
  const accept = useHabitStore((s) => s.acceptNudge);

  return (
    <AnimatePresence>
      {nudge && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={dismiss}
        >
          <motion.div
            initial={{ y: 400 }}
            animate={{ y: 0 }}
            exit={{ y: 400 }}
            transition={{ type: "spring", damping: 28, stiffness: 280 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-md rounded-t-3xl bg-background text-foreground p-6 pb-8 shadow-[var(--shadow-elevated)] border-t border-border"
          >
            <div className="flex justify-between items-start mb-5">
              <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-[0.15em] text-primary">
                <Sparkles className="w-3 h-3" />
                Smart Nudge
              </div>
              <button
                onClick={dismiss}
                className="rounded-full p-1.5 hover:bg-muted transition-colors"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <NudgeIcon iconKey={nudge.iconKey} size="lg" tone="primary" />
            <h2 className="text-2xl font-bold leading-tight mt-4 mb-2">{nudge.headline}</h2>
            <p className="text-sm text-muted-foreground leading-relaxed mb-6">{nudge.body}</p>
            <div className="space-y-2">
              <button
                onClick={accept}
                className="w-full rounded-2xl bg-primary text-primary-foreground font-bold py-4 text-base shadow-[var(--shadow-premium)] active:scale-[0.98] transition"
              >
                {nudge.primaryCta}
              </button>
              <button
                onClick={dismiss}
                className="w-full rounded-2xl bg-transparent text-muted-foreground hover:text-foreground font-medium py-3 text-sm transition-colors"
              >
                {nudge.secondaryCta}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { AnimatePresence, motion } from "framer-motion";
import { X, Sparkles } from "lucide-react";
import { useHabitStore } from "@/stores/useHabitStore";

export function SmartNudgeModal() {
  const nudge = useHabitStore((s) => s.pendingNudge);
  const dismiss = useHabitStore((s) => s.dismissNudge);
  const accept = useHabitStore((s) => s.acceptNudge);

  return (
    <AnimatePresence>
      {nudge && (
        <motion.div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm"
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
            className="w-full max-w-md rounded-t-3xl bg-popover text-popover-foreground p-6 pb-8 shadow-2xl"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-primary">
                <Sparkles className="w-3.5 h-3.5" />
                Smart Nudge
              </div>
              <button
                onClick={dismiss}
                className="rounded-full p-1.5 hover:bg-muted/40"
                aria-label="Tutup"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="text-5xl mb-3">{nudge.emoji}</div>
            <h2 className="text-2xl font-bold leading-tight mb-2">{nudge.headline}</h2>
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
                className="w-full rounded-2xl bg-transparent text-popover-foreground/70 font-medium py-3 text-sm"
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

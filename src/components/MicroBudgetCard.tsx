import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, CheckCircle2, ArrowRight, Coffee, UtensilsCrossed } from "lucide-react";
import { useState } from "react";
import { useHabitStore, formatIDR, NudgeIconKey } from "@/stores/useHabitStore";
import { useNavigate } from "@tanstack/react-router";

interface Props {
  category: string;
  monthlyTotal: number;
  visitCount: number;
  suggestAmount: number;
  goalName: string;
  iconKey: NudgeIconKey;
}

export function MicroBudgetCard({ category, monthlyTotal, visitCount, suggestAmount, goalName, iconKey }: Props) {
  const accept = useHabitStore((s) => s.acceptMicroBudget);
  const navigate = useNavigate();
  const [state, setState] = useState<"prompt" | "done" | "skipped">("prompt");
  const [remaining, setRemaining] = useState(0);
  const Icon = iconKey === "coffee" ? Coffee : UtensilsCrossed;

  const handleAccept = () => {
    accept(category, suggestAmount, goalName, iconKey);
    setRemaining(suggestAmount);
    setState("done");
  };

  if (state === "skipped") return null;

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={state}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        className="rounded-2xl border-2 p-4 text-left"
        style={{
          background: state === "done" ? "var(--wondr-lime)" : "color-mix(in oklab, var(--wondr-teal) 12%, white)",
          borderColor: state === "done" ? "var(--wondr-black)" : "var(--wondr-teal)",
        }}
      >
        {state === "prompt" && (
          <>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-[0.18em]" style={{ color: "var(--wondr-teal-deep)" }}>
                <Sparkles className="w-3.5 h-3.5" /> Smart Insight
              </div>
              <div className="w-9 h-9 rounded-xl flex items-center justify-center text-white" style={{ background: "var(--wondr-teal)" }}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <p className="text-[15px] font-black leading-snug mb-1">
              Kamu sudah habis <span style={{ color: "var(--wondr-teal-deep)" }}>{formatIDR(monthlyTotal)}</span> di {category} bulan ini.
            </p>
            <p className="text-xs text-muted-foreground font-medium mb-3">
              {visitCount}x transaksi. Kunci sisa budget jajanmu di kantong <b>{goalName}</b> biar nggak overbudget.
            </p>
            <div className="flex items-center gap-2">
              <button
                onClick={handleAccept}
                className="flex-1 rounded-xl py-3 font-black text-white text-sm flex items-center justify-center gap-1.5"
                style={{ background: "var(--wondr-teal-deep)" }}
              >
                Buat Limit {formatIDR(suggestAmount)}
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setState("skipped")}
                className="px-4 py-3 rounded-xl text-xs font-bold text-muted-foreground"
              >
                Lewati
              </button>
            </div>
          </>
        )}

        {state === "done" && (
          <>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "var(--wondr-black)" }}>
                <CheckCircle2 className="w-5 h-5" style={{ color: "var(--wondr-lime)" }} />
              </div>
              <div>
                <div className="text-[10px] font-black uppercase tracking-wider">Kantong aktif</div>
                <div className="text-base font-black leading-tight">{goalName}</div>
              </div>
            </div>
            <p className="text-xs font-semibold mb-3" style={{ color: "var(--wondr-black)" }}>
              Sisa kantong <b>{formatIDR(remaining)}</b>. Transaksi {category} berikutnya otomatis dipotong dari sini, bukan saldo utama.
            </p>
            <button
              onClick={() => navigate({ to: "/growth" })}
              className="rounded-xl px-4 py-2 text-xs font-black text-white"
              style={{ background: "var(--wondr-black)" }}
            >
              Lihat kantong →
            </button>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

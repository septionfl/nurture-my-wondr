import { AnimatePresence, motion } from "framer-motion";
import { X, ShieldCheck, Sparkles, CheckCircle2, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useHabitStore, formatIDR, PERSONAS } from "@/stores/useHabitStore";
import { useNavigate } from "@tanstack/react-router";

export function PaydayShieldModal() {
  const open = useHabitStore((s) => s.paydayShieldOpen);
  const dismiss = useHabitStore((s) => s.dismissPaydayShield);
  const accept = useHabitStore((s) => s.acceptPaydayShield);
  const persona = useHabitStore((s) => s.persona);
  const profile = PERSONAS[persona];
  const navigate = useNavigate();
  const [done, setDone] = useState<null | { amount: number }>(null);

  const handleAccept = () => {
    const r = accept();
    setDone({ amount: r.amount });
  };

  const close = () => {
    setDone(null);
    dismiss();
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] bg-white flex flex-col"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Decorative blobs */}
          <div className="absolute -top-24 -right-20 w-72 h-72 rounded-full" style={{ background: "var(--wondr-orange)", opacity: 0.18 }} />
          <div className="absolute top-32 -left-16 w-56 h-56 rounded-full" style={{ background: "var(--wondr-teal)", opacity: 0.18 }} />
          <div className="absolute bottom-10 right-10 w-40 h-40 rounded-full" style={{ background: "var(--wondr-lime)", opacity: 0.25 }} />

          <div className="relative flex items-center justify-between px-5 pt-10">
            <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em]" style={{ color: "var(--wondr-orange-deep)" }}>
              <Sparkles className="w-3.5 h-3.5" /> Payday detected
            </div>
            <button onClick={close} className="p-2 rounded-full hover:bg-muted">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="relative flex-1 px-6 pb-8 flex flex-col">
            {!done ? (
              <motion.div
                key="prompt"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col"
              >
                <div className="flex justify-center my-6">
                  <motion.div
                    initial={{ scale: 0.7, rotate: -8 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", damping: 14 }}
                    className="w-28 h-28 rounded-3xl flex items-center justify-center shadow-[var(--shadow-elevated)] relative"
                    style={{ background: "linear-gradient(135deg, var(--wondr-orange), var(--wondr-teal))" }}
                  >
                    <ShieldCheck className="w-14 h-14 text-white" strokeWidth={2.2} />
                    <Sparkles className="absolute -top-2 -right-2 w-6 h-6" style={{ color: "var(--wondr-lime)" }} fill="currentColor" />
                  </motion.div>
                </div>

                <h1 className="text-[26px] font-black leading-tight tracking-tight mb-2">
                  {profile.shieldHeadline}
                </h1>
                <p className="text-sm text-muted-foreground font-medium leading-relaxed mb-5">
                  {profile.shieldBody}
                </p>

                <div className="rounded-2xl border-2 border-border bg-card p-4 mb-3">
                  <div className="flex items-center justify-between mb-3">
                    <div className="text-[10px] uppercase tracking-wider font-black text-muted-foreground">
                      {persona === "wanda" ? "Pos rumah tangga" : "Rincian shield"}
                    </div>
                    <div className="text-base font-black" style={{ color: "var(--wondr-orange)" }}>
                      {formatIDR(profile.shieldAmount)}
                    </div>
                  </div>
                  <div className="space-y-2">
                    {profile.shieldBreakdown.map((b) => (
                      <div key={b.label} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full" style={{ background: "var(--wondr-teal)" }} />
                          <span className="font-semibold">{b.label}</span>
                        </div>
                        <span className="font-bold text-muted-foreground">{formatIDR(b.amount)}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="text-[11px] text-muted-foreground mb-5 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3" style={{ color: "var(--wondr-orange)" }} />
                  Berdasarkan rata-rata pengeluaran rutin 3 bulan terakhir
                </div>

                <div className="mt-auto space-y-2">
                  <button
                    onClick={handleAccept}
                    className="w-full rounded-2xl py-4 text-white font-black text-base shadow-[var(--shadow-premium)] active:scale-[0.98] transition flex items-center justify-center gap-2"
                    style={{ background: "var(--wondr-orange)" }}
                  >
                    {profile.shieldCta}
                    <ArrowRight className="w-5 h-5" />
                  </button>
                  <button onClick={close} className="w-full rounded-2xl py-3 text-sm font-bold text-muted-foreground">
                    Nanti saja
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="done"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex-1 flex flex-col items-center justify-center text-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", damping: 12 }}
                  className="w-28 h-28 rounded-full flex items-center justify-center mb-5"
                  style={{ background: "var(--wondr-lime)" }}
                >
                  <CheckCircle2 className="w-16 h-16" strokeWidth={2.4} style={{ color: "var(--wondr-black)" }} />
                </motion.div>
                <h2 className="text-2xl font-black mb-2">Shield aktif!</h2>
                <p className="text-sm text-muted-foreground max-w-xs">
                  {formatIDR(done.amount)} dipindahkan ke kantong <b>{profile.shieldGoalName}</b>. Dana ini terkunci sampai jatuh tempo.
                </p>
                <div className="mt-8 w-full space-y-2">
                  <button
                    onClick={() => { close(); navigate({ to: "/growth" }); }}
                    className="w-full rounded-2xl py-3.5 font-black text-white"
                    style={{ background: "var(--wondr-black)" }}
                  >
                    Lihat di Growth
                  </button>
                  <button onClick={close} className="w-full rounded-2xl py-3 text-sm font-bold text-muted-foreground">
                    Kembali ke Beranda
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QrCode, Send, Receipt, Smartphone, CheckCircle2, ArrowLeft, Sparkles, X, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHabitStore, formatIDR, type RoutedResult } from "@/stores/useHabitStore";
import { MicroBudgetCard } from "@/components/MicroBudgetCard";

export const Route = createFileRoute("/_app/transaction")({
  head: () => ({ meta: [{ title: "Transaksi — wondr" }] }),
  component: TransactionPage,
});

type Stage = "menu" | "scanning" | "confirm" | "success";

function TransactionPage() {
  const [stage, setStage] = useState<Stage>("menu");
  const [scenario, setScenario] = useState<"cafe" | "food">("cafe");
  const [comingSoon, setComingSoon] = useState<string | null>(null);
  const [routedResult, setRoutedResult] = useState<RoutedResult | null>(null);
  const addTransaction = useHabitStore((s) => s.addTransaction);
  const transactions = useHabitStore((s) => s.transactions);

  const merchant = scenario === "cafe"
    ? { name: "Janji Jiwa Kemang", category: "Kafe", amount: 38_000, label: "Kopi Janji Jiwa" }
    : { name: "GoFood — Padang Sederhana", category: "Makanan", amount: 65_000, label: "GoFood Padang" };

  const startScan = (s: "cafe" | "food") => {
    setScenario(s);
    setStage("scanning");
    setTimeout(() => setStage("confirm"), 1400);
  };

  const confirmPay = () => {
    const result = addTransaction({
      id: `t${Date.now()}`,
      label: merchant.label,
      category: merchant.category,
      amount: -merchant.amount,
      time: "Baru saja",
    });
    setRoutedResult(result);
    setStage("success");
  };

  // Compute trigger for micro-budget card (5+ transactions in this category)
  const categoryCount = transactions.filter((t) => t.category === merchant.category).length;
  const categoryTotal = Math.abs(transactions.filter((t) => t.category === merchant.category).reduce((s, t) => s + t.amount, 0));
  const showMicroBudget = stage === "success" && !routedResult?.routed && categoryCount >= 1;
  const microConfig = scenario === "cafe"
    ? { suggestAmount: 300_000, goalName: "Budget Kopi", iconKey: "coffee" as const }
    : { suggestAmount: 500_000, goalName: "Budget Makanan", iconKey: "utensils" as const };

  return (
    <div className="px-5 pt-10">
      <div className="flex items-center gap-3 mb-1">
        {stage !== "menu" && (
          <button onClick={() => { setStage("menu"); setRoutedResult(null); }} className="p-2 -ml-2 rounded-full hover:bg-muted">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-2xl font-black">Transaction</h1>
      </div>
      <p className="text-xs text-muted-foreground mb-6">Aktivitas saat ini · Present dimension</p>

      <AnimatePresence mode="wait">
        {stage === "menu" && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <ActionTile icon={QrCode} label="QRIS" desc="Scan & bayar" onClick={() => startScan("cafe")} primary />
              <ActionTile icon={Send} label="Transfer" desc="Antar bank" onClick={() => setComingSoon("Transfer antar bank")} />
              <ActionTile icon={Receipt} label="Bill Pay" desc="Listrik, air, internet" onClick={() => setComingSoon("Bill Pay")} />
              <ActionTile icon={Smartphone} label="Pulsa & Data" desc="Top up cepat" onClick={() => setComingSoon("Pulsa & Data")} />
            </div>

            <div className="rounded-2xl bg-card border-2 border-border p-4 shadow-[var(--shadow-soft)] mb-5">
              <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-wider mb-2" style={{ color: "var(--wondr-orange)" }}>
                <Sparkles className="w-3.5 h-3.5" /> Demo Habit Trigger
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Coba skenario QRIS untuk melihat Micro-Budgeting Nudge dan Goal Re-routing.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => startScan("cafe")}
                  className="w-full text-left rounded-xl bg-muted p-3 border-2 border-border hover:border-[color:var(--wondr-orange)] transition"
                >
                  <div className="text-sm font-black">Bayar kopi di Janji Jiwa</div>
                  <div className="text-[11px] text-muted-foreground font-semibold">Trigger: Micro-Budget Kafe</div>
                </button>
                <button
                  onClick={() => startScan("food")}
                  className="w-full text-left rounded-xl bg-muted p-3 border-2 border-border hover:border-[color:var(--wondr-orange)] transition"
                >
                  <div className="text-sm font-black">Bayar GoFood Padang</div>
                  <div className="text-[11px] text-muted-foreground font-semibold">Trigger: Micro-Budget Makanan</div>
                </button>
              </div>
            </div>

            <h3 className="text-sm font-black mb-3">Riwayat transaksi</h3>
            <div className="rounded-2xl bg-card border-2 border-border divide-y divide-border shadow-[var(--shadow-soft)]">
              {transactions.slice(0, 6).map((t) => (
                <button
                  key={t.id}
                  onClick={() => alert(`${t.label}\n${t.category} · ${t.time}\n${formatIDR(t.amount)}${t.routed ? "\n\n(Dibayar dari kantong goal)" : ""}`)}
                  className="w-full flex items-center justify-between p-3 text-left hover:bg-muted/40 first:rounded-t-2xl last:rounded-b-2xl transition"
                >
                  <div>
                    <div className="text-sm font-bold flex items-center gap-1.5">
                      {t.label}
                      {t.routed && <Lock className="w-3 h-3" style={{ color: "var(--wondr-teal-deep)" }} />}
                    </div>
                    <div className="text-[11px] text-muted-foreground font-semibold">{t.category} · {t.time}</div>
                  </div>
                  <div className={`text-sm font-black ${t.amount > 0 ? "text-emerald-600" : "text-foreground"}`}>
                    {t.amount > 0 ? "+" : ""}{formatIDR(t.amount)}
                  </div>
                </button>
              ))}
            </div>
          </motion.div>
        )}

        {stage === "scanning" && (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="relative w-64 h-64 mx-auto rounded-3xl border-2 border-primary bg-card overflow-hidden">
              <motion.div
                className="absolute left-0 right-0 h-1 bg-primary"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <QrCode className="w-32 h-32 text-primary/40 absolute inset-0 m-auto" />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Memindai QRIS…</p>
          </motion.div>
        )}

        {stage === "confirm" && (
          <motion.div key="confirm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-3xl bg-card border-2 border-border p-5 mb-4 shadow-[var(--shadow-card)]">
              <div className="text-[11px] uppercase tracking-wider text-muted-foreground font-black mb-1">Bayar ke</div>
              <div className="text-lg font-black">{merchant.name}</div>
              <div className="text-xs text-muted-foreground mb-4">{merchant.category} · QRIS</div>
              <div className="border-t border-border pt-4">
                <div className="text-xs text-muted-foreground">Nominal</div>
                <div className="text-3xl font-black">{formatIDR(merchant.amount)}</div>
              </div>
            </div>
            <button
              onClick={confirmPay}
              className="w-full rounded-2xl py-4 text-white font-black shadow-[var(--shadow-premium)]"
              style={{ background: "var(--wondr-orange)" }}
            >
              Bayar sekarang
            </button>
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div key="success" initial={{ scale: 0.98, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="pt-2">
            <div className="text-center pb-5">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="w-20 h-20 mx-auto rounded-full bg-emerald-50 flex items-center justify-center mb-3"
              >
                <CheckCircle2 className="w-12 h-12 text-emerald-600" strokeWidth={2.5} />
              </motion.div>
              <h2 className="text-xl font-black">Transaksi berhasil</h2>
              <p className="text-sm text-muted-foreground mt-1">{formatIDR(merchant.amount)} ke {merchant.name}</p>
            </div>

            {/* Goal re-routing confirmation */}
            {routedResult?.routed && (
              <div className="rounded-2xl p-4 mb-3 text-white" style={{ background: "var(--wondr-black)" }}>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.18em] mb-1.5" style={{ color: "var(--wondr-lime)" }}>
                  <Lock className="w-3.5 h-3.5" /> Dibayar dari kantong
                </div>
                <p className="text-sm font-bold leading-snug">
                  Dana <b>{formatIDR(merchant.amount)}</b> diambil dari kantong <b>{routedResult.goalName}</b>. Sisa kantong <b>{formatIDR(routedResult.remaining ?? 0)}</b>.
                </p>
              </div>
            )}

            {/* Micro-budget nudge card */}
            {showMicroBudget && (
              <MicroBudgetCard
                category={merchant.category}
                monthlyTotal={categoryTotal}
                visitCount={categoryCount}
                suggestAmount={microConfig.suggestAmount}
                goalName={microConfig.goalName}
                iconKey={microConfig.iconKey}
              />
            )}

            <button
              onClick={() => { setStage("menu"); setRoutedResult(null); }}
              className="mt-5 w-full rounded-2xl bg-muted py-3 text-sm font-black"
            >
              Selesai
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {comingSoon && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={() => setComingSoon(null)}
            className="fixed inset-0 z-50 flex items-end justify-center bg-[var(--navy)]/40 backdrop-blur-sm"
          >
            <motion.div
              initial={{ y: 300 }} animate={{ y: 0 }} exit={{ y: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-t-3xl bg-background p-6 pb-8 border-t border-border"
            >
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-lg font-black">{comingSoon}</h3>
                <button onClick={() => setComingSoon(null)} className="p-1.5"><X className="w-4 h-4" /></button>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Fitur ini akan tersedia di rilis berikutnya. Sementara, lanjutkan demo QRIS untuk melihat trigger Micro-Budget.
              </p>
              <button onClick={() => setComingSoon(null)} className="w-full rounded-2xl bg-primary text-primary-foreground font-black py-3.5">
                Mengerti
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function ActionTile({
  icon: Icon, label, desc, onClick, primary,
}: { icon: any; label: string; desc: string; onClick?: () => void; primary?: boolean }) {
  return (
    <button
      onClick={onClick}
      className={`rounded-2xl border-2 p-4 flex flex-col items-start gap-2 active:scale-95 transition text-left ${
        primary ? "bg-gradient-to-br from-primary/10 to-card border-primary/30" : "bg-card border-border hover:border-primary/30"
      } shadow-[var(--shadow-soft)]`}
    >
      <Icon className={`w-6 h-6 ${primary ? "text-primary" : "text-[var(--navy)]"}`} strokeWidth={2} />
      <div>
        <div className="text-sm font-black">{label}</div>
        <div className="text-[11px] text-muted-foreground font-semibold">{desc}</div>
      </div>
    </button>
  );
}

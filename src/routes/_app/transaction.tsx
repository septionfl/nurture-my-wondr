import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { QrCode, Send, Receipt, Smartphone, CheckCircle2, ArrowLeft, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useHabitStore, formatIDR } from "@/stores/useHabitStore";

export const Route = createFileRoute("/_app/transaction")({
  head: () => ({ meta: [{ title: "Transaksi — wondr" }] }),
  component: TransactionPage,
});

type Stage = "menu" | "scanning" | "confirm" | "success";

function TransactionPage() {
  const [stage, setStage] = useState<Stage>("menu");
  const [scenario, setScenario] = useState<"cafe" | "food">("cafe");
  const addTransaction = useHabitStore((s) => s.addTransaction);
  const showNudge = useHabitStore((s) => s.showNudge);

  const merchant = scenario === "cafe"
    ? { name: "Janji Jiwa Kemang", category: "Kafe", amount: 38000, label: "Kopi Janji Jiwa" }
    : { name: "GoFood — Padang Sederhana", category: "Makanan", amount: 65000, label: "GoFood Padang" };

  const startScan = (s: "cafe" | "food") => {
    setScenario(s);
    setStage("scanning");
    setTimeout(() => setStage("confirm"), 1500);
  };

  const confirmPay = () => {
    setStage("success");
    addTransaction({
      id: `t${Date.now()}`,
      label: merchant.label,
      category: merchant.category,
      amount: -merchant.amount,
      time: "Baru saja",
    });
    setTimeout(() => showNudge(scenario === "cafe" ? "cafe_qris" : "high_food"), 900);
  };

  return (
    <div className="px-5 pt-12">
      <div className="flex items-center gap-3 mb-6">
        {stage !== "menu" && (
          <button onClick={() => setStage("menu")} className="p-2 -ml-2">
            <ArrowLeft className="w-5 h-5" />
          </button>
        )}
        <h1 className="text-2xl font-black">Transaction</h1>
      </div>
      <p className="text-sm text-muted-foreground mb-6">Aktivitas saat ini · Present dimension</p>

      <AnimatePresence mode="wait">
        {stage === "menu" && (
          <motion.div key="menu" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <div className="grid grid-cols-2 gap-3 mb-6">
              <ActionTile icon={QrCode} label="QRIS" desc="Scan & bayar" onClick={() => startScan("cafe")} primary />
              <ActionTile icon={Send} label="Transfer" desc="Antar bank" />
              <ActionTile icon={Receipt} label="Bill Pay" desc="Listrik, air, internet" />
              <ActionTile icon={Smartphone} label="Pulsa & Data" desc="Top up cepat" />
            </div>

            <div className="rounded-2xl bg-card border border-border p-4">
              <div className="flex items-center gap-2 text-xs font-semibold uppercase text-accent mb-2">
                <Sparkles className="w-3.5 h-3.5" /> Demo Habit Trigger
              </div>
              <p className="text-xs text-muted-foreground mb-3">
                Coba dua skenario transaksi untuk lihat nudge habit-loop dari engine wondr.
              </p>
              <div className="space-y-2">
                <button
                  onClick={() => startScan("cafe")}
                  className="w-full text-left rounded-xl bg-muted/40 p-3 border border-border"
                >
                  <div className="text-sm font-semibold">☕ Bayar kopi di Janji Jiwa</div>
                  <div className="text-[11px] text-muted-foreground">Trigger: Nudge "Kafe ke-8 bulan ini"</div>
                </button>
                <button
                  onClick={() => startScan("food")}
                  className="w-full text-left rounded-xl bg-muted/40 p-3 border border-border"
                >
                  <div className="text-sm font-semibold">🍔 Bayar GoFood Padang</div>
                  <div className="text-[11px] text-muted-foreground">Trigger: Nudge "Rp 2,1 jt untuk makan"</div>
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {stage === "scanning" && (
          <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-12">
            <div className="relative w-64 h-64 mx-auto rounded-3xl border-2 border-accent bg-card overflow-hidden">
              <motion.div
                className="absolute left-0 right-0 h-1 bg-accent shadow-[0_0_20px_var(--accent)]"
                animate={{ top: ["0%", "100%", "0%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <QrCode className="w-32 h-32 text-accent/60 absolute inset-0 m-auto" />
            </div>
            <p className="mt-6 text-sm text-muted-foreground">Memindai QRIS…</p>
          </motion.div>
        )}

        {stage === "confirm" && (
          <motion.div key="confirm" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-3xl bg-card border border-border p-5 mb-4">
              <div className="text-xs text-muted-foreground mb-1">Bayar ke</div>
              <div className="text-lg font-bold">{merchant.name}</div>
              <div className="text-xs text-muted-foreground mb-4">{merchant.category} · QRIS</div>
              <div className="border-t border-border pt-4">
                <div className="text-xs text-muted-foreground">Nominal</div>
                <div className="text-3xl font-black">{formatIDR(merchant.amount)}</div>
              </div>
            </div>
            <button
              onClick={confirmPay}
              className="w-full rounded-2xl bg-primary text-primary-foreground font-bold py-4 shadow-[var(--shadow-premium)]"
            >
              Bayar sekarang
            </button>
          </motion.div>
        )}

        {stage === "success" && (
          <motion.div key="success" initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="text-center py-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", damping: 12 }}
              className="w-24 h-24 mx-auto rounded-full bg-accent/20 flex items-center justify-center mb-4"
            >
              <CheckCircle2 className="w-14 h-14 text-accent" strokeWidth={2.5} />
            </motion.div>
            <h2 className="text-xl font-bold">Transaksi berhasil</h2>
            <p className="text-sm text-muted-foreground mt-1">{formatIDR(merchant.amount)} ke {merchant.name}</p>
            <div className="mt-6 text-xs text-accent flex items-center justify-center gap-1.5">
              <Sparkles className="w-3 h-3" /> Engine menganalisis pola pengeluaranmu…
            </div>
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
      className={`rounded-2xl border p-4 flex flex-col items-start gap-2 active:scale-95 transition text-left ${
        primary ? "bg-gradient-to-br from-primary/20 to-card border-primary/40" : "bg-card border-border"
      }`}
    >
      <Icon className={`w-6 h-6 ${primary ? "text-primary" : "text-accent"}`} strokeWidth={2} />
      <div>
        <div className="text-sm font-bold">{label}</div>
        <div className="text-[11px] text-muted-foreground">{desc}</div>
      </div>
    </button>
  );
}

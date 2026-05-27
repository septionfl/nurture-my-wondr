import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Fingerprint, ShieldCheck } from "lucide-react";
import { useState } from "react";
import { WondrLogo } from "@/components/WondrLogo";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "wondr by BNI — Nurture the Habit" },
      { name: "description", content: "Fitur Nurture wondr — ubah transaksi jadi kebiasaan finansial." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 900);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden" style={{ background: "var(--wondr-orange)" }}>
      {/* Brand blobs */}
      <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full" style={{ background: "var(--wondr-teal)" }} />
      <div className="absolute -bottom-32 -right-20 w-[360px] h-[360px] rounded-full" style={{ background: "var(--wondr-purple)", opacity: 0.9 }} />
      <div className="absolute top-1/3 right-10 w-24 h-24 rounded-full" style={{ background: "var(--wondr-pink)" }} />

      <div className="relative z-10 min-h-screen flex flex-col justify-between items-center p-8 max-w-md mx-auto">
        <div className="pt-14 w-full flex flex-col items-center">
          <div className="bg-white rounded-2xl px-5 py-3 shadow-[var(--shadow-card)]">
            <WondrLogo size={34} />
          </div>
          <p className="mt-6 text-sm font-bold text-white/95">jadiin maumu.</p>
        </div>

        <div className="text-center text-white">
          <div className="text-[10px] uppercase tracking-[0.3em] font-bold text-white/80 mb-2">Fitur Baru</div>
          <h2 className="text-3xl font-black tracking-tight">Nurture the Habit</h2>
          <p className="mt-2 text-sm text-white/85 max-w-[280px] mx-auto">
            Engine nudge yang ubah transaksi harianmu jadi kebiasaan finansial.
          </p>
        </div>

        <div className="flex flex-col items-center pb-6 w-full">
          <motion.button
            onClick={handleAuth}
            disabled={loading}
            whileTap={{ scale: 0.94 }}
            className="relative w-24 h-24 rounded-full bg-white flex items-center justify-center shadow-[var(--shadow-elevated)]"
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-4 border-[color:var(--wondr-orange)]/20 border-t-[color:var(--wondr-orange)] rounded-full"
              />
            ) : (
              <Fingerprint className="w-12 h-12" strokeWidth={1.8} style={{ color: "var(--wondr-orange)" }} />
            )}
            <motion.div
              className="absolute inset-0 rounded-full border-2 border-white/60"
              animate={{ scale: [1, 1.35, 1.35], opacity: [0.7, 0, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.button>
          <p className="mt-5 text-sm font-bold text-white">{loading ? "Memuat konteks 3D…" : "Tap untuk Face ID / Fingerprint"}</p>
          <div className="mt-2 flex items-center gap-1.5 text-xs text-white/85">
            <ShieldCheck className="w-3.5 h-3.5" />
            Aman & terenkripsi end-to-end
          </div>
        </div>
      </div>
    </div>
  );
}

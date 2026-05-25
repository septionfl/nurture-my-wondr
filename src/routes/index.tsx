import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Fingerprint, ShieldCheck } from "lucide-react";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "wondr by BNI — Nurture the Habit" },
      { name: "description", content: "Personalized nudge engine yang ubah transaksi jadi kebiasaan finansial." },
    ],
  }),
  component: Login,
});

function Login() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleAuth = () => {
    setLoading(true);
    setTimeout(() => navigate({ to: "/dashboard" }), 1000);
  };

  return (
    <div className="min-h-screen flex flex-col justify-between items-center p-8 max-w-md mx-auto">
      <div className="pt-16 text-center">
        <div className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-2">by BNI</div>
        <h1 className="text-5xl font-black tracking-tight">wondr</h1>
        <p className="mt-3 text-sm text-muted-foreground">Your Financial Passport</p>
      </div>

      <div className="text-center">
        <div className="text-xs uppercase tracking-wider text-muted-foreground mb-2">Selamat datang kembali</div>
        <h2 className="text-2xl font-bold mb-1">Halo, Naufal 👋</h2>
        <p className="text-sm text-muted-foreground">Login pakai biometrik untuk lanjut</p>
      </div>

      <div className="flex flex-col items-center pb-8 w-full">
        <motion.button
          onClick={handleAuth}
          disabled={loading}
          whileTap={{ scale: 0.92 }}
          className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center shadow-[var(--shadow-premium)]"
        >
          {loading ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="w-10 h-10 border-4 border-white/30 border-t-white rounded-full"
            />
          ) : (
            <Fingerprint className="w-14 h-14 text-white" strokeWidth={1.5} />
          )}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-primary/50"
            animate={{ scale: [1, 1.3, 1.3], opacity: [0.6, 0, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>
        <p className="mt-6 text-sm font-medium">{loading ? "Memuat 3D context…" : "Tap untuk FaceID / Fingerprint"}</p>
        <div className="mt-2 flex items-center gap-1.5 text-xs text-muted-foreground">
          <ShieldCheck className="w-3.5 h-3.5 text-accent" />
          Aman & terenkripsi end-to-end
        </div>
      </div>
    </div>
  );
}

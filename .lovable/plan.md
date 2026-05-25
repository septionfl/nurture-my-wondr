
# WONDR by BNI — "NURTURE the Habit" Prototype

Membangun prototype mobile-first (viewport mobile) yang menyimulasikan habit loop engine WONDR. Fokus pada UI/UX prototype — semua data di-mock di frontend (tidak perlu backend). Setiap layar menampilkan smart nudge yang context-aware sesuai skenario yang ditentukan.

## Design System

**Palette (semantic tokens di `src/styles.css`, format oklch):**
- `--background`: Deep Navy Blue (#0A1A3A area) — kanvas utama, dark mode feel
- `--primary`: Vibrant Orange #FF8500 — CTA, tombol nudge utama
- `--accent`: Bright Cyan #3FD8D4 — chart, progress bar, indikator aktif
- `--muted-foreground`: Cool Gray #757575 — teks sekunder, timestamp
- `--foreground`: Pure White — headline, nominal saldo
- `--card`: Navy lebih terang untuk surface elevation
- Gradient utility: `--gradient-nudge` (orange glow), `--shadow-premium`

**Typography:** Sans modern (Inter / Plus Jakarta Sans), heading tebal kontras.

**Bentuk:** Rounded-2xl, glass-card untuk pop-up nudge, subtle inner glow cyan untuk data viz.

## Struktur Routes (TanStack Start)

Mobile-app feel di dalam frame mobile (preview viewport: mobile). Bottom navigation persistent.

```
src/routes/
  __root.tsx               // shell + QueryClientProvider
  index.tsx                // Login (biometric simulation)
  _app.tsx                 // layout pathless: bottom nav + outlet (dark navy bg)
  _app/dashboard.tsx       // Home / Intelligent Dashboard (default landing)
  _app/transaction.tsx     // QRIS, Transfer, Bill Pay + success-screen nudge
  _app/insight.tsx         // Users Recap/Wrap, charts, profiling
  _app/growth.tsx          // Tapenas, saving goals, multicurrency
```

## Komponen yang Dibangun

`src/components/`:
- `BiometricLogin.tsx` — animasi FaceID/fingerprint tap-to-login
- `BottomNav.tsx` — 4 tab: Home, Transaction, Insight, Growth (indikator cyan dot)
- `SmartNudgeModal.tsx` — pop-up overlay, latar putih/navy gelap, CTA orange
- `BalanceHeader.tsx` — saldo + greeting kontekstual
- `DimensionCard.tsx` — 3 kartu shortcut ke Transaction/Insight/Growth
- `QrisFlow.tsx` — simulasi scan → bayar → success + nudge kafe
- `TransactionSuccessNudge.tsx` — layar sukses dengan CTA habit
- `SpendingDonut.tsx` & `MonthlyTrendChart.tsx` — Recharts (cyan + orange)
- `WrapCarousel.tsx` — Spotify Wrapped-style untuk Insight (profiling, preference, monthly spent, allocation)
- `RecommendationCard.tsx` — kartu rekomendasi pintar
- `SavingGoalCard.tsx` — progress bar cyan (Bali goal, marathon, emergency)
- `MulticurrencyWalletCard.tsx` — USD/SGD/MYR rate ticker
- `RateAlertNudge.tsx` — nudge diaspora
- `RecurringSetup.tsx` — setup auto-debit ke Tapenas

## Skenario Nudge (copy bilingual, default Bahasa Indonesia, tone friendly-proaktif)

**A. Gajian Detected**
- Headline: "Gajian masuk! 🎉"
- Body: "Kami deteksi pemasukan Rp 12,5 jt. Aktifkan Auto-Save 20% biar mimpi makin dekat?"
- CTA: "Auto-save Rp 2,5 jt sekarang" / "Nanti aja"

**B. Goal Progress (Bali)**
- Headline: "80% menuju Bali ✈️"
- Body: "Sedikit lagi! Tambah Rp 500 rb minggu ini biar trip-mu fix bulan depan."
- CTA: "Top up Rp 500K" / "Atur ulang target"

**C. Diaspora — Rate Alert**
- Headline: "USD lagi turun 📉"
- Body: "Rate hari ini Rp 15.420 — terendah 7 hari terakhir. Pasang alert biar nggak ketinggalan?"
- CTA: "Set rate alert" / "Tukar sekarang"

**D. QRIS Kafe (post-transaction)**
- Headline: "Kopi ke-8 bulan ini ☕"
- Body: "Total Rp 420 rb buat kafe. Alokasikan Rp 300 rb ke tabungan biar tetap balance?"
- CTA: "Yes, pindahkan Rp 300K" / "Skip"

**E. High Food Spend**
- Headline: "Rp 2,1 jt untuk makan bulan ini 🍔"
- Body: "Saatnya jaga komitmen — top up Tapenas-mu sekarang?"
- CTA: "Top up Tapenas" / "Lihat detail"

**F. Wellness Pattern (marathon)**
- Headline: "Kamu makin aktif 🏃"
- Body: "Kami lihat kamu daftar lomba lari. Yuk set Marathon Goal + budget wellness bulanan."
- CTA: "Buat goal marathon" / "Nanti"

**G. Travel Pattern**
- Headline: "Trip berikutnya kemana? 🌏"
- Body: "Dompet multicurrency siap nemenin. Aktifkan biar transaksi luar negeri tanpa drama."
- CTA: "Aktifkan multicurrency" / "Lihat info"

## Flow per Wireframe

**1. Login → Dashboard**
- Tap biometric → loading 800ms (simulasi data fetching 3 dimensi) → masuk dashboard.
- Dashboard auto-trigger SmartNudgeModal (random pilih skenario A/B/C — bisa di-cycle lewat tombol "Lihat skenario lain" untuk demo).
- Setelah close → tampak BalanceHeader + 3 DimensionCard + ringkasan aktivitas hari ini.

**2. Transaction**
- Tab "QRIS" default → tombol "Scan untuk bayar" → mock kafe Rp 45.000 → success screen → TransactionSuccessNudge (skenario D).
- Toggle skenario E tersedia (mock "bayar food delivery").

**3. Insight**
- Wrap carousel 4 slide: Profiling ("Urban Explorer"), Preference (top kategori), Monthly Spent (donut), Allocation (bar).
- Di bawahnya RecommendationCard skenario F.

**4. Growth**
- Daftar saving goals (Bali 80%, Emergency 45%, Marathon — empty state CTA).
- Tap "Buat goal baru" → form sederhana.
- Section Multicurrency dengan skenario G nudge + rate USD/SGD/MYR.
- Recurring setup modal untuk auto-debit mingguan ke goal terpilih.

## Feedback Loop Simulation

Global Zustand store (`src/stores/useHabitStore.ts`) menyimpan:
- `recentTransactions[]`, `goals[]`, `triggeredNudges[]`
- Setiap transaksi (QRIS sukses) push event → recompute nudge eligibility → muncul di dashboard saat balik ke Home.
- Indikator kecil "Engine learning…" sebagai easter egg menunjukkan loop grows smarter.

## Dependencies

- `recharts` (sudah ada di template umumnya — cek; kalau belum: `bun add recharts`)
- `zustand` untuk state global mock
- `lucide-react` untuk ikon (sudah tersedia)
- `framer-motion` untuk transisi pop-up & wrap carousel

## Catatan Implementasi

- Semua nominal & data adalah mock (tidak ada Lovable Cloud / backend).
- Preview di-set ke viewport mobile.
- Setiap layar dibungkus container max-w-md mx-auto agar tetap terlihat baik di desktop preview.
- Aksesibilitas: kontras teks white-on-navy AAA, target tap ≥44px.
- SEO/meta head per route walaupun ini app-style.

## Hal yang TIDAK termasuk

- Tidak ada autentikasi nyata, tidak ada database, tidak ada integrasi BNI API.
- Tidak ada pembayaran nyata — semua simulasi.

Konfirmasi untuk mulai build, atau beri tahu jika ada penyesuaian skenario / copy / palette.

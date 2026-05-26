## Ringkasan Perubahan

Refactor prototype WONDR "NURTURE the Habit" menjadi lebih profesional: tema terang (background putih), hapus mayoritas emoji, tambah detail insight, riwayat nudge, otomasi transfer ke Growth, dan jadikan semua elemen interaktif.

---

## 1. Perubahan Tema (Background Putih + Profesional)

File: `src/styles.css`
- Ganti `--background` ke putih (`oklch(0.99 0 0)`), `--foreground` ke deep navy (`#0A1A3A`).
- `--card` jadi `oklch(0.985 0.005 250)` (off-white) dengan border halus `oklch(0.92 0.01 250)`.
- `--primary` tetap Vibrant Orange untuk CTA, `--accent` tetap Bright Cyan tapi diturunkan saturasi sedikit agar enak di putih (`oklch(0.62 0.12 200)`).
- Tambah `--surface-elevated`, `--shadow-soft`, `--shadow-elevated` untuk hierarki visual di tema terang.
- Ganti `--gradient-navy` jadi `--gradient-surface` (white → very-light-gray).
- Body background: putih solid. Hilangkan glow cyan yang berat; pakai shadow halus.

File: `src/components/MobileShell.tsx`
- Beri shell putih dengan shadow halus & border subtle agar tetap terasa "mobile frame" di canvas desktop.

---

## 2. Hilangkan Emoji untuk Visualisasi

Ganti emoji (🏝️ 🛟 🏃 ☕ ✈️ 📉 🍔 🌏 🎉) jadi ikon `lucide-react` berwarna brand:
- Goal Bali → `Palmtree`, Dana Darurat → `ShieldCheck`, Marathon → `Activity`.
- Nudge: salary→`Wallet`, bali→`Plane`, diaspora→`TrendingDown`, cafe→`Coffee`, food→`UtensilsCrossed`, wellness→`HeartPulse`, travel→`Globe2`.
- Refactor `NUDGES` di `useHabitStore.ts`: ganti field `emoji: string` → `icon: LucideIcon` (atau key string yang di-map di komponen agar store tetap pure).
- Komponen yang merender emoji (`SmartNudgeModal`, dashboard goal list, growth, insight) dipindahkan ke ikon bulat dengan tinted background (`bg-accent/10 text-accent`).
- Emoji diperbolehkan tetap di Wondr Wrap (storytelling slide) — opsional, tipis.

---

## 3. Tambah Detail Insight

File: `src/routes/_app/insight.tsx` (revamp) + route baru `src/routes/_app/insight.$category.tsx` untuk detail per-kategori.

Tambahan di Insight utama:
- **Spending Breakdown bulan ini**: Donut chart (Recharts) per kategori (Kafe, Makanan, Travel, Wellness, Transport, Belanja) — klik segment → buka detail kategori.
- **Monthly Trend**: Line/Area chart 6 bulan terakhir pengeluaran vs pemasukan.
- **Top Merchants**: list 5 merchant terbanyak (Janji Jiwa, GoFood, Grab, dll), klik → detail merchant (modal/sheet).
- **Habit Score**: kartu skor 0-100 dengan progress ring + breakdown 3 metrik (Saving Rate, Budget Adherence, Goal Progress).
- **Wondr Wrap carousel**: tetap, tapi pakai ikon & tipografi profesional.

Halaman detail kategori (`/insight/:category`):
- Header dengan ikon + total bulan ini + % vs bulan lalu.
- Bar chart per minggu.
- Daftar transaksi kategori tsb (clickable → modal detail txn).
- CTA: "Buat budget kategori ini" → membuka Growth.

---

## 4. Riwayat Nudge

Store (`useHabitStore.ts`):
- Tambah tipe `NudgeHistoryEntry { id, key, action: 'accepted'|'dismissed'|'shown', timestamp, amount? }`.
- Tambah state `nudgeHistory: NudgeHistoryEntry[]`.
- Push ke history pada `showNudge` (action: shown), `acceptNudge` (accepted), `dismissNudge` (dismissed).

Route baru: `src/routes/_app/nudges.tsx` ("Riwayat Nudge"):
- List nudge yang pernah muncul: ikon, headline, waktu, badge status (Diterima/Dilewati/Dilihat), dan amount jika ada.
- Filter chip: Semua / Diterima / Dilewati.
- Klik item → re-open `SmartNudgeModal` untuk nudge tsb (re-trigger).
- Statistik header: total nudge, acceptance rate, total dana yang dipindahkan via nudge.

Entry point:
- Tile baru di Dashboard "Riwayat Nudge" + ikon `History` di header dashboard.
- Tambahkan ke BottomNav? Tidak — tetap 4 slot (Home, Transaction, Insight, Growth). Akses via dashboard tile + ikon header.

---

## 5. Otomasi Transfer ke Growth

Konsep: setiap acceptNudge yang menghasilkan transfer (salary auto-save, bali top-up, cafe redirect, high_food top-up Tapenas) otomatis:
- Mengurangi `balance`, menambah `current` di goal terkait (sudah ada untuk sebagian).
- Mencatat transaksi keluar berlabel "Auto-transfer → [Goal]" di `transactions` (kategori: "Auto-Save") agar muncul di Insight.
- Push entry ke `nudgeHistory` dengan amount.
- Mapping nudge → goal: salary→emergency, bali_goal→bali, cafe_qris→bali, high_food→emergency, wellness→marathon.
- Tampilkan toast/inline confirmation: "Rp X dipindahkan ke [Goal]. Lihat di Growth." dengan link clickable.

Di Growth:
- Tampilkan badge "Auto" pada goal yang menerima transfer otomatis minggu ini.
- Section "Aktivitas Auto-Transfer" — list 5 transfer otomatis terakhir, clickable → detail.
- Toggle per-goal: "Aktifkan auto-transfer dari nudge" (state lokal di store).

---

## 6. Semua Clickable

Audit & tambahkan handler:
- **Dashboard**: header user (→ profile sheet stub), bell (→ notifications sheet), balance card (→ statement modal), each transaction row (→ txn detail modal), each goal row (→ growth detail), "Demo skenario" chips (sudah).
- **Transaction**: semua ActionTile (Transfer, Bill Pay, Pulsa) buka coming-soon sheet, riwayat (jika ada) clickable.
- **Insight**: setiap chart segment, wrap card, merchant row, category, score breakdown — semua membuka detail/modal.
- **Growth**: setiap goal card (→ goal detail sheet dengan kontribusi history, edit target, top-up manual), multicurrency wallet (→ detail wallet), recurring item (→ edit sheet).
- **BottomNav**: tetap.
- **SmartNudgeModal**: kedua CTA + backdrop tap untuk dismiss + tombol close.
- Tambah komponen `Sheet` dari shadcn untuk detail sheets yang ringan.

---

## File yang Disentuh

Buat:
- `src/routes/_app/nudges.tsx`
- `src/routes/_app/insight.$category.tsx`
- `src/components/NudgeHistoryItem.tsx`
- `src/components/GoalDetailSheet.tsx`
- `src/components/TransactionDetailSheet.tsx`
- `src/components/CategoryIcon.tsx` (mapping kategori → ikon + warna)
- `src/components/NudgeIcon.tsx`

Edit:
- `src/styles.css` (tema putih)
- `src/components/MobileShell.tsx` (frame profesional)
- `src/components/SmartNudgeModal.tsx` (ikon, bukan emoji; styling terang)
- `src/components/BottomNav.tsx` (warna terang)
- `src/stores/useHabitStore.ts` (nudge history, auto-transfer mapping, kategori transaksi)
- `src/routes/_app.tsx` (tidak ada perubahan besar)
- `src/routes/_app/dashboard.tsx` (tile riwayat nudge, hapus emoji, clickable rows)
- `src/routes/_app/transaction.tsx` (clickable tiles, tema)
- `src/routes/_app/insight.tsx` (revamp lengkap)
- `src/routes/_app/growth.tsx` (auto-transfer section, goal detail, hapus emoji)
- `src/routes/index.tsx` (login screen ke tema terang)

---

## Catatan Teknis

- Tambah dependency: tidak ada baru (recharts, framer-motion, lucide-react sudah ada). Pakai `Sheet` dari shadcn `src/components/ui/sheet.tsx` (sudah tersedia).
- Semua data tetap mock di Zustand store.
- Bilingual ID (default), CTA tetap ID.
- Aksesibilitas: tombol pakai elemen `<button>`, link pakai `<Link>` TanStack, fokus ring dari token `--ring`.

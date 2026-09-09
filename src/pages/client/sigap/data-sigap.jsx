export const reports = [
  {
    id: "SR-2024-001",
    pelapor: "Alya Rahma",
    tanggal: "2024-06-21",
    isi: "Toilet lantai 2 gedung D pipa airnya bocor.",
    lokasi: "Toilet lantai 2 gedung D",
    status: "selesai",
  },
  {
    id: "SR-2024-002",
    pelapor: "Bagas Prasetyo",
    tanggal: "2024-06-22",
    isi: "AC ruang kelas XI DKV 1 tidak dingin.",
    lokasi: "Ruang XI DKV 1",
    status: "diproses",
  },
  {
    id: "SR-2024-003",
    pelapor: "Citra Ayu",
    tanggal: "2024-06-23",
    isi: "Lampu di koridor lantai 3 mati beberapa titik.",
    lokasi: "Koridor lantai 3",
    status: "diproses",
  },
  {
    id: "SR-2024-004",
    pelapor: "Dimas Saputra",
    tanggal: "2024-06-24",
    isi: "Pintu laboratorium komputer macet dan susah dibuka.",
    lokasi: "Laboratorium Komputer",
    status: "belum",
  },
  {
    id: "SR-2024-005",
    pelapor: "Elsa Wulandari",
    tanggal: "2024-06-25",
    isi: "Meja di perpustakaan rusak dan goyang.",
    lokasi: "Perpustakaan",
    status: "selesai",
  },
];

export const processSteps = [
  {
    title: "Buat Laporan",
    deskripsi: "Isi form dengan detail kerusakan dan foto pendukung.",
  },
  {
    title: "Diverifikasi Petugas",
    deskripsi: "Petugas/OSIS meninjau dan mengecek lokasi laporan.",
  },
  {
    title: "Perbaikan & Selesai",
    deskripsi: "Pihak sarpras menindaklanjuti hingga selesai.",
  },
];

export const statusMeta = {
  selesai: { label: "Selesai", color: "status-success" },
  diproses: { label: "Diproses", color: "status-process" },
  belum: { label: "Belum Ditangani", color: "status-pending" },
};

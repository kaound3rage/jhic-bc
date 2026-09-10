// Struktur data galeri SMK Negeri 2 Yogyakarta.
// Tiap foto: id, imageUrl, kategori, tag (sub-filter/album), caption, tanggal.
export const fotoGaleri = [
  {
    id: "galeri-01",
    imageUrl: "/galeri/galeri-01.svg",
    kategori: "Kegiatan Siswa",
    tag: "MPLS",
    caption: "Pembukaan Masa Pengenalan Lingkungan Sekolah",
    tanggal: "Juli 2025",
  },
  {
    id: "galeri-02",
    imageUrl: "/galeri/galeri-02.svg",
    kategori: "Kegiatan Siswa",
    tag: "MPLS",
    caption: "Apel pagi dan pengenalan lingkungan sekolah",
    tanggal: "Juli 2025",
  },
  {
    id: "galeri-03",
    imageUrl: "/galeri/galeri-03.svg",
    kategori: "Kegiatan Siswa",
    tag: "LDKS",
    caption: "Latihan Dasar Kepemimpinan Siswa",
    tanggal: "Agustus 2025",
  },
  {
    id: "galeri-04",
    imageUrl: "/galeri/galeri-04.svg",
    kategori: "Kegiatan Siswa",
    tag: "Pramuka",
    caption: "Kemah Pramuka Penegak di Bumi Perkemahan",
    tanggal: "Oktober 2025",
  },
  {
    id: "galeri-05",
    imageUrl: "/galeri/galeri-05.svg",
    kategori: "Kegiatan Siswa",
    tag: "Class Meeting",
    caption: "Class Meeting antar kelas",
    tanggal: "Desember 2025",
  },
  {
    id: "galeri-06",
    imageUrl: "/galeri/galeri-06.svg",
    kategori: "Olahraga",
    tag: "Futsal Cup",
    caption: "Turnamen futsal antar pelajar",
    tanggal: "September 2025",
  },
  {
    id: "galeri-07",
    imageUrl: "/galeri/galeri-07.svg",
    kategori: "Olahraga",
    tag: "Pekan Olahraga",
    caption: "Pertandingan bola voli antar siswa",
    tanggal: "September 2025",
  },
  {
    id: "galeri-08",
    imageUrl: "/galeri/galeri-08.svg",
    kategori: "Olahraga",
    tag: "Pekan Olahraga",
    caption: "Kejuaraan pencak silat pelajar",
    tanggal: "September 2025",
  },
  {
    id: "galeri-09",
    imageUrl: "/galeri/galeri-09.svg",
    kategori: "Olahraga",
    tag: "Pekan Olahraga",
    caption: "Turnamen bulutangkis antar siswa",
    tanggal: "September 2025",
  },
  {
    id: "galeri-10",
    imageUrl: "/galeri/galeri-10.svg",
    kategori: "Seni & Budaya",
    tag: "Pentas Seni",
    caption: "Pentas seni & budaya siswa",
    tanggal: "November 2025",
  },
  {
    id: "galeri-11",
    imageUrl: "/galeri/galeri-11.svg",
    kategori: "Seni & Budaya",
    tag: "Pentas Seni",
    caption: "Pementasan karawitan Kidung Aji Saka",
    tanggal: "November 2025",
  },
  {
    id: "galeri-12",
    imageUrl: "/galeri/galeri-12.svg",
    kategori: "Seni & Budaya",
    tag: "Tari Tradisional",
    caption: "Penampilan tari tradisional",
    tanggal: "November 2025",
  },
  {
    id: "galeri-13",
    imageUrl: "/galeri/galeri-13.svg",
    kategori: "Acara Spesial",
    tag: "Anniversary",
    caption: "Peringatan hari ulang tahun sekolah",
    tanggal: "Juni 2025",
  },
  {
    id: "galeri-14",
    imageUrl: "/galeri/galeri-14.svg",
    kategori: "Acara Spesial",
    tag: "Hari Nasional",
    caption: "Upacara peringatan Hari Guru Nasional",
    tanggal: "November 2025",
  },
];

export const kategoriGaleri = [
  { label: "Semua", value: "Semua" },
  { label: "Kegiatan Siswa", value: "Kegiatan Siswa" },
  { label: "Olahraga", value: "Olahraga" },
  { label: "Seni & Budaya", value: "Seni & Budaya" },
  { label: "Acara Spesial", value: "Acara Spesial" },
];

export const tagGaleri = Array.from(
  new Set(fotoGaleri.map((foto) => foto.tag).filter(Boolean)),
);

export const getFotoGaleriByCategoryAndTag = (kategori, tag) =>
  fotoGaleri.filter(
    (foto) =>
      (kategori === "Semua" || foto.kategori === kategori) &&
      (!tag || foto.tag === tag),
  );
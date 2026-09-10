// Struktur data ekstrakurikuler SMK Negeri 2 Yogyakarta.
// Tiap item: slug, nama, deskripsi, fotoUrl (ganti dengan foto asli nanti),
// fotoAlt. Untuk ikon kecil pada box selector, gunakan slug di
// src/components/ekstrakurikuler-showcase.jsx (map ikon lucide).
export const ekstrakurikulerData = [
  {
    kategori: "Organisasi & Badan Khusus",
    items: [
      {
        slug: "osis-mpk",
        nama: "OSIS & MPK",
        deskripsi:
          "Organisasi Siswa Intra Sekolah dan Majelis Perwakilan Kelas sebagai wadah kepemimpinan siswa.",
        fotoUrl: "/ekstrakurikuler/osis-mpk.svg",
        fotoAlt: "Kegiatan OSIS & MPK SMK Negeri 2 Yogyakarta",
      },
      {
        slug: "tmc",
        nama: "Technical Mountaineering Club (TMC)",
        deskripsi: "Kegiatan pecinta alam, pendakian, dan konservasi lingkungan.",
        fotoUrl: "/ekstrakurikuler/tmc.svg",
        fotoAlt: "Kegiatan Technical Mountaineering Club SMK Negeri 2 Yogyakarta",
      },
      {
        slug: "kidung-aji-saka",
        nama: "Kidung Aji Saka",
        deskripsi: "Kelompok seni dan budaya tradisional.",
        fotoUrl: "/ekstrakurikuler/kidung-aji-saka.svg",
        fotoAlt: "Kegiatan Kidung Aji Saka SMK Negeri 2 Yogyakarta",
      },
      {
        slug: "kuli-tinta",
        nama: "Kuli Tinta",
        deskripsi: "Klub jurnalistik dan majalah sekolah.",
        fotoUrl: "/ekstrakurikuler/kuli-tinta.svg",
        fotoAlt: "Kegiatan Kuli Tinta SMK Negeri 2 Yogyakarta",
      },
      {
        slug: "pmr",
        nama: "PMR",
        deskripsi:
          "Palang Merah Remaja, mengembangkan kepedulian sosial dan keterampilan pertama.",
        fotoUrl: "/ekstrakurikuler/pmr.svg",
        fotoAlt: "Kegiatan Palang Merah Remaja SMK Negeri 2 Yogyakarta",
      },
      {
        slug: "dewan-ambalan",
        nama: "Dewan Ambalan",
        deskripsi: "Kegiatan Pramuka penegak di lingkungan sekolah.",
        fotoUrl: "/ekstrakurikuler/dewan-ambalan.svg",
        fotoAlt: "Kegiatan Dewan Ambalan SMK Negeri 2 Yogyakarta",
      },
      {
        slug: "pks",
        nama: "PKS",
        deskripsi: "Patroli Keamanan Sekolah, menjaga ketertiban dan keamanan.",
        fotoUrl: "/ekstrakurikuler/pks.svg",
        fotoAlt: "Kegiatan Patroli Keamanan Sekolah SMK Negeri 2 Yogyakarta",
      },
      {
        slug: "wsp-tonti",
        nama: "WSP / Tonti",
        deskripsi: "Peleton Inti / Kesamaptaan, melatih kedisiplinan dan baris-berbaris.",
        fotoUrl: "/ekstrakurikuler/wsp-tonti.svg",
        fotoAlt: "Kegiatan WSP / Tonti SMK Negeri 2 Yogyakarta",
      },
    ],
  },
  {
    kategori: "Olahraga & Seni",
    items: [
      {
        slug: "pencak-silat",
        nama: "Pencak Silat",
        deskripsi:
          "Beladiri tradisional untuk membentuk ketangkasan dan mental juara.",
        fotoUrl: "/ekstrakurikuler/pencak-silat.svg",
        fotoAlt: "Kegiatan Pencak Silat SMK Negeri 2 Yogyakarta",
      },
      {
        slug: "sepak-bola-futsal",
        nama: "Sepak Bola / Futsal",
        deskripsi:
          "Melatih tim, teknik, dan sportivitas di lapangan.",
        fotoUrl: "/ekstrakurikuler/sepak-bola-futsal.svg",
        fotoAlt: "Kegiatan Sepak Bola / Futsal SMK Negeri 2 Yogyakarta",
      },
      {
        slug: "bola-voli",
        nama: "Bola Voli",
        deskripsi:
          "Mengasah kerja sama tim dan keterampilan dasar permainan voli.",
        fotoUrl: "/ekstrakurikuler/bola-voli.svg",
        fotoAlt: "Kegiatan Bola Voli SMK Negeri 2 Yogyakarta",
      },
      {
        slug: "bulutangkis",
        nama: "Bulutangkis (Badminton)",
        deskripsi:
          "Berlatih teknik, kelincahan, dan strategi permainan bulutangkis.",
        fotoUrl: "/ekstrakurikuler/bulutangkis.svg",
        fotoAlt: "Kegiatan Bulutangkis SMK Negeri 2 Yogyakarta",
      },
    ],
  },
];

export const getAllEkstrakurikuler = () =>
  ekstrakurikulerData.flatMap((category) => category.items);
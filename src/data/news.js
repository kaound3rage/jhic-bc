export const newsItems = [
  {
    id: 1,
    date: "08 September 2026",
    author: "Admin",
    type: "Prestasi",
    tags: ["LKS", "Kompetisi"],
    title: "SKADUTA Raih Juara LKS Tingkat Provinsi",
    description:
      "Siswa SMK Negeri 2 Yogyakarta kembali menorehkan prestasi membanggakan dalam ajang Lomba Kompetensi Siswa tingkat provinsi.",
    image: "/pjs.png",
    slug: "skaduta-raih-juara-lks-tingkat-provinsi",
  },
  {
    id: 2,
    date: "03 September 2026",
    author: "Admin",
    type: "Kegiatan",
    tags: ["Industri", "Pembelajaran"],
    title: "Kolaborasi Pembelajaran Bersama Mitra Industri",
    description:
      "Program pembelajaran bersama mitra industri memberikan pengalaman kerja nyata bagi siswa sesuai bidang keahlian.",
    image: "/sekolah.webp",
    slug: "kolaborasi-pembelajaran-bersama-mitra-industri",
  },
  {
    id: 3,
    date: "27 Agustus 2026",
    author: "Admin",
    type: "Pengumuman",
    tags: ["PPDB", "Siswa Baru"],
    title: "Informasi Pendaftaran Peserta Didik Baru",
    description:
      "Simak informasi terbaru mengenai jadwal, persyaratan, dan tahapan penerimaan peserta didik baru di SKADUTA.",
    image: "/sija.png",
    slug: "informasi-pendaftaran-peserta-didik-baru",
  },
  {
    id: 4,
    date: "20 Agustus 2026",
    author: "Tim Humas",
    type: "Kegiatan",
    tags: ["Sekolah", "Kemerdekaan"],
    title: "Semarak Peringatan HUT Kemerdekaan di SKADUTA",
    description:
      "Seluruh warga sekolah mengikuti rangkaian kegiatan peringatan kemerdekaan dengan penuh semangat dan kebersamaan.",
    image: "/sekolah.webp",
    slug: "semarak-peringatan-hut-kemerdekaan-di-skaduta",
  },
  {
    id: 5,
    date: "15 Agustus 2026",
    author: "Admin",
    type: "Akademik",
    tags: ["Pembelajaran", "Teknologi"],
    title: "Pelatihan Literasi Digital untuk Guru dan Siswa",
    description:
      "Pelatihan ini memperkuat pemanfaatan teknologi digital dalam proses belajar yang kreatif, aman, dan bertanggung jawab.",
    image: "/sija.png",
    slug: "pelatihan-literasi-digital-untuk-guru-dan-siswa",
  },
  {
    id: 6,
    date: "09 Agustus 2026",
    author: "Tim Humas",
    type: "Prestasi",
    tags: ["Olahraga", "Kompetisi"],
    title: "Tim Futsal SKADUTA Melaju ke Final Antar-SMK",
    description:
      "Tim futsal sekolah memastikan tempat di babak final setelah menampilkan permainan solid sepanjang turnamen.",
    image: "/pjs.png",
    slug: "tim-futsal-skaduta-melaju-ke-final-antar-smk",
  },
  {
    id: 7,
    date: "02 Agustus 2026",
    author: "Admin",
    type: "Pengumuman",
    tags: ["Akademik", "Jadwal"],
    title: "Jadwal Asesmen Tengah Semester Ganjil",
    description:
      "Periksa jadwal asesmen tengah semester, ketentuan peserta, dan informasi ruang ujian melalui pengumuman ini.",
    image: "/sekolah.webp",
    slug: "jadwal-asesmen-tengah-semester-ganjil",
  },
  {
    id: 8,
    date: "25 Juli 2026",
    author: "Tim Humas",
    type: "Kegiatan",
    tags: ["Lingkungan", "Sekolah"],
    title: "Gerakan Jumat Bersih Wujudkan Sekolah Nyaman",
    description:
      "Siswa, guru, dan tenaga kependidikan bergotong royong menjaga kebersihan lingkungan sekolah setiap Jumat pagi.",
    image: "/sekolah.webp",
    slug: "gerakan-jumat-bersih-wujudkan-sekolah-nyaman",
  },
  {
    id: 9,
    date: "18 Juli 2026",
    author: "Admin",
    type: "Alumni",
    tags: ["Alumni", "Karier"],
    title: "Alumni Berbagi Pengalaman Berkarier di Industri",
    description:
      "Para alumni kembali ke sekolah untuk berbagi perjalanan karier dan memberi inspirasi kepada siswa kelas akhir.",
    image: "/moh_rokhis.webp",
    slug: "alumni-berbagi-pengalaman-berkarier-di-industri",
  },
];

export const getNewsBySlug = (slug) =>
  newsItems.find((newsItem) => newsItem.slug === slug);

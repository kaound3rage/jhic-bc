export const kategoriAlumni = ["Semua", "Bekerja", "Kuliah", "Wirausaha"];

export const alumni = [
  {
    slug: "abdul-latif-ikhlashul-mukmin",
    name: "Abdul Latif Ikhlashul Mukmin",
    role: "Director PT Coding Collective",
    image: "/latif.png",
    quote:
      "Belajar di SMK Negeri 2 Yogyakarta memberi saya fondasi teknis dan keberanian untuk terus berkembang.",
    kategori: "Wirausaha",
    tahunLulus: "2007",
    jurusan: "Teknik Komputer dan Jaringan",
  },
  {
    slug: "aulia-rahma",
    name: "Aulia Rahma",
    role: "Digital Marketing Specialist",
    image: "/woman.png",
    quote:
      "Guru dan teman-teman di SKADUTA mengajarkan saya untuk bekerja dengan disiplin dan kolaboratif.",
    kategori: "Bekerja",
    tahunLulus: "2019",
    jurusan: "Multimedia",
  },
  {
    slug: "dimas-nugraha",
    name: "Dimas Nugraha",
    role: "Mahasiswa Teknik Mesin ITB",
    image: "/pjs.png",
    quote:
      "Budaya belajar dan praktik di SKADUTA membuat saya lebih percaya diri melanjutkan pendidikan.",
    kategori: "Kuliah",
    tahunLulus: "2021",
    jurusan: "Teknik Pemesinan",
  },
  {
    slug: "salsabila-putri",
    name: "Salsabila Putri",
    role: "UI/UX Designer",
    image: "/sija.png",
    quote:
      "Projek nyata di sekolah membantu saya memahami cara mengubah kebutuhan menjadi solusi yang berguna.",
    kategori: "Bekerja",
    tahunLulus: "2020",
    jurusan: "Desain Komunikasi Visual",
  },
  {
    slug: "bagas-pratama",
    name: "Bagas Pratama",
    role: "Pemilik Bengkel Mandiri",
    image: "/moh_rokhis.webp",
    quote:
      "Keterampilan praktik yang saya dapatkan menjadi bekal untuk membangun usaha bersama teman-teman.",
    kategori: "Wirausaha",
    tahunLulus: "2017",
    jurusan: "Teknik Kendaraan Ringan",
  },
  {
    slug: "nabila-fauziah",
    name: "Nabila Fauziah",
    role: "Mahasiswa Sistem Informasi",
    image: "/woman.png",
    quote:
      "SKADUTA menumbuhkan rasa ingin tahu dan kebiasaan belajar yang terus saya bawa sampai kuliah.",
    kategori: "Kuliah",
    tahunLulus: "2022",
    jurusan: "Sistem Informasi Jaringan dan Aplikasi",
  },
];

export function getAlumniBySlug(slug) {
  return alumni.find((item) => item.slug === slug);
}

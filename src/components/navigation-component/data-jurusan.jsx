import { majors } from "@/data/majors";

export const Jurusan = majors.map((major) => ({
  field: major.slug,
  title: major.nama,
  path: `/konsentrasi-keahlian/${major.slug}`,
  deskripsi: major.deskripsiSingkat,
}));
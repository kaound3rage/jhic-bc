import { Card } from "../ui/card";

const stats = [
  {
    title: "Visi",
    deskripsi:
      "Menghasilkan Tamatan Yang Berkarakter, Unggul, Berwawasan Lingkungan, dan Berdaya Saing Global",
  },
  {
    title: "Misi",
    deskripsi: [
      "Mengembangkan kurikulum pembelajaran berbasis Teaching Factory (TEFA).",
      "Mengembangkan budaya literasi numerik, digital, finansial, sains, dan bahasa.",
      "Mengembangkan kompetensi peserta didik sesuai dengan bakat dan minat.",
      "Menyelenggarakan pembelajaran dan manajemen sekolah berbasis TIK.",
      "Meningkatkan fasilitas dan lingkungan belajar yang aman, nyaman, ramah lingkungan, ramah anak, dan responsif gender.",
      "Melaksanakan penataan lingkungan sekolah dan pengelolaan limbah 3R (Reuse, Reduce, Recycle) di setiap unit kerja.",
      "Menerapkan Perilaku Ramah Lingkungan Hidup (PRLH) warga sekolah menuju sekolah adiwiyata tingkat nasional.",
      "Mendampingi peserta didik dalam pembiasaan beribadah untuk meningkatkan ketaqwaan kepada Tuhan Yang Maha Esa.",
      "Menerapkan pendidikan berbasis Budaya Yogyakarta dan Profil Pelajar Pancasila.",
      "Meningkatkan kualitas dan kuantitas pendidik dan tenaga kependidikan yang memenuhi kualifikasi profesional, sertifikasi kompetensi, kreatif, inovatif, berkarakter, dan berbudaya kerja industri.",
      "Membangun kemitraan (Link and Match) dengan lembaga yang relevan dalam dan luar negeri.",
      "Menyelenggarakan sertifikasi kompetensi dan bahasa asing bagi peserta didik.",
      "Menyelenggarakan program pertukaran pelajar dan guru tingkat ASEAN.",
    ],
  },
];

function ProfileSection() {
  return (
    <section className="flex flex-col gap-6 py-18">
      <h1 className="text-2xl font-bold">Profil Singkat</h1>

      <div className="flex items-stretch justify-between gap-4">
        <iframe
          width="430"
          src="https://www.youtube.com/embed/R1NA1pnGVfw?si=xvQPlGXoIZsttg6p"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="min-h-80 rounded-2xl"
        />

        <div className="flex flex-1 items-stretch gap-3">
          {stats.map((item, index) => (
            <Card key={index} className="flex-1 p-5">
              <h2 className="mb-2 text-lg font-bold">{item.title}</h2>
              {Array.isArray(item.deskripsi) ? (
                <ol className="list-decimal space-y-2 pl-4 text-sm h-65 overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-border [&::-webkit-scrollbar-thumb:hover]:bg-muted-foreground">
                  {item.deskripsi.map((misi, index) => (
                    <li key={index} className="text-xs text-muted-foreground">
                      {misi}
                    </li>
                  ))}
                </ol>
              ) : (
                <p className="text-xs leading-relaxed text-muted-foreground ">
                  {item.deskripsi}
                </p>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ProfileSection;

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
      "Menyelenggarakan pembelajaran dan manajemen sekolah berbasis TIK (Teknologi Informasi dan Komunikasi).",
      "Meningkatkan fasilitas dan lingkungan belajar yang aman, nyaman, ramah lingkungan, ramah anak, dan responsif gender.",
    ],
  },
];

function ProfileSection() {
  return (
    <section className="py-18 flex flex-col gap-6">
      <h1 className="font-bold text-2xl">Profil Singkat</h1>
      <div className="flex items-stretch justify-between gap-4">
        <iframe
          width="430"
          src="https://www.youtube.com/embed/R1NA1pnGVfw?si=xvQPlGXoIZsttg6p"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          className="rounded-2xl min-h-80"
        ></iframe>

        <div className="flex items-stretch gap-3 flex-1">
          {stats.map((item, index) => (
            <Card
              key={index}
              className="flex-1 p-5 h-full"
            >
              <h2 className="font-bold text-lg mb-2">
                {item.title}
              </h2>

              {Array.isArray(item.deskripsi) ? (
                <ol className="list-decimal pl-5 space-y-2 text-sm">
                  {item.deskripsi.map((misi, index) => (
                    <li key={index} className="text-xs text-muted-foreground">{misi}</li>
                  ))}
                </ol>
              ) : (
                <p className="text-xs leading-relaxed text-muted-foreground">
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
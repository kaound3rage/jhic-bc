// import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ContactForm from "@/components/contact-component/contact-form";
import ContactHoursCard from "@/components/contact-component/contact-hours-card";
import ContactInfoCard from "@/components/contact-component/contact-info-card";
import { Link } from "react-router-dom";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/smkn2yogyakarta/",
    icon: "https://cdn.simpleicons.org/instagram",
  },
  {
    label: "Facebook",
    href: "https://web.facebook.com/SMK2YK",
    icon: "https://cdn.simpleicons.org/facebook",
  },
  {
    label: "YouTube",
    href: "https://www.youtube.com/channel/UC-XjCCMZosDiXzBEKiS6FBA/videos",
    icon: "https://cdn.simpleicons.org/youtube",
  },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@smk2yogyakarta",
    icon: "https://cdn.simpleicons.org/tiktok",
  },
  {
    label: "Twitter",
    href: "https://x.com/smkn2yogyakarta?lang=en",
    icon: "https://cdn.simpleicons.org/x",
  },
];

function ContactPage() {
  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8 max-w-3xl">
        {/* <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">Hubungi SKADUTA</Badge> */}
        <h1 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
          Kontak Kami
        </h1>
        <p className="mt-3 text-muted-foreground">
          Butuh informasi sekolah, kerja sama industri, atau bantuan layanan?
          Tim SMK Negeri 2 Yogyakarta siap mendengar dan membantu Anda.
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div className="space-y-6">
          <ContactInfoCard />
          <ContactHoursCard />
          <div className="rounded-xl border bg-primary p-5 text-primary-foreground">
            <p className="font-semibold">Ikuti kabar sekolah</p>
            <p className="mt-1 text-sm leading-6 text-primary-foreground/80">
              Dapatkan informasi kegiatan dan prestasi terbaru melalui media
              sosial kami.
            </p>
            <div className="flex gap-2 mt-3">
              {socialLinks.map((item) => (
                <Button
                  key={item.name}
                  asChild
                  variant="outline"
                  className="size-10 border-primary-foreground/20 bg-primary-foreground/10 hover:bg-primary-foreground/20"
                >
                  <Link
                    to={item.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={item.name}
                  >
                    <img
                      src={item.icon}
                      alt={item.name}
                      className="size-5 brightness-0 invert"
                    />
                  </Link>
                </Button>
              ))}
            </div>
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

export default ContactPage;

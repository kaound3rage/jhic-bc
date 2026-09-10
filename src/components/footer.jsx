import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router-dom";

const contactData = [
  {
    title: "Alamat",
    content:
      "Jl AM Sangaji 47 Yogyakarta 55233 Kota Yogyakarta Daerah Istimewa Yogyakarta",
    icon: MapPin,
  },
  {
    title: "Nomor Telepon",
    content: "(0274) 513490 / (0274) 513490",
    icon: Phone,
    href: "tel:+62274513490",
  },
  {
    title: "Email",
    content: "info@smk2-yk.sch.id",
    icon: Mail,
    href: "mailto:info@smk2-yk.sch.id",
  },
];

const socialMedia = [
  {
    name: "Instagram",
    icon: "https://cdn.simpleicons.org/instagram",
    href: "https://www.instagram.com/smkn2yogyakarta/",
  },
  {
    name: "Facebook",
    icon: "https://cdn.simpleicons.org/facebook",
    href: "https://web.facebook.com/SMK2YK",
  },
  {
    name: "YouTube",
    icon: "https://cdn.simpleicons.org/youtube",
    href: "https://www.youtube.com/channel/UC-XjCCMZosDiXzBEKiS6FBA/videos",
  },
  {
    name: "TikTok",
    icon: "https://cdn.simpleicons.org/tiktok",
    href: "https://www.tiktok.com/@smk2yogyakarta",
  },
  {
    name: "Twitter",
    icon: "https://cdn.simpleicons.org/x",
    href: "https://x.com/smkn2yogyakarta?lang=en",
  },
];

function Footer() {
  return (
    <footer className="bg-primary pt-10">
      <div className="mx-auto flex max-w-295 flex-col gap-8">
        <div className="flex items-center gap-2">
          <img
            src="/logo.webp"
            alt="Logo SKADUTA"
            className="h-11 w-11"
          />
          <h1 className="text-xl font-bold text-primary-foreground">SKADUTA</h1>
        </div>
        <div className="flex flex-col gap-7">
          <div className="flex items-start justify-between w-full">
            <div className="flex flex-col gap-6">
              {contactData.map((item) => {
                const Icon = item.icon;

                return (
                  <div key={item.title} className="flex items-start gap-4">
                    <div className="flex size-10 shrink-0 items-center justify-center rounded-lg border border-primary-foreground/20 bg-primary-foreground/10">
                      <Icon className="size-5 text-primary-foreground" />
                    </div>
                    <div className="flex flex-col gap-1">
                      <span className="font-semibold text-primary-foreground">
                        {item.title}
                      </span>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="text-sm text-primary-foreground/70 transition-colors hover:text-primary-foreground"
                        >
                          {item.content}
                        </a>
                      ) : (
                        <span className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
                          {item.content}
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="flex flex-col gap-2">
              <h1 className="font-semibold text-background">TAUTAN CEPAT</h1>
              <ul className="flex flex-col gap-2">
                <li>
                  <Link
                    to={"/"}
                    className="text-sm text-primary-foreground/70 hover:text-background"
                  >
                    E-Learning
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="text-sm text-primary-foreground/70 hover:text-background"
                  >
                    Bursa Kerja Khusus
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="text-sm text-primary-foreground/70 hover:text-background"
                  >
                    PJS Library
                  </Link>
                </li>
                <li>
                  <Link
                    to={"/"}
                    className="text-sm text-primary-foreground/70 hover:text-background"
                  >
                    SPMB
                  </Link>
                </li>
              </ul>
            </div>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4864.190986357477!2d110.36479467588632!3d-7.777067577158788!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a58373fffffff%3A0xa4ec1ca156555926!2sSMK%20Negeri%202%20Yogyakarta!5e1!3m2!1sid!2sid!4v1788875288738!5m2!1sid!2sid"
              width="450"
              height="300"
              allowFullScreen
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              className="rounded"
            ></iframe>
          </div>
          <div className="flex flex-col gap-3">
            <h1 className="font-semibold text-primary-foreground">
              Media Sosial
            </h1>

            <div className="flex gap-2">
              {socialMedia.map((item) => (
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
        <div className="flex items-center gap-2 border-t border-primary-foreground/40">
          <p className="text-sm py-5 text-primary-foreground/90">
            © 2026{" "}
            <span className="font-semibold text-primary-foreground">
              SMK Negeri 2 Yogyakarta
            </span>
            . All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

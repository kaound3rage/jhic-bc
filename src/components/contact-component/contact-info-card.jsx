import { Mail, MapPin, Phone } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const contactItems = [
  { label: "Alamat", value: "Jl. AM Sangaji No. 47, Cokrodiningratan, Jetis, Kota Yogyakarta, DI Yogyakarta 55233", icon: MapPin },
  { label: "Telepon", value: "(0274) 513490", href: "tel:+62274513490", icon: Phone },
  { label: "Email", value: "info@smk2-yk.sch.id", href: "mailto:info@smk2-yk.sch.id", icon: Mail },
];

function ContactInfoCard() {
  return (
    <Card className="py-5">
      <CardHeader className="border-b pb-4"><CardTitle>Informasi Kontak</CardTitle></CardHeader>
      <CardContent className="space-y-5 pt-5">
        {contactItems.map(({ label, value, href, icon: Icon }) => (
          <div key={label} className="flex items-start gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><Icon className="size-4" /></span>
            <div className="min-w-0">
              <p className="text-sm font-medium">{label}</p>
              {href ? <a href={href} className="text-sm leading-6 text-muted-foreground hover:text-primary">{value}</a> : <p className="text-sm leading-6 text-muted-foreground">{value}</p>}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

export default ContactInfoCard;

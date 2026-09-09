import { ArrowLeft, ArrowRight, CalendarDays, GraduationCap, Newspaper, Quote } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { principalMessage } from "@/data/principal-message";

function PrincipalMessagePage() {
  const message = principalMessage;

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8 max-w-3xl">
        <div className="mb-3 flex items-center gap-2 text-primary">
          <Quote className="size-5 fill-primary/15" />
          <span className="text-sm font-semibold tracking-wide uppercase">{message.category}</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{message.pageTitle}</h1>
        <p className="mt-3 text-muted-foreground">{message.subtitle}</p>
      </div>

      <div className="grid items-start gap-8 lg:grid-cols-[minmax(18rem,0.8fr)_minmax(0,1.2fr)]">
        <div className="lg:sticky lg:top-28">
          <Card className="relative overflow-visible py-0">
            <img src={message.photo} alt={message.name} className="h-105 w-full rounded-xl object-cover object-top" />
            <div className="absolute right-4 bottom-4 left-4 rounded-xl border bg-background/95 p-4 shadow-sm backdrop-blur sm:right-auto sm:left-6 sm:w-60">
              <div className="flex items-start gap-3">
                <span className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"><GraduationCap className="size-5" /></span>
                <div>
                  <p className="text-xs text-muted-foreground">{message.position}</p>
                  <p className="mt-1 font-semibold">{message.name}</p>
                </div>
              </div>
            </div>
          </Card>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild variant="outline"><Link to="/"><ArrowLeft /> Kembali ke Beranda</Link></Button>
            <Button asChild variant="ghost" className="text-primary"><Link to="/kontak">Hubungi Kami <ArrowRight /></Link></Button>
          </div>
        </div>

        <Card className="py-0">
          <CardContent className="p-6 sm:p-8">
            <div className="flex flex-wrap items-center gap-2 border-b pb-5">
              <Badge variant="outline" className="border-primary/30 bg-primary/10 text-primary">{message.school}</Badge>
              <Badge variant="secondary">{message.status}</Badge>
              <span className="ml-auto flex items-center gap-1.5 text-xs text-muted-foreground"><CalendarDays className="size-3.5" /> {message.publishedAt}</span>
            </div>

            <div className="mt-6 space-y-5 text-sm leading-7 text-muted-foreground sm:text-base">
              {message.paragraphs.map((paragraph, index) => (
                <p key={`${index}-${paragraph.slice(0, 20)}`} className={index === 0 || index === message.paragraphs.length - 1 ? "font-medium text-foreground" : ""}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8 rounded-xl border-l-4 border-primary bg-primary/5 p-5">
              <p className="text-sm text-muted-foreground">Hormat kami,</p>
              <p className="mt-3 font-semibold">{message.name}</p>
              <p className="text-sm text-muted-foreground">{message.position}</p>
            </div>

            <div className="mt-8 flex flex-col gap-3 border-t pt-6 sm:flex-row">
              <Button asChild><Link to="/berita"><Newspaper /> Berita Sekolah</Link></Button>
              <Button asChild variant="outline"><Link to="/kontak">Hubungi Kami <ArrowRight /></Link></Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
}

export default PrincipalMessagePage;
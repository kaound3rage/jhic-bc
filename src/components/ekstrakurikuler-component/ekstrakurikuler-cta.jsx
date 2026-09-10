import { Compass, MessageCircle, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function EkstrakurikulerCta() {
  return (
    <Card className="border-dashed bg-primary/5 py-0">
      <CardContent className="flex flex-col gap-5 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Badge variant="outline" className="border-primary/25 bg-background text-primary">
            <Compass />
            Panduan Bakat & Minat
          </Badge>
          <h2 className="mt-3 text-xl font-semibold tracking-tight sm:text-2xl">
            Bingung Memilih Ekstrakurikuler yang Cocok?
          </h2>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            Ikuti kuesioner minat & bakat siswa atau langsung hubungi pengurus OSIS Divisi Bakat & Minat untuk konsultasi ekskul paling pas buatmu.
          </p>
        </div>
        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
          <Button type="button"><Sparkles />Ikuti Tes Bakat Minat</Button>
          <Button type="button" variant="outline"><MessageCircle />Konsultasi ke Ruang OSIS</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default EkstrakurikulerCta;

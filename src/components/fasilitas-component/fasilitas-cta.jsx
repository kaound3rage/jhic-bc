import { AlertTriangle, Headset, Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

function FasilitasCta() {
  return (
    <Card className="overflow-hidden border-0 bg-gradient-to-r from-[#102d73] to-[#164f98] text-white shadow-lg">
      <CardContent className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="max-w-xl">
          <Badge className="border-white/15 bg-white/10 text-white">
            <AlertTriangle className="size-3.5" />
            Layanan Tanggap Sarpras
          </Badge>
          <h2 className="mt-4 text-2xl font-semibold tracking-tight sm:text-3xl">
            Menemukan Kerusakan Fasilitas?
          </h2>
          <p className="mt-2 text-sm leading-6 text-blue-100">
            Bantu kami menjaga kenyamanan lingkungan sekolah bersama. Laporkan
            kendala elektronik, AC, bangku, atau fasilitas umum lainnya secara
            cepat dan terdata.
          </p>
        </div>

        <div className="flex flex-col gap-2 sm:flex-row lg:flex-col xl:flex-row">
          <Button
            render={<Link to="/sigap/lapor-fasilitas" />}
            className="bg-amber-400 text-slate-950 hover:bg-amber-300"
          >
            <Megaphone className="size-4" />
            Lapor Kerusakan Sekarang
          </Button>
          <Button
            variant="outline"
            render={<Link to="/kontak" />}
            className="border-white/30 bg-white/5 text-white hover:bg-white/15 hover:text-white"
          >
            <Headset className="size-4" />
            Hubungi Tim Sarpras
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default FasilitasCta;

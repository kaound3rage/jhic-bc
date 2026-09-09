import { Clock3 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const serviceHours = [
  { day: "Senin – Jumat", time: "07.00 – 15.30 WIB" },
  { day: "Sabtu", time: "07.00 – 12.00 WIB" },
  { day: "Minggu / Hari Libur", time: "Tutup" },
];

function ContactHoursCard() {
  return (
    <Card className="py-5">
      <CardHeader className="border-b pb-4"><CardTitle className="flex items-center gap-2"><Clock3 className="size-4 text-primary" /> Jam Layanan</CardTitle></CardHeader>
      <CardContent className="pt-3">
        <dl className="divide-y">
          {serviceHours.map((item) => <div key={item.day} className="flex items-center justify-between gap-4 py-3 text-sm"><dt className="text-muted-foreground">{item.day}</dt><dd className="text-right font-medium">{item.time}</dd></div>)}
        </dl>
      </CardContent>
    </Card>
  );
}

export default ContactHoursCard;

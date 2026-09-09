import { useMemo, useState } from "react";
import { CalendarDays, Clock3, MapPin, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Breadcrumb from "@/components/breadcrumb";

// Replace these fallback values with GET /rooms, /rooms/:id/schedule, and
// /settings/operational-hours when the scheduling API is available.
const rooms = [
  { id: "rapat-3", name: "Ruang Rapat 3", position: "top-[17%] left-[15%]", size: "w-[22%] h-[26%]" },
  { id: "rapat-2", name: "Ruang Rapat 2", position: "top-[17%] left-[40%]", size: "w-[18%] h-[26%]" },
  { id: "rapat-1", name: "Ruang Rapat 1", position: "top-[17%] right-[15%]", size: "w-[22%] h-[26%]" },
  { id: "aula", name: "Aula", position: "bottom-[15%] left-[15%]", size: "w-[30%] h-[27%]" },
  { id: "mini-teater", name: "Mini Teater", position: "bottom-[15%] left-[48%]", size: "w-[20%] h-[27%]" },
  { id: "basket", name: "Lapangan Basket", position: "bottom-[15%] right-[15%]", size: "w-[14%] h-[27%]" },
  { id: "seni", name: "Ruang Seni", position: "bottom-[4%] right-[15%]", size: "w-[14%] h-[8%]" },
];

const schedules = {
  "rapat-3": [
    { start: 8, end: 10, title: "Work Shop Guru & Karyawan", pic: "Ibu Niken" },
    { start: 13, end: 15, title: "Rapat Koordinasi Kurikulum", pic: "Bapak Ari" },
  ],
  aula: [{ start: 9, end: 12, title: "Penerimaan Siswa Baru", pic: "Panitia PPDB" }],
  "mini-teater": [{ start: 11, end: 13, title: "Pemutaran Film Edukasi", pic: "OSIS" }],
  basket: [{ start: 14, end: 16, title: "Latihan Ekstrakurikuler Basket", pic: "Pak Dimas" }],
};

const operationalHours = { open: 7, close: 16 };
const toInputDate = (date) => date.toISOString().slice(0, 10);
const formatDate = (value) => new Intl.DateTimeFormat("id-ID", {
  weekday: "long", day: "numeric", month: "long", year: "numeric",
}).format(new Date(`${value}T00:00:00`));
const time = (hour) => `${String(hour).padStart(2, "0")}.00`;

function ScheduleRoom() {
  const [selectedRoom, setSelectedRoom] = useState(rooms[0].id);
  const [selectedDate, setSelectedDate] = useState(toInputDate(new Date()));
  const [selectedBooking, setSelectedBooking] = useState(null);
  const bookings = schedules[selectedRoom] ?? [];
  const slots = useMemo(() => Array.from(
    { length: operationalHours.close - operationalHours.open },
    (_, index) => operationalHours.open + index,
  ), []);

  const onSlotClick = (hour) => {
    // Hook this handler to the booking form/modal when it is implemented.
    console.info("Create booking", { roomId: selectedRoom, date: selectedDate, hour });
  };

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">Jadwal Ruangan</h1>
        <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
      </div>

      <Card className="mb-6 py-5">
        <CardHeader className="border-b pb-4">
          <CardTitle className="flex items-center gap-2"><MapPin className="size-4 text-primary" />Denah Sekolah</CardTitle>
          <p className="text-sm text-muted-foreground">Pilih ruangan pada denah untuk melihat jadwalnya.</p>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="relative aspect-[16/8] min-h-65 overflow-hidden rounded-lg border bg-muted/45 p-4 sm:p-6">
            <div className="absolute inset-x-[7%] top-1/2 h-3 -translate-y-1/2 rounded bg-background/80" />
            <div className="absolute inset-y-[8%] left-1/2 w-3 -translate-x-1/2 rounded bg-background/80" />
            <span className="absolute left-4 top-3 text-xs font-medium tracking-wide text-muted-foreground uppercase">Denah Sekolah</span>
            {rooms.map((room) => (
              <button key={room.id} type="button" aria-pressed={selectedRoom === room.id}
                onClick={() => setSelectedRoom(room.id)}
                className={`absolute ${room.position} ${room.size} flex items-center justify-center rounded-md border px-1 text-center text-[10px] font-medium leading-tight transition sm:text-xs ${selectedRoom === room.id ? "border-primary bg-primary text-primary-foreground shadow-sm" : "border-border bg-background/90 text-foreground hover:border-primary hover:bg-primary/10"}`}>
                {room.name}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <label className="block text-sm font-medium" htmlFor="schedule-date">
          Pilih Tanggal
          <span className="mt-2 flex h-10 w-full min-w-70 items-center justify-between rounded-lg border bg-background px-3 text-sm font-normal sm:w-82">
            {formatDate(selectedDate)} <CalendarDays className="size-4 text-muted-foreground" />
          </span>
          <input id="schedule-date" className="sr-only" type="date" value={selectedDate} onChange={(event) => setSelectedDate(event.target.value)} />
        </label>
        <span className="text-sm text-muted-foreground">Klik tanggal untuk mengubah jadwal</span>
      </div>

      <div className="mb-6 -mx-4 overflow-x-auto px-4 sm:mx-0 sm:px-0" role="tablist" aria-label="Daftar ruangan">
        <div className="flex min-w-max gap-2 border-b pb-3">
          {rooms.map((room) => <Button key={room.id} role="tab" aria-selected={selectedRoom === room.id}
            variant={selectedRoom === room.id ? "default" : "outline"} onClick={() => setSelectedRoom(room.id)} className="h-9 px-4">
            {room.name}
          </Button>)}
        </div>
      </div>

      <Card className="py-5">
        <CardHeader className="flex flex-row items-center justify-between border-b pb-4">
          <div><CardTitle>Timeline Harian</CardTitle><p className="mt-1 text-sm text-muted-foreground">{rooms.find((room) => room.id === selectedRoom)?.name} · {formatDate(selectedDate)}</p></div>
          <div className="hidden items-center gap-2 text-right text-sm sm:flex"><Clock3 className="size-4 text-primary" /><span className="text-muted-foreground">Jam Operasional</span><span className="font-medium">{time(operationalHours.open)} - {time(operationalHours.close)}</span></div>
        </CardHeader>
        <CardContent className="pt-5">
          <div className="space-y-2">
            {slots.map((hour) => {
              const booking = bookings.find((item) => hour >= item.start && hour < item.end);
              const firstSlot = booking?.start === hour;
              return <div key={hour} className="grid grid-cols-[3.5rem_1fr] gap-3 sm:grid-cols-[5rem_1fr] sm:gap-4">
                <div className="pt-3 text-sm font-medium text-muted-foreground">{String(hour).padStart(2, "0")}:00</div>
                {booking ? <button type="button" onClick={() => setSelectedBooking(booking)} className={`min-h-13 rounded-lg border border-primary/25 bg-primary/10 px-4 text-left transition hover:bg-primary/15 ${firstSlot ? "rounded-b-none" : "rounded-t-none border-t-0"} ${hour === booking.end - 1 ? "rounded-b-lg" : ""}`}>
                  {firstSlot && <span className="flex flex-col justify-between gap-1 sm:flex-row sm:items-center"><span className="font-medium text-foreground">{booking.title}</span><span className="text-xs text-muted-foreground">{time(booking.start)} - {time(booking.end)}</span></span>}
                </button> : <button type="button" onClick={() => onSlotClick(hour)} className="min-h-13 rounded-lg border border-dashed px-4 text-left text-sm text-muted-foreground transition hover:border-primary hover:bg-primary/5 hover:text-primary">Tersedia</button>}
              </div>;
            })}
          </div>
        </CardContent>
      </Card>

      {selectedBooking && <div className="fixed inset-0 z-60 flex items-end bg-foreground/25 p-4 sm:items-center sm:justify-center" role="presentation" onMouseDown={() => setSelectedBooking(null)}>
        <div role="dialog" aria-modal="true" aria-labelledby="booking-title" onMouseDown={(event) => event.stopPropagation()} className="w-full max-w-md rounded-xl bg-card p-5 shadow-xl">
          <div className="flex items-start justify-between gap-4"><div><h2 id="booking-title" className="font-semibold">{selectedBooking.title}</h2><p className="mt-1 text-sm text-muted-foreground">{time(selectedBooking.start)} - {time(selectedBooking.end)}</p></div><Button variant="ghost" size="icon" aria-label="Tutup detail" onClick={() => setSelectedBooking(null)}><X /></Button></div>
          <div className="mt-5 rounded-lg bg-muted p-4 text-sm"><p><span className="text-muted-foreground">Ruangan: </span>{rooms.find((room) => room.id === selectedRoom)?.name}</p><p className="mt-2"><span className="text-muted-foreground">PIC: </span>{selectedBooking.pic}</p><p className="mt-2"><span className="text-muted-foreground">Tanggal: </span>{formatDate(selectedDate)}</p></div>
        </div>
      </div>}
    </section>
  );
}

export default ScheduleRoom;

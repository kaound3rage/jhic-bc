import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ClipboardList,
  ClipboardCheck,
  Eye,
  FileQuestion,
  MapPin,
  Plus,
  Search,
  Wrench,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Breadcrumb from "@/components/breadcrumb";
import { reports, processSteps, statusMeta } from "./data-sigap";

const initials = (name) =>
  name
    .split(" ")
    .map((word) => word.charAt(0))
    .slice(0, 2)
    .join("")
    .toUpperCase();

const formatDate = (value) =>
  new Intl.DateTimeFormat("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));

function StatusBadge({ status }) {
  const meta = statusMeta[status] ?? { label: status, color: "muted" };
  const styles = {
    "status-success":
      "border-status-success/30 bg-status-success/10 text-status-success",
    "status-process":
      "border-status-process/40 bg-status-process/15 text-[#8a5a0e]",
    "status-pending":
      "border-status-pending/30 bg-status-pending/10 text-status-pending",
  };
  return (
    <Badge
      variant="outline"
      className={`w-fit whitespace-nowrap rounded-full border px-2 py-1 text-xs font-medium ${
        styles[meta.color] ?? "border-border bg-muted text-muted-foreground"
      }`}
    >
      <span
        aria-hidden="true"
        className="mr-1 inline-block size-1.5 shrink-0 rounded-full bg-current"
      />
      {meta.label}
    </Badge>
  );
}

function Sigap() {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return reports;
    return reports.filter(
      (report) =>
        report.pelapor.toLowerCase().includes(q) ||
        report.isi.toLowerCase().includes(q) ||
        report.lokasi.toLowerCase().includes(q),
    );
  }, [query]);

  const visible = filtered.slice(0, 5);
  const hasMore = filtered.length > visible.length;

  const onViewReport = (id) => {
    // Hook to the report detail page when it is implemented.
    console.info("View report", id);
  };

  return (
    <section className="w-full px-4 py-8 sm:px-6 lg:px-0 lg:py-12">
      <div className="mb-8">
        <Breadcrumb />
        <h1 className="text-2xl font-semibold tracking-tight sm:text-3xl">
          SIGAP
        </h1>
        <p className="text-sm text-muted-foreground">
          Sistem Informasi Gangguan &amp; Perbaikan Sarana Prasarana
        </p>
        <div className="mt-3 h-1 w-16 rounded-full bg-primary" />
      </div>

      <Card className="mb-6 overflow-hidden py-0">
        <div className="flex flex-col gap-6 p-6 sm:p-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="max-w-xl">
            <h2 className="text-xl font-semibold text-foreground sm:text-2xl">
              Temukan kerusakan fasilitas? Laporkan sekarang.
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Bantu perbaikan berjalan cepat dengan melapor lewat satu langkah
              mudah. Tim SIGAP akan menindaklanjuti laporanmu.
            </p>
            <Button
              size="lg"
              render={<Link to="/lapor-fasilitas" />}
              className="mt-5"
            >
              <Plus /> Buat Laporan
            </Button>
          </div>

          <div
            aria-hidden="true"
            className="w-full max-w-64 shrink-0 rounded-xl border bg-card p-4 lg:w-64"
          >
            <div className="mb-3 flex items-center justify-between">
              <span className="font-mono text-[10px] font-semibold tracking-widest text-muted-foreground">
                SR-2024-006
              </span>
              <span className="flex items-center gap-1.5 text-[10px] font-medium text-status-process">
                <span className="size-1.5 rounded-full bg-current" /> Diproses
              </span>
            </div>
            <div className="rounded-lg border bg-background p-3">
              <p className="text-xs font-medium text-foreground">
                Lampu kelas mati
              </p>
              <p className="mt-1 flex items-center gap-1 text-[10px] text-muted-foreground">
                <MapPin className="size-3" /> Ruang XII DKV 2
              </p>
            </div>
            <div className="mt-3 flex items-center justify-between text-[10px] text-muted-foreground">
              <span>24 Jun 2024</span>
              <Wrench className="size-3.5 text-primary" />
            </div>
          </div>
        </div>
      </Card>

      <Card className="mb-6 py-5">
        <CardContent className="pt-0">
          <ol className="flex flex-col gap-0 lg:flex-row">
            {processSteps.map((step, index) => {
              const isLast = index === processSteps.length - 1;
              return (
                <li key={step.title} className="relative flex flex-1 gap-4 lg:flex-col lg:gap-3">
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute top-6 left-6 h-[calc(100%-3rem)] w-px bg-border lg:top-6 lg:left-1/2 lg:h-px lg:w-[calc(100%-3rem)]"
                    />
                  )}
                  <span className="relative z-10 flex size-12 shrink-0 items-center justify-center rounded-full border-2 border-primary bg-primary/10 font-mono text-sm font-semibold text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="pb-6 lg:pb-0">
                    <h3 className="text-sm font-semibold text-foreground">
                      {step.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {step.deskripsi}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </CardContent>
      </Card>

      <Card className="py-5">
        <CardHeader className="flex flex-col gap-4 border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle className="flex items-center gap-2">
              <ClipboardList className="size-4 text-primary" />
              Laporan Terkini
            </CardTitle>
            <p className="mt-1 text-sm text-muted-foreground">
              Pantau status laporan yang telah disampaikan
            </p>
          </div>
          <div className="relative w-full sm:w-72">
            <Search
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-2.5 size-4 -translate-y-1/2 text-muted-foreground"
            />
            <label htmlFor="search-report" className="sr-only">
              Cari laporan
            </label>
            <Input
              id="search-report"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Cari laporan..."
              className="h-9 pl-8"
            />
          </div>
        </CardHeader>

        <CardContent className="pt-0">
          {visible.length === 0 ? (
            <div className="flex flex-col items-center justify-center gap-3 py-14 text-center">
              <span className="flex size-14 items-center justify-center rounded-full bg-muted">
                <FileQuestion className="size-7 text-muted-foreground" />
              </span>
              <div>
                <p className="font-medium text-foreground">
                  Belum ada laporan
                </p>
                <p className="mt-1 text-sm text-muted-foreground">
                  {query
                    ? "Tidak ada laporan yang cocok dengan pencarianmu."
                    : "Laporan kerusakan yang masuk akan tampil di sini."}
                </p>
              </div>
              {!query && (
                <Button
                  size="sm"
                  variant="outline"
                  render={<Link to="/lapor-fasilitas" />}
                  className="mt-1 rounded-lg"
                >
                  <Plus /> Buat Laporan
                </Button>
              )}
            </div>
          ) : (
            <>
              <ul className="divide-y">
                {visible.map((report, index) => {
                  const meta = statusMeta[report.status];
                  return (
                    <li
                      key={report.id}
                      className={`flex flex-col gap-3 border-l-2 py-4 pl-4 sm:flex-row sm:items-center sm:gap-4 lg:grid lg:grid-cols-[4rem_1.4fr_1fr_2fr_1.4fr_1fr_3.5rem] lg:items-center lg:gap-3 ${borderFor(meta.color)}`}
                    >
                      <span className="font-mono text-xs font-medium text-muted-foreground">
                        {String(index + 1).padStart(2, "0")}
                      </span>

                      <div className="flex items-center gap-3">
                        <Avatar className="size-8">
                          <AvatarFallback className="bg-muted text-xs">
                            {initials(report.pelapor)}
                          </AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium text-foreground">
                          {report.pelapor}
                        </span>
                      </div>

                      <span className="font-mono text-xs text-muted-foreground">
                        {formatDate(report.tanggal)}
                      </span>

                      <p className="line-clamp-1 text-sm text-foreground">
                        {report.isi}
                      </p>

                      <span className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="size-3.5 shrink-0" />
                        {report.lokasi}
                      </span>

                      <StatusBadge status={report.status} />

                      <div className="flex items-center gap-1 sm:justify-end">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Lihat detail laporan ${report.id}`}
                          onClick={() => onViewReport(report.id)}
                        >
                          <Eye />
                        </Button>
                      </div>
                    </li>
                  );
                })}
              </ul>

              {hasMore && (
                <div className="mt-4 flex justify-center border-t pt-4">
                  <Button
                    variant="ghost"
                    className="gap-1 text-primary"
                  >
                    <ClipboardCheck className="size-4" />
                    Lihat semua laporan
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </section>
  );
}

function borderFor(color) {
  if (color === "status-success") return "border-status-success";
  if (color === "status-process") return "border-status-process";
  if (color === "status-pending") return "border-status-pending";
  return "border-border";
}

export default Sigap;

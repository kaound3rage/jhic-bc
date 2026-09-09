import { useCallback, useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  CloudUpload,
  Send,
  ImagePlus,
  X,
  ClipboardCheck,
  SearchCheck,
  Wrench,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Field, FieldError } from "@/components/ui/field";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import { kelasOptions, kategoriOptions } from "./data-master";

const CLASSES_API = "/api/classes";
const CATEGORIES_API = "/api/facility-categories";
const REPORTS_API = "/api/facility-reports";
const UPLOADS_API = "/api/uploads";

const MAX_FILES = 3;
const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ACCEPTED_TYPES = ["image/jpeg", "image/png"];

const TINGKAT_URGENSI = [
  { value: "rendah", label: "Rendah" },
  { value: "sedang", label: "Sedang" },
  { value: "tinggi", label: "Tinggi" },
];

const PROSEDUR = [
  {
    icon: ClipboardCheck,
    title: "Laporan Diterima",
    deskripsi: "Tim OSIS akan meninjau laporan yang masuk.",
  },
  {
    icon: SearchCheck,
    title: "Verifikasi & Eskalasi",
    deskripsi: "Pengecekan ke lokasi dan pelaporan ke pihak sekolah.",
  },
  {
    icon: Wrench,
    title: "Proses Perbaikan",
    deskripsi: "Pihak sarpras sekolah melakukan perbaikan.",
  },
];

const initialForm = {
  namaLengkap: "",
  kelas: "",
  kontak: "",
  kategoriFasilitas: "",
  lokasi: "",
  deskripsi: "",
  tingkatUrgensi: "rendah",
};

function isEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isPhone(value) {
  const digits = value.replace(/[^0-9]/g, "");
  return digits.length >= 10 && digits.length <= 15;
}

function validateForm(form) {
  const errors = {};

  if (!form.namaLengkap.trim()) {
    errors.namaLengkap = "Nama Lengkap wajib diisi.";
  }

  if (!form.kelas) {
    errors.kelas = "Pilih kelas terlebih dahulu.";
  }

  if (!form.kontak.trim()) {
    errors.kontak = "Kontak wajib diisi.";
  } else if (!isEmail(form.kontak.trim()) && !isPhone(form.kontak.trim())) {
    errors.kontak = "Isi dengan format email atau nomor telepon yang valid.";
  }

  if (!form.kategoriFasilitas) {
    errors.kategoriFasilitas = "Pilih kategori fasilitas.";
  }

  if (!form.lokasi.trim()) {
    errors.lokasi = "Lokasi/Nomor ruangan wajib diisi.";
  }

  if (!form.deskripsi.trim()) {
    errors.deskripsi = "Deskripsi kerusakan wajib diisi.";
  }

  if (!form.tingkatUrgensi) {
    errors.tingkatUrgensi = "Pilih tingkat urgensi.";
  }

  return errors;
}

function readFileAsDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

function FacilityReport() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [classes, setClasses] = useState(kelasOptions);
  const [categories, setCategories] = useState(kategoriOptions);
  const [photos, setPhotos] = useState([]);
  const [photoError, setPhotoError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const fileInputRef = useRef(null);

  useEffect(() => {
    let active = true;
    async function loadClasses() {
      try {
        const res = await fetch(CLASSES_API);
        if (!res.ok) return;
        const data = await res.json();
        if (active && Array.isArray(data) && data.length) {
          setClasses(data);
        }
      } catch {
        /* fallback ke data statis */
      }
    }
    loadClasses();
    return () => {
      active = false;
    };
  }, []);

  useEffect(() => {
    let active = true;
    async function loadCategories() {
      try {
        const res = await fetch(CATEGORIES_API);
        if (!res.ok) return;
        const data = await res.json();
        if (active && Array.isArray(data) && data.length) {
          setCategories(data);
        }
      } catch {
        /* fallback ke data statis */
      }
    }
    loadCategories();
    return () => {
      active = false;
    };
  }, []);

  const setField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  };

  const validateFiles = useCallback((fileList) => {
    const incoming = Array.from(fileList);
    const next = [];
    let error = "";

    for (const file of incoming) {
      if (!ACCEPTED_TYPES.includes(file.type)) {
        error = "Hanya file berformat JPG/PNG yang diperbolehkan.";
        continue;
      }
      if (file.size > MAX_FILE_SIZE) {
        error = "Ukuran file melebihi batas maksimal 5MB.";
        continue;
      }
      next.push(file);
    }

    return { accepted: next, error };
  }, []);

  const addFiles = useCallback(
    async (fileList) => {
      const { accepted, error } = validateFiles(fileList);

      if (error) {
        setPhotoError(error);
      } else if (accepted.length) {
        setPhotoError("");
      }

      const remainingSlots = MAX_FILES - photos.length;
      const toAdd = accepted.slice(0, remainingSlots);

      if (accepted.length > remainingSlots) {
        setPhotoError(`Maksimal ${MAX_FILES} foto yang dapat diunggah.`);
      }

      for (const file of toAdd) {
        const preview = await readFileAsDataUrl(file);
        setPhotos((prev) => [...prev, { file, preview }]);
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    [photos.length, validateFiles]
  );

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
    setPhotoError("");
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    if (photos.length >= MAX_FILES) return;
    addFiles(e.dataTransfer.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const nextErrors = validateForm(form);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.error("Mohon lengkapi form yang masih kosong atau tidak valid.");
      return;
    }

    setSubmitting(true);
    try {
      let fotoUrls = [];

      if (photos.length) {
        const uploadResults = await Promise.all(
          photos.map(async ({ file }) => {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch(UPLOADS_API, { method: "POST", body: fd });
            if (!res.ok) {
              throw new Error("Upload foto gagal.");
            }
            const data = await res.json();
            return data?.url ?? data?.fileUrl ?? null;
          })
        );
        fotoUrls = uploadResults.filter(Boolean);
      }

      const res = await fetch(REPORTS_API, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          namaLengkap: form.namaLengkap.trim(),
          kelas: form.kelas,
          kontak: form.kontak.trim(),
          kategoriFasilitas: form.kategoriFasilitas,
          lokasi: form.lokasi.trim(),
          deskripsi: form.deskripsi.trim(),
          tingkatUrgensi: form.tingkatUrgensi,
          fotoUrls,
        }),
      });

      if (!res.ok) {
        throw new Error(`Gagal mengirim laporan (${res.status}).`);
      }

      toast.success("Laporan berhasil dikirim. Terima kasih!");
      setForm(initialForm);
      setPhotos([]);
      setPhotoError("");
      setErrors({});
      if (fileInputRef.current) fileInputRef.current.value = "";
    } catch (err) {
      toast.error(
        err?.message || "Terjadi kesalahan saat mengirim laporan. Coba lagi."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <div className="mb-10 flex flex-col items-center gap-3 text-center">
        <h1 className="font-heading text-3xl font-bold text-foreground md:text-4xl">
          Lapor Kerusakan Fasilitas
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Bantu kami menjaga kenyamanan sekolah dengan melaporkan kerusakan
          fasilitas atau sarana prasarana yang kamu temukan.
        </p>
      </div>

      <div className="grid w-full grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_2fr] lg:gap-8">
        <Card className="order-2 lg:order-1 lg:sticky lg:top-24">
          <CardContent className="flex flex-col gap-4">
            <div className="font-heading text-base font-medium text-foreground">
              Prosedur Perbaikan
            </div>
            <ol className="flex flex-col gap-0">
              {PROSEDUR.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === PROSEDUR.length - 1;
                return (
                  <li key={step.title} className="relative flex gap-3 pb-6">
                    {!isLast && (
                      <span
                        aria-hidden="true"
                        className="absolute top-8 left-4 h-[calc(100%-2rem)] w-px bg-border"
                      />
                    )}
                    <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                      <Icon className="size-4" />
                    </span>
                    <div className="flex flex-col gap-0.5 pt-0.5">
                      <span className="text-sm font-semibold text-foreground">
                        {step.title}
                      </span>
                      <p className="text-sm text-muted-foreground">
                        {step.deskripsi}
                      </p>
                    </div>
                  </li>
                );
              })}
            </ol>
          </CardContent>
        </Card>

        <Card className="order-1 lg:order-2">
          <form onSubmit={handleSubmit} noValidate>
            <CardContent className="flex flex-col gap-6">
              <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    Data Pelapor
                  </h2>
                  <Separator />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field>
                    <Label htmlFor="namaLengkap">Nama Lengkap</Label>
                    <Input
                      id="namaLengkap"
                      placeholder="Masukkan Nama Lengkap"
                      value={form.namaLengkap}
                      onChange={(e) => setField("namaLengkap", e.target.value)}
                      aria-invalid={!!errors.namaLengkap}
                      aria-describedby={
                        errors.namaLengkap ? "namaLengkap-error" : undefined
                      }
                    />
                    {errors.namaLengkap && (
                      <FieldError id="namaLengkap-error">
                        {errors.namaLengkap}
                      </FieldError>
                    )}
                  </Field>

                  <Field>
                    <Label htmlFor="kelas">Kelas</Label>
                    <Select
                      value={form.kelas}
                      onValueChange={(value) => setField("kelas", value)}
                    >
                      <SelectTrigger
                        id="kelas"
                        aria-invalid={!!errors.kelas}
                        aria-describedby={
                          errors.kelas ? "kelas-error" : undefined
                        }
                      >
                        <SelectValue placeholder="Pilih Kelas" />
                      </SelectTrigger>
                      <SelectContent>
                        {classes.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.kelas && (
                      <FieldError id="kelas-error">{errors.kelas}</FieldError>
                    )}
                  </Field>
                </div>

                <Field>
                  <Label htmlFor="kontak">Kontak (WhatsApp/Email)</Label>
                  <Input
                    id="kontak"
                    placeholder="Masukkan nomor WA atau Email aktif"
                    value={form.kontak}
                    onChange={(e) => setField("kontak", e.target.value)}
                    aria-invalid={!!errors.kontak}
                    aria-describedby={errors.kontak ? "kontak-error" : undefined}
                  />
                  {errors.kontak && (
                    <FieldError id="kontak-error">{errors.kontak}</FieldError>
                  )}
                </Field>
              </section>

              <Separator />

              <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    Detail Kerusakan
                  </h2>
                  <Separator />
                </div>

                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field>
                    <Label htmlFor="kategoriFasilitas">
                      Kategori Fasilitas
                    </Label>
                    <Select
                      value={form.kategoriFasilitas}
                      onValueChange={(value) =>
                        setField("kategoriFasilitas", value)
                      }
                    >
                      <SelectTrigger
                        id="kategoriFasilitas"
                        aria-invalid={!!errors.kategoriFasilitas}
                        aria-describedby={
                          errors.kategoriFasilitas
                            ? "kategoriFasilitas-error"
                            : undefined
                        }
                      >
                        <SelectValue placeholder="Pilih Kategori" />
                      </SelectTrigger>
                      <SelectContent>
                        {categories.map((item) => (
                          <SelectItem key={item.id} value={item.id}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    {errors.kategoriFasilitas && (
                      <FieldError id="kategoriFasilitas-error">
                        {errors.kategoriFasilitas}
                      </FieldError>
                    )}
                  </Field>

                  <Field>
                    <Label htmlFor="lokasi">Lokasi/Nomor Ruangan</Label>
                    <Input
                      id="lokasi"
                      placeholder="Contoh: Toilet lantai 2 gedung D"
                      value={form.lokasi}
                      onChange={(e) => setField("lokasi", e.target.value)}
                      aria-invalid={!!errors.lokasi}
                      aria-describedby={errors.lokasi ? "lokasi-error" : undefined}
                    />
                    {errors.lokasi && (
                      <FieldError id="lokasi-error">{errors.lokasi}</FieldError>
                    )}
                  </Field>
                </div>

                <Field>
                  <Label htmlFor="deskripsi">Deskripsi Kerusakan</Label>
                  <Textarea
                    id="deskripsi"
                    rows={4}
                    placeholder="Jelaskan secara detail kerusakan yang terjadi..."
                    value={form.deskripsi}
                    onChange={(e) => setField("deskripsi", e.target.value)}
                    aria-invalid={!!errors.deskripsi}
                    aria-describedby={
                      errors.deskripsi ? "deskripsi-error" : undefined
                    }
                  />
                  {errors.deskripsi && (
                    <FieldError id="deskripsi-error">
                      {errors.deskripsi}
                    </FieldError>
                  )}
                </Field>

                <Field>
                  <span
                    id="tingkatUrgensi-label"
                    className="text-sm font-medium leading-snug"
                  >
                    Tingkat Urgensi
                  </span>
                  <RadioGroup
                    value={form.tingkatUrgensi}
                    onValueChange={(value) =>
                      setField("tingkatUrgensi", value)
                    }
                    aria-labelledby="tingkatUrgensi-label"
                    className="flex flex-row flex-wrap gap-3"
                  >
                    {TINGKAT_URGENSI.map((opt) => (
                      <label
                        key={opt.value}
                        className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-input px-4 py-2 text-sm font-medium text-foreground transition-colors has-[:checked]:border-primary has-[:checked]:bg-primary/10 has-[:checked]:text-primary"
                      >
                        <RadioGroupItem value={opt.value} />
                        {opt.label}
                      </label>
                    ))}
                  </RadioGroup>
                </Field>
              </section>

              <Separator />

              <section className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    Bukti Foto
                  </h2>
                  <Separator />
                </div>

                <div
                  role="button"
                  tabIndex={0}
                  onClick={() => photos.length < MAX_FILES && fileInputRef.current?.click()}
                  onKeyDown={(e) => {
                    if (
                      (e.key === "Enter" || e.key === " ") &&
                      photos.length < MAX_FILES
                    ) {
                      e.preventDefault();
                      fileInputRef.current?.click();
                    }
                  }}
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragOver(true);
                  }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-8 text-center transition-colors focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50 ${
                    isDragOver
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50 hover:bg-muted/50"
                  }`}
                >
                  <CloudUpload className="size-10 text-muted-foreground" />
                  <span className="text-sm font-semibold text-foreground">
                    Upload Foto Kerusakan
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Klik atau drag &amp; drop foto disini (Maks. 5MB, format
                    JPG/PNG)
                  </span>
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,image/jpeg,image/png"
                  multiple
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files?.length) addFiles(e.target.files);
                  }}
                />

                {photoError && (
                  <FieldError role="alert">{photoError}</FieldError>
                )}

                {photos.length > 0 && (
                  <div className="grid grid-cols-3 gap-3">
                    {photos.map((photo, index) => (
                      <div
                        key={index}
                        className="group relative aspect-square overflow-hidden rounded-lg ring-1 ring-foreground/10"
                      >
                        <img
                          src={photo.preview}
                          alt={`Pratinjau foto ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                        <button
                          type="button"
                          onClick={() => removePhoto(index)}
                          aria-label={`Hapus foto ${index + 1}`}
                          className="absolute top-1 right-1 flex size-6 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
                        >
                          <X className="size-3.5" />
                        </button>
                      </div>
                    ))}
                    {photos.length < MAX_FILES && (
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        className="flex aspect-square items-center justify-center rounded-lg border-2 border-dashed border-border text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
                        aria-label="Tambah foto"
                      >
                        <ImagePlus className="size-5" />
                      </button>
                    )}
                  </div>
                )}
              </section>

              <Separator />

              <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={submitting}>
                  {submitting ? (
                    <>
                      <Loader2 className="animate-spin" />
                      Mengirim...
                    </>
                  ) : (
                    <>
                      <Send />
                      Kirim Laporan
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </form>
        </Card>
      </div>
    </div>
  );
}

export default FacilityReport;

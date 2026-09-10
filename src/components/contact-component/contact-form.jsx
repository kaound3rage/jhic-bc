import { useState } from "react";
import { LoaderCircle, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const initialForm = {
  name: "",
  email: "",
  phone: "",
  purpose: "",
  institution: "",
  subject: "",
  message: "",
};

function FormField({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  required,
  placeholder,
}) {
  const id = `contact-${name}`;
  return (
    <div>
      <Label htmlFor={id} className="mb-1.5 block text-sm font-medium">
        {label} {required && <span className="text-destructive">*</span>}
      </Label>
      <Input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? `${id}-error` : undefined}
        className={`h-10 ${error ? "border-destructive" : ""}`}
        placeholder={placeholder}
      />
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}

function ContactForm() {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateField = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
    setErrors((current) => ({ ...current, [name]: undefined }));
  };

  const validate = () => {
    const nextErrors = {};
    if (!form.name.trim()) nextErrors.name = "Nama lengkap wajib diisi.";
    if (!form.email.trim()) nextErrors.email = "Email wajib diisi.";
    else if (!/^\S+@\S+\.\S+$/.test(form.email))
      nextErrors.email = "Masukkan alamat email yang valid.";
    if (!form.purpose) nextErrors.purpose = "Keperluan wajib dipilih.";
    if (!form.message.trim()) nextErrors.message = "Pesan wajib diisi.";
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!validate()) return;
    setIsSubmitting(true);
    try {
      // Ganti blok ini dengan request ke endpoint kontak saat API tersedia.
      await new Promise((resolve) => setTimeout(resolve, 800));
      console.log("Contact form submission", form);
      toast.success("Pesan berhasil dikirim", {
        description: "Tim kami akan menghubungi Anda sesegera mungkin.",
      });
      setForm(initialForm);
    } catch (error) {
      console.error("Contact form submission failed", error);
      toast.error("Pesan belum dapat dikirim", {
        description: "Silakan coba lagi beberapa saat lagi.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="py-5">
      <CardHeader className="border-b pb-4">
        <CardTitle>Kirim Pesan</CardTitle>
        <p className="text-sm text-muted-foreground">
          Ceritakan kebutuhan atau pertanyaan Anda kepada kami.
        </p>
      </CardHeader>
      <CardContent className="pt-5">
        <form noValidate onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Nama Lengkap"
              name="name"
              value={form.name}
              onChange={updateField}
              error={errors.name}
              required
            />
            <FormField
              label="Email"
              name="email"
              type="email"
              value={form.email}
              onChange={updateField}
              error={errors.email}
              required
            />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="No. Telepon"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={updateField}
            />
            <div>
              <Label
                htmlFor="contact-purpose"
                className="mb-1.5 block text-sm font-medium"
              >
                Keperluan <span className="text-destructive">*</span>
              </Label>
              <Select
                value={form.purpose}
                onValueChange={(value) => {
                  setForm((current) => ({ ...current, purpose: value }));
                  setErrors((current) => ({ ...current, purpose: undefined }));
                }}
              >
                <SelectTrigger
                  id="contact-purpose"
                  className="h-10 w-full"
                  aria-invalid={Boolean(errors.purpose)}
                  aria-describedby={
                    errors.purpose ? "contact-purpose-error" : undefined
                  }
                >
                  <SelectValue placeholder="Pilih keperluan" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Informasi Sekolah">Informasi Sekolah</SelectItem>
                  <SelectItem value="SPMB">SPMB</SelectItem>
                  <SelectItem value="Kerja Sama Industri">Kerja Sama Industri</SelectItem>
                  <SelectItem value="Alumni">Alumni</SelectItem>
                  <SelectItem value="Kritik & Saran">Kritik &amp; Saran</SelectItem>
                  <SelectItem value="Lainnya">Lainnya</SelectItem>
                </SelectContent>
              </Select>
              {errors.purpose && (
                <p id="contact-purpose-error" className="mt-1 text-xs text-destructive">
                  {errors.purpose}
                </p>
              )}
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <FormField
              label="Instansi / Asal"
              name="institution"
              value={form.institution}
              onChange={updateField}
              placeholder="Masukkan instansi atau asal Anda"
            />
            <FormField
              label="Subjek"
              name="subject"
              value={form.subject}
              onChange={updateField}
            />
          </div>
          <div>
            <Label
              htmlFor="contact-message"
              className="mb-1.5 block text-sm font-medium"
            >
              Pesan <span className="text-destructive">*</span>
            </Label>
            <Textarea
              id="contact-message"
              name="message"
              value={form.message}
              onChange={updateField}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={
                errors.message ? "contact-message-error" : undefined
              }
              className={`min-h-32 ${errors.message ? "border-destructive" : ""}`}
              placeholder="Tuliskan pesan Anda..."
            />
            {errors.message && (
              <p
                id="contact-message-error"
                className="mt-1 text-xs text-destructive"
              >
                {errors.message}
              </p>
            )}
          </div>
          <p className="text-xs leading-5 text-muted-foreground">
            Data yang Anda kirim hanya digunakan untuk menindaklanjuti pesan dan
            tidak dibagikan kepada pihak lain.
          </p>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <LoaderCircle className="animate-spin" /> Mengirim pesan...
              </>
            ) : (
              <>
                <Send /> Kirim Pesan
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default ContactForm;

import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

function NotFound() {
  return (
    <div className="py-50 flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-7xl font-bold">404</h1>

      <h2 className="mt-4 text-2xl font-semibold">Halaman Tidak Ditemukan</h2>

      <p className="mt-2 text-muted-foreground">
        Maaf, halaman yang kamu cari tidak tersedia.
      </p>

      <Button className="mt-6 py-4.5 px-5">
        <Link to="/">Kembali ke Beranda</Link>
        <Home />
      </Button>
    </div>
  );
}

export default NotFound;

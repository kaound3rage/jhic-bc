import FasilitasCard from "./fasilitas-card";

function FasilitasList({ fasilitas }) {
  if (!fasilitas.length) {
    return (
      <div className="rounded-xl border border-dashed bg-muted/30 p-10 text-center">
        <h2 className="font-semibold">Fasilitas tidak ditemukan</h2>
        <p className="mt-1 text-sm text-muted-foreground">
          Coba gunakan kata kunci lain atau pilih kategori yang berbeda.
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {fasilitas.map((item) => (
        <FasilitasCard key={item.id} fasilitas={item} />
      ))}
    </div>
  );
}

export default FasilitasList;

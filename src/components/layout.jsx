import Footer from "./footer";
import Header from "./header";

function Layout({ children }) {
  return (
    <>
      <nav className="fixed top-0 z-50 w-full border-b bg-white">
        <div className="flex max-w-295 mx-auto items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <img src="/logo.webp" alt="LOGO" className="w-12 h-12" />
            <span className="flex flex-col">
              <h1 className="font-bold">SMK Negeri 2 Yogyakarrta</h1>
              <p className="text-xs text-muted-foreground">
                The Industrial Culture School
              </p>
            </span>
          </div>
          <Header />
        </div>
      </nav>
      <main className="max-w-295 mx-auto flex flex-col items-center pt-25">
        {children}
      </main>
      <Footer />
    </>
  );
}

export default Layout;

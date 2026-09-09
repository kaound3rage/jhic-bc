import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "./ui/navigation-menu";
import { Aperture, Compass, School, UserRound, Wrench } from "lucide-react";
import { Program } from "./navigation-component/data-program";
import { Jurusan } from "./navigation-component/data-jurusan";

function Header() {
  return (
    <NavigationMenu>
      <NavigationMenuList className={"flex items-center gap-2"}>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link to="/">Beranda</Link>}
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Profil</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem href="/docs" title="Profil Sekolah" icon={School}>
                Visi, Misi, Sejarah, dan informasi sekolah.
              </ListItem>
              <ListItem
                href="/docs/installation"
                title="Sambutan Kepala Sekolah"
                icon={UserRound}
              >
                Pesan dan amanat dari kepala sekolah.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Konsentrasi Keahlian</NavigationMenuTrigger>

          <NavigationMenuContent>
            <ul className="w-96">
              <ListItem
                href="/konsentrasi-keahlian"
                title="Lihat semua konsentrasi keahlian"
                icon={Compass}
              >
                Jelajahi 10 konsentrasi keahlian di SKADUTA.
              </ListItem>
              <hr className="my-2" />
              <li>
                {Jurusan.map((Item, index) => (
                  <ListItem key={index} href={Item.path} title={Item.title}>
                    {Item.deskripsi}
                  </ListItem>
                ))}
              </li>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Program</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-96">
              {Program.map((Item, index) => (
                <ListItem
                  key={index}
                  href={Item.path}
                  title={Item.title}
                  icon={Item.icon}
                >
                  {Item.deskripsi}
                </ListItem>
              ))}
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuTrigger>Fasilitas & Galeri</NavigationMenuTrigger>
          <NavigationMenuContent>
            <ul className="w-100">
              <ListItem
                href="/docs/installation"
                title="Fasilitas"
                icon={School}
              >
                Jelajahi fasilitas sekolah untuk mendukung kegiatan belajar
                siswa.
              </ListItem>
              <ListItem
                href="/docs/installation"
                title="Galeri Foto & Video"
                icon={Aperture}
              >
                Lihat berbagai momen dan kegiatan menarik di lingkungan sekolah.
              </ListItem>
              <ListItem
                href="/docs/installation"
                title="Lapor Kerusakan"
                icon={Wrench}
              >
                Platform warga sekolah melaporkan kerusakan fasilitas.
              </ListItem>
            </ul>
          </NavigationMenuContent>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/berita">Berita</Link>}
          />
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink
            className={navigationMenuTriggerStyle()}
            render={<Link href="/kontak">Kontak</Link>}
          />
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Header;

function ListItem({ title, children, href, icon: Icon, ...props }) {
  return (
    <li {...props}>
      <NavigationMenuLink
        render={
          <Link to={href} className="flex items-center gap-4 p-3">
            {Icon && (
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-[#BAE6FD] bg-[#F0F9FF]">
                <Icon className="h-5 w-5" />
              </div>
            )}

            <div className="flex flex-col gap-1">
              <div className="leading-none font-medium">{title}</div>

              <div className="line-clamp-2 text-xs text-muted-foreground">
                {children}
              </div>
            </div>
          </Link>
        }
      />
    </li>
  );
}

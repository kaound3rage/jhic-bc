import { Fragment } from "react";
import { Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const routeMeta = {
  "/jadwal-ruangan": {
    parents: [{ label: "Fasilitas" }],
    label: "Jadwal Ruangan",
  },
  "/sigap": {
    label: "SIGAP",
  },
  "/lapor-fasilitas": {
    parents: [{ label: "SIGAP" }],
    label: "Lapor Kerusakan Fasilitas",
  },
};

const titleFromPath = (segment) => segment
  .split("-")
  .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ");

function Breadcrumb() {
  const { pathname } = useLocation();
  const meta = routeMeta[pathname];
  const pathSegments = pathname.split("/").filter(Boolean);
  const generatedItems = pathSegments.map((segment, index) => ({
    label: titleFromPath(segment),
    href: `/${pathSegments.slice(0, index + 1).join("/")}`,
  }));
  const items = meta
    ? [...meta.parents, { label: meta.label }]
    : generatedItems;

  if (pathname === "/") return null;

  return (
    <BreadcrumbPrimitive className="mb-2">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink asChild><Link to="/" className="inline-flex items-center gap-1"><Home className="size-3.5" /><span className="sr-only sm:not-sr-only">Beranda</span></Link></BreadcrumbLink>
        </BreadcrumbItem>
      {items.map((item, index) => {
        const isCurrent = index === items.length - 1;
        return <Fragment key={`${item.label}-${index}`}>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            {isCurrent || !item.href
              ? <BreadcrumbPage>{item.label}</BreadcrumbPage>
              : <BreadcrumbLink asChild><Link to={item.href}>{item.label}</Link></BreadcrumbLink>}
          </BreadcrumbItem>
        </Fragment>;
      })}
      </BreadcrumbList>
    </BreadcrumbPrimitive>
  );
}

export default Breadcrumb;
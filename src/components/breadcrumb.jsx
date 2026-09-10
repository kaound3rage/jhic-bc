import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Breadcrumb as BreadcrumbPrimitive,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

// Only pages with an explicit navigation hierarchy belong here. Main navbar
// pages intentionally have no entry and therefore render no breadcrumb.
const routeMeta = {
  "/sigap/lapor-fasilitas": {
    items: [
      { label: "SIGAP", href: "/sigap" },
      { label: "Lapor Kerusakan Fasilitas" },
    ],
  },
  "/konsentrasi-keahlian": {
    parents: [],
    label: "Konsentrasi Keahlian",
  },
  "/spmb": {
    parents: [],
    label: "SPMB",
  },
  "/ekstrakurikuler": {
    parents: [],
    label: "Ekstrakurikuler",
  },
};

function Breadcrumb({ items: customItems }) {
  const { pathname } = useLocation();
  const items = customItems ?? routeMeta[pathname]?.items;

  if (!items?.length) return null;

  return (
    <BreadcrumbPrimitive className="mb-2">
      <BreadcrumbList>
        {items.map((item, index) => {
          const isCurrent = index === items.length - 1;

          return (
            <Fragment key={`${item.label}-${index}`}>
              {index > 0 && <BreadcrumbSeparator />}
              <BreadcrumbItem>
                {isCurrent || !item.href ? (
                  <BreadcrumbPage>{item.label}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link to={item.href}>{item.label}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </BreadcrumbPrimitive>
  );
}

export default Breadcrumb;

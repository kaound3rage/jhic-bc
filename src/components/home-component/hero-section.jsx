
import {
  Avatar,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MoveRight, Newspaper, SquareArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { companyLogos } from "./data-industry";

function Hero() {
  return (
    <>
      <section className="flex items-center justify-between py-18">
        <div className="flex items-start flex-col gap-4">
          <Badge
            variant="outline"
            className={"bg-primary-foreground text-primary border-popover"}
          >
            The Industrial Culture School
          </Badge>
          <h1 className="font-bold text-5xl max-w-lg">
            Menghasilkan Tamatan{" "}
            <span className="text-primary">Berkarakter</span>,{" "}
            <span className="text-[#388bff]">Unggul</span> &{" "}
            <span className="text-[#237fff]">Berdaya</span> Saing Global
          </h1>
          <p className="text-muted-foreground max-w-120 text-sm">
            SMK Negeri 2 Yogyakarta berkomitmen menghadirkan pendidikan vokasi
            berkualitas, berbasis industri, dan ekosistem pembelajaran modern
            berbasis projek.
          </p>
          <div className="flex items-center gap-2">
            <Button className={"px-4 py-5 bg-emerald-600 hover:bg-emerald-700"}>
              <Link>SPMB</Link>
              <SquareArrowUpRight />
            </Button>
            <Button className={"px-4 py-5"}>
              <Link to={"https://elearning.smk2-yk.sch.id"}>E-Learning</Link>
              <MoveRight />
            </Button>
            <Button className={"px-4 py-5"} variant="outline">
              <Link to={"/berita"}>Berita</Link>
              <Newspaper />
            </Button>
          </div>
          <div className="flex items-center gap-3">
            <AvatarGroup>
              {companyLogos.map((company, index) => (
                <Avatar key={index} className={"size-11"}>
                  <AvatarImage src={company.logo} alt={company.name} />
                  <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
                </Avatar>
              ))}
              <Avatar className={"size-11"}>
                <AvatarGroupCount className={"size-11"}>+50</AvatarGroupCount>
              </Avatar>
            </AvatarGroup>
            <div className="max-w-xs text-sm text-muted-foreground">
              <span className="font-bold text-foreground">50+ Industri</span>{" "}
              telah bekerjasama dengan SMK Negeri 2 Yogyakarta
            </div>
          </div>
        </div>
        <div className="relative">
          <img
            src="/sekolah.webp"
            alt="SEKOLAH"
            className="rounded-3xl w-130 h-80"
          />
          <span className="bg-primary-foreground text-primary font-semibold p-5 rounded-2xl absolute -translate-x-11 -translate-y-7">
            Terakreditasi - A
          </span>
        </div>
      </section>
    </>
  );
}

export default Hero;

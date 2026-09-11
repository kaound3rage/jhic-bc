import FacilitySection from "@/components/home-component/facility-section";
import AlumniSection from "@/components/home-component/alumni-section";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Hero from "@/components/home-component/hero-section";
import MajorSection from "@/components/home-component/major-section";
import MessageSection from "@/components/home-component/message-section";
import ProfileSection from "@/components/home-component/profile-section";
import WhySkaduta from "@/components/home-component/why-skaduta";
import NewsSection from "../../../components/home-component/news-section";

function Home() {
  return (
    <div className="w-full">
      <Hero />
      <WhySkaduta />
      <ProfileSection />
      <MessageSection />
      <MajorSection />
      <FacilitySection />
      <section className="flex flex-col gap-6 py-18">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="flex flex-col gap-1">
            <h1 className="text-2xl font-bold">Jejak Alumni</h1>
            <p className="text-sm text-muted-foreground">
              Cerita inspiratif alumni yang terus bertumbuh bersama bekal dari
              SKADUTA.
            </p>
          </div>
          <Button variant="ghost" className="text-primary hover:text-primary">
            <Link to="/profil/alumni">Lihat Semua</Link>
          </Button>
        </div>
        <AlumniSection />
      </section>
      <NewsSection />
    </div>
  );
}

export default Home;

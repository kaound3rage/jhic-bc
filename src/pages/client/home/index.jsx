import FacilitySection from "@/components/home-component/facility-section";
import AlumniSection from "@/components/home-component/alumni-section";
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
      <NewsSection />
      <FacilitySection />
      <AlumniSection />
    </div>
  );
}

export default Home;

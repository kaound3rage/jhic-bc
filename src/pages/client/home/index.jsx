import FacilitySection from "@/components/home-component/facility-section";
import Hero from "@/components/home-component/hero-section";
import MajorSection from "@/components/home-component/major-section";
import MessageSection from "@/components/home-component/message-section";
import ProfileSection from "@/components/home-component/profile-section";
import WhySkaduta from "@/components/home-component/why-skaduta";

function Home() {
  return (
    <div className="w-full">
      <Hero />
      <WhySkaduta />
      <ProfileSection />
      <MessageSection />
      <MajorSection />
      <FacilitySection />
    </div>
  );
}

export default Home;

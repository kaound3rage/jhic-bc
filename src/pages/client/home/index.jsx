import Hero from "@/components/home-component/hero-section";
import ProfileSection from "@/components/home-component/profile-section";
import WhySkaduta from "@/components/home-component/why-skaduta";

function Home() {
  return (
    <div className="w-full">
      <Hero />
      <WhySkaduta />
      <ProfileSection/>
    </div>
  );
}

export default Home;

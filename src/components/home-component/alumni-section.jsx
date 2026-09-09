import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Card } from "../ui/card";

const alumniStories = [
  {
    name: "Abdul Latif Ikhlashul Mukmin",
    role: "Director PT Coding Collective",
    image: "/latif.png",
    quote:
      "Belajar di SMK Negeri 2 Yogyakarta memberi saya fondasi teknis dan keberanian untuk terus berkembang. Pengalaman projek bersama industri sangat membantu saat memasuki dunia kerja.",
  },
  {
    name: "Aulia Rahma",
    role: "Digital Marketing Specialist",
    image: "/woman.png",
    quote:
      "Guru dan teman-teman di SKADUTA mengajarkan saya untuk bekerja dengan disiplin, kolaboratif, dan selalu menghasilkan karya yang bisa dipertanggungjawabkan.",
  },
];

function AlumniSection() {
  const [activeStory, setActiveStory] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStory((current) => (current + 1) % alumniStories.length);
    }, 6000);

    return () => clearInterval(timer);
  }, []);

  const story = alumniStories[activeStory];

  function showStory(index) {
    setActiveStory((index + alumniStories.length) % alumniStories.length);
  }

  return (
    <section className="flex w-full flex-col gap-18 py-18">
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold">Jejak Alumni</h1>
          <p className="text-sm text-muted-foreground">
            Cerita inspiratif alumni yang terus bertumbuh bersama bekal dari
            SKADUTA.
          </p>
        </div>

        <Card className="relative flex flex-col gap-0 overflow-hidden border-primary/30 p-0 md:flex-row">
          <img
            src={story.image}
            alt={`Alumni ${story.name}`}
            className="h-64 w-full shrink-0 object-cover md:h-80 md:w-[40%]"
          />
          <div className="flex min-h-80 flex-1 flex-col justify-between gap-8 p-6 pb-16 md:p-8 md:pb-16">
            <div className="flex flex-col gap-4">
              <span className="text-4xl leading-none text-primary">
                &ldquo;
              </span>
              <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
                {story.quote}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Avatar size="lg">
                <AvatarImage src={story.image} alt={story.name} />
                <AvatarFallback>{story.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-semibold">{story.name}</p>
                <p className="text-sm text-muted-foreground">{story.role}</p>
              </div>
            </div>
          </div>
          <div className="absolute bottom-6 left-6 flex items-center gap-2 md:left-[42%]">
            {alumniStories.map((item, index) => (
              <button
                key={item.name}
                type="button"
                aria-label={`Tampilkan cerita ${item.name}`}
                aria-current={activeStory === index}
                onClick={() => showStory(index)}
                className={`size-2 rounded-full transition-all ${
                  activeStory === index ? "w-6 bg-primary" : "bg-border"
                }`}
              />
            ))}
          </div>
          <div className="absolute right-6 bottom-4 flex gap-1">
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Cerita alumni sebelumnya"
              className={"cursor-pointer"}
              onClick={() => showStory(activeStory - 1)}
            >
              <ArrowLeft />
            </Button>
            <Button
              variant="outline"
              size="icon-sm"
              aria-label="Cerita alumni berikutnya"
              className={"cursor-pointer"}
              onClick={() => showStory(activeStory + 1)}
            >
              <ArrowRight />
            </Button>
          </div>
        </Card>
      </div>
    </section>
  );
}

export default AlumniSection;

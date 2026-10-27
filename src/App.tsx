import { useEffect, useState } from "react";
import { story } from "./data";
import { Petals } from "./components/Common";
import Preloader from "./components/Preloader";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Countdown, { StorySection } from "./components/Countdown";
import {
  CoupleSection,
  EventsSection,
  GallerySection,
  InviterSection,
} from "./components/Sections";
import { Footer, RsvpSection, VenueSection } from "./components/Rsvp";
import Music from "./components/Music";

export default function App() {
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("no-scroll", !opened);
    return () => document.body.classList.remove("no-scroll");
  }, [opened]);

  return (
    <div className="relative min-h-screen bg-cream">
      {!opened && <Preloader onOpen={() => setOpened(true)} />}

      {opened && (
        <>
          <Petals />
          <Nav />
          <main>
            <Hero />
            <CoupleSection />
            <Countdown />
            {/* <StorySection story={story} /> */}
            <EventsSection />
            <InviterSection />
            {/* <GallerySection /> */}
            <VenueSection />
            <RsvpSection />
          </main>
          <Footer />
          <Music autostart />
        </>
      )}
    </div>
  );
}

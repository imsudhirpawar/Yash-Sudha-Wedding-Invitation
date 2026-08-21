import { useEffect, useRef, useState } from "react";
import musicFile from "../assets/Aaj-Sajeya.mp3";

export default function Music({ autostart }: { autostart: boolean }) {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = new Audio(musicFile);
    audio.loop = true;
    audio.volume = 0.55;
    audioRef.current = audio;

    const handleEnded = () => setPlaying(false);

    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("ended", handleEnded);
      audioRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (autostart && audioRef.current) {
      void audioRef.current
        .play()
        .then(() => setPlaying(true))
        .catch(() => {
          // Browser blocked autoplay.
          // User can start music using the button.
          setPlaying(false);
        });
    }
  }, [autostart]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (playing) {
      audio.pause();
      setPlaying(false);
    } else {
      void audio
        .play()
        .then(() => setPlaying(true))
        .catch(() => setPlaying(false));
    }
  };

  return (
    <button
      onClick={toggleMusic}
      aria-label={playing ? "Pause music" : "Play music"}
      className="fixed bottom-5 right-5 z-40 flex h-12 w-12 items-center justify-center rounded-full border border-gold/60 bg-cream/90 text-maroon shadow-lg shadow-maroon/10 backdrop-blur transition hover:scale-110"
    >
      <span
        className={playing ? "spin-slow text-lg" : "text-lg opacity-60"}
      >
        {playing ? "🎵" : "🔇"}
      </span>

      {playing && (
        <span className="absolute inset-0 animate-ping rounded-full border border-gold/40" />
      )}
    </button>
  );
}
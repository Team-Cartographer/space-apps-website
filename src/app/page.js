"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
const Globe = dynamic(
  () => import("@/components/Globe").then((mod) => mod.default),
  {
    ssr: false,
  }
);

import PauseButton from "@/components/PauseButton";
import BetterButton from "@/components/BetterButton";
import LoadingScreen from "@/components/LoadingScreen";

const Main = () => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [altitude, setAltitude] = useState(10);

  return (
    <>
      <LoadingScreen isReady={isReady} />

      {altitude > 1 && (
        <>
          <PauseButton
            isPlaying={isPlaying}
            isHover={isHover}
            setIsPlaying={setIsPlaying}
            setIsHover={setIsHover}
          />

          <BetterButton
            text="How To Interpret the Data?"
            href="/how-to-interpret"
          />

          <a
            href="https://github.com/Team-Cartographer"
            target="_blank"
            className="absolute w-full flex items-center justify-center z-40 bottom-0 mb-5 text-[#5a5757]  font-bold"
          >
            <text className="text-xl">Github</text>
          </a>
        </>
      )}

      <Globe
        isPlaying={isPlaying}
        setAltitude={setAltitude}
        setIsReady={setIsReady}
      />
    </>
  );
};

export default Main;

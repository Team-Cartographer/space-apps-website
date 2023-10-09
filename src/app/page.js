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
import GithubButton from "@/components/GithubButton";

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

          <BetterButton />

          <GithubButton />
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

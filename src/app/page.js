"use client";

import { useState } from "react";

import dynamic from "next/dynamic";
const Globe = dynamic(
  () => import("@/components/Globe.jsx").then((mod) => mod.default),
  {
    ssr: false,
  }
);

import PauseButton from "@/components/PauseButton";
import MoreInfoLink from "@/components/MoreInfoLink";
import LoadingScreen from "@/components/LoadingScreen";
import GithubButton from "@/components/GithubButton";
import ChooseDateInterval from "@/components/ChooseDateInterval";

import { useSearchParams } from "next/navigation";

const Main = () => {
  const searchParams = useSearchParams();
  const timestamp = searchParams.get("timestamp");

  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isReady, setIsReady] = useState(false);
  const [altitude, setAltitude] = useState(10);

  return (
    <>
      <LoadingScreen isReady={isReady} />

      {altitude > 0.8 && (
        <>
          <PauseButton
            isPlaying={isPlaying}
            isHover={isHover}
            setIsPlaying={setIsPlaying}
            setIsHover={setIsHover}
          />
          <ChooseDateInterval />
          <MoreInfoLink />
          <GithubButton />
        </>
      )}

      <Globe
        isPlaying={isPlaying}
        setAltitude={setAltitude}
        setIsReady={setIsReady}
        timestamp={timestamp}
      />
    </>
  );
};

export default Main;

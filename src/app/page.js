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

const Main = () => {
  const [isHover, setIsHover] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  return (
    <>
      <PauseButton
        isPlaying={isPlaying}
        isHover={isHover}
        setIsPlaying={setIsPlaying}
        setIsHover={setIsHover}
      />

      <Globe isPlaying={isPlaying} />
    </>
  );
};

export default Main;

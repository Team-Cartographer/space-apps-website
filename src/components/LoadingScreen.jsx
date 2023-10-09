import React, { useState, useEffect } from "react";
import Spinner from "./Spinner";

const SEQUENCE = [
  "Initiating DSCVR satellite blueprint design...",
  "Selecting the finest materials for DSCVR construction...",
  "Assembling advanced sensors and onboard instruments...",
  "Installing high-resolution cameras for clear space imagery...",
  "Preparing for DSCVR's ride to space on a launch vehicle...",
  "Countdown in progress: T-minus 10 seconds to DSCVR's journey...",
  "Blasting off! DSCVR is on its way to orbit...",
  "Reaching desired altitude, preparing to deploy DSCVR...",
  "Separation successful! DSCVR is now in space...",
  "Adjusting solar panels for optimal sunlight capture...",
  "Calibrating instruments for the best data collection...",
  "Starting DSCVR's first observational scan...",
  "DSCVR is now in full operational mode, exploring the universe for us!",
];

const LoadingScreen = ({ isReady }) => {
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const getRandomDuration = () => Math.floor(Math.random() * 900) + 200;

  const styles = {
    opacity: fadeOut ? 0 : 1,
    transition: "opacity 1s ease",
  };

  useEffect(() => {
    if (isReady) {
      setFadeOut(true);
      setTimeout(() => {
        setIsFinished(true);
      }, 1000); // matches the 0.5s duration of the transition
    } else {
      // ... (rest of your code)
    }
  }, [isReady]);

  useEffect(() => {
    if (isReady && currentTextIndex < SEQUENCE.length - 1) {
      setCurrentTextIndex(SEQUENCE.length - 1);
    } else {
      const interval = setInterval(() => {
        setCurrentTextIndex((prevIndex) => {
          if (prevIndex < SEQUENCE.length - 1) {
            return prevIndex + 1;
          }
          clearInterval(interval);
          return prevIndex;
        });
      }, getRandomDuration());

      return () => clearInterval(interval);
    }
  }, [isReady]);
  return (
    <>
      {isFinished ? null : (
        <div
          style={styles}
          className="fixed top-0 left-0 right-0 bottom-0 w-full h-screen z-50 overflow-hidden bg-[#000011] flex flex-col items-center justify-center"
        >
          <Spinner />

          <p className="text-l text-center text-gray-200">
            {SEQUENCE[currentTextIndex]}
          </p>
        </div>
      )}
    </>
  );
};

export default LoadingScreen;

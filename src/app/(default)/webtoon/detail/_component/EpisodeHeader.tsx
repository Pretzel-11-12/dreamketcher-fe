"use client";
import _ from "lodash";
import { useEffect, useState } from "react";

const EpisodeHeader = () => {
  const [isDisplay, setDisplay] = useState(true);

  const handleScroll = () => {
    if (window.scrollY > 300) {
      setDisplay(false);
    } else {
      setDisplay(true);
    }
  };

  const throttleScroll = _.throttle(handleScroll, 300);

  useEffect(() => {
    window.addEventListener("scroll", throttleScroll);
    return () => {
      window.removeEventListener("scroll", throttleScroll);
    };
  }, []);

  return (
    <div
      className="w-full h-[50px] bg-[#F9F9F9] fixed border-b flex items-center justify-center transition-opacity duration-300 z-50"
      style={isDisplay ? { opacity: 1 } : { opacity: 0 }}
      onMouseEnter={() => setDisplay(true)}
      onMouseLeave={() => window.scrollY >= 300 && setDisplay(false)}
    >
      <div className="w-[800px] flex items-center text-md gap-3">
        <span className="mdi mdi-chevron-left"></span>
        괴담출근 136화 - I'm like some kind of supernova, Watch out
      </div>
    </div>
  );
};

export default EpisodeHeader;

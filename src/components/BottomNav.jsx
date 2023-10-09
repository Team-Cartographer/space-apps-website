import Image from "next/image";
import Logo from "../../public/logo.png";

const BottomNav = () => {
  return (
    <div className="absolute w-full flex items-center justify-center z-40 bottom-0 mb-5">
      <Image
        src={Logo}
        width={24}
        height={24}
        alt="Team Cartographer Logo"
        className="mr-3 rounded-lg"
      />
      <a
        className="text-[#5a5757] font-bold mr-5"
        href="https://github.com/Turfader/Team-Cartographer-Space-Apps-Challenge-2023"
        target="_blank"
      >
        <text className="text-xl">Github</text>
      </a>

      <a
        href="https://docs.google.com/presentation/d/e/2PACX-1vThHnNV4OxnPd3OjOHvlWN_4U71MY5mHgLs6kkxX7UrffQfXY2gErtkajTe2V5pdZ01GW7Y1Zn0DGYM/pub?start=false&loop=false&delayms=30000"
        target="_blank"
        className="text-[#5a5757] font-bold"
      >
        <text className="text-md">Learn about DSCOVR and K-values</text>
      </a>
    </div>
  );
};

export default BottomNav;

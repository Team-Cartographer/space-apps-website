import Image from "next/image";
import Logo from "../../public/logo.png";

const GithubButton = () => {
  return (
    <div className="absolute w-full flex items-center justify-center z-40 bottom-0 mb-5">
      <Image
        src={Logo}
        width={24}
        height={24}
        alt="Picture of the author"
        className="mr-3 rounded-lg"
      />
      <a
        className="text-[#5a5757] font-bold"
        href="https://github.com/Team-Cartographer"
        target="_blank"
      >
        <text className="text-xl">Github</text>
      </a>
    </div>
  );
};

export default GithubButton;

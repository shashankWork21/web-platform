import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-fit space-y-16 md:space-y-28 mt-32 md:mt-64 px-4">
      <Image
        src="/HomePageLogo.svg"
        alt="SmartAlgorhythm logo"
        width={700}
        height={369.26}
        className="w-3/4 md:w-auto"
      />
      <div className="flex flex-col items-center justify-center space-y-8 md:space-y-12">
        <div className="flex flex-col items-center justify-center space-y-4 md:space-y-6">
          <p className="text-2xl md:text-4xl text-center font-thin leading-relaxed">
            Focus on{" "}
            <span className="border-b-4 md:border-b-8 pb-1 border-lime-green font-medium">
              your best
            </span>
          </p>
          <p className="text-2xl md:text-4xl text-center font-thin leading-relaxed">
            Let{" "}
            <span className="border-b-4 md:border-b-8 pb-1 border-lime-green font-medium">
              technology
            </span>{" "}
            take care of the rest!
          </p>
        </div>

        <p className="text-lg md:text-2xl text-center font-medium leading-relaxed max-w-4xl mt-6">
          Simplify your workflow and reclaim your time with smart automation
          that handles your repetitive tasks and organizes your information
          effortlessly.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center justify-center space-y-4 md:space-y-0 md:space-x-12">
        <Link
          href="/contact"
          className="px-8 md:px-12 py-3 md:py-4 rounded-xl shadow-xl bg-cypher-blue hover:bg-cypher-blue-4 hover:scale-110 text-white text-lg md:text-xl transition-all duration-300"
        >
          Get Started
        </Link>
        <Link
          href="/resources"
          className="px-8 md:px-10 py-3 rounded-xl shadow-xl border-2 border-signal-black-5 hover:border-signal-black-5 hover:bg-signal-black-5 hover:scale-105 hover:text-white text-lg md:text-xl transition-all duration-300"
        >
          Explore Solutions
        </Link>
      </div>
    </div>
  );
}

import { ChevronRight } from "lucide-react";
import HeroBrakeImg from "../assets/hero.png";
import CategoryCards from "./CategoryCards";
import { Link } from "react-router-dom";
import AdvancedSearchFilter from "./AdvancedSearchFilter";

const HeroSection = () => {
  return (
    <section className="w-full bg-white pt-6">
      <div className="max-w-[1440px] mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left: Advanced Search Filter */}
        <AdvancedSearchFilter/>

        {/* Right: Hero Banner */}
        <div className="md:col-span-2 bg-black rounded-xl overflow-hidden flex items-center justify-between px-10 py-6">
          <div>
            <h2 className="text-white md:text-5xl sm:text-3xl text-2xl font-semibold leading-tight mb-2">
              Parts That Power <br /> Your Journey
            </h2>
            <p className="text-zinc-300 text-md mb-12">
              Gradually work your way up to more <br /> intense games as
            </p>
            <Link to="/store" className=" inline-flex  items-center bg-red-600 hover:bg-red-700 text-white text-sm font-semibold px-8 py-3 rounded-md transition">
              Shop now <ChevronRight className="ml-1 w-4 h-4" />
            </Link>
          </div>
          <img
            src={HeroBrakeImg}
            alt="Brake Part"
            className="w-[17rem] md:w-[20rem] object-contain hidden md:inline-flex"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;

import Image from "next/image";
import React from "react";
import Dara from "@/app/assets/webp/dara.webp";

function Profile() {
  return (
    <section className="flex md:flex-row flex-col items-center h-[70vh] mt-20">
      {/* Image side with padding all around */}
      <div className="relative w-1/2 h-full bg-[#E8E7D7] p-12 flex items-center justify-center">
        <Image
          src={Dara}
          alt="Dara image"
          className="object-contain w-full h-full"
          priority
        />
      </div>

      {/* Text side */}
      <div className="w-1/2 h-full bg-[#EFD9D2] flex flex-col items-center justify-center p-20">
        <h1 className="text-[32px] md:text-[60px] text-center">
          Hey! I’m Dara!
        </h1>
        <p className="text-center text-lg md:text-[20px] font-satoshi font-normal leading-[24px] md:leading-[25px] text-[#4E5157]">
          Hey! I’m Dara a surface pattern designer, print designer, textile
          artist and illustrator based in Lagos. I am currently studying at the
          University of Lagos for a Bachelor’s degree in Visual arts. Winner
          Vlisco print futures 1.0. Hey! I’m Dara a surface pattern designer,
          print designer, textile artist and illustrator based in Lagos. I am
          currently studying at the University of Lagos for a Bachelor’s degree
          in Visual arts. Winner Vlisco print futures 1.0.
        </p>
      </div>
    </section>
  );
}

export default Profile;

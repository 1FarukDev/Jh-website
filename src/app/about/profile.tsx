import Image from "next/image";
import React from "react";
import Dara from "@/app/assets/webp/dara.webp";

function Profile() {
  return (
    <section className="flex md:flex-row flex-col items-center md:h-[70vh] mt-20">
      <div className="relative md:w-1/2 w-full h-full bg-[#E8E7D7] p-12 flex items-center justify-center">
        <Image
          src={Dara}
          alt="Dara image"
          className="object-contain w-full h-full"
          priority
        />
      </div>
      <div className="md:w-1/2 w-full h-full bg-[#EFD9D2] flex flex-col items-center justify-center p-10 py-15 md:p-20">
        <h1 className="text-[32px] md:text-[60px] text-center leading-[60px] mb-5">
          Meet the Creative Director
        </h1>
        <p className="text-center text-lg md:text-[20px] font-satoshi font-normal leading-[24px] md:leading-[25px] text-[#4E5157]">
          Jesudara Hinmikaiye is a Lagos-based print designer with over 5 years
          of experience. Winner of the Vlisco Print Futures 1.0 award, she holds
          a degree in Visual Arts with a major in Textile Design. She furthered
          her studies in Jacquard weaving at HAW Hamburg and participated in a
          five-month exchange program at the University of Fine Arts, Hamburg
          (HFBK). Jesudara has designed acclaimed prints such as the ILE Print
          for DLCT Contemporary, the Mustard Seed print for Akwa Baby, and works
          for Nyosi and the Nautical prints for The Lady Maker.
        </p>
      </div>
    </section>
  );
}

export default Profile;

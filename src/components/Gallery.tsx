"use client";
import { useScroll } from "framer-motion";
import { useRef } from "react";
import Cards from "./card";

const gallery = [
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706767/Landscapre_rzikib.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706764/OutDoor_ny9qus.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706765/Playground_w2upve.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706765/Swimming_Pool_yiou0p.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706765/CloseUp_qd1pre.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706767/InsideHall_vzadpk.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706766/HallWithSofa_oehibm.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706767/Kitchen_amd8xn.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706763/BedRoom1_jvf92s.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706765/BedRoom2_itpvie.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706764/BedRoomView2_g4lz7v.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706763/Balcony1_icvrxg.jpg",
  },
  {
    src: "https://res.cloudinary.com/dauarqbjt/image/upload/v1736706763/Balcony2_tfpcas.jpg",
  },
];

export const Gallery = () => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start start", "end end"],
  });

  return (
    <div
      ref={container}
      className="text-black flex items-center justify-center flex-col"
    >
      <h1 className="text-5xl font-semibold text-center pt-12 pb-2 text-[#1D4634]">
        Our Gallery
      </h1>
      {gallery.map((photo, i) => {
        const targetScale = 1 - (gallery.length - i) * 0.02;
        return (
          <Cards
            key={i}
            i={i}
            {...photo}
            range={[1 * 0.25, 1]}
            target={targetScale}
            prog={scrollYProgress}
          />
        );
      })}
    </div>
  );
};

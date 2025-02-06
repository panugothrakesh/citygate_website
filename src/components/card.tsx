"use client"
import React, { useRef } from "react";
import Image from "next/image";
import { motion , MotionValue, useScroll, useTransform } from "framer-motion";

export default function Cards({
    i,
    src,
    prog,
    range,
    target,
}: {
    i: number;
    src: string;
    prog: MotionValue;
    range: number[];
    target: number;
}) {

    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start end', 'start start'],
    })

    const imageScale = useTransform(scrollYProgress, [0,1], [2,1])
    const scale = useTransform(prog, range, [1, target])

  return (
    <>
      <div ref={container} className="cardContainer h-[100vh] overflow-hidden flex justify-center items-center sticky top-0">
        <motion.div
          className="card flex gap-8 flex-col items-center md:w-[85vw] rounded-3xl w-[100vw] h-[80vh] relative p-4 md:p-12"
          style={{ scale, top: `calc(-8vh + ${i * 14}px)` }} 
        >
          <div className="body flex h-full w-full gap-14">
            <div className="relative w-full h-full rounded-3xl overflow-hidden">
              <motion.div className="inner w-full h-full" style={{ scale: imageScale }}>
                <Image
                  className="object-cover"
                  src={src}
                  alt={`Gallery Image ${i}`}
                  layout="fill"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  );
}
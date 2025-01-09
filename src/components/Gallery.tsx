"use client"
import { useScroll } from "framer-motion"
import { useRef } from "react"
import Cards from "./card"

const gallery = [
    {
        src: "/Landscapre.jpg",
    },
    {
        src: "/Outdoor.jpg",
    },
    {
        src: "/Playground.jpg",
    },
    {
        src: "/Swimming_Pool.jpg",
    },
    {
        src: "/CloseUp.jpg",
    },
    {
        src: "/InsideHall.jpg",
    },
    {
        src: "/InsideAll.jpg",
    },
    {
        src: "/HallWithSofa.jpg",
    },
    {
        src: "/Kitchen.jpg",
    },
    {
        src: "/BedRoom1.jpg",
    },
    {
        src: "/BedRoom2.jpg",
    },
    {
        src: "/BedRoomView2.jpg",
    },
    {
        src: "/Balcony1.jpg",
    },
    {
        src: "/Balcony2.jpg",
    },
]

export const Gallery = () => {

    const container = useRef(null)
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ['start start', 'end end']
    })

    return (
        <div ref={container} className="text-black flex items-center justify-center flex-col">
            <h1 className="text-5xl font-semibold text-center pt-12 pb-2 text-[#1D4634]">Our Gallery</h1>
            {gallery.map((photo, i) => {
                const targetScale = 1 - ((gallery.length - i) * 0.02)
                return <Cards key={i} i={i} {...photo} range={[1 * 0.25, 1]} target={targetScale} prog={scrollYProgress} />
            })}
        </div>
    )
};
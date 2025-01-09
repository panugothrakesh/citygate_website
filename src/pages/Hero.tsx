import { Gallery } from '@/components/Gallery';
import React from 'react'

export const Hero = () => {
    return (
        <section className='flex flex-col items-center justify-center'>
            <div className='flex flex-col items-center justify-center w-full py-20 text-white space-y-4 bg-[#1D4634]'>
                <h1 className='text-6xl text-center font-medium leading-[1.02]'>
                    More Comfortable.<br />
                    More Classy.
                </h1>
                <p className='text-lg'>
                    Make your living experience even more memorable.
                </p>
            </div>
            <div className="w-screen h-[80vh] overflow-hidden relative bg-[#1D4634]">
                {/* <video className="w-full h-full object-cover scale-125" preload="auto" autoPlay loop muted>
                    <source src="/Intro.mp4" type="video/mp4" />
                </video> */}
                {/* <div className="absolute top-0 left-0 w-full h-44 bg-gradient-to-b from-[#1D4634] via-[#1D4634]/40 to-[#1D4634]/0 pointer-events-none" /> */}
                {/* <div className="absolute bottom-0 left-0 w-full h-44 bg-gradient-to-b from-transparent to-[#1D4634] pointer-events-none" /> */}
            </div>
            <Gallery />
            <div className='h-[40vh] flex' />
        </section>
    )
};
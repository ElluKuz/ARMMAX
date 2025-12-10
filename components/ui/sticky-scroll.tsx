// components/ui/sticky-scroll.tsx
"use client";

import { ReactLenis } from "lenis/react";
import React, { forwardRef } from "react";

const StickyScroll = forwardRef<HTMLElement>((props, ref) => {
  return (
    <ReactLenis root>
      <section
        ref={ref}
        className="py-4 md:py-6"
      >
        <section className='text-white   w-full bg-white'>
          <div className='grid grid-cols-12 gap-2'>
            <div className='grid gap-2 col-span-4'>
              <figure className=' w-full'>
                <img
                  src='furnitureassembly/bathroomcabinetsassembly.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md shadow-sm '
                />
              </figure>
              <figure className=' w-full'>
                <img
                  src='furnitureassembly/cabinetsassembly.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md shadow-sm '
                />
              </figure>
              <figure className=' w-full'>
                <img
                  src='furnitureassembly/EuropeanKitchenCabinetsAssembly.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md shadow-sm '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='InteriorPaintingProjects/intrior paint.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md shadow-sm '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='furnitureassembly/outdoorkidsspace.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md shadow-sm '
                />
              </figure>
            </div>




            <div className="sticky top-0 h-screen w-full col-span-4 grid grid-rows-3 gap-3">
              <figure className="w-full h-full">
                <img
                  src="InteriorPaintingProjects/InteriorPainting8.jpg"
                  alt=""
                  className="transition-all duration-300 h-full w-full align-bottom object-cover rounded-md shadow-md"
                />
              </figure>
              <figure className="w-full h-full">
                <img
                  src="InteriorPaintingProjects/InteriorPainting.jpg"
                  alt=""
                  className="transition-all duration-300 h-full w-full align-bottom object-cover rounded-md shadow-md"
                />
              </figure>
              <figure className="w-full h-full">
                <img
                  src="InteriorPaintingProjects/InteriorPainting7.jpg"
                  alt=""
                  className="transition-all duration-300 h-full w-full align-bottom object-cover rounded-md shadow-md"
                />
              </figure>
            </div>



            <div className='grid gap-2 col-span-4'>
              <figure className='w-full'>
                <img
                  src='furnitureassembly/SofaAssembly.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md shadow-sm '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='furnitureassembly/KidsRoomAsembly.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md shadow-sm '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='furnitureassembly/SofaAssembly.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md shadow-sm '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='furnitureassembly/OutdoorKidsPlaygrondAssembly.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md shadow-sm '
                />
              </figure>
              <figure className='w-full'>
                <img
                  src='furnitureassembly/EuropeanKitchenCabinetsAssembly.jpg'
                  alt=''
                  className='transition-all duration-300 w-full h-96  align-bottom object-cover rounded-md shadow-sm '
                />
              </figure>
            </div>
          </div>
        </section>
      </section>
    </ReactLenis>
  );
});

StickyScroll.displayName = "StickyScroll";

export default StickyScroll;

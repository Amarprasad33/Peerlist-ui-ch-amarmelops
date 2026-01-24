"use client"
import { useState } from "react";
import FluidMenu from "@/components/day1";
import FluidState from "@/components/day2";
import AnimatedCheckbox from "@/components/day3";
import PricingToggle from "@/components/day4";
import SharedLayoutTabs from "@/components/day5";

export default function Home() {
  const [clickedDay, setClickedDay] = useState(5);
  const days = [1, 2, 3, 4, 5];
  return (
    <div className="relative w-full h-screen bg-white">
      {/* Nav Menu */}
      <div className="absolute right-32 top-8 flex flex-col gap-1 text-gray-400 z-50" style={{ fontFamily: 'var(--font-geist-mono)' }}>
        {days.map((day, idx) => (
          <div key={idx} className={`hover:text-black/70 cursor-pointer ${clickedDay === day && 'text-black/70'}`} onClick={() => setClickedDay(day)}>
            Day <span className="ml-1">{day}</span>
          </div>

        ))}
      </div>
      
      <div className="h-full w-full">
        {clickedDay === 1 && <FluidMenu />}
        {clickedDay === 2 && <FluidState />}
        {clickedDay === 3 && <AnimatedCheckbox />}
        {clickedDay === 4 && <PricingToggle />}
        {clickedDay === 5 && <SharedLayoutTabs />}
      </div>

      <div className="absolute bottom-0 right-28 text-sm text-zinc-600 self-end cursor-pointer"><span style={{ fontFamily: 'var(--font-geist-mono)' }}>Made by </span><span className="text-blue-600"><a href="https://x.com/Amarmelops1" target="blank">@Amarmelops1</a></span></div>
      
    </div>
  );
}

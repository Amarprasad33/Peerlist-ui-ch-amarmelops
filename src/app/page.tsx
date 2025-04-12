"use client"
import { useState } from "react";
import FluidMenu from "@/components/day1";

export default function Home() {
  const [clickedDay, setClickedDay] = useState(1);
  const days = [1, 2, 3, 4, 5];
  return (
    <div className="relative w-full h-screen bg-white border">
      {/* Nav Menu */}
      <div className="absolute right-32 top-8 flex flex-col gap-1 text-gray-400 z-50" style={{ fontFamily: 'var(--font-geist-mono)' }}>
        {days.map((day, idx) => (
          <div key={idx} className={`hover:text-black/70 cursor-pointer ${clickedDay === day && 'text-black/70'}`} onClick={() => setClickedDay(day)}>
            Day <span className="ml-1">{day}</span>
          </div>

        ))}
      </div>

      <div className="h-full w-full">
        <FluidMenu />
      </div>
      
    </div>
  );
}

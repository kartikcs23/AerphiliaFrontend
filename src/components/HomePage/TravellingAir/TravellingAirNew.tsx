"use client";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import ZigZagAirplane from "./ZigZagAirplane";

type TimelineEvent = {
  year: string;
  text: string;
};

const events: TimelineEvent[] = [
  { year: "1971", text: "Mood Indigo executed with a budget of INR 5000" },
  { year: "1981", text: "Performance by Asha Bhosale and R D Burman, stalwarts of music during the 80s" },
  { year: "2008", text: "First International Nite: Ensiferum Concert" },
  { year: "2009", text: "Porcupine Tree performed in India for the first time at Mood Indigo" },
  { year: "2010", text: "India's first ever sumo-wrestling match held at Mood Indigo" },
  { year: "2011", text: "Limca book of world records for most number of International Artists in any college fest" },
  { year: "2012", text: "Simple Plan Concert" },
  { year: "2014", text: "Sander Van Doorn Concert, EDM Nite" },
  { year: "2016", text: "Transform Maharashtra launched by Hon. CM Devendra Fadnavis" },
  { year: "2019", text: "MAGIC! performed for the first time in India" },
];

export default function TravellingAir() {
  return (
    <div className="w-full min-h-screen bg-slate-900 relative overflow-hidden">
      {/* Header Section */}
      <div className="relative z-50 pt-16 pb-8 text-center">
        <motion.h2 
          className="text-4xl md:text-5xl font-bold text-white mb-4"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          Mood Indigo
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 ml-3">
            Journey
          </span>
        </motion.h2>
        <motion.p
          className="text-lg text-gray-300 max-w-2xl mx-auto"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Experience the evolution of India's largest college festival through time
        </motion.p>
      </div>

      {/* Timeline Events Cards */}
      <div className="relative z-40 px-4 md:px-8 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {events.map((event, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
            >
              <Card className="bg-slate-800/90 border border-cyan-400/30 shadow-xl hover:shadow-2xl hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-sm">
                <CardContent className="p-6">
                  <div className="flex items-center mb-3">
                    <div className="w-3 h-3 bg-cyan-400 rounded-full mr-3"></div>
                    <span className="text-2xl font-bold text-cyan-400">{event.year}</span>
                  </div>
                  <p className="text-gray-200 leading-relaxed">{event.text}</p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ZigZag Airplane Animation Background */}
      <div className="absolute inset-0 z-10">
        <ZigZagAirplane 
          speed="medium" 
          size="medium" 
          trail={true}
          className="opacity-60"
        />
      </div>

      {/* Background Overlay */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 opacity-95"></div>
    </div>
  );
}

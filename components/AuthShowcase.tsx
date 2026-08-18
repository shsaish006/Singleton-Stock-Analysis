"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote } from 'lucide-react';

const quotes = [
  {
    text: "The stock market is a device for transferring money from the impatient to the patient.",
    author: "Warren Buffett",
    region: "US"
  },
  {
    text: "Respect the market. Have an open mind. Know what to stake. Know when to take a loss.",
    author: "Rakesh Jhunjhunwala",
    region: "IN"
  },
  {
    text: "Behind every stock is a company. Find out what it's doing.",
    author: "Peter Lynch",
    region: "US"
  },
  {
    text: "If you want to be a successful investor, you have to be able to detach yourself from the emotions of the crowd.",
    author: "Radhakishan Damani",
    region: "IN"
  }
];

const mockStocks = [
  { sym: "RELIANCE", name: "Reliance Ind.", price: "₹2,984.50", change: "+1.2%", down: false, region: "IN" },
  { sym: "NVDA", name: "Nvidia Corp.", price: "$118.85", change: "+2.1%", down: false, region: "US" },
  { sym: "TCS", name: "Tata Consultancy", price: "₹3,842.10", change: "-0.4%", down: true, region: "IN" },
  { sym: "AAPL", name: "Apple Inc.", price: "$224.42", change: "+1.5%", down: false, region: "US" }
];

export default function AuthShowcase() {
  const [currentQuoteIndex, setCurrentQuoteIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentQuoteIndex((prev) => (prev + 1) % quotes.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full max-w-xl flex flex-col gap-8">
      {/* Dynamic Graph & Watchlist Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full p-8 bg-white border border-[#E8DCC2] rounded-3xl shadow-xl shadow-black/5"
      >
        <div className="flex justify-between items-center mb-6">
          <h3 className="font-serif font-bold text-2xl text-[#111827]">Global Markets</h3>
          <div className="flex gap-2">
             <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
             <span className="text-xs font-bold text-[#6B7280] uppercase tracking-wider">Live</span>
          </div>
        </div>
        
        {/* Animated SVG Graph */}
        <div className="h-48 bg-[#FAFAFA] border border-[#E8DCC2] rounded-2xl w-full mb-8 relative overflow-hidden flex items-end">
          <svg viewBox="0 0 1000 200" className="w-full h-full absolute bottom-0 left-0" preserveAspectRatio="none">
            <defs>
              <linearGradient id="authGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#10B981" stopOpacity="0" />
              </linearGradient>
            </defs>
            <motion.path 
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 2, ease: "easeInOut" }}
              d="M0,160 L100,140 L200,160 L350,80 L500,120 L650,40 L800,80 L1000,20" 
              fill="none" 
              stroke="#10B981" 
              strokeWidth="4" 
            />
            <motion.path 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1, duration: 1 }}
              d="M0,160 L100,140 L200,160 L350,80 L500,120 L650,40 L800,80 L1000,20 L1000,200 L0,200 Z" 
              fill="url(#authGradient)" 
            />
          </svg>
        </div>

        {/* Global Stock Tickers */}
        <div className="grid grid-cols-2 gap-4">
          {mockStocks.map((stock, i) => (
            <motion.div 
              key={stock.sym}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 + (i * 0.1) }}
              className="p-3 bg-[#FDFBF7] rounded-xl border border-[#E8DCC2] flex justify-between items-center"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-[#111827]">{stock.sym}</span>
                  <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 text-gray-600 rounded font-bold">{stock.region}</span>
                </div>
                <div className="text-xs text-[#6B7280] truncate w-24">{stock.name}</div>
              </div>
              <div className="text-right">
                <div className="font-bold text-[#111827] text-sm">{stock.price}</div>
                <div className={`text-xs font-semibold ${stock.down ? 'text-red-600' : 'text-emerald-600'}`}>
                  {stock.change}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Rotating Quotes Section */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="w-full p-8 bg-[#111827] text-white rounded-3xl shadow-xl relative overflow-hidden"
      >
        <Quote className="absolute top-6 right-6 w-16 h-16 text-white/5 rotate-180" />
        <div className="relative z-10 min-h-[120px] flex flex-col justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentQuoteIndex}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.5 }}
            >
              <p className="text-lg md:text-xl font-serif italic text-[#FDFBF7] mb-4 leading-relaxed">
                "{quotes[currentQuoteIndex].text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-8 h-px bg-[#E8DCC2]/30"></div>
                <span className="font-semibold text-sm text-[#E8DCC2]">
                  {quotes[currentQuoteIndex].author}
                </span>
                <span className="text-xs px-2 py-0.5 bg-white/10 rounded font-bold text-white/70">
                  {quotes[currentQuoteIndex].region}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}

"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { BarChart2, BrainCircuit, Search, ArrowRight, TrendingUp, Activity, MessageSquare } from 'lucide-react';

const SCROLL_REVEAL = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

export default function MarketingPage() {
  const [selectedStock, setSelectedStock] = useState<string | null>('NVDA');
  const [aiQueryActive, setAiQueryActive] = useState(false);
  const [typingText, setTypingText] = useState("");
  const fullAiText = "NVDA is showing increased momentum compared with its recent trend. Price movement and trading volume are both elevated relative to recent activity.";

  useEffect(() => {
    if (aiQueryActive) {
      // Simulate a realistic processing delay of 1.5 seconds
      const loadingDelay = setTimeout(() => {
        let i = 0;
        const timer = setInterval(() => {
          setTypingText(fullAiText.slice(0, i));
          i++;
          if (i > fullAiText.length) clearInterval(timer);
        }, 30);
        // Clear interval on unmount inside the delay
        return () => clearInterval(timer);
      }, 1500);
      
      return () => clearTimeout(loadingDelay);
    }
  }, [aiQueryActive]);

  const mockWatchlist = [
    { sym: 'NVDA', name: 'Nvidia Corp.', price: '$118.85', change: '+2.10%', prob: 88, insight: "Sector rotation favoring semiconductors. Options market implies high probability of near-term breakout.", volume: '112M', down: false },
    { sym: 'AAPL', name: 'Apple Inc.', price: '$224.42', change: '+1.54%', prob: 82, insight: "Strong volume accumulation ahead of anticipated product announcements. Key resistance broken.", volume: '45M', down: false },
    { sym: 'MSFT', name: 'Microsoft', price: '$420.48', change: '-0.30%', prob: 45, insight: "Consolidating near all-time highs. AI adoption metrics remain strong but valuation presents short-term friction.", volume: '22M', down: true },
    { sym: 'TSLA', name: 'Tesla Inc.', price: '$202.62', change: '+1.72%', prob: 65, insight: "Delivery estimates revised upward. Technical indicators show bullish divergence on the daily chart.", volume: '89M', down: false },
  ];

  const activeStock = mockWatchlist.find(s => s.sym === selectedStock);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden font-sans bg-[#FDFBF7]">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#FDFBF7]/80 backdrop-blur-md border-b border-[#EBE5D9]">
        <div className="mx-auto max-w-7xl px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <div className="bg-[#111827] text-white p-1.5 rounded flex items-center justify-center shadow-sm">
                <BarChart2 className="w-5 h-5" />
              </div>
              <span className="font-serif font-bold text-2xl tracking-tight text-[#111827]">Singleton</span>
            </Link>
          </div>
          <div className="flex items-center gap-6">
            <Link href="/sign-in" className="text-[15px] font-medium text-[#4B5563] hover:text-[#111827] transition-colors">
              Sign in
            </Link>
            <Link href="/sign-up" className="text-[15px] font-medium bg-[#111827] hover:bg-[#374151] text-white px-5 py-2.5 rounded-lg transition-colors shadow-md hidden sm:block">
              Start Tracking
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1 pt-32 md:pt-40 pb-24">
        {/* HERO SECTION */}
        <motion.section 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={SCROLL_REVEAL}
          className="px-6 max-w-5xl mx-auto text-center"
        >
          <div className="space-y-8">
            <div className="text-sm font-bold text-[#6B7280] uppercase tracking-widest">
              AI Market Intelligence
            </div>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold tracking-tight text-[#111827] leading-[1.1] max-w-4xl mx-auto">
              Understand the market before it moves.
            </h1>
            <p className="text-lg md:text-xl text-[#4B5563] max-w-2xl mx-auto leading-relaxed">
              Track your portfolio, uncover market signals, and understand what's moving your investments with AI.
            </p>
            <div className="pt-4 flex justify-center">
              <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-[#111827] hover:bg-[#283040] text-white font-medium rounded-xl text-lg transition-all shadow-xl shadow-black/10 hover:-translate-y-0.5">
                Start Tracking <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </motion.section>

        {/* HERO DASHBOARD MOCKUP */}
        <motion.section 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={SCROLL_REVEAL}
          className="px-6 max-w-5xl mx-auto mt-20 relative z-10"
        >
          <div className="w-full bg-white rounded-[2rem] border border-[#E8DCC2] shadow-2xl shadow-black/10 overflow-hidden">
            {/* Mockup Header (Browser style) */}
            <div className="h-14 border-b border-[#E8DCC2] bg-[#FAFAFA] flex items-center px-6 gap-6">
              <div className="flex gap-2">
                <div className="w-3 h-3 rounded-full bg-[#FF5F56]"></div>
                <div className="w-3 h-3 rounded-full bg-[#FFBD2E]"></div>
                <div className="w-3 h-3 rounded-full bg-[#27C93F]"></div>
              </div>
              <div className="flex-1 max-w-sm mx-auto bg-white border border-[#E8DCC2] h-8 rounded-md flex items-center justify-center text-xs text-[#9CA3AF] font-medium">
                singleton.finance/dashboard
              </div>
            </div>

            {/* Mockup Content */}
            <div className="p-8 md:p-12 bg-[#FDFBF7] flex flex-col items-center">
              <div className="w-full max-w-3xl space-y-8">
                {/* Portfolio Header */}
                <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 relative">
                  <div>
                    <h3 className="text-[#6B7280] font-medium mb-2 text-center md:text-left flex items-center gap-2">
                      Total Portfolio Value <span className="text-[10px] bg-gray-200 text-gray-500 px-1.5 py-0.5 rounded font-bold uppercase tracking-wider">Demo Data</span>
                    </h3>
                    <div className="text-5xl md:text-6xl font-serif font-bold text-[#111827] tracking-tight">$24,821.50</div>
                  </div>
                  <div className="flex items-center gap-2 px-5 py-2.5 bg-emerald-100 text-emerald-700 rounded-full font-bold shadow-sm border border-emerald-200">
                    <TrendingUp className="w-5 h-5" /> +4.82% All Time
                  </div>
                </div>
                
                {/* Hero Chart Graphic */}
                <div className="h-72 w-full bg-white border border-[#E8DCC2] rounded-3xl p-6 relative shadow-sm overflow-hidden flex flex-col justify-between">
                  <div className="flex justify-between items-center relative z-20">
                    <div className="flex gap-2 bg-[#FAFAFA] p-1 rounded-lg border border-[#E8DCC2]">
                      <div className="px-4 py-1.5 bg-white text-[#111827] text-xs font-bold rounded shadow-sm border border-[#E8DCC2]">1D</div>
                      <div className="px-4 py-1.5 text-[#6B7280] text-xs font-semibold rounded hover:bg-gray-100 cursor-pointer">1W</div>
                      <div className="px-4 py-1.5 text-[#6B7280] text-xs font-semibold rounded hover:bg-gray-100 cursor-pointer">1M</div>
                      <div className="px-4 py-1.5 text-[#6B7280] text-xs font-semibold rounded hover:bg-gray-100 cursor-pointer">1Y</div>
                    </div>
                  </div>
                  
                  {/* The Chart */}
                  <div className="absolute inset-x-0 bottom-0 top-16 pt-8">
                    <svg viewBox="0 0 1000 300" className="w-full h-full" preserveAspectRatio="none">
                      <defs>
                        <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                          <stop offset="0%" stopColor="#10B981" stopOpacity="0.3" />
                          <stop offset="100%" stopColor="#10B981" stopOpacity="0.0" />
                        </linearGradient>
                      </defs>
                      <path d="M0,200 L150,160 L300,180 L450,100 L600,140 L750,60 L900,90 L1000,40" fill="none" stroke="#10B981" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
                      <path d="M0,200 L150,160 L300,180 L450,100 L600,140 L750,60 L900,90 L1000,40 L1000,300 L0,300 Z" fill="url(#gradient)" />
                    </svg>
                  </div>
                </div>

                {/* Movers */}
                <div className="pt-4">
                  <h3 className="text-lg font-serif font-bold text-[#111827] mb-4">Top Movers</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {mockWatchlist.map((stock) => (
                      <div key={stock.sym} className="bg-white p-4 rounded-2xl border border-[#E8DCC2] shadow-sm hover:border-[#111827] transition-all cursor-pointer hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-2">
                          <div className="w-8 h-8 bg-[#FDFBF7] rounded-lg flex items-center justify-center font-bold text-[#111827] text-sm border border-[#E8DCC2]">
                            {stock.sym[0]}
                          </div>
                          <div className={`text-sm font-bold ${stock.down ? 'text-red-600' : 'text-emerald-600'}`}>
                            {stock.change}
                          </div>
                        </div>
                        <div className="font-bold text-[#111827]">{stock.sym}</div>
                        <div className="text-sm text-[#6B7280]">{stock.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* AI INTERACTION SECTION ("Ask Singleton") */}
        <motion.section 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={SCROLL_REVEAL}
          className="mt-32 px-6 max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-4xl font-serif font-bold text-[#111827] mb-6 uppercase tracking-wider text-sm">The market, decoded.</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#111827] mb-4">Ask Singleton what's moving the market.</h3>
          </div>

          <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-xl p-8 md:p-12">
            <div className="flex flex-col gap-8">
              {/* User Prompt */}
              <button 
                onClick={() => {
                  if (aiQueryActive) return;
                  setAiQueryActive(true);
                }}
                disabled={aiQueryActive}
                className={`self-end flex items-center gap-3 px-6 py-4 rounded-2xl text-lg font-medium transition-all ${aiQueryActive ? 'bg-[#111827] text-white shadow-lg' : 'bg-[#F5EEDC] text-[#111827] hover:bg-[#EBE5D9] shadow-sm hover:-translate-y-0.5'}`}
              >
                Why is NVDA moving today? <ArrowRight className="w-5 h-5" />
              </button>

              {/* AI Response Area */}
              <AnimatePresence>
                {aiQueryActive && (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-6"
                  >
                    <div className="w-12 h-12 bg-[#111827] rounded-full flex items-center justify-center shrink-0 mt-2 relative">
                      {typingText === "" ? (
                         <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }} className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full" />
                      ) : (
                         <BrainCircuit className="w-6 h-6 text-white" />
                      )}
                    </div>
                    <div className="flex-1 space-y-8 bg-[#FAFAFA] border border-[#E5E7EB] rounded-3xl p-8 shadow-inner relative">
                      <div className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-[-1rem]">Singleton AI</div>
                      
                      {typingText === "" ? (
                        <div className="text-[#6B7280] flex items-center gap-2 h-[80px]">
                          Analyzing real-time market data<span className="animate-pulse">...</span>
                        </div>
                      ) : (
                        <>
                          <p className="text-lg text-[#111827] leading-relaxed min-h-[80px]">
                            {typingText}
                            {typingText.length < fullAiText.length && <span className="inline-block w-2 h-5 bg-[#111827] ml-1 animate-pulse"></span>}
                          </p>

                          {/* Animated Progress Bars */}
                          <div className="space-y-6 pt-6 border-t border-[#E5E7EB]">
                            <div>
                              <div className="flex justify-between text-sm font-semibold mb-2">
                                <span className="text-[#4B5563] flex items-center gap-2"><TrendingUp className="w-4 h-4"/> Momentum</span>
                                <span className="text-[#111827]">87%</span>
                              </div>
                              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: "87%" }} transition={{ duration: 1.5, ease: "easeOut" }} className="h-full bg-[#111827] rounded-full" />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm font-semibold mb-2">
                                <span className="text-[#4B5563] flex items-center gap-2"><Activity className="w-4 h-4"/> Volume</span>
                                <span className="text-[#111827]">81%</span>
                              </div>
                              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: "81%" }} transition={{ duration: 1.5, delay: 0.2, ease: "easeOut" }} className="h-full bg-[#111827] rounded-full" />
                              </div>
                            </div>
                            <div>
                              <div className="flex justify-between text-sm font-semibold mb-2">
                                <span className="text-[#4B5563] flex items-center gap-2"><MessageSquare className="w-4 h-4"/> Technical</span>
                                <span className="text-[#111827]">89%</span>
                              </div>
                              <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
                                <motion.div initial={{ width: 0 }} animate={{ width: "89%" }} transition={{ duration: 1.5, delay: 0.4, ease: "easeOut" }} className="h-full bg-[#111827] rounded-full" />
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* PRODUCT SHOWCASE (Interactive Analysis) */}
        <motion.section 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={SCROLL_REVEAL}
          className="mt-32 px-6 max-w-6xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-4">Deep Interactive Analysis</h2>
            <h3 className="text-3xl md:text-4xl font-serif font-bold text-[#111827]">
              Every asset comes with a data-driven signal score built from market indicators.
            </h3>
          </div>

          <div className="bg-white rounded-3xl border border-[#E5E7EB] shadow-2xl shadow-black/5 overflow-hidden flex flex-col lg:flex-row min-h-[600px]">
            {/* Watchlist Sidebar */}
            <div className="w-full lg:w-96 border-r border-[#E5E7EB] bg-[#FAFAFA] p-8">
              <div className="relative mb-6">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]" />
                <input type="text" placeholder="Search portfolio..." className="w-full pl-9 pr-4 py-3 bg-white border border-[#E5E7EB] rounded-xl text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-[#111827]" />
              </div>
              <h3 className="text-xs font-bold text-[#6B7280] uppercase tracking-widest mb-4">Your Watchlist</h3>
              <div className="space-y-4">
                {mockWatchlist.map(stock => (
                  <button 
                    key={stock.sym}
                    onClick={() => setSelectedStock(stock.sym)}
                    className={`w-full text-left p-5 rounded-2xl border transition-all duration-300 ${selectedStock === stock.sym ? 'bg-white border-[#111827] shadow-lg scale-[1.02]' : 'bg-white border-[#E5E7EB] shadow-sm hover:border-[#D1D5DB] hover:shadow'}`}
                  >
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-bold text-lg text-[#111827]">{stock.sym}</span>
                      <span className="font-semibold text-[#111827]">{stock.price}</span>
                    </div>
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-[#6B7280]">{stock.name}</span>
                      <span className={`font-medium px-2 py-0.5 rounded ${stock.down ? 'bg-red-50 text-red-700' : 'bg-emerald-50 text-emerald-700'}`}>{stock.change}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Main Interactive Panel */}
            <div className="flex-1 bg-white p-8 md:p-12 relative overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeStock ? (
                  <motion.div 
                    key={activeStock.sym}
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.4 }}
                    className="h-full flex flex-col"
                  >
                    <div className="flex justify-between items-start mb-10">
                      <div>
                        <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#111827] mb-2">
                          {activeStock.name}
                        </h2>
                        <div className="flex items-center gap-4 text-[#6B7280]">
                          <span className="px-3 py-1 bg-[#F5EEDC] text-[#111827] font-bold rounded-lg">{activeStock.sym}</span>
                          <span>Vol: {activeStock.volume}</span>
                        </div>
                      </div>
                      <div className="text-right bg-[#FAFAFA] border border-[#E5E7EB] p-4 rounded-2xl shadow-sm">
                        <div className="text-xs text-[#6B7280] uppercase tracking-wider font-bold mb-1">Signal Score</div>
                        <div className={`text-5xl font-bold ${activeStock.prob > 50 ? 'text-emerald-600' : 'text-red-600'}`}>
                          {activeStock.prob}/100
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-8 mb-8">
                      {/* Detailed Probability Metrics */}
                      <div className="bg-white border border-[#E8DCC2] rounded-3xl p-8 shadow-sm">
                        <h4 className="font-bold text-[#111827] mb-6">Technical Signals</h4>
                        <div className="space-y-6">
                          <div className="flex items-center gap-4">
                            <div className="w-24 text-sm font-semibold text-[#6B7280]">Momentum</div>
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: '85%' }} transition={{ duration: 1 }} className="h-full bg-emerald-500"></motion.div>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="w-24 text-sm font-semibold text-[#6B7280]">Volume</div>
                            <div className="flex-1 h-3 bg-gray-100 rounded-full overflow-hidden">
                              <motion.div initial={{ width: 0 }} animate={{ width: '70%' }} transition={{ duration: 1, delay: 0.2 }} className="h-full bg-emerald-500"></motion.div>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* AI Insight Card */}
                      <div className="bg-[#111827] text-white rounded-3xl p-8 shadow-xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
                        <div className="flex items-center gap-3 mb-4 text-[#F5EEDC]">
                          <BrainCircuit className="w-6 h-6" />
                          <h4 className="font-bold text-lg">Singleton Analysis</h4>
                        </div>
                        <p className="text-gray-300 text-lg leading-relaxed">
                          {activeStock.insight}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </div>
        </motion.section>

        {/* HOW IT WORKS SECTION */}
        <motion.section 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-100px" }} variants={SCROLL_REVEAL}
          className="mt-32 px-6 max-w-4xl mx-auto"
        >
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold text-[#6B7280] uppercase tracking-widest mb-4">How Singleton Works</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="text-center md:text-left space-y-4">
              <div className="text-4xl font-serif font-bold text-[#111827]/20 border-b-2 border-[#111827] pb-4 inline-block md:block">01</div>
              <h3 className="text-2xl font-bold text-[#111827]">Track</h3>
              <p className="text-[#6B7280] leading-relaxed">Import your portfolio and monitor prices in real-time across global markets.</p>
            </div>
            <div className="text-center md:text-left space-y-4">
              <div className="text-4xl font-serif font-bold text-[#111827]/20 border-b-2 border-[#111827] pb-4 inline-block md:block">02</div>
              <h3 className="text-2xl font-bold text-[#111827]">Analyze</h3>
              <p className="text-[#6B7280] leading-relaxed">Our AI processes volume, sentiment, and momentum to decode complex signals.</p>
            </div>
            <div className="text-center md:text-left space-y-4">
              <div className="text-4xl font-serif font-bold text-[#111827]/20 border-b-2 border-[#111827] pb-4 inline-block md:block">03</div>
              <h3 className="text-2xl font-bold text-[#111827]">Understand</h3>
              <p className="text-[#6B7280] leading-relaxed">Make confident investment decisions backed by data, not gut feelings.</p>
            </div>
          </div>
        </motion.section>

        {/* FINAL CTA */}
        <motion.section 
          initial="hidden" whileInView="show" viewport={{ once: true, margin: "-50px" }} variants={SCROLL_REVEAL}
          className="mt-32 px-6 max-w-5xl mx-auto text-center"
        >
          <div className="bg-[#111827] text-white rounded-[3rem] p-16 md:p-24 shadow-2xl relative overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#FDFBF7] to-[#111827]"></div>
            <div className="relative z-10 space-y-8">
              <h2 className="text-4xl md:text-6xl font-serif font-bold leading-tight">
                Stop watching charts.<br/>Start understanding them.
              </h2>
              <div className="pt-4">
                <Link href="/sign-up" className="inline-flex items-center gap-2 px-8 py-4 bg-[#F5EEDC] hover:bg-[#E8DCC2] text-[#111827] font-bold rounded-xl text-lg transition-all shadow-xl hover:-translate-y-0.5">
                  Start Tracking <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </div>
          </div>
        </motion.section>

      </main>

      {/* FOOTER */}
      <footer className="border-t border-[#E5E7EB] bg-[#FAFAFA] py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
          <div className="flex items-center gap-2 font-serif font-bold text-[#111827] text-2xl mb-6 md:mb-0">
            <BarChart2 className="w-6 h-6" /> Singleton
          </div>
          <div className="flex gap-8 text-sm font-medium text-[#6B7280]">
            <a href="#" className="hover:text-[#111827] transition-colors">Product</a>
            <a href="#" className="hover:text-[#111827] transition-colors">Pricing</a>
            <a href="#" className="hover:text-[#111827] transition-colors">Privacy</a>
            <a href="#" className="hover:text-[#111827] transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

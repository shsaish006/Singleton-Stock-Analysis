import React from 'react';
import { Playfair_Display, Inter } from 'next/font/google';

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className={`min-h-screen bg-[#FDFBF7] text-[#111827] selection:bg-[#EBE5D9] selection:text-black ${playfair.variable} ${inter.variable} font-sans`}>
      {children}
    </div>
  );
}

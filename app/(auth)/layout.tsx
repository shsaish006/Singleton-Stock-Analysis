import Link from "next/link";
import Image from "next/image";
import {auth} from "@/lib/better-auth/auth";
import {headers} from "next/headers";
import {redirect} from "next/navigation";
import { Playfair_Display, Inter } from 'next/font/google';
import { BarChart2 } from "lucide-react";
import AuthShowcase from "@/components/AuthShowcase";

const playfair = Playfair_Display({ subsets: ['latin'], variable: '--font-playfair' });
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

const Layout = async ({ children }: { children : React.ReactNode }) => {
    const session = await auth.api.getSession({ headers: await headers() })

    if(session?.user) redirect('/dashboard')

    return (
        <main className={`auth-layout ${playfair.variable} ${inter.variable} font-sans`}>
            <section className="auth-left-section scrollbar-hide-default">
                <Link href="/" className="auth-logo flex items-center gap-2">
                    <div className="bg-[#111827] text-white p-1.5 rounded flex items-center justify-center">
                        <BarChart2 className="w-5 h-5" />
                    </div>
                    <span className="font-serif font-bold text-2xl tracking-tight text-[#111827]">Singleton</span>
                </Link>

                <div className="pb-6 lg:pb-8 flex-1">{children}</div>
            </section>

            <section className="auth-right-section">
                <AuthShowcase />
            </section>
        </main>
    )
}
export default Layout

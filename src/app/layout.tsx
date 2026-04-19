import type { Metadata } from 'next'
import { Inter, Geist } from 'next/font/google'
import './globals.css'
import { Providers } from './providers'
import { Toaster } from '@/components/ui/toaster'
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const inter = Inter({ subsets: ['latin'] })
 
export const metadata: Metadata = {
  title: 'WeRent — We Rent, We Return, We Repeat',
  description: 'Fashion rental platform',
}
 
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang='en' className={cn("font-sans", geist.variable)}>
      <body className={inter.className}>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}

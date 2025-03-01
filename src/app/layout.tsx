import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import './globals.css';
import HeaderSection from '@/components/HeaderSection';
import FooterSection from '@/components/FooterSection';

const hindSiliguri = Hind_Siliguri({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-hind-siliguri',
});

export const metadata: Metadata = {
  title: 'বাংলাদেশ সেনা ক্যাম্প',
  description: 'বাংলাদেশ সেনা ক্যাম্পের অফিসিয়াল ওয়েবসাইট। এখানে আপনি সেনা ক্যাম্প সম্পর্কিত সকল তথ্য পাবেন।',
  openGraph: {
    title: 'বাংলাদেশ সেনা ক্যাম্প',
    description: 'বাংলাদেশ সেনা ক্যাম্পের অফিসিয়াল ওয়েবসাইট। এখানে আপনি সেনা ক্যাম্প সম্পর্কিত সকল তথ্য পাবেন।',
    url: 'http://localhost:3000',
    siteName: 'বাংলাদেশ সেনা ক্যাম্প',
    images: [
      {
        url: '/bd_army.png',
        width: 1200,
        height: 630,
        alt: 'বাংলাদেশ সেনা ক্যাম্প',
      },
    ],
    locale: 'bn_BD',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={hindSiliguri.variable}>
      <body className="antialiased bg-[#f5f5f5] text-[#333] max-w-[1200px] mx-auto p-5">
        <HeaderSection />
        <main className="min-h-[calc(100vh-305px)]">{children}</main>
        <FooterSection />
      </body>
    </html>
  );
}

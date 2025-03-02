import FooterSection from '@/components/FooterSection';
import Title from '@/components/Title';
import DataProvider from '@/provider/DataProvider';
import type { Metadata } from 'next';
import { Hind_Siliguri } from 'next/font/google';
import { Toaster } from 'react-hot-toast';
import './globals.css';

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
    <html lang="bn" className={hindSiliguri.variable}>
      <body className="antialiased bg-[#f5f5f5] text-[#333] max-w-[1200px] mx-auto p-5">
        <DataProvider>
          <Title title="বাংলাদেশে সেনাবাহিনীর ক্যাম্প ও থানার লোকেশন" desc="সেনাবাহিনীর ক্যাম্পসমূহ ও থানার লোকেশন এবং যোগাযোগের নম্বর" />
          {children}
          <FooterSection />
          <Toaster position="top-right" reverseOrder={false} />
        </DataProvider>
      </body>
    </html>
  );
}

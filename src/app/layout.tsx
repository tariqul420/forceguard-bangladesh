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
  title: 'ফোর্সগার্ড-বাংলাদেশ',
  description: 'ফোর্সগার্ড-বাংলাদেশ: সেনাবাহিনী ও পুলিশের ক্যাম্প এবং থানার তথ্য, যোগাযোগ নম্বরসহ সহজে খুঁজে পাওয়ার প্ল্যাটফর্ম।',
  openGraph: {
    title: 'ফোর্সগার্ড-বাংলাদেশ',
    description: 'ফোর্সগার্ড-বাংলাদেশ: সেনাবাহিনী ও পুলিশের ক্যাম্প এবং থানার তথ্য, যোগাযোগ নম্বরসহ সহজে খুঁজে পাওয়ার প্ল্যাটফর্ম।',
    url: 'https://forceguard-bd.vercel.app',
    siteName: 'ফোর্সগার্ড-বাংলাদেশ',
    images: [
      {
        url: '/images/bd_flag.jpg',
        width: 1200,
        height: 630,
        alt: 'বাংলাদেশে',
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
    <html suppressHydrationWarning lang="bn" className={hindSiliguri.variable}>
      <body className="antialiased bg-black text-light container mx-auto">
        <DataProvider>
          {children}
          <Toaster position="top-right" reverseOrder={false} />
        </DataProvider>
      </body>
    </html>
  );
}

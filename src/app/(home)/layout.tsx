import FooterSection from '@/components/FooterSection';
import Title from '@/components/Title';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <Title title="বাংলাদেশে সেনাবাহিনীর ক্যাম্প ও থানার লোকেশন" desc="সেনাবাহিনীর ক্যাম্পসমূহ ও থানার লোকেশন এবং যোগাযোগের নম্বর" />
      {children}
      <FooterSection />
    </main>
  );
}

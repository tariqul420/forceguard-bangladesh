import FooterSection from '@/components/FooterSection';
import HeaderSection from '@/components/police/HeaderSectionPolice';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderSection />
      <div className="min-h-[calc(100vh-305px)]">{children}</div>
      <FooterSection />
    </div>
  );
}

import HeaderSection from '@/components/army/HeaderSection';
import FooterSection from '@/components/FooterSection';

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

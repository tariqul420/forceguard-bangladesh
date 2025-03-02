import HeaderSection from '@/components/HeaderSection';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <HeaderSection />
      <main className="min-h-[calc(100vh-305px)]">{children}</main>
    </div>
  );
}

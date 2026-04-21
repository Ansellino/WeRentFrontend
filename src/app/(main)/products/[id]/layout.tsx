import FloatingContact from '../../../../components/layout/FloatingContact';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-6 max-w-5xl">
        {children}
      </main>
      <FloatingContact />
    </div>
  );
}

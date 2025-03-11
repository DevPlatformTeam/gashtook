export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="bg-slate-300 h-screen w-full flex justify-center items-center">
      {children}
    </div>
  );
}

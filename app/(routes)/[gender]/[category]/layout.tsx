export default function CategoryLayout({ 
  children,
}: { 
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900">
      {children}
    </div>
  );
} 
import AdminSidebar from '@/components/layout/AdminSidebar'

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen bg-cs-black overflow-hidden">
      {/* Admin sidebar */}
      <div className="hidden lg:flex flex-col w-64 flex-shrink-0">
        <AdminSidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        {/* Admin topbar */}
        <header className="h-16 bg-cs-black border-b border-cs-border flex items-center px-6">
          <div className="flex items-center gap-3">
            <div className="w-2 h-2 rounded-full bg-cs-gold animate-pulse" />
            <span className="text-sm text-cs-white-muted">
              Modo administrador ·{' '}
              <span className="text-cs-white">Cássia Souza</span>
            </span>
          </div>
        </header>
        <main className="flex-1 overflow-y-auto bg-cs-black">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

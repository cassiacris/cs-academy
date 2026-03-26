import Sidebar from '@/components/layout/Sidebar'
import Topbar from '@/components/layout/Topbar'

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const userName = 'Cássia Souza'

  return (
    <div className="flex h-screen bg-cs-black overflow-hidden">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex flex-col w-64 flex-shrink-0">
        <Sidebar />
      </div>

      {/* Main area */}
      <div className="flex flex-col flex-1 min-w-0 overflow-hidden">
        <Topbar userName={userName} userEmail="cassia@csacademy.com.br" />
        <main className="flex-1 overflow-y-auto bg-cs-black">
          <div className="p-6 max-w-7xl mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}

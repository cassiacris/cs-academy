'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  LayoutDashboard,
  BookOpen,
  Users,
  MessageSquare,
  FolderOpen,
  LogOut,
  ArrowLeft,
  Shield,
  Package,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const adminNavItems = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/cursos', label: 'Cursos', icon: BookOpen },
  { href: '/admin/produtos', label: 'Produtos', icon: Package },
  { href: '/admin/alunas', label: 'Alunas', icon: Users },
  { href: '/admin/feed', label: 'Feed', icon: MessageSquare },
  { href: '/admin/materiais', label: 'Materiais', icon: FolderOpen },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
  }

  return (
    <aside className="flex flex-col h-full bg-cs-black border-r border-cs-border">
      {/* Logo + admin badge */}
      <div className="px-6 py-7 border-b border-cs-border">
        <Link href="/admin" className="inline-flex items-baseline gap-1 mb-2">
          <span className="text-2xl font-black text-cs-gold tracking-tight">CS</span>
          <span className="text-xl font-light text-cs-white tracking-widest uppercase text-sm">
            Academy
          </span>
        </Link>
        <div className="flex items-center gap-1.5">
          <Shield className="w-3 h-3 text-cs-gold" />
          <span className="text-xs text-cs-gold font-medium tracking-wide">
            Painel Administrativo
          </span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {adminNavItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href !== '/admin' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 relative group',
                isActive
                  ? 'bg-cs-gold-dim text-cs-gold'
                  : 'text-cs-white-muted hover:text-cs-white hover:bg-cs-black-subtle'
              )}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-cs-gold rounded-r-full" />
              )}
              <Icon
                className={cn(
                  'w-4 h-4 flex-shrink-0',
                  isActive
                    ? 'text-cs-gold'
                    : 'text-cs-white-dim group-hover:text-cs-white'
                )}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom actions */}
      <div className="px-3 py-5 border-t border-cs-border space-y-1">
        <Link
          href="/dashboard"
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cs-white-muted hover:text-cs-white hover:bg-cs-black-subtle transition-all duration-200"
        >
          <ArrowLeft className="w-4 h-4 flex-shrink-0" />
          Ver plataforma
        </Link>
        <button
          onClick={handleSignOut}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-cs-white-muted hover:text-red-400 hover:bg-red-500/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-4 h-4 flex-shrink-0" />
          Sair
        </button>
      </div>
    </aside>
  )
}

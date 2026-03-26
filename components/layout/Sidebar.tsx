'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  Home,
  BookOpen,
  MessageSquare,
  FolderOpen,
  User,
  LogOut,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { createClient } from '@/lib/supabase/client'

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Home },
  { href: '/cursos', label: 'Meus Cursos', icon: BookOpen },
  { href: '/feed', label: 'Comunidade', icon: MessageSquare },
  { href: '/materiais', label: 'Materiais', icon: FolderOpen },
  { href: '/perfil', label: 'Meu Perfil', icon: User },
]

interface SidebarProps {
  onClose?: () => void
}

export default function Sidebar({ onClose }: SidebarProps) {
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  return (
    <aside className="flex flex-col h-full bg-cs-black border-r border-cs-border">
      {/* Logo */}
      <div className="px-6 py-7 border-b border-cs-border">
        <Link
          href="/dashboard"
          className="inline-flex items-baseline gap-1"
          onClick={onClose}
        >
          <span className="text-2xl font-black text-cs-gold tracking-tight">CS</span>
          <span className="text-xl font-light text-cs-white tracking-widest uppercase text-sm">
            Academy
          </span>
        </Link>
        <p className="text-xs text-cs-white-dim mt-1 tracking-wide">
          Plataforma de Aprendizado
        </p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-5 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive =
            pathname === item.href ||
            (item.href !== '/dashboard' && pathname.startsWith(item.href))

          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
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
                  isActive ? 'text-cs-gold' : 'text-cs-white-dim group-hover:text-cs-white'
                )}
              />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Divider + Sign out */}
      <div className="px-3 py-5 border-t border-cs-border">
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

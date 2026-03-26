'use client'

import { useState } from 'react'
import { Menu, Bell, X } from 'lucide-react'
import { cn, getInitials } from '@/lib/utils'
import Sidebar from './Sidebar'

interface TopbarProps {
  userName: string
  userEmail?: string
}

export default function Topbar({ userName, userEmail }: TopbarProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <>
      <header className="h-16 bg-cs-black border-b border-cs-border flex items-center justify-between px-6 sticky top-0 z-30">
        {/* Mobile hamburger */}
        <button
          className="lg:hidden text-cs-white-muted hover:text-cs-white transition-colors"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu className="w-5 h-5" />
        </button>

        {/* Mobile logo */}
        <div className="lg:hidden flex items-baseline gap-1">
          <span className="text-xl font-black text-cs-gold">CS</span>
          <span className="text-sm font-light text-cs-white tracking-widest uppercase">
            Academy
          </span>
        </div>

        {/* Spacer */}
        <div className="hidden lg:block flex-1" />

        {/* Right side */}
        <div className="flex items-center gap-4">
          <button className="relative text-cs-white-muted hover:text-cs-white transition-colors">
            <Bell className="w-5 h-5" />
            <span className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-cs-gold rounded-full" />
          </button>

          <div className="flex items-center gap-3">
            <div className="text-right hidden sm:block">
              <p className="text-sm font-medium text-cs-white leading-tight">
                {userName}
              </p>
              {userEmail && (
                <p className="text-xs text-cs-white-dim">{userEmail}</p>
              )}
            </div>
            <div className="w-9 h-9 rounded-full bg-cs-gold-dim border border-cs-gold/30 flex items-center justify-center">
              <span className="text-xs font-bold text-cs-gold">
                {getInitials(userName)}
              </span>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/60 z-40 lg:hidden backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div
            className={cn(
              'fixed inset-y-0 left-0 w-72 z-50 lg:hidden transition-transform duration-300',
              sidebarOpen ? 'translate-x-0' : '-translate-x-full'
            )}
          >
            <div className="relative h-full">
              <button
                className="absolute top-4 right-4 z-10 text-cs-white-muted hover:text-cs-white transition-colors"
                onClick={() => setSidebarOpen(false)}
              >
                <X className="w-5 h-5" />
              </button>
              <Sidebar onClose={() => setSidebarOpen(false)} />
            </div>
          </div>
        </>
      )}
    </>
  )
}

'use client'

import Image from 'next/image'
import Link from "next/link";
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { Bot, BrainCircuit, Code2, Plus, Store } from 'lucide-react'
import { Button } from '@base-ui/react/button'

const agents = [
  { id: 'research', name: 'Research Assistant', icon: BrainCircuit, color: 'bg-sky-100 text-sky-700 dark:bg-sky-950 dark:text-sky-300' },
  { id: 'code', name: 'Code Reviewer', icon: Code2, color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300' },
  { id: 'support', name: 'Support Agent', icon: Bot, color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300' },
]

function AppSidebar() {
  const [activeAgent, setActiveAgent] = useState(agents[0].id)
  const { data: session } = useSession()
  const user = session?.user
  const username = user?.name || user?.email?.split('@')[0] || 'Your account'
  const initials = username
    .split(/[\s.@_-]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase()

  return (
    <aside className="flex w-full shrink-0 flex-col border-b border-sidebar-border bg-sidebar text-sidebar-foreground md:h-full md:w-64 md:border-b-0 md:border-r">
      <div className="flex items-center gap-3 px-5 py-5">
        <Image alt="" className="h-6 w-auto object-contain" height={24} priority src="/logo.svg" width={36} />
        <span className="text-lg font-semibold tracking-tight text-teal-600">Hornworm</span>
      </div>

      <div className="px-3 pb-6 pt-2">
        <Link href="/workspace/create-agent">
          <Button
            className="flex h-10 w-full items-center justify-center gap-2 rounded-md bg-sidebar-primary px-3 text-sm font-medium text-sidebar-primary-foreground transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
            type="button"
          >
            <Plus aria-hidden="true" size={16} />
            Create New Agent
          </Button>
        </Link>
      </div>

      <nav aria-label="Your agents" className="px-3">
        <h2 className="px-2 pb-2 text-xs font-medium uppercase tracking-wider text-muted-foreground">
          Your Agents
        </h2>
        <ul className="space-y-1">
          {agents.map(({ id, name, icon: Icon, color }) => (
            <li key={id}>
              <button
                aria-pressed={activeAgent === id}
                className={`flex h-10 w-full items-center gap-3 rounded-md px-2 text-left text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring ${
                  activeAgent === id
                    ? 'bg-sidebar-accent font-medium text-sidebar-accent-foreground'
                    : 'text-sidebar-foreground/75 hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground'
                }`}
                onClick={() => setActiveAgent(id)}
                type="button"
              >
                <span className={`flex size-7 shrink-0 items-center justify-center rounded-md ${color}`}>
                  <Icon aria-hidden="true" size={15} strokeWidth={1.9} />
                </span>
                <span className="truncate">{name}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-6 border-t border-sidebar-border px-3 py-3 md:mt-auto">
        <button
          className="mb-2 flex h-10 w-full items-center gap-3 rounded-md px-2 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sidebar-ring"
          type="button"
        >
          <Store aria-hidden="true" size={17} />
          Marketplace
        </button>
        <div className="flex min-w-0 items-center gap-3 rounded-md px-2 py-2">
          <span className="relative flex size-8 shrink-0 items-center justify-center overflow-hidden rounded-full bg-emerald-100 text-xs font-semibold text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            {user?.image ? (
              <Image alt="" className="object-cover" fill sizes="32px" src={user.image} unoptimized />
            ) : initials}
          </span>
          <span className="truncate text-sm font-medium">{username}</span>
        </div>
      </div>
    </aside>
  )
}

export default AppSidebar

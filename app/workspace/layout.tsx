import React from 'react'
import AppSidebar from '@/components/custom/workspace/AppSidebar'

function WorkspaceLayout({children}: {children: React.ReactNode}) {
  return (
    <div className="flex min-h-screen flex-col bg-background md:h-dvh md:min-h-0 md:flex-row md:overflow-hidden">
      <AppSidebar />
      <main className="min-w-0 flex-1 md:min-h-0 md:overflow-hidden">
        {children}
      </main>
    </div>
  )
}

export default WorkspaceLayout

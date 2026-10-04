'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { RefreshCw } from 'lucide-react'

function CreateAgent() {
  const [avatarSeed, setAvatarSeed] = useState(1)
  const [description, setDescription] = useState('')
  const [submissionMessage, setSubmissionMessage] = useState('')
  const avatarUrl = new URL('https://api.dicebear.com/10.x/critters/svg')
  avatarUrl.searchParams.set('tags', 'animation')
  avatarUrl.searchParams.set('seed', `hornworm-${avatarSeed}`)

  return (
    <main className="flex h-dvh items-center overflow-hidden bg-background px-4 py-3 text-foreground sm:px-8 sm:py-4">
      <div className="mx-auto w-full max-w-2xl">
        <header className="mb-4">
          <h1 className="text-2xl font-semibold tracking-tight">Create New Agent</h1>
          <p className="mt-1 max-w-xl text-sm leading-5 text-muted-foreground">
            Set up your AI agent by choosing an avatar, name, and description.
          </p>
        </header>

        <section aria-label="Agent avatar" className="mb-5 flex flex-col items-center text-center">
          <Image
            alt="Agent avatar"
            className="size-20 rounded-full bg-muted object-cover ring-4 ring-muted/70"
            height={80}
            src={avatarUrl.toString()}
            unoptimized
            width={80}
          />
          <button
            className="mt-3 inline-flex h-8 items-center gap-2 rounded-md border border-border bg-background px-3 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            onClick={() => setAvatarSeed((current) => current + 1)}
            type="button"
          >
            <RefreshCw aria-hidden="true" size={15} />
            Shuffle Avatar
          </button>
        </section>

        <form
          id="agent-details-form"
          className="space-y-4"
          onSubmit={(event) => {
            event.preventDefault()
            setSubmissionMessage('Agent creation is not connected yet.')
          }}
        >
          <div className="space-y-3">
            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="agent-name">Agent Name</label>
              <input
                autoComplete="off"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                id="agent-name"
                name="name"
                placeholder="e.g. Research Assistant"
                required
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-sm font-medium" htmlFor="agent-description">Agent Description <span className="font-normal text-muted-foreground">(optional)</span></label>
              <textarea
                className="min-h-20 w-full resize-y rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm outline-none transition-colors placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
                maxLength={1000}
                onChange={(event) => setDescription(event.target.value)}
                id="agent-description"
                name="description"
                placeholder="Describe what this agent will help you with..."
                rows={3}
                value={description}
              />
              <p aria-live="polite" className="text-right text-xs text-muted-foreground">
                {description.length}/1000
              </p>
            </div>
          </div>
        </form>

        <div className="mt-4 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
          <Link
            className="inline-flex h-9 items-center justify-center rounded-md border border-border bg-background px-4 text-sm font-medium transition-colors hover:bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            href="/workspace"
          >
            Cancel
          </Link>
          <button
            className="inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50"
            form="agent-details-form"
            type="submit"
          >
            Create Agent
          </button>
        </div>
        {submissionMessage && <p aria-live="polite" className="mt-3 text-right text-sm text-muted-foreground">{submissionMessage}</p>}
      </div>
    </main>
  )
}

export default CreateAgent

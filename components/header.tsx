"use client"

import { BookOpen } from "lucide-react"
import { AddResourceDialog } from "./add-resource-dialog"
import { SettingsDialog } from "./settings-dialog"
import type { Resource } from "@/lib/resources-data"

interface HeaderProps {
  resources: Resource[]
  onAddResource: (resource: Resource) => void
  onImport: (resources: Resource[]) => void
  popularTags: string[]
}

export function Header({ resources, onAddResource, onImport, popularTags }: HeaderProps) {
  return (
    <header className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-background" />
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, oklch(0.55 0.22 250 / 0.1) 0%, transparent 50%),
                           radial-gradient(circle at 80% 20%, oklch(0.70 0.20 330 / 0.1) 0%, transparent 40%),
                           radial-gradient(circle at 40% 80%, oklch(0.70 0.15 180 / 0.1) 0%, transparent 40%)`
        }}
      />
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-center text-foreground mb-4 text-balance">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            User Experience Design with AI
          </span>
          <br />
          <span className="text-foreground text-2xl md:text-3xl lg:text-4xl font-semibold">Knowledge Library</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-8 text-pretty">
          Explore our curated collection of learning resources to master the intersection of UX design and artificial intelligence.
        </p>

        {/* Add Resource Button */}
        <div className="flex justify-center">
          <AddResourceDialog onAddResource={onAddResource} popularTags={popularTags} existingResources={resources} />
        </div>
      </div>
    </header>
  )
}

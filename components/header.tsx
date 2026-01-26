"use client"

import { BookOpen, FileText, Video, Link, ImageIcon } from "lucide-react"
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
  const stats = {
    total: resources.length,
    pdfs: resources.filter(r => r.type === "pdf").length,
    videos: resources.filter(r => r.type === "video").length,
    links: resources.filter(r => r.type === "link").length,
    graphics: resources.filter(r => r.type === "graphic").length,
  }

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
        <p className="text-base md:text-lg text-muted-foreground text-center max-w-2xl mx-auto mb-6 text-pretty">
          Explore our curated collection of learning resources to master the intersection of UX design and artificial intelligence.
        </p>

        {/* Action Buttons */}
        <div className="flex justify-center gap-3 mb-8">
          <AddResourceDialog onAddResource={onAddResource} popularTags={popularTags} />
          <SettingsDialog resources={resources} onImport={onImport} />
        </div>

        {/* Stats */}
        <div className="flex flex-wrap justify-center gap-4 md:gap-8">
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <BookOpen className="h-4 w-4 text-primary" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stats.total}</p>
              <p className="text-xs text-muted-foreground">Resources</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.60_0.22_25)]/10 flex items-center justify-center">
              <FileText className="h-4 w-4 text-[oklch(0.60_0.22_25)]" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stats.pdfs}</p>
              <p className="text-xs text-muted-foreground">PDFs</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.60_0.20_330)]/10 flex items-center justify-center">
              <Video className="h-4 w-4 text-[oklch(0.60_0.20_330)]" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stats.videos}</p>
              <p className="text-xs text-muted-foreground">Videos</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.55_0.22_250)]/10 flex items-center justify-center">
              <Link className="h-4 w-4 text-[oklch(0.55_0.22_250)]" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stats.links}</p>
              <p className="text-xs text-muted-foreground">Links</p>
            </div>
          </div>
          
          {/* Image Stat */}
<div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.55_0.22_250)]/10 flex items-center justify-center">
              <Link className="h-4 w-4 text-[oklch(0.55_0.22_250)]" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stats.links}</p>
              <p className="text-xs text-muted-foreground">Links</p>
            </div>
          </div>

          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-card border border-border">
            <div className="w-8 h-8 rounded-lg bg-[oklch(0.70_0.18_145)]/10 flex items-center justify-center">
              <ImageIcon className="h-4 w-4 text-[oklch(0.70_0.18_145)]" />
            </div>
            <div>
              <p className="text-lg font-bold text-foreground">{stats.graphics}</p>
              <p className="text-xs text-muted-foreground">Graphics</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}

"use client"

import { useState, useMemo, useEffect } from "react"
import { Header } from "@/components/header"
import { SearchBar } from "@/components/search-bar"
import { TagFilter } from "@/components/tag-filter"
import { ResourceGallery } from "@/components/resource-gallery"
import { EditResourceDialog } from "@/components/edit-resource-dialog"
import { resources as initialResources, type Resource, type ResourceType, getPopularTags } from "@/lib/resources-data"
import { xmlToResources, resourcesToXml } from "@/lib/xml-utils"
import { colorPalettes, applyPalette, PALETTE_STORAGE_KEY, THEME_STORAGE_KEY } from "@/lib/color-palettes"
import { SlidersHorizontal, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const STORAGE_KEY = "ux-ai-resources"

export default function ResourceLibrary() {
  const [resources, setResources] = useState<Resource[]>(initialResources)
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [selectedType, setSelectedType] = useState<ResourceType | "all">("all")
  const [editResource, setEditResource] = useState<Resource | null>(null)
  const [editDialogOpen, setEditDialogOpen] = useState(false)

  // Load resources from localStorage on mount
  useEffect(() => {
    const loadResources = async () => {
      let resourcesToUse = initialResources
      
      // Try to load from stored localStorage first
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        try {
          const parsed = xmlToResources(stored)
          if (parsed.length > 0) {
            resourcesToUse = parsed
          }
        } catch (err) {
          console.error("Failed to load stored resources:", err)
        }
      } else {
        // If no localStorage data, try to load from /out/resources.xml
        try {
          const response = await fetch('/out/resources.xml')
          if (response.ok) {
            const xmlText = await response.text()
            const parsed = xmlToResources(xmlText)
            if (parsed.length > 0) {
              resourcesToUse = parsed
            }
          }
        } catch (err) {
          console.error("Failed to load resources from /out/resources.xml:", err)
        }
      }
      
      setResources(resourcesToUse)
    }

    loadResources()

    // Load saved theme/palette preferences, defaulting to midnight-gold
    const savedPalette = localStorage.getItem(PALETTE_STORAGE_KEY)
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    
    const palette = colorPalettes.find(p => p.id === (savedPalette || "midnight-gold"))
    if (palette) {
      applyPalette(palette, savedTheme === "dark")
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  // Save resources to localStorage when they change
  useEffect(() => {
    const xml = resourcesToXml(resources)
    localStorage.setItem(STORAGE_KEY, xml)
  }, [resources])

  const popularTags = useMemo(() => {
    return getPopularTags(resources)
  }, [resources])

  const filteredResources = useMemo(() => {
    return resources.filter((resource) => {
      // Search filter
      const searchLower = searchQuery.toLowerCase()
      const matchesSearch = searchQuery === "" || 
        resource.title.toLowerCase().includes(searchLower) ||
        resource.summary.toLowerCase().includes(searchLower) ||
        resource.tags.some(tag => tag.toLowerCase().includes(searchLower)) ||
        (resource.author?.toLowerCase().includes(searchLower) ?? false)

      // Type filter
      const matchesType = selectedType === "all" || resource.type === selectedType

      // Tag filter
      const matchesTags = selectedTags.length === 0 || 
        selectedTags.some(tag => resource.tags.includes(tag))

      return matchesSearch && matchesType && matchesTags
    })
  }, [resources, searchQuery, selectedTags, selectedType])

  const typeCounts = useMemo(() => ({
    all: resources.length,
    pdf: resources.filter(r => r.type === "pdf").length,
    video: resources.filter(r => r.type === "video").length,
    link: resources.filter(r => r.type === "link").length,
    graphic: resources.filter(r => r.type === "graphic").length,
  }), [resources])

  const handleTagToggle = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) 
        ? prev.filter((t) => t !== tag) 
        : [...prev, tag]
    )
  }

  const clearAllFilters = () => {
    setSearchQuery("")
    setSelectedTags([])
    setSelectedType("all")
  }

  const handleAddResource = (resource: Resource) => {
    setResources((prev) => [resource, ...prev])
  }

  const handleImport = (importedResources: Resource[]) => {
    setResources(importedResources)
  }

  const handleEditClick = (resource: Resource) => {
    setEditResource(resource)
    setEditDialogOpen(true)
  }

  const handleUpdateResource = (updatedResource: Resource) => {
    setResources((prev) => 
      prev.map((r) => r.id === updatedResource.id ? updatedResource : r)
    )
  }

  const handleDeleteResource = (id: string) => {
    setResources((prev) => prev.filter((r) => r.id !== id))
  }

  const handleRatingChange = (resourceId: string, userRating: number | undefined, ratingSum: number, ratingCount: number) => {
    setResources((prev) =>
      prev.map((r) => r.id === resourceId ? { ...r, userRating, ratingSum, ratingCount } : r)
    )
  }

  const hasActiveFilters = searchQuery !== "" || selectedTags.length > 0 || selectedType !== "all"

  return (
    <div className="min-h-screen bg-background">
      <Header 
        resources={resources} 
        onAddResource={handleAddResource} 
        onImport={handleImport}
        popularTags={popularTags}
      />

      {/* Search and Filters Section */}
      <section className="sticky top-0 z-40 bg-card border-b-2 border-border shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          {/* Search Bar with Settings */}
          <div className="mb-6 flex items-center justify-center gap-3">
            <div className="flex-1 max-w-2xl">
              <SearchBar value={searchQuery} onChange={setSearchQuery} />
            </div>
            <SettingsDialog resources={resources} onImport={handleImport} />
          </div>

          {/* Popular Tags */}
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <SlidersHorizontal className="h-4 w-4" />
              <span>Popular Tags</span>
            </div>
            <TagFilter 
              tags={popularTags} 
              selectedTags={selectedTags} 
              onTagToggle={handleTagToggle}
            />
          </div>

          {/* Active Filters Summary */}
          {hasActiveFilters && (
            <div className="mt-4 flex items-center justify-center gap-2">
              <span className="text-sm text-muted-foreground">
                Showing {filteredResources.length} of {resources.length} resources
              </span>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={clearAllFilters}
                className="text-primary hover:text-primary/80"
              >
                <X className="h-3 w-3 mr-1" />
                Clear all
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Gallery Section */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ResourceGallery 
          resources={filteredResources} 
          onTagClick={handleTagToggle}
          onEditClick={handleEditClick}
          onRatingChange={handleRatingChange}
        />
      </main>

      {/* Edit Resource Dialog */}
      <EditResourceDialog
        resource={editResource}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
        onSave={handleUpdateResource}
        onDelete={handleDeleteResource}
        popularTags={popularTags}
      />

      {/* Footer */}
      <footer className="border-t border-border bg-card mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6 text-sm text-muted-foreground">
            <div className="text-center md:text-left space-y-2">
              <p>
                A resource library created for{" "}
                <a 
                  href="https://courses.illinois.edu/schedule/terms/INFO/490"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  Informatics 490: User Experience Design with AI
                </a>
              </p>
              <p>
                a course at the University of Illinois at Urbana-Champaign
              </p>
            </div>
            <div className="flex items-center gap-4">
              <a 
                href="https://informatics.ischool.illinois.edu/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="University of Illinois Informatics"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.5-9c.83 0 1.5-.67 1.5-1.5S16.33 8 15.5 8 14 8.67 14 9.5s.67 1.5 1.5 1.5zm-7 0c.83 0 1.5-.67 1.5-1.5S9.33 8 8.5 8 7 8.67 7 9.5 7.67 11 8.5 11zm3.5 6.5c2.33 0 4.31-1.46 5.11-3.5H6.89c.8 2.04 2.78 3.5 5.11 3.5z"/>
                </svg>
              </a>
              <a 
                href="https://github.com/Geph/v0-ai-ux-design-course"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="GitHub Repository"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>
              <a 
                href="https://vercel.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                title="Built with Vercel"
              >
                <svg className="h-6 w-6" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M24 22.525H0l12-20.05 12 20.05z"/>
                </svg>
              </a>
            </div>
            <p className="whitespace-nowrap">Curated collection of {resources.length} resources</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

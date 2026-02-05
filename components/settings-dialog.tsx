"use client"

import React, { useRef, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { RichTextEditor } from "@/components/rich-text-editor"
import { Settings, Download, Upload, Check, Sun, Moon, X, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { exportXmlFile, xmlToResources } from "@/lib/xml-utils"
import { colorPalettes, applyPalette, PALETTE_STORAGE_KEY, THEME_STORAGE_KEY, type ColorPalette } from "@/lib/color-palettes"
import type { Resource } from "@/lib/resources-data"
import { Badge } from "@/components/ui/badge"

const POPULAR_TAGS_STORAGE_KEY = "ux-ai-popular-tags"
const APP_NAME_STORAGE_KEY = "ux-ai-app-name"
const APP_DESCRIPTION_STORAGE_KEY = "ux-ai-app-description"
const APP_FOOTER_STORAGE_KEY = "ux-ai-app-footer"

interface SettingsDialogProps {
  resources: Resource[]
  onImport: (resources: Resource[]) => void
  onDeleteAllResources?: () => void
  onAppNameChange?: (name: string) => void
  onAppDescriptionChange?: (description: string) => void
  onFooterTextChange?: (text: string) => void
  currentAppName?: string
  currentAppDescription?: string
  currentFooterText?: string
}

export function SettingsDialog({ 
  resources, 
  onImport,
  onDeleteAllResources,
  onAppNameChange,
  onAppDescriptionChange,
  onFooterTextChange,
  currentAppName = "User Experience Design with AI",
  currentAppDescription = "Explore our curated collection of learning resources to master the intersection of UX design and artificial intelligence.",
  currentFooterText = 'A resource library created for <a href="https://courses.illinois.edu/schedule/terms/INFO/490" target="_blank" rel="noopener noreferrer">Informatics 490: User Experience Design with AI</a>, a course at the University of Illinois at Urbana-Champaign'
}: SettingsDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedPalette, setSelectedPalette] = useState<string>("vibrant-blue")
  const [isDark, setIsDark] = useState(false)
  const [customTags, setCustomTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [appName, setAppName] = useState(currentAppName)
  const [appDescription, setAppDescription] = useState(currentAppDescription)
  const [footerText, setFooterText] = useState(currentFooterText)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load saved preferences on mount
  useEffect(() => {
    const savedPalette = localStorage.getItem(PALETTE_STORAGE_KEY)
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    const savedTags = localStorage.getItem(POPULAR_TAGS_STORAGE_KEY)
    
    if (savedPalette) {
      setSelectedPalette(savedPalette)
    }
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    }
    if (savedTags) {
      setCustomTags(JSON.parse(savedTags))
    }
    
    // Load app metadata
    const savedName = localStorage.getItem(APP_NAME_STORAGE_KEY)
    if (savedName) setAppName(savedName)
    
    const savedDescription = localStorage.getItem(APP_DESCRIPTION_STORAGE_KEY)
    if (savedDescription) setAppDescription(savedDescription)
    
    const savedFooter = localStorage.getItem(APP_FOOTER_STORAGE_KEY)
    if (savedFooter) setFooterText(savedFooter)
    
    // Apply saved palette
    const palette = colorPalettes.find(p => p.id === (savedPalette || "vibrant-blue"))
    if (palette) {
      applyPalette(palette, savedTheme === "dark")
      if (savedTheme === "dark") {
        document.documentElement.classList.add("dark")
      }
    }
  }, [])

  const handlePaletteChange = (paletteId: string) => {
    setSelectedPalette(paletteId)
    localStorage.setItem(PALETTE_STORAGE_KEY, paletteId)
    
    const palette = colorPalettes.find(p => p.id === paletteId)
    if (palette) {
      applyPalette(palette, isDark)
    }
  }

  const handleThemeToggle = () => {
    const newIsDark = !isDark
    setIsDark(newIsDark)
    localStorage.setItem(THEME_STORAGE_KEY, newIsDark ? "dark" : "light")
    
    if (newIsDark) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
    
    const palette = colorPalettes.find(p => p.id === selectedPalette)
    if (palette) {
      applyPalette(palette, newIsDark)
    }
  }

  const handleExport = async () => {
    await exportXmlFile(resources, `ux-ai-resources-${new Date().toISOString().split("T")[0]}.xml`)
  }

  const handleSaveAsDefault = async () => {
    if (!confirm("This will download resources.xml which you should place in /public/out/ for deployment. Continue?")) {
      return
    }

    // Generate XML and download client-side (no API needed)
    await exportXmlFile(resources, "resources.xml")
    alert("resources.xml downloaded! Place it in /public/out/ folder for deployment.")
  }

  const handleImportClick = () => {
    fileInputRef.current?.click()
  }

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    try {
      const text = await file.text()
      const importedResources = xmlToResources(text)
      onImport(importedResources)
      alert(`Successfully imported ${importedResources.length} resources!`)
    } catch (err) {
      console.error("Failed to import XML:", err)
      alert("Failed to import XML file. Please check the format.")
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleAddTag = () => {
    if (newTag.trim() && !customTags.includes(newTag.trim())) {
      const updated = [...customTags, newTag.trim()]
      setCustomTags(updated)
      localStorage.setItem(POPULAR_TAGS_STORAGE_KEY, JSON.stringify(updated))
      setNewTag("")
    }
  }

  const handleRemoveTag = (tag: string) => {
    const updated = customTags.filter(t => t !== tag)
    setCustomTags(updated)
    localStorage.setItem(POPULAR_TAGS_STORAGE_KEY, JSON.stringify(updated))
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="bg-transparent">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your library appearance and manage your data.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6 py-4 pr-4">
          {/* App Name */}
          <div className="space-y-3">
            <Label htmlFor="app-name" className="text-sm font-medium">Library Name</Label>
            <Input
              id="app-name"
              value={appName}
              onChange={(e) => {
                setAppName(e.target.value)
                onAppNameChange?.(e.target.value)
                localStorage.setItem(APP_NAME_STORAGE_KEY, e.target.value)
              }}
              placeholder="Enter library name"
            />
          </div>

          {/* App Description */}
          <div className="space-y-3">
            <Label htmlFor="app-description" className="text-sm font-medium">Library Description</Label>
            <textarea
              id="app-description"
              value={appDescription}
              onChange={(e) => {
                setAppDescription(e.target.value)
                onAppDescriptionChange?.(e.target.value)
                localStorage.setItem(APP_DESCRIPTION_STORAGE_KEY, e.target.value)
              }}
              placeholder="Enter library description"
              className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background resize-none"
              rows={3}
            />
          </div>

          {/* Footer Text */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Footer Text (with formatting)</Label>
            <p className="text-xs text-muted-foreground">Use Ctrl+K to add links. Bold and italic are also supported.</p>
            <RichTextEditor
              value={footerText}
              onChange={(value) => {
                setFooterText(value)
                onFooterTextChange?.(value)
                localStorage.setItem(APP_FOOTER_STORAGE_KEY, value)
              }}
              placeholder="Enter footer text"
              rows={3}
            />
          </div>

          {/* Color Palette Selection */}
          <div className="space-y-3 border-t pt-4">
            <Label className="text-sm font-medium">Color Palette</Label>
            <div className="grid grid-cols-2 gap-2">
              {colorPalettes.map((palette) => (
                <PaletteOption
                  key={palette.id}
                  palette={palette}
                  isSelected={selectedPalette === palette.id}
                  onClick={() => handlePaletteChange(palette.id)}
                />
              ))}
            </div>
          </div>

          {/* Import/Export Section */}
          <div className="space-y-3 border-t pt-4">
            <Label className="text-sm font-medium">Data Management</Label>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept=".xml"
                onChange={handleFileChange}
                className="hidden"
                aria-label="Import XML file"
              />
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleImportClick} 
                className="flex-1 gap-2 bg-transparent"
              >
                <Upload className="h-4 w-4" />
                Import XML
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleExport} 
                className="flex-1 gap-2 bg-transparent"
              >
                <Download className="h-4 w-4" />
                Export XML
              </Button>
            </div>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={handleSaveAsDefault} 
              className="w-full gap-2 bg-transparent"
            >
              <Check className="h-4 w-4" />
              Save as Default Resources
            </Button>
            <p className="text-xs text-muted-foreground">
              Import or export your resource library. Save as default to use these resources when deployed.
            </p>
          </div>

          {/* Delete All Resources */}
          <div className="space-y-3 border-t pt-4">
            <Label className="text-sm font-medium">Danger Zone</Label>
            <Button 
              variant="destructive" 
              size="sm" 
              onClick={() => {
                if (window.confirm("Are you sure you want to delete all resources? This action cannot be undone.")) {
                  onDeleteAllResources?.()
                  setOpen(false)
                }
              }}
              className="w-full gap-2"
            >
              <Trash2 className="h-4 w-4" />
              Delete All Resources
            </Button>
            <p className="text-xs text-muted-foreground">
              Permanently delete all resources in the library.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface PaletteOptionProps {
  palette: ColorPalette
  isSelected: boolean
  onClick: () => void
}

function PaletteOption({ palette, isSelected, onClick }: PaletteOptionProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-col items-start gap-2 rounded-lg border-2 p-3 text-left transition-all hover:bg-muted/50",
        isSelected ? "border-primary bg-primary/5" : "border-border"
      )}
    >
      {isSelected && (
        <div className="absolute top-2 right-2 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
          <Check className="h-3 w-3 text-primary-foreground" />
        </div>
      )}
      <div className="flex gap-1">
        {palette.preview.map((color, index) => (
          <div
            key={index}
            className="h-5 w-5 rounded-full border border-border/50"
            style={{ backgroundColor: color }}
          />
        ))}
      </div>
      <span className="text-xs font-medium">{palette.name}</span>
    </button>
  )
}

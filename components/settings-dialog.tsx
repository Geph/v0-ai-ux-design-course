"use client"

import React, { useRef, useEffect, useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Settings, Download, Upload, Check, Sun, Moon } from "lucide-react"
import { cn } from "@/lib/utils"
import { exportXmlFile, xmlToResources } from "@/lib/xml-utils"
import { colorPalettes, applyPalette, PALETTE_STORAGE_KEY, THEME_STORAGE_KEY, type ColorPalette } from "@/lib/color-palettes"
import type { Resource } from "@/lib/resources-data"

interface SettingsDialogProps {
  resources: Resource[]
  onImport: (resources: Resource[]) => void
}

export function SettingsDialog({ resources, onImport }: SettingsDialogProps) {
  const [open, setOpen] = useState(false)
  const [selectedPalette, setSelectedPalette] = useState<string>("vibrant-blue")
  const [isDark, setIsDark] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Load saved preferences on mount
  useEffect(() => {
    const savedPalette = localStorage.getItem(PALETTE_STORAGE_KEY)
    const savedTheme = localStorage.getItem(THEME_STORAGE_KEY)
    
    if (savedPalette) {
      setSelectedPalette(savedPalette)
    }
    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    }
    
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

  const handleExport = () => {
    exportXmlFile(resources, `ux-ai-resources-${new Date().toISOString().split("T")[0]}.xml`)
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
    } catch (err) {
      console.error("Failed to import XML:", err)
      alert("Failed to import XML file. Please check the format.")
    }

    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" className="bg-transparent">
          <Settings className="h-4 w-4" />
          <span className="sr-only">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Settings</DialogTitle>
          <DialogDescription>
            Customize your library appearance and manage your data.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Theme Toggle */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Theme Mode</Label>
            <div className="flex gap-2">
              <Button
                variant={!isDark ? "default" : "outline"}
                size="sm"
                onClick={() => isDark && handleThemeToggle()}
                className={cn("flex-1 gap-2", isDark && "bg-transparent")}
              >
                <Sun className="h-4 w-4" />
                Light
              </Button>
              <Button
                variant={isDark ? "default" : "outline"}
                size="sm"
                onClick={() => !isDark && handleThemeToggle()}
                className={cn("flex-1 gap-2", !isDark && "bg-transparent")}
              >
                <Moon className="h-4 w-4" />
                Dark
              </Button>
            </div>
          </div>

          {/* Color Palette Selection */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Color Style</Label>
            <div className="grid grid-cols-2 gap-3">
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
            <p className="text-xs text-muted-foreground">
              Import or export your resource library as an XML file.
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

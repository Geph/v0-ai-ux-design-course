"use client"

import { FileText, Play, Link, LayoutGrid, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ResourceType } from "@/lib/resources-data"

interface TypeFilterProps {
  selectedType: ResourceType | "all"
  onTypeChange: (type: ResourceType | "all") => void
  counts: Record<ResourceType | "all", number>
}

const typeConfig = {
  all: { 
    icon: LayoutGrid, 
    label: "All",
    activeColor: "bg-primary text-primary-foreground",
    inactiveColor: "hover:bg-muted"
  },
  pdf: { 
    icon: FileText, 
    label: "PDFs",
    activeColor: "bg-[oklch(0.60_0.22_25)] text-white",
    inactiveColor: "hover:bg-[oklch(0.60_0.22_25)]/10 hover:text-[oklch(0.60_0.22_25)]"
  },
  video: { 
    icon: Play, 
    label: "Videos",
    activeColor: "bg-[oklch(0.60_0.20_330)] text-white",
    inactiveColor: "hover:bg-[oklch(0.60_0.20_330)]/10 hover:text-[oklch(0.60_0.20_330)]"
  },
  link: { 
    icon: Link, 
    label: "Links",
    activeColor: "bg-[oklch(0.55_0.22_250)] text-white",
    inactiveColor: "hover:bg-[oklch(0.55_0.22_250)]/10 hover:text-[oklch(0.55_0.22_250)]"
  },
  graphic: {
    icon: ImageIcon,
    label: "Graphics",
    activeColor: "bg-[oklch(0.70_0.18_145)] text-white",
    inactiveColor: "hover:bg-[oklch(0.70_0.18_145)]/10 hover:text-[oklch(0.70_0.18_145)]"
  }
}

export function TypeFilter({ selectedType, onTypeChange, counts }: TypeFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {(Object.keys(typeConfig) as Array<ResourceType | "all">).map((type) => {
        const config = typeConfig[type]
        const Icon = config.icon
        const isSelected = selectedType === type

        return (
          <button
            key={type}
            onClick={() => onTypeChange(type)}
            className={cn(
              "flex items-center gap-2 px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200",
              isSelected 
                ? `${config.activeColor} shadow-md` 
                : `bg-card border border-border text-foreground ${config.inactiveColor}`
            )}
          >
            <Icon className="h-4 w-4" />
            <span>{config.label}</span>
            <span className={cn(
              "ml-1 text-xs px-1.5 py-0.5 rounded-full",
              isSelected 
                ? "bg-white/20" 
                : "bg-muted"
            )}>
              {counts[type]}
            </span>
          </button>
        )
      })}
    </div>
  )
}

"use client"

import { cn } from "@/lib/utils"
import { Badge } from "@/components/ui/badge"

interface TagFilterProps {
  tags: string[]
  selectedTags: string[]
  onTagToggle: (tag: string) => void
}

const tagColors: Record<number, string> = {
  0: "bg-[oklch(0.55_0.22_250)] hover:bg-[oklch(0.50_0.22_250)] text-white",
  1: "bg-[oklch(0.70_0.20_330)] hover:bg-[oklch(0.65_0.20_330)] text-white",
  2: "bg-[oklch(0.70_0.15_180)] hover:bg-[oklch(0.65_0.15_180)] text-white",
  3: "bg-[oklch(0.75_0.18_55)] hover:bg-[oklch(0.70_0.18_55)] text-foreground",
  4: "bg-[oklch(0.70_0.18_145)] hover:bg-[oklch(0.65_0.18_145)] text-white",
  5: "bg-[oklch(0.60_0.22_25)] hover:bg-[oklch(0.55_0.22_25)] text-white",
  6: "bg-[oklch(0.65_0.18_280)] hover:bg-[oklch(0.60_0.18_280)] text-white",
  7: "bg-[oklch(0.72_0.16_200)] hover:bg-[oklch(0.67_0.16_200)] text-white",
}

export function TagFilter({ tags, selectedTags, onTagToggle }: TagFilterProps) {
  return (
    <div className="flex flex-wrap justify-center gap-2">
      {tags.map((tag, index) => {
        const isSelected = selectedTags.includes(tag)
        const colorIndex = index % Object.keys(tagColors).length
        
        return (
          <Badge
            key={tag}
            variant="secondary"
            className={cn(
              "cursor-pointer px-4 py-2 text-sm font-medium rounded-full transition-all duration-200 border-2",
              isSelected 
                ? `${tagColors[colorIndex]} border-transparent shadow-md scale-105` 
                : "bg-card text-foreground border-border hover:border-primary/50 hover:bg-secondary"
            )}
            onClick={() => onTagToggle(tag)}
          >
            {tag}
            {isSelected && (
              <span className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-white/30 text-xs">
                ×
              </span>
            )}
          </Badge>
        )
      })}
    </div>
  )
}

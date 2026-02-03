"use client"

import React from "react"
import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Save, Trash2, FileText, Video, Globe, X, Plus, ImageIcon, Camera, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import type { Resource, ResourceType } from "@/lib/resources-data"

interface EditResourceDialogProps {
  resource: Resource | null
  open: boolean
  onOpenChange: (open: boolean) => void
  onSave: (resource: Resource) => void
  onDelete: (id: string) => void
  popularTags: string[]
}

export function EditResourceDialog({ 
  resource, 
  open, 
  onOpenChange, 
  onSave, 
  onDelete,
  popularTags 
}: EditResourceDialogProps) {
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [summary, setSummary] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [duration, setDuration] = useState("")
  const [pages, setPages] = useState("")
  const [year, setYear] = useState("")
  const [url, setUrl] = useState("")
  const [type, setType] = useState<ResourceType>("link")
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false)
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false)

  useEffect(() => {
    if (resource) {
      setTitle(resource.title)
      setAuthor(resource.author || "")
      setSummary(resource.summary)
      setTags(resource.tags)
      setThumbnail(resource.thumbnail)
      setDuration(resource.duration || "")
      setPages(resource.pages?.toString() || "")
      setYear(resource.year?.toString() || "")
      setUrl(resource.url)
      setType(resource.type)
      setShowDeleteConfirm(false)
    }
  }, [resource])

  const formatTag = (tag: string): string => {
    const trimmed = tag.trim()
    
    // If the tag is all uppercase (like "RAG" or "AI"), keep it as-is
    if (trimmed === trimmed.toUpperCase() && trimmed.length > 1) {
      return trimmed
    }
    
    // Otherwise, convert to title case (capitalize first letter of each word)
    return trimmed
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(' ')
  }

  const handleAddTag = (tag: string) => {
    const formatted = formatTag(tag)
    if (formatted && !tags.includes(formatted)) {
      setTags([...tags, formatted])
    }
    setNewTag("")
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault()
      handleAddTag(newTag)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!resource) return

    const updatedResource: Resource = {
      ...resource,
      title: title || "Untitled Resource",
      author: author ? author.slice(0, 160) : undefined,
      summary: summary || "No description provided.",
      tags,
      thumbnail: thumbnail || resource.thumbnail,
      duration: type === "video" && duration ? duration : undefined,
      pages: type === "pdf" && pages ? parseInt(pages, 10) : undefined,
      year: year ? parseInt(year, 10) : undefined,
      url: url || resource.url,
      type,
    }

    onSave(updatedResource)
    onOpenChange(false)
  }

  const handleDelete = () => {
    if (resource) {
      onDelete(resource.id)
      onOpenChange(false)
    }
  }

  const generateThumbnail = async () => {
    if (!url) return
    
    setIsGeneratingThumbnail(true)
    
    try {
      // For PDFs, use a static thumbnail with PDF icon
      if (type === "pdf") {
        setThumbnail("/pdf-thumbnail.jpg")
      } else {
        // For other types, use screenshot service
        const thumbnailUrl = `https://image.thum.io/get/width/1200/crop/800/${encodeURIComponent(url)}`
        setThumbnail(thumbnailUrl)
      }
    } catch (error) {
      console.error("Failed to generate thumbnail:", error)
    } finally {
      setIsGeneratingThumbnail(false)
    }
  }

  const suggestedTags = popularTags.filter(t => !tags.includes(t))

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Edit Resource</DialogTitle>
          <DialogDescription>
            Update the details for this resource or delete it.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="edit-title">Title *</Label>
            <Input
              id="edit-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Resource title"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-url">URL</Label>
            <Input
              id="edit-url"
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-author">Author/Organization</Label>
            <Input
              id="edit-author"
              value={author}
              onChange={(e) => setAuthor(e.target.value.slice(0, 160))}
              placeholder="Author or organization name"
              maxLength={160}
            />
            <p className="text-xs text-muted-foreground text-right">{author.length}/160</p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-type">Type</Label>
            <Select value={type} onValueChange={(v) => setType(v as ResourceType)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="pdf">
                  <span className="flex items-center gap-2">
                    <FileText className="h-4 w-4" /> PDF
                  </span>
                </SelectItem>
                <SelectItem value="video">
                  <span className="flex items-center gap-2">
                    <Video className="h-4 w-4" /> Video
                  </span>
                </SelectItem>
                <SelectItem value="link">
                  <span className="flex items-center gap-2">
                    <Globe className="h-4 w-4" /> Link
                  </span>
                </SelectItem>
                <SelectItem value="graphic">
                  <span className="flex items-center gap-2">
                    <ImageIcon className="h-4 w-4" /> Graphic
                  </span>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {type === "video" && (
            <div className="space-y-2">
              <Label htmlFor="edit-duration">Duration</Label>
              <Input
                id="edit-duration"
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
                placeholder="e.g., 45:30"
              />
            </div>
          )}

          {type === "pdf" && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="edit-pages">Page Count</Label>
                <Input
                  id="edit-pages"
                  type="number"
                  value={pages}
                  onChange={(e) => setPages(e.target.value)}
                  placeholder="e.g., 24"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-year">Year</Label>
                <Input
                  id="edit-year"
                  type="number"
                  value={year}
                  onChange={(e) => setYear(e.target.value)}
                  placeholder="e.g., 2024"
                  min={1900}
                  max={2100}
                />
              </div>
            </div>
          )}

          {type !== "pdf" && (
            <div className="space-y-2">
              <Label htmlFor="edit-year-other">Year</Label>
              <Input
                id="edit-year-other"
                type="number"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                placeholder="e.g., 2024"
                min={1900}
                max={2100}
              />
            </div>
          )}

          <div className="space-y-2">
            <Label htmlFor="edit-summary">Summary / Abstract</Label>
            <Textarea
              id="edit-summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              placeholder="Brief description of the resource..."
              rows={3}
            />
          </div>

          {/* Tags Section */}
          <div className="space-y-3">
            <Label>Tags</Label>
            
            {/* Current Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <Badge
                    key={tag}
                    variant="secondary"
                    className="px-2 py-1 text-xs gap-1"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-1 hover:text-destructive"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            )}

            {/* Add New Tag */}
            <div className="flex gap-2">
              <Input
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type a tag and press Enter"
                className="flex-1"
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => handleAddTag(newTag)}
                disabled={!newTag.trim()}
                className="bg-transparent"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Suggested Tags */}
            {suggestedTags.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs text-muted-foreground">Popular tags:</p>
                <div className="flex flex-wrap gap-1.5">
                  {suggestedTags.slice(0, 6).map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="cursor-pointer text-xs hover:bg-primary hover:text-primary-foreground transition-colors"
                      onClick={() => handleAddTag(tag)}
                    >
                      <Plus className="h-3 w-3 mr-1" />
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="edit-thumbnail">Thumbnail URL</Label>
            <div className="flex gap-2">
              <Input
                id="edit-thumbnail"
                type="url"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                placeholder="https://..."
                className="flex-1"
              />
              {url && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={generateThumbnail}
                  disabled={isGeneratingThumbnail}
                  className="bg-transparent shrink-0"
                  title="Generate thumbnail from screenshot"
                >
                  {isGeneratingThumbnail ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Camera className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
            {thumbnail && (
              <div className="mt-2 border rounded-lg overflow-hidden">
                <img src={thumbnail} alt="Thumbnail preview" className="w-full h-32 object-cover" />
              </div>
            )}
          </div>

          <div className="flex gap-3 pt-4 border-t">
            {!showDeleteConfirm ? (
              <>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setShowDeleteConfirm(true)}
                  className="text-destructive hover:bg-destructive hover:text-destructive-foreground bg-transparent"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete
                </Button>
                <Button type="submit" className="flex-1">
                  <Save className="h-4 w-4 mr-2" />
                  Save Changes
                </Button>
              </>
            ) : (
              <div className="flex-1 space-y-3">
                <p className="text-sm text-destructive font-medium">
                  Are you sure you want to delete this resource?
                </p>
                <div className="flex gap-2">
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setShowDeleteConfirm(false)}
                    className="flex-1 bg-transparent"
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="button" 
                    variant="destructive"
                    onClick={handleDelete}
                    className="flex-1"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Confirm Delete
                  </Button>
                </div>
              </div>
            )}
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

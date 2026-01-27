"use client"

import { Badge } from "@/components/ui/badge"
import { ImageIcon } from "lucide-react"

import React from "react"
import { useState, useCallback } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Plus, Upload, Link as LinkIcon, FileText, Video, Globe, X, AlertCircle, Loader2, Sparkles, Camera } from "lucide-react"
import { cn } from "@/lib/utils"
import { detectResourceType, generateId } from "@/lib/xml-utils"
import type { Resource, ResourceType } from "@/lib/resources-data"

const MAX_FILE_SIZE = 30 * 1024 * 1024 // 30MB in bytes

interface AddResourceDialogProps {
  onAddResource: (resource: Resource) => void
  popularTags: string[]
}

export function AddResourceDialog({ onAddResource, popularTags }: AddResourceDialogProps) {
  const [open, setOpen] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [url, setUrl] = useState("")
  const [detectedType, setDetectedType] = useState<ResourceType>("link")
  const [title, setTitle] = useState("")
  const [author, setAuthor] = useState("")
  const [summary, setSummary] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [duration, setDuration] = useState("")
  const [pages, setPages] = useState("")
  const [year, setYear] = useState("")
  const [showForm, setShowForm] = useState(false)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isScrapingUrl, setIsScrapingUrl] = useState(false)
  const [scrapedSuccessfully, setScrapedSuccessfully] = useState(false)
  const [isGeneratingThumbnail, setIsGeneratingThumbnail] = useState(false)

  const resetForm = () => {
    setUrl("")
    setDetectedType("link")
    setTitle("")
    setAuthor("")
    setSummary("")
    setTags([])
    setNewTag("")
    setThumbnail("")
    setDuration("")
    setPages("")
    setYear("")
    setShowForm(false)
    setUploadedFile(null)
    setFileError(null)
    setIsScrapingUrl(false)
    setScrapedSuccessfully(false)
    setIsGeneratingThumbnail(false)
  }

  const handleAddTag = (tag: string) => {
    const trimmed = tag.trim()
    if (trimmed && !tags.includes(trimmed)) {
      setTags([...tags, trimmed])
    }
    setNewTag("")
  }

  const handleRemoveTag = (tagToRemove: string) => {
    setTags(tags.filter(t => t !== tagToRemove))
  }

  const handleTagKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault()
      handleAddTag(newTag)
    }
  }

  const scrapeUrl = async (urlToScrape: string) => {
    if (!urlToScrape) return
    
    setIsScrapingUrl(true)
    setScrapedSuccessfully(false)
    
    try {
      const response = await fetch("/api/scrape", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: urlToScrape }),
      })
      
      if (response.ok) {
        const data = await response.json()
        
        if (data.title) setTitle(data.title)
        if (data.author) setAuthor(data.author)
        if (data.summary) setSummary(data.summary)
        if (data.thumbnail) setThumbnail(data.thumbnail)
        if (data.suggestedTags && data.suggestedTags.length > 0) {
          setTags((prevTags) => {
            const newTags = [...prevTags]
            for (const tag of data.suggestedTags) {
              if (!newTags.includes(tag)) {
                newTags.push(tag)
              }
            }
            return newTags
          })
        }
        if (data.type) {
          setDetectedType(data.type)
        }
        if (data.duration) {
          setDuration(data.duration)
        }
        setScrapedSuccessfully(true)
      }
    } catch (error) {
      console.error("Failed to scrape URL:", error)
    } finally {
      setIsScrapingUrl(false)
    }
  }

  const handleUrlChange = (value: string) => {
    setUrl(value)
    setUploadedFile(null)
    setFileError(null)
    setScrapedSuccessfully(false)
    if (value) {
      const type = detectResourceType(value)
      setDetectedType(type)
      setShowForm(true)
    }
  }

  const handleUrlBlur = () => {
    if (url && !isScrapingUrl && !scrapedSuccessfully) {
      scrapeUrl(url)
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

  const handleFileUpload = (file: File) => {
    setFileError(null)
    
    if (file.size > MAX_FILE_SIZE) {
      setFileError(`File size exceeds 30MB limit. Your file is ${(file.size / (1024 * 1024)).toFixed(1)}MB.`)
      return
    }

    const imageTypes = ["image/png", "image/jpeg", "image/jpg", "image/gif", "image/webp", "image/svg+xml"]

    if (file.type === "application/pdf") {
      setUploadedFile(file)
      setDetectedType("pdf")
      setTitle(file.name.replace(".pdf", ""))
      setUrl("") // Clear URL since we're using a file
      setShowForm(true)
    } else if (imageTypes.includes(file.type)) {
      setUploadedFile(file)
      setDetectedType("graphic")
      // Remove file extension from title
      const nameWithoutExt = file.name.replace(/\.(png|jpg|jpeg|gif|webp|svg)$/i, "")
      setTitle(nameWithoutExt)
      setUrl("")
      setShowForm(true)
    } else {
      setFileError("Supported files: PDF and images (PNG, JPG, GIF, WebP, SVG). For videos and links, please use a URL.")
    }
  }

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    setIsDragging(false)
    setFileError(null)

    // Check for URL drop
    const text = e.dataTransfer.getData("text/plain")
    if (text && (text.startsWith("http://") || text.startsWith("https://"))) {
      handleUrlChange(text)
      return
    }

    // Check for file drop
    const files = e.dataTransfer.files
    if (files.length > 0) {
      handleFileUpload(files[0])
    }
  }, [])

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    const text = e.clipboardData.getData("text/plain")
    if (text && (text.startsWith("http://") || text.startsWith("https://"))) {
      e.preventDefault()
      handleUrlChange(text)
    }
  }, [])

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      handleFileUpload(file)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    let localPath: string | undefined
    let resourceUrl = url || "#"

    // If a file was uploaded, create a blob URL (in a real app, this would upload to server)
    if (uploadedFile) {
      // Create a blob URL for the uploaded PDF
      // In a production app, you would upload this to a server/storage
      localPath = URL.createObjectURL(uploadedFile)
      resourceUrl = localPath
    }

    const resource: Resource = {
      id: generateId(),
      title: title || "Untitled Resource",
      type: detectedType,
      url: resourceUrl,
      thumbnail: thumbnail || `https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop`,
      summary: summary || "No description provided.",
      tags: tags,
      dateAdded: new Date().toISOString().split("T")[0],
      author: author ? author.slice(0, 160) : undefined,
      duration: detectedType === "video" && duration ? duration : undefined,
      pages: detectedType === "pdf" && pages ? parseInt(pages, 10) : undefined,
      year: year ? parseInt(year, 10) : undefined,
      localPath: localPath,
    }

    onAddResource(resource)
    resetForm()
    setOpen(false)
  }

  const typeIcons: Record<ResourceType, typeof FileText> = {
    pdf: FileText,
    video: Video,
    link: Globe,
    graphic: ImageIcon,
  }

  const TypeIcon = typeIcons[detectedType]

  return (
    <Dialog open={open} onOpenChange={(isOpen) => { setOpen(isOpen); if (!isOpen) resetForm() }}>
      <DialogTrigger asChild>
        <Button 
          size="lg"
          className="gap-3 px-8 py-6 text-lg font-semibold bg-gradient-to-r from-primary via-[oklch(0.60_0.20_330)] to-accent hover:opacity-90 text-white shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 rounded-xl"
        >
          <Plus className="h-6 w-6" />
          Add Resource
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Add New Resource</DialogTitle>
          <DialogDescription>
            Add a URL or drop a PDF file (max 30MB) to add a new learning resource.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Drop Zone */}
          <div
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onPaste={handlePaste}
            className={cn(
              "border-2 border-dashed rounded-xl p-8 text-center transition-all",
              isDragging
                ? "border-primary bg-primary/5"
                : "border-border hover:border-primary/50 hover:bg-muted/50"
            )}
          >
            <div className="flex flex-col items-center gap-3">
              <div className={cn(
                "w-12 h-12 rounded-full flex items-center justify-center transition-colors",
                isDragging ? "bg-primary/20" : "bg-muted"
              )}>
                <Upload className={cn(
                  "h-6 w-6 transition-colors",
                  isDragging ? "text-primary" : "text-muted-foreground"
                )} />
              </div>
              <div>
                <p className="font-medium text-foreground">
                  Drop a file or URL here
                </p>
                <p className="text-sm text-muted-foreground">
                  PDFs and images up to 30MB, or paste a link below
                </p>
              </div>
              <label className="cursor-pointer">
                <input
                  type="file"
                  accept=".pdf,.png,.jpg,.jpeg,.gif,.webp,.svg"
                  onChange={handleFileInputChange}
                  className="hidden"
                />
                <span className="text-sm text-primary hover:underline">
                  Browse files
                </span>
              </label>
            </div>
          </div>

          {/* File Error */}
          {fileError && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
              <AlertCircle className="h-4 w-4 flex-shrink-0" />
              <span>{fileError}</span>
            </div>
          )}

          {/* Uploaded File Indicator */}
          {uploadedFile && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-primary/10 border border-primary/20">
              <FileText className="h-5 w-5 text-primary" />
              <div className="flex-1 min-w-0">
                <p className="font-medium text-foreground text-sm truncate">{uploadedFile.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(uploadedFile.size / (1024 * 1024)).toFixed(2)} MB
                </p>
              </div>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => {
                  setUploadedFile(null)
                  setShowForm(false)
                }}
                className="h-8 w-8 p-0"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* URL Input */}
          {!uploadedFile && (
            <div className="space-y-2">
              <Label htmlFor="url">Resource URL</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="url"
                    type="url"
                    placeholder="https://..."
                    value={url}
                    onChange={(e) => handleUrlChange(e.target.value)}
                    onBlur={handleUrlBlur}
                    className="pl-10"
                  />
                </div>
                {url && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    onClick={() => scrapeUrl(url)}
                    disabled={isScrapingUrl}
                    className="bg-transparent shrink-0"
                    title="Auto-fetch metadata"
                  >
                    {isScrapingUrl ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Sparkles className="h-4 w-4" />
                    )}
                  </Button>
                )}
              </div>
              {isScrapingUrl && (
                <p className="text-xs text-muted-foreground flex items-center gap-1.5">
                  <Loader2 className="h-3 w-3 animate-spin" />
                  Fetching metadata...
                </p>
              )}
              {scrapedSuccessfully && !isScrapingUrl && (
                <p className="text-xs text-primary flex items-center gap-1.5">
                  <Sparkles className="h-3 w-3" />
                  Metadata auto-filled from URL
                </p>
              )}
              {url && (
                <div className="flex items-center gap-2 text-sm">
                  <span className="text-muted-foreground">Detected type:</span>
                  <span className={cn(
                    "inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium",
                    detectedType === "pdf" && "bg-[oklch(0.60_0.22_25)]/10 text-[oklch(0.60_0.22_25)]",
                    detectedType === "video" && "bg-[oklch(0.60_0.20_330)]/10 text-[oklch(0.60_0.20_330)]",
                    detectedType === "link" && "bg-[oklch(0.55_0.22_250)]/10 text-[oklch(0.55_0.22_250)]",
                    detectedType === "graphic" && "bg-[oklch(0.70_0.18_145)]/10 text-[oklch(0.70_0.18_145)]"
                  )}>
                    <TypeIcon className="h-3 w-3" />
                    {detectedType.toUpperCase()}
                  </span>
                </div>
              )}
            </div>
          )}

          {/* Detailed Form */}
          {showForm && (
            <form onSubmit={handleSubmit} className="space-y-4 border-t pt-4">
              <div className="space-y-2">
                <Label htmlFor="title">Title *</Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Resource title"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="author">Author/Organization</Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value.slice(0, 160))}
                  placeholder="Author or organization name"
                  maxLength={160}
                />
                <p className="text-xs text-muted-foreground text-right">{author.length}/160</p>
              </div>

              {!uploadedFile && (
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select value={detectedType} onValueChange={(v) => setDetectedType(v as ResourceType)}>
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
              )}

              {detectedType === "video" && (
                <div className="space-y-2">
                  <Label htmlFor="duration">Duration</Label>
                  <Input
                    id="duration"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="e.g., 45:30"
                  />
                </div>
              )}

              {detectedType === "pdf" && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="pages">Page Count</Label>
                    <Input
                      id="pages"
                      type="number"
                      value={pages}
                      onChange={(e) => setPages(e.target.value)}
                      placeholder="e.g., 24"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="year">Year</Label>
                    <Input
                      id="year"
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

              {detectedType !== "pdf" && (
                <div className="space-y-2">
                  <Label htmlFor="year-other">Year</Label>
                  <Input
                    id="year-other"
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
                <Label htmlFor="summary">Summary / Abstract</Label>
                <Textarea
                  id="summary"
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
                    onKeyDown={handleTagKeyDown}
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
                {popularTags.filter(t => !tags.includes(t)).length > 0 && (
                  <div className="space-y-2">
                    <p className="text-xs text-muted-foreground">Popular tags:</p>
                    <div className="flex flex-wrap gap-1.5">
                      {popularTags.filter(t => !tags.includes(t)).slice(0, 6).map((tag) => (
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
                <Label htmlFor="thumbnail">Thumbnail URL (optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="thumbnail"
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

              <div className="flex gap-3 pt-2">
                <Button type="button" variant="outline" onClick={resetForm} className="flex-1 bg-transparent">
                  <X className="h-4 w-4 mr-2" />
                  Reset
                </Button>
                <Button type="submit" className="flex-1">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Resource
                </Button>
              </div>
            </form>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

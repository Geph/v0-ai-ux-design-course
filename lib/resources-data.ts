export type ResourceType = "pdf" | "video" | "link" | "graphic"

export interface Resource {
  id: string
  title: string
  type: ResourceType
  url: string
  thumbnail: string
  summary: string
  tags: string[]
  dateAdded: string
  author?: string
  year?: number // Publication year
  localPath?: string // For locally uploaded PDFs (deprecated, use fileData)
  fileData?: string // Base64-encoded file content for uploaded PDFs/images
  fileMimeType?: string // MIME type of the uploaded file (e.g., "application/pdf")
  ratingSum?: number // Sum of all user ratings
  ratingCount?: number // Number of ratings
  userRating?: number // Current user's rating (1-4)
}

export const resources: Resource[] = [
  {
    id: "1",
    title: "Introduction to AI in UX Design",
    type: "pdf",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=400&h=300&fit=crop",
    summary: "A comprehensive guide to understanding how artificial intelligence is transforming user experience design practices and methodologies.",
    tags: ["AI Fundamentals", "UX Basics", "Introduction"],
    dateAdded: "2025-01-15",
    author: "Dr. Sarah Chen",
  },
  {
    id: "2",
    title: "Machine Learning for Designers",
    type: "video",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=300&fit=crop",
    summary: "Learn the fundamentals of machine learning concepts every UX designer should know to effectively collaborate with AI teams.",
    tags: ["Machine Learning", "Tutorial", "Fundamentals"],
    dateAdded: "2025-01-12",
    author: "Alex Rivera",
  },
  {
    id: "3",
    title: "Figma AI Plugin Documentation",
    type: "link",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=400&h=300&fit=crop",
    summary: "Official documentation for integrating AI-powered features into your Figma workflow for automated design suggestions.",
    tags: ["Figma", "Tools", "Documentation"],
    dateAdded: "2025-01-10",
    author: "Figma Team",
  },
  {
    id: "4",
    title: "Ethical AI Design Principles",
    type: "pdf",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
    summary: "Explore the ethical considerations and principles that should guide AI implementation in user-facing products.",
    tags: ["Ethics", "AI Fundamentals", "Best Practices"],
    dateAdded: "2025-01-08",
    author: "Ethics Board",
  },
]

// Base popular tags are now dynamically generated from actual resource tags

export interface TagWithCount {
  tag: string
  count: number
}

// Get popular tags - generated from actual tags used in the library, sorted by frequency
// Only returns tags with more than 3 items
export const getPopularTags = (resourceList: Resource[] = resources, limit: number = 20): TagWithCount[] => {
  // Count tag frequency in resources
  const tagCounts: Record<string, number> = {}
  resourceList.forEach(resource => {
    resource.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  // Filter tags with more than 3 items, sort by frequency and return top tags
  return Object.entries(tagCounts)
    .filter(([_, count]) => count > 3)
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit)
    .map(([tag, count]) => ({ tag, count }))
}

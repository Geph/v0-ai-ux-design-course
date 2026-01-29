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
  duration?: string
  pages?: number
  year?: number // Publication year
  localPath?: string // For locally uploaded PDFs
  rating?: number // 1-4 star rating
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
    pages: 45
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
    duration: "45:30"
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
    author: "Figma Team"
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
    pages: 32
  },
  {
    id: "5",
    title: "ChatGPT for UX Research",
    type: "video",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1676299081847-824916de030a?w=400&h=300&fit=crop",
    summary: "Practical tutorial on leveraging ChatGPT to accelerate your UX research process including user interviews and surveys.",
    tags: ["ChatGPT", "Research", "Tutorial"],
    dateAdded: "2025-01-05",
    author: "Maya Johnson",
    duration: "32:15"
  },
  {
    id: "6",
    title: "AI-Powered Prototyping Tools",
    type: "link",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1559028012-481c04fa702d?w=400&h=300&fit=crop",
    summary: "Curated list of cutting-edge AI prototyping tools that help designers create interactive mockups faster.",
    tags: ["Prototyping", "Tools", "Resources"],
    dateAdded: "2025-01-03",
    author: "Design Tools Weekly"
  },
  {
    id: "7",
    title: "Neural Networks in Design Systems",
    type: "pdf",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=400&h=300&fit=crop",
    summary: "Research paper on how neural networks can be used to generate and maintain consistent design systems at scale.",
    tags: ["Neural Networks", "Design Systems", "Research"],
    dateAdded: "2024-12-28",
    author: "MIT Design Lab",
    pages: 28
  },
  {
    id: "8",
    title: "Voice UI Design Patterns",
    type: "video",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1589254065878-42c9da997008?w=400&h=300&fit=crop",
    summary: "Masterclass on designing voice user interfaces with AI-powered natural language processing capabilities.",
    tags: ["Voice UI", "Patterns", "Tutorial"],
    dateAdded: "2024-12-25",
    author: "Voice First Studio",
    duration: "58:42"
  },
  {
    id: "9",
    title: "Accessibility & AI Workshop",
    type: "link",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1573164713988-8665fc963095?w=400&h=300&fit=crop",
    summary: "Interactive workshop materials on using AI to improve digital accessibility and inclusive design practices.",
    tags: ["Accessibility", "Workshop", "Inclusion"],
    dateAdded: "2024-12-20",
    author: "A11y Alliance"
  },
  {
    id: "10",
    title: "Generative Design Fundamentals",
    type: "pdf",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=300&fit=crop",
    summary: "Introduction to generative design principles and how AI can create multiple design variations automatically.",
    tags: ["Generative Design", "AI Fundamentals", "Creative"],
    dateAdded: "2024-12-18",
    author: "Gen Design Institute",
    pages: 52
  },
  {
    id: "11",
    title: "User Testing with AI Analysis",
    type: "video",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=400&h=300&fit=crop",
    summary: "Learn how to use AI tools to analyze user testing sessions and extract meaningful insights automatically.",
    tags: ["User Testing", "Research", "Analytics"],
    dateAdded: "2024-12-15",
    author: "UX Research Hub",
    duration: "41:20"
  },
  {
    id: "12",
    title: "Midjourney for UI Concepts",
    type: "link",
    url: "#",
    thumbnail: "https://images.unsplash.com/photo-1618556450994-a6a128ef0d9d?w=400&h=300&fit=crop",
    summary: "Comprehensive guide to using Midjourney AI for rapid UI concept generation and visual exploration.",
    tags: ["Midjourney", "Tools", "Visual Design"],
    dateAdded: "2024-12-10",
    author: "AI Art Collective"
  }
]

// Base popular tags for the course
export const BASE_POPULAR_TAGS = [
  "User research",
  "Prototyping", 
  "Vibe Coding",
  "Examples",
  "Ethics",
  "UXD and AI",
  "Productivity Tools",
  "Claude",
  "ChatGPT",
  "Gemini",
  "Midjourney",
  "Figma",
  "Study",
  "Tutorial",
  "Qualitative",
  "Quantitative / Data",
  "Quantitative/Automated",
  "Methodology"
]

// Extract all unique tags from resources
export const allTags = Array.from(
  new Set(resources.flatMap(resource => resource.tags))
).sort()

// Get popular tags - always include base tags, supplemented by frequently used tags
export const getPopularTags = (resourceList: Resource[] = resources, limit: number = 14): string[] => {
  // Start with base tags
  const result = [...BASE_POPULAR_TAGS]
  
  // Count tag frequency in resources
  const tagCounts: Record<string, number> = {}
  resourceList.forEach(resource => {
    resource.tags.forEach(tag => {
      tagCounts[tag] = (tagCounts[tag] || 0) + 1
    })
  })
  
  // Add frequently used tags that aren't already in base tags
  const additionalTags = Object.entries(tagCounts)
    .filter(([tag]) => !BASE_POPULAR_TAGS.includes(tag))
    .sort((a, b) => b[1] - a[1])
    .slice(0, limit - BASE_POPULAR_TAGS.length)
    .map(([tag]) => tag)
  
  return [...result, ...additionalTags].slice(0, limit)
}

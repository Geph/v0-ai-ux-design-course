import { NextRequest, NextResponse } from "next/server"

// Common keywords for tag suggestions based on the course's popular tags
const TAG_KEYWORDS: Record<string, string[]> = {
  "User research": ["research", "user research", "usability", "testing", "interview", "survey", "ethnograph", "contextual inquiry", "persona", "journey map"],
  "Prototyping": ["prototype", "prototyping", "wireframe", "mockup", "lo-fi", "hi-fi", "interactive"],
  "Vibe Coding": ["vibe coding", "vibe", "cursor", "copilot", "code generation", "ai coding", "v0"],
  "Examples": ["example", "case study", "showcase", "demo", "sample", "portfolio"],
  "Ethics": ["ethics", "ethical", "bias", "privacy", "consent", "trust", "responsible", "fairness", "harm"],
  "UXD and AI": ["ux", "user experience", "ai design", "ai ux", "human-ai", "intelligent interface"],
  "Productivity Tools": ["tool", "productivity", "workflow", "automation", "efficiency", "app"],
  "Claude": ["claude", "anthropic"],
  "ChatGPT": ["chatgpt", "gpt", "openai", "gpt-4", "gpt-5"],
  "Gemini": ["gemini", "google ai", "bard"],
  "Midjourney": ["midjourney", "image generation", "ai art", "text to image"],
  "Figma": ["figma", "design tool", "ui design"],
  "Study": ["study", "academic", "paper", "research paper", "journal", "publication"],
  "Tutorial": ["tutorial", "guide", "how to", "learn", "course", "lesson", "walkthrough"],
  "Qualitative": ["qualitative", "interview", "focus group", "observation", "ethnography", "thematic", "grounded theory"],
  "Quantitative/Automated": ["quantitative", "automated", "analytics", "metrics", "statistics", "data analysis", "a/b test", "survey data", "measurement"],
  "Methodology": ["methodology", "method", "framework", "approach", "process", "technique", "strategy", "systematic"],
}

function extractTags(text: string): string[] {
  const lowerText = text.toLowerCase()
  const suggestedTags: string[] = []

  for (const [tag, keywords] of Object.entries(TAG_KEYWORDS)) {
    for (const keyword of keywords) {
      if (lowerText.includes(keyword)) {
        if (!suggestedTags.includes(tag)) {
          suggestedTags.push(tag)
        }
        break
      }
    }
  }

  return suggestedTags.slice(0, 5) // Limit to 5 tags
}

function extractYouTubeVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([^&\n?#]+)/,
    /youtube\.com\/shorts\/([^&\n?#]+)/,
  ]
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match) return match[1]
  }
  return null
}

function extractVimeoVideoId(url: string): string | null {
  const match = url.match(/vimeo\.com\/(?:video\/)?(\d+)/)
  return match ? match[1] : null
}

export async function POST(request: NextRequest) {
  try {
    const { url } = await request.json()

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 })
    }

    // Check for YouTube
    const youtubeId = extractYouTubeVideoId(url)
    if (youtubeId) {
      // Use YouTube oEmbed API
      try {
        const oembedResponse = await fetch(
          `https://www.youtube.com/oembed?url=${encodeURIComponent(url)}&format=json`,
          { next: { revalidate: 3600 } }
        )
        if (oembedResponse.ok) {
          const data = await oembedResponse.json()
          const thumbnail = `https://img.youtube.com/vi/${youtubeId}/maxresdefault.jpg`
          const combinedText = `${data.title || ""} ${data.author_name || ""} youtube video tutorial`
          
          // Try to get duration and description from page scrape (YouTube doesn't include it in oEmbed)
          let duration: string | undefined
          let description: string | undefined
          try {
            const pageResponse = await fetch(url, {
              headers: {
                "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
              },
            })
            if (pageResponse.ok) {
              const html = await pageResponse.text()
              
              // Look for duration in various formats YouTube uses
              const durationMatch = html.match(/"lengthSeconds":"(\d+)"/) || 
                                   html.match(/approxDurationMs":"(\d+)"/)
              if (durationMatch) {
                const seconds = durationMatch[0].includes("lengthSeconds") 
                  ? parseInt(durationMatch[1], 10)
                  : Math.floor(parseInt(durationMatch[1], 10) / 1000)
                const hours = Math.floor(seconds / 3600)
                const minutes = Math.floor((seconds % 3600) / 60)
                const secs = seconds % 60
                duration = hours > 0 
                  ? `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
                  : `${minutes}:${secs.toString().padStart(2, "0")}`
              }
              
              // Try to extract video description for summary
              // YouTube embeds description in JSON data on the page
              const descriptionMatch = html.match(/"shortDescription":"([^"]*)"/) ||
                                       html.match(/"description":{"simpleText":"([^"]*)"/)
              if (descriptionMatch) {
                description = descriptionMatch[1]
                  .replace(/\\n/g, " ")
                  .replace(/\\"/g, '"')
                  .replace(/\s+/g, " ")
                  .trim()
                  .slice(0, 400)
                if (description.length === 400) {
                  description += "..."
                }
              }
            }
          } catch (e) {
            // Duration/description extraction failed, continue without it
          }
          
          // Build a better summary from description or fallback
          const summary = description && description.length > 20 
            ? description 
            : `Video by ${data.author_name || "Unknown"} on YouTube.`
          
          // Include description in tag extraction for better suggestions
          const fullText = `${data.title || ""} ${data.author_name || ""} ${description || ""} youtube video tutorial`
          
          return NextResponse.json({
            title: data.title || "",
            author: data.author_name || "",
            summary,
            thumbnail,
            suggestedTags: extractTags(fullText),
            type: "video",
            duration,
          })
        }
      } catch (e) {
        console.error("YouTube oEmbed error:", e)
      }
    }

    // Check for Vimeo
    const vimeoId = extractVimeoVideoId(url)
    if (vimeoId) {
      try {
        const oembedResponse = await fetch(
          `https://vimeo.com/api/oembed.json?url=${encodeURIComponent(url)}`,
          { next: { revalidate: 3600 } }
        )
        if (oembedResponse.ok) {
          const data = await oembedResponse.json()
          const combinedText = `${data.title || ""} ${data.author_name || ""} ${data.description || ""} vimeo video tutorial`
          
          // Vimeo oEmbed includes duration in seconds
          let duration: string | undefined
          if (data.duration) {
            const seconds = data.duration
            const hours = Math.floor(seconds / 3600)
            const minutes = Math.floor((seconds % 3600) / 60)
            const secs = seconds % 60
            duration = hours > 0 
              ? `${hours}:${minutes.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`
              : `${minutes}:${secs.toString().padStart(2, "0")}`
          }
          
          return NextResponse.json({
            title: data.title || "",
            author: data.author_name || "",
            summary: data.description?.slice(0, 300) || `Video by ${data.author_name || "Unknown"} on Vimeo.`,
            thumbnail: data.thumbnail_url || "",
            suggestedTags: extractTags(combinedText),
            type: "video",
            duration,
          })
        }
      } catch (e) {
        console.error("Vimeo oEmbed error:", e)
      }
    }

    // For other URLs, fetch and parse the HTML
    const response = await fetch(url, {
      headers: {
        "User-Agent": "Mozilla/5.0 (compatible; UXAILibraryBot/1.0)",
        "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
      },
      next: { revalidate: 3600 },
    })

    if (!response.ok) {
      return NextResponse.json({ 
        error: "Failed to fetch URL",
        title: "",
        summary: "",
        suggestedTags: [],
      }, { status: 200 }) // Return 200 with empty data so UI can continue
    }

    const contentType = response.headers.get("content-type") || ""
    
    // If it's a PDF, return minimal info
    if (contentType.includes("application/pdf")) {
      const filename = url.split("/").pop()?.replace(".pdf", "") || ""
      return NextResponse.json({
        title: filename.replace(/[-_]/g, " "),
        summary: "PDF document",
        suggestedTags: ["PDF", "Document"],
        type: "pdf",
      })
    }

    const html = await response.text()

    // Extract metadata using regex (lightweight approach)
    const getMetaContent = (property: string): string => {
      const patterns = [
        new RegExp(`<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']+)["']`, "i"),
        new RegExp(`<meta[^>]*content=["']([^"']+)["'][^>]*(?:property|name)=["']${property}["']`, "i"),
      ]
      for (const pattern of patterns) {
        const match = html.match(pattern)
        if (match) return match[1]
      }
      return ""
    }

    // Extract title
    let title = getMetaContent("og:title") || getMetaContent("twitter:title")
    if (!title) {
      const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i)
      title = titleMatch ? titleMatch[1] : ""
    }

    // Extract description
    let summary = getMetaContent("og:description") || 
                  getMetaContent("twitter:description") || 
                  getMetaContent("description")

    // Extract author
    let author = getMetaContent("author") || 
                 getMetaContent("article:author") ||
                 getMetaContent("og:site_name")

    // Extract thumbnail
    let thumbnail = getMetaContent("og:image") || getMetaContent("twitter:image")
    
    // Make thumbnail URL absolute if relative
    if (thumbnail && !thumbnail.startsWith("http")) {
      try {
        const baseUrl = new URL(url)
        thumbnail = new URL(thumbnail, baseUrl.origin).href
      } catch (e) {
        thumbnail = ""
      }
    }

    // Clean up extracted text
    title = title.replace(/\s+/g, " ").trim()
    summary = summary.replace(/\s+/g, " ").trim().slice(0, 500)
    author = author.replace(/\s+/g, " ").trim()

    // Decode HTML entities
    const decodeEntities = (text: string) => {
      return text
        .replace(/&amp;/g, "&")
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&nbsp;/g, " ")
    }

    title = decodeEntities(title)
    summary = decodeEntities(summary)
    author = decodeEntities(author)

    // Extract tags from combined content
    const combinedText = `${title} ${summary} ${author} ${url}`
    const suggestedTags = extractTags(combinedText)

    return NextResponse.json({
      title,
      author,
      summary,
      thumbnail,
      suggestedTags,
    })
  } catch (error) {
    console.error("Scrape error:", error)
    return NextResponse.json({ 
      error: "Failed to scrape URL",
      title: "",
      summary: "",
      suggestedTags: [],
    }, { status: 200 })
  }
}

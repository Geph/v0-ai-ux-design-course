import type { Resource, ResourceType } from "./resources-data"

// Convert resources array to XML string
export function resourcesToXml(resources: Resource[]): string {
  const xmlLines = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<resourceLibrary>',
    '  <metadata>',
    `    <exportDate>${new Date().toISOString()}</exportDate>`,
    `    <totalResources>${resources.length}</totalResources>`,
    '    <course>User Experience Design with AI</course>',
    '  </metadata>',
    '  <resources>',
  ]

  for (const resource of resources) {
    xmlLines.push('    <resource>')
    xmlLines.push(`      <id>${escapeXml(resource.id)}</id>`)
    xmlLines.push(`      <title>${escapeXml(resource.title)}</title>`)
    xmlLines.push(`      <type>${escapeXml(resource.type)}</type>`)
    xmlLines.push(`      <url>${escapeXml(resource.url)}</url>`)
    xmlLines.push(`      <thumbnail>${escapeXml(resource.thumbnail)}</thumbnail>`)
    xmlLines.push(`      <summary>${escapeXml(resource.summary)}</summary>`)
    xmlLines.push(`      <dateAdded>${escapeXml(resource.dateAdded)}</dateAdded>`)
    if (resource.author) {
      xmlLines.push(`      <author>${escapeXml(resource.author)}</author>`)
    }
    if (resource.duration) {
      xmlLines.push(`      <duration>${escapeXml(resource.duration)}</duration>`)
    }
    if (resource.pages) {
      xmlLines.push(`      <pages>${resource.pages}</pages>`)
    }
    if (resource.year) {
      xmlLines.push(`      <year>${resource.year}</year>`)
    }
    if (resource.localPath) {
      xmlLines.push(`      <localPath>${escapeXml(resource.localPath)}</localPath>`)
    }
    if (resource.rating) {
      xmlLines.push(`      <rating>${resource.rating}</rating>`)
    }
    xmlLines.push('      <tags>')
    for (const tag of resource.tags) {
      xmlLines.push(`        <tag>${escapeXml(tag)}</tag>`)
    }
    xmlLines.push('      </tags>')
    xmlLines.push('    </resource>')
  }

  xmlLines.push('  </resources>')
  xmlLines.push('</resourceLibrary>')

  return xmlLines.join('\n')
}

// Parse XML string to resources array
export function xmlToResources(xmlString: string): Resource[] {
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlString, 'text/xml')
  
  const parseError = doc.querySelector('parsererror')
  if (parseError) {
    throw new Error('Invalid XML format')
  }

  const resourceElements = doc.querySelectorAll('resource')
  const resources: Resource[] = []

  for (const el of resourceElements) {
    const id = getTextContent(el, 'id')
    const title = getTextContent(el, 'title')
    const type = getTextContent(el, 'type') as ResourceType
    const url = getTextContent(el, 'url')
    const thumbnail = getTextContent(el, 'thumbnail')
    const summary = getTextContent(el, 'summary')
    const dateAdded = getTextContent(el, 'dateAdded')
    const author = getTextContent(el, 'author') || undefined
    const duration = getTextContent(el, 'duration') || undefined
    const pagesStr = getTextContent(el, 'pages')
    const pages = pagesStr ? parseInt(pagesStr, 10) : undefined
    const yearStr = getTextContent(el, 'year')
    const year = yearStr ? parseInt(yearStr, 10) : undefined
    const localPath = getTextContent(el, 'localPath') || undefined
    const ratingStr = getTextContent(el, 'rating')
    const rating = ratingStr ? parseInt(ratingStr, 10) : undefined

    const tagElements = el.querySelectorAll('tags > tag')
    const tags: string[] = []
    for (const tagEl of tagElements) {
      if (tagEl.textContent) {
        tags.push(tagEl.textContent)
      }
    }

    if (id && title && type && url && thumbnail && summary && dateAdded) {
      resources.push({
        id,
        title,
        type,
        url,
        thumbnail,
        summary,
        dateAdded,
        author,
        duration,
        pages,
        year,
        localPath,
        rating,
        tags,
      })
    }
  }

  return resources
}

function getTextContent(parent: Element, tagName: string): string {
  const el = parent.querySelector(`:scope > ${tagName}`)
  return el?.textContent || ''
}

function escapeXml(str: string): string {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;')
}

// Export XML file
export function exportXmlFile(resources: Resource[], filename = 'resources.xml') {
  const xml = resourcesToXml(resources)
  const blob = new Blob([xml], { type: 'application/xml' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = filename
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}

// Detect resource type from URL
export function detectResourceType(url: string): ResourceType {
  const urlLower = url.toLowerCase()
  
  // PDF detection
  if (
    urlLower.endsWith('.pdf') ||
    urlLower.includes('researchgate.net') ||
    urlLower.includes('doi.org') ||
    urlLower.includes('arxiv.org') ||
    urlLower.includes('academia.edu') ||
    urlLower.includes('sciencedirect.com') ||
    urlLower.includes('springer.com') ||
    urlLower.includes('ieee.org') ||
    urlLower.includes('acm.org')
  ) {
    return 'pdf'
  }
  
  // Video detection
  if (
    urlLower.includes('youtube.com') ||
    urlLower.includes('youtu.be') ||
    urlLower.includes('vimeo.com') ||
    urlLower.includes('dailymotion.com') ||
    urlLower.includes('twitch.tv') ||
    urlLower.includes('wistia.com') ||
    urlLower.includes('loom.com')
  ) {
    return 'video'
  }
  
  // Graphic/Image detection
  if (
    urlLower.endsWith('.png') ||
    urlLower.endsWith('.jpg') ||
    urlLower.endsWith('.jpeg') ||
    urlLower.endsWith('.gif') ||
    urlLower.endsWith('.webp') ||
    urlLower.endsWith('.svg') ||
    urlLower.includes('dribbble.com') ||
    urlLower.includes('behance.net') ||
    urlLower.includes('figma.com/file') ||
    urlLower.includes('figma.com/design') ||
    urlLower.includes('pinterest.com') ||
    urlLower.includes('unsplash.com') ||
    urlLower.includes('pexels.com')
  ) {
    return 'graphic'
  }
  
  return 'link'
}

// Parse author name into APA format (Last, F. I.)
function formatAuthorApa(author: string): string {
  if (!author || author === 'Unknown Author') {
    return 'Unknown Author'
  }
  
  // Try to parse the author name
  const parts = author.trim().split(/\s+/)
  
  if (parts.length === 1) {
    // Single name, treat as last name
    return parts[0]
  } else if (parts.length === 2) {
    // First and last name
    const [first, last] = parts
    return `${last}, ${first.charAt(0).toUpperCase()}.`
  } else if (parts.length >= 3) {
    // First, middle, last or multiple authors
    // Check if it contains 'and' or '&' for multiple authors
    if (author.includes(' and ') || author.includes(' & ')) {
      // Multiple authors - split and format each
      const authorList = author.split(/\s+(?:and|&)\s+/)
      const formattedAuthors = authorList.map(a => formatAuthorApa(a.trim()))
      
      if (formattedAuthors.length === 2) {
        return `${formattedAuthors[0]}, & ${formattedAuthors[1]}`
      } else if (formattedAuthors.length > 2) {
        const lastAuthor = formattedAuthors[formattedAuthors.length - 1]
        const otherAuthors = formattedAuthors.slice(0, -1).join(', ')
        return `${otherAuthors}, & ${lastAuthor}`
      }
    }
    
    // Single author with middle name/initial
    const last = parts[parts.length - 1]
    const initials = parts.slice(0, -1).map(p => p.charAt(0).toUpperCase() + '.').join(' ')
    return `${last}, ${initials}`
  }
  
  return author
}

// Generate APA citation
// Format: Author, A. A. (Year). Title. Source. URL
export function generateApaCitation(resource: Resource): string {
  const formattedAuthor = formatAuthorApa(resource.author || 'Unknown Author')
  const year = resource.year || new Date(resource.dateAdded).getFullYear()
  const title = resource.title
  
  // Format based on type
  if (resource.type === 'video') {
    // APA format for online video: Author, A. A. (Year). Title [Video]. Platform. URL
    return `${formattedAuthor} (${year}). ${title} [Video]. ${resource.url}`
  } else if (resource.type === 'pdf') {
    // APA format for journal article/PDF
    // Note: This is a simplified format. Full APA would need journal name, volume, issue, pages
    return `${formattedAuthor} (${year}). ${title}. ${resource.url}`
  } else if (resource.type === 'graphic') {
    // APA format for graphic/image
    return `${formattedAuthor} (${year}). ${title} [Graphic]. ${resource.url}`
  } else {
    // APA format for web page: Author, A. A. (Year). Title. Site name. URL
    return `${formattedAuthor} (${year}). ${title}. ${resource.url}`
  }
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

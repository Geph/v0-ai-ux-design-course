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
    if (resource.localPath) {
      xmlLines.push(`      <localPath>${escapeXml(resource.localPath)}</localPath>`)
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
    const localPath = getTextContent(el, 'localPath') || undefined

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
        localPath,
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

// Generate APA citation
export function generateApaCitation(resource: Resource): string {
  const author = resource.author || 'Unknown Author'
  const year = new Date(resource.dateAdded).getFullYear()
  const title = resource.title
  
  // Format based on type
  if (resource.type === 'video') {
    // APA format for online video
    return `${author}. (${year}). ${title} [Video]. Retrieved from ${resource.url}`
  } else if (resource.type === 'pdf') {
    // APA format for PDF/document
    if (resource.pages) {
      return `${author}. (${year}). ${title} [PDF document, ${resource.pages} pages]. Retrieved from ${resource.url}`
    }
    return `${author}. (${year}). ${title} [PDF document]. Retrieved from ${resource.url}`
  } else if (resource.type === 'graphic') {
    // APA format for graphic/image
    return `${author}. (${year}). ${title} [Graphic]. Retrieved from ${resource.url}`
  } else {
    // APA format for web page
    return `${author}. (${year}). ${title}. Retrieved from ${resource.url}`
  }
}

// Generate unique ID
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`
}

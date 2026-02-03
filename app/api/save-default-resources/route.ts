import { NextResponse } from "next/server"
import type { Resource } from "@/lib/resources-data"

function resourcesToXml(resources: Resource[]): string {
  const escapeXml = (str: string): string => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += "<resources>\n"

  resources.forEach((resource) => {
    xml += "  <resource>\n"
    xml += `    <id>${escapeXml(resource.id)}</id>\n`
    xml += `    <title>${escapeXml(resource.title)}</title>\n`
    xml += `    <type>${escapeXml(resource.type)}</type>\n`
    xml += `    <url>${escapeXml(resource.url)}</url>\n`
    xml += `    <thumbnail>${escapeXml(resource.thumbnail)}</thumbnail>\n`
    xml += `    <summary>${escapeXml(resource.summary)}</summary>\n`
    xml += "    <tags>\n"
    resource.tags.forEach((tag) => {
      xml += `      <tag>${escapeXml(tag)}</tag>\n`
    })
    xml += "    </tags>\n"
    xml += `    <dateAdded>${escapeXml(resource.dateAdded)}</dateAdded>\n`
    
    if (resource.author) {
      xml += `    <author>${escapeXml(resource.author)}</author>\n`
    }
    if (resource.year) {
      xml += `    <year>${resource.year}</year>\n`
    }
    if (resource.localPath) {
      xml += `    <localPath>${escapeXml(resource.localPath)}</localPath>\n`
    }
    if (resource.ratingSum !== undefined) {
      xml += `    <ratingSum>${resource.ratingSum}</ratingSum>\n`
    }
    if (resource.ratingCount !== undefined) {
      xml += `    <ratingCount>${resource.ratingCount}</ratingCount>\n`
    }
    if (resource.userRating !== undefined) {
      xml += `    <userRating>${resource.userRating}</userRating>\n`
    }
    
    xml += "  </resource>\n"
  })

  xml += "</resources>"
  return xml
}

export async function POST(request: Request) {
  try {
    const { resources } = await request.json()
    
    if (!resources || !Array.isArray(resources)) {
      return NextResponse.json(
        { error: "Invalid resources data" },
        { status: 400 }
      )
    }

    const xml = resourcesToXml(resources)
    
    // In a real deployment, you would write this to a file
    // For now, we'll return it so the client can save it
    return new NextResponse(xml, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Content-Disposition": 'attachment; filename="resources.xml"',
      },
    })
  } catch (error) {
    console.error("Failed to save default resources:", error)
    return NextResponse.json(
      { error: "Failed to save resources" },
      { status: 500 }
    )
  }
}

import { NextResponse } from "next/server"
import type { Resource } from "@/lib/resources-data"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

function resourcesToXml(resources: Resource[]): string {
  const escapeXml = (str: string) => {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&apos;")
  }

  let xml = '<?xml version="1.0" encoding="UTF-8"?>\n'
  xml += '<resources>\n'

  for (const resource of resources) {
    xml += '  <resource>\n'
    xml += `    <id>${escapeXml(resource.id)}</id>\n`
    xml += `    <title>${escapeXml(resource.title)}</title>\n`
    xml += `    <type>${escapeXml(resource.type)}</type>\n`
    xml += `    <url>${escapeXml(resource.url)}</url>\n`
    xml += `    <thumbnail>${escapeXml(resource.thumbnail)}</thumbnail>\n`
    xml += `    <dateAdded>${escapeXml(resource.dateAdded)}</dateAdded>\n`
    
    if (resource.author) {
      xml += `    <author>${escapeXml(resource.author)}</author>\n`
    }
    if (resource.year) {
      xml += `    <year>${escapeXml(resource.year.toString())}</year>\n`
    }
    if (resource.tags && resource.tags.length > 0) {
      xml += '    <tags>\n'
      for (const tag of resource.tags) {
        xml += `      <tag>${escapeXml(tag)}</tag>\n`
      }
      xml += '    </tags>\n'
    }
    if (resource.notes) {
      xml += `    <notes>${escapeXml(resource.notes)}</notes>\n`
    }
    
    xml += '  </resource>\n'
  }

  xml += '</resources>'
  return xml
}

export async function POST(request: Request) {
  try {
    const { resources } = await request.json()
    
    if (!resources || !Array.isArray(resources)) {
      return NextResponse.json({ error: "Invalid resources data" }, { status: 400 })
    }

    const xml = resourcesToXml(resources)
    
    return new NextResponse(xml, {
      headers: {
        "Content-Type": "application/xml",
        "Content-Disposition": `attachment; filename="resources-${Date.now()}.xml"`,
      },
    })
  } catch (error) {
    console.error("Export XML error:", error)
    return NextResponse.json({ error: "Failed to export XML" }, { status: 500 })
  }
}

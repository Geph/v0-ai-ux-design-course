# User Experience Design with AI: Knowledge Library

![Knowledge Library Preview](/images/knowledge-library-preview.jpg)

A comprehensive web-based resource library for organizing, searching, and managing educational materials for the "User Experience Design with AI" studio course.

## Features

### Resource Management
- **Multiple Resource Types**: Support for PDFs, Videos, Links, and Graphics
- **Add Resources**: Drag-and-drop files (PDFs, images up to 30MB) or paste URLs
- **Auto-Metadata Scraping**: Automatically extracts title, summary, author, thumbnail, and duration from URLs (YouTube, Vimeo, web pages)
- **Smart Type Detection**: Automatically detects resource type based on URL patterns (academic sites, video platforms, design tools, etc.)
- **Edit & Delete**: Modify any resource's details or remove it from the library

### Search & Filtering
- **Full-Text Search**: Search across titles, summaries, authors, and tags
- **Type Filtering**: Filter by PDFs, Videos, Links, or Graphics with count badges
- **Tag Filtering**: Click popular tags to filter resources; multi-select supported
- **Clear Filters**: One-click to reset all active filters

### Tags System
- **Popular Tags**: Pre-configured tags for the course including User research, Prototyping, Vibe Coding, Ethics, UXD and AI, Productivity Tools, Claude, ChatGPT, Gemini, Midjourney, Figma, and more
- **Custom Tags**: Add your own tags when creating or editing resources
- **Tag Suggestions**: Auto-suggested tags based on content analysis when adding URLs

### Citations
- **APA Format**: Generate properly formatted APA citations for any resource
- **One-Click Copy**: Copy citations to clipboard instantly
- **Type-Aware**: Citations formatted appropriately for videos, PDFs, graphics, and web pages

### Data Management
- **XML Storage**: All resources and tags are saved in XML format
- **Export Library**: Download your entire library as `resources.xml`
- **Import Library**: Upload an XML file to restore or share your library
- **Persistent Storage**: Data automatically saved to browser localStorage

### Customization
- **6 Color Palettes**: Choose from Vibrant Blue, Coral Sunset, Forest Mint, Royal Purple, Ocean Teal, or Midnight Gold
- **Light/Dark Mode**: Toggle between light and dark themes
- **Responsive Design**: Works on desktop, tablet, and mobile devices

## XML File Format

Resources are stored in the following XML structure:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<resourceLibrary>
  <metadata>
    <exportDate>2026-01-26T00:00:00.000Z</exportDate>
    <totalResources>10</totalResources>
    <course>User Experience Design with AI</course>
  </metadata>
  <resources>
    <resource>
      <id>unique-id-123</id>
      <title>Resource Title</title>
      <type>pdf|video|link|graphic</type>
      <url>https://example.com/resource</url>
      <thumbnail>https://example.com/image.jpg</thumbnail>
      <summary>Brief description of the resource</summary>
      <dateAdded>2026-01-26</dateAdded>
      <author>Author Name</author>
      <duration>12:34</duration>
      <pages>42</pages>
      <localPath>/uploads/file.pdf</localPath>
      <tags>
        <tag>User research</tag>
        <tag>Tutorial</tag>
      </tags>
    </resource>
  </resources>
</resourceLibrary>
```

## Getting Started

1. **Add Resources**: Click the large "Add Resource" button to add PDFs, images, or URLs
2. **Organize with Tags**: Add relevant tags from the popular list or create custom ones
3. **Search & Filter**: Use the search bar and filter buttons to find specific resources
4. **Generate Citations**: Click "Cite" on any resource card for an APA-formatted citation
5. **Export Your Library**: Go to Settings (gear icon) to export your library as XML

## Technology Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui Components
- localStorage for data persistence

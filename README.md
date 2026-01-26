# User Experience Design with AI: Knowledge Library

![Knowledge Library Preview](screenshot.png)

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

## Building and Deploying

### Prerequisites

- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun package manager

### Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd knowledge-library

# Install dependencies
npm install
# or
bun install

# Run the development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

### Building for Production

```bash
# Create a production build
npm run build

# The output will be in the `.next` folder (for Node.js deployment)
# or `out` folder (for static export)
```

### Static Export (for hosting on any web server)

To deploy to a subdirectory on your own website, add this to `next.config.mjs`:

```js
const nextConfig = {
  output: 'export',
  basePath: '/your-subdirectory', // e.g., '/knowledge-library'
  trailingSlash: true,
}

export default nextConfig
```

Then build and export:

```bash
npm run build
```

The static files will be in the `out` directory. Upload the contents of `out` to your web server's directory.

### Deploying to Vercel

The easiest way to deploy is using Vercel:

1. Push your code to GitHub
2. Import the repository at [vercel.com/new](https://vercel.com/new)
3. Vercel will automatically detect Next.js and deploy

### Deploying to Other Platforms

**Netlify:**
```bash
npm run build
# Upload the `out` folder to Netlify (after enabling static export)
```

**Apache/Nginx (Self-hosted):**
1. Enable static export in `next.config.mjs` as shown above
2. Run `npm run build`
3. Copy the contents of the `out` folder to your web server's public directory
4. Ensure your server is configured to serve `index.html` for all routes

**GitHub Pages:**
1. Enable static export with `basePath: '/<repo-name>'`
2. Build and push the `out` folder to the `gh-pages` branch

## Technology Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS v4
- shadcn/ui Components
- localStorage for data persistence

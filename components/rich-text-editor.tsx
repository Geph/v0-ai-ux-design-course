'use client'

import { useState, useRef } from 'react'
import { Bold, Italic, Link2 } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface RichTextEditorProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  rows?: number
}

export function RichTextEditor({ 
  value, 
  onChange, 
  placeholder = "Enter text...",
  rows = 3
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null)
  const [isEditingLink, setIsEditingLink] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
  }

  const insertLink = () => {
    if (linkUrl) {
      applyFormat('createLink', linkUrl)
      setLinkUrl('')
      setIsEditingLink(false)
    }
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && isEditingLink) {
      e.preventDefault()
      insertLink()
    }
  }

  return (
    <div className="space-y-2">
      <div className="flex gap-1 flex-wrap">
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => applyFormat('bold')}
          title="Bold (Ctrl+B)"
          className="h-8 w-8 p-0"
        >
          <Bold className="h-4 w-4" />
        </Button>
        
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => applyFormat('italic')}
          title="Italic (Ctrl+I)"
          className="h-8 w-8 p-0"
        >
          <Italic className="h-4 w-4" />
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() => setIsEditingLink(!isEditingLink)}
          title="Add Link"
          className="h-8 w-8 p-0"
        >
          <Link2 className="h-4 w-4" />
        </Button>
      </div>

      {isEditingLink && (
        <div className="flex gap-2">
          <input
            type="url"
            placeholder="Enter URL..."
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={handleKeyDown}
            className="flex-1 px-3 py-1 border border-input rounded-md text-sm bg-background"
          />
          <Button
            type="button"
            size="sm"
            onClick={insertLink}
            className="h-8"
          >
            Add
          </Button>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={() => {
              setIsEditingLink(false)
              setLinkUrl('')
            }}
            className="h-8"
          >
            Cancel
          </Button>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value }}
        className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background min-h-24 focus:outline-none focus:ring-2 focus:ring-ring overflow-y-auto"
        style={{ maxHeight: `${rows * 1.5}em` }}
      />
    </div>
  )
}

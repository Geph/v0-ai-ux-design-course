'use client'

import { useState, useRef, useEffect } from 'react'
import { Bold, Italic, Link2, X } from 'lucide-react'
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
  const linkInputRef = useRef<HTMLInputElement>(null)
  const [showLinkDialog, setShowLinkDialog] = useState(false)
  const [linkUrl, setLinkUrl] = useState('')
  const [savedSelection, setSavedSelection] = useState<Range | null>(null)

  const saveSelection = () => {
    const selection = window.getSelection()
    if (selection && selection.rangeCount > 0) {
      setSavedSelection(selection.getRangeAt(0).cloneRange())
    }
  }

  const restoreSelection = () => {
    if (savedSelection) {
      const selection = window.getSelection()
      if (selection) {
        selection.removeAllRanges()
        selection.addRange(savedSelection)
      }
    }
  }

  const applyFormat = (command: string, value?: string) => {
    document.execCommand(command, false, value)
    editorRef.current?.focus()
    handleInput()
  }

  const openLinkDialog = () => {
    saveSelection()
    setLinkUrl('')
    setShowLinkDialog(true)
    setTimeout(() => linkInputRef.current?.focus(), 50)
  }

  const insertLink = () => {
    if (linkUrl) {
      restoreSelection()
      document.execCommand('createLink', false, linkUrl)
      handleInput()
    }
    setShowLinkDialog(false)
    setLinkUrl('')
    editorRef.current?.focus()
  }

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Ctrl+K or Cmd+K to open link dialog
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault()
      openLinkDialog()
    }
  }

  const handleLinkKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      insertLink()
    } else if (e.key === 'Escape') {
      setShowLinkDialog(false)
      setLinkUrl('')
      editorRef.current?.focus()
    }
  }

  return (
    <div className="space-y-2 relative">
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
          onClick={openLinkDialog}
          title="Add Link (Ctrl+K)"
          className="h-8 w-8 p-0"
        >
          <Link2 className="h-4 w-4" />
        </Button>
      </div>

      {/* Link Dialog Popup */}
      {showLinkDialog && (
        <div className="absolute z-50 top-10 left-0 bg-popover border border-border rounded-lg shadow-lg p-3 w-72">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Insert Link</span>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => {
                setShowLinkDialog(false)
                setLinkUrl('')
                editorRef.current?.focus()
              }}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <input
            ref={linkInputRef}
            type="url"
            placeholder="https://example.com"
            value={linkUrl}
            onChange={(e) => setLinkUrl(e.target.value)}
            onKeyDown={handleLinkKeyDown}
            className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background mb-2"
          />
          <div className="flex gap-2 justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => {
                setShowLinkDialog(false)
                setLinkUrl('')
                editorRef.current?.focus()
              }}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={insertLink}
              disabled={!linkUrl}
            >
              Insert
            </Button>
          </div>
        </div>
      )}

      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        suppressContentEditableWarning
        dangerouslySetInnerHTML={{ __html: value }}
        data-placeholder={placeholder}
        className="w-full px-3 py-2 border border-input rounded-md text-sm bg-background focus:outline-none focus:ring-2 focus:ring-ring overflow-y-auto [&:empty]:before:content-[attr(data-placeholder)] [&:empty]:before:text-muted-foreground"
        style={{ minHeight: `${rows * 1.5}em` }}
      />
    </div>
  )
}

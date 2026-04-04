'use client'

import React, { useState, useRef, useCallback, useEffect } from "react";
import {
  Bold, Italic, Underline, List, ListOrdered, Quote, Undo, Redo,
  AlignLeft, AlignCenter, AlignRight, Link as LinkIcon, Image as ImageIcon
} from "lucide-react";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const CustomRichTextEditor: React.FC<RichTextEditorProps> = ({
  value,
  onChange,
  placeholder = "Start writing...",
  className = ""
}) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isInternalUpdate = useRef(false);

  const [isFocused, setIsFocused] = useState(false);
  const [showLinkDialog, setShowLinkDialog] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");

  
  useEffect(() => {
    if (editorRef.current && !isInternalUpdate.current) {
      
      if (editorRef.current.innerHTML !== value) {
        editorRef.current.innerHTML = value;
      }
    }
    isInternalUpdate.current = false;
  }, [value]);

  
  const handleInput = useCallback(() => {
    if (editorRef.current) {
      isInternalUpdate.current = true;
      onChange(editorRef.current.innerHTML);
    }
  }, [onChange]);

  const executeCommand = useCallback(
    (command: string, val?: string) => {
      document.execCommand(command, false, val);
      editorRef.current?.focus();
      handleInput();
    },
    [handleInput]
  );

  const isCommandActive = useCallback(
    (cmd: string) => {
      if (typeof document !== "undefined") {
        return document.queryCommandState(cmd);
      }
      return false;
    },
    []
  );

  const handlePaste = useCallback(
    (e: React.ClipboardEvent) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      executeCommand("insertText", text);
    },
    [executeCommand]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.ctrlKey || e.metaKey) {
        switch (e.key) {
          case "b":
            e.preventDefault();
            executeCommand("bold");
            break;
          case "i":
            e.preventDefault();
            executeCommand("italic");
            break;
          case "u":
            e.preventDefault();
            executeCommand("underline");
            break;
          case "z":
            e.preventDefault();
            executeCommand(e.shiftKey ? "redo" : "undo");
            break;
        }
      }
    },
    [executeCommand]
  );

  
  const insertLink = () => {
    const sel = window.getSelection();
    if (sel && sel.toString()) {
      setShowLinkDialog(true);
    } else {
      alert("Select text first to insert a link");
    }
  };

  const confirmLink = () => {
    if (linkUrl.trim()) {
      executeCommand("createLink", linkUrl.trim());
      setShowLinkDialog(false);
      setLinkUrl("");
    }
  };

  
  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = () => {
        executeCommand("insertImage", reader.result as string);
      };
      reader.readAsDataURL(file);
    }
    e.target.value = ""; 
  };

  
  const ToolbarButton = ({
    onClick,
    active,
    icon,
    title
  }: {
    onClick: () => void;
    active?: boolean;
    icon: React.ReactNode;
    title: string;
  }) => (
    <button
      type="button"
      onClick={onClick}
      aria-label={title}
      className={`p-2 rounded hover:bg-gray-200 transition-colors ${
        active ? "bg-gray-300" : ""
      }`}
    >
      {icon}
    </button>
  );

  return (
    <div
      className={`border border-gray-300 rounded-lg overflow-hidden ${className}`}
    >
      {/* Toolbar */}
      <div className="border-b border-gray-200 p-2 bg-gray-50 flex flex-wrap gap-1">
        <ToolbarButton
          onClick={() => executeCommand("bold")}
          active={isCommandActive("bold")}
          icon={<Bold size={16} />}
          title="Bold"
        />
        <ToolbarButton
          onClick={() => executeCommand("italic")}
          active={isCommandActive("italic")}
          icon={<Italic size={16} />}
          title="Italic"
        />
        <ToolbarButton
          onClick={() => executeCommand("underline")}
          active={isCommandActive("underline")}
          icon={<Underline size={16} />}
          title="Underline"
        />

        <select
          onChange={(e) => executeCommand("formatBlock", e.target.value)}
          className="px-2 py-1 text-sm border rounded"
          defaultValue=""
        >
          <option value="">Normal</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
        </select>

        <ToolbarButton
          onClick={() => executeCommand("insertUnorderedList")}
          active={isCommandActive("insertUnorderedList")}
          icon={<List size={16} />}
          title="Bullet List"
        />
        <ToolbarButton
          onClick={() => executeCommand("insertOrderedList")}
          active={isCommandActive("insertOrderedList")}
          icon={<ListOrdered size={16} />}
          title="Numbered List"
        />

        <ToolbarButton
          onClick={() => executeCommand("justifyLeft")}
          active={isCommandActive("justifyLeft")}
          icon={<AlignLeft size={16} />}
          title="Align Left"
        />
        <ToolbarButton
          onClick={() => executeCommand("justifyCenter")}
          active={isCommandActive("justifyCenter")}
          icon={<AlignCenter size={16} />}
          title="Align Center"
        />
        <ToolbarButton
          onClick={() => executeCommand("justifyRight")}
          active={isCommandActive("justifyRight")}
          icon={<AlignRight size={16} />}
          title="Align Right"
        />

        <ToolbarButton
          onClick={() => executeCommand("formatBlock", "blockquote")}
          icon={<Quote size={16} />}
          title="Quote"
        />

        <ToolbarButton
          onClick={insertLink}
          icon={<LinkIcon size={16} />}
          title="Insert Link"
        />

        <ToolbarButton
          onClick={handleImageClick}
          icon={<ImageIcon size={16} />}
          title="Insert Image"
        />

        <ToolbarButton
          onClick={() => executeCommand("undo")}
          icon={<Undo size={16} />}
          title="Undo"
        />
        <ToolbarButton
          onClick={() => executeCommand("redo")}
          icon={<Redo size={16} />}
          title="Redo"
        />

        <input
          type="color"
          onChange={(e) => executeCommand("foreColor", e.target.value)}
          className="w-8 h-8 border rounded cursor-pointer"
          title="Text Color"
        />
        <input
          type="color"
          onChange={(e) => executeCommand("hiliteColor", e.target.value)}
          className="w-8 h-8 border rounded cursor-pointer"
          title="Background Color"
        />

        {/* Hidden file input for image */}
        <input
          type="file"
          ref={fileInputRef}
          accept="image/*"
          onChange={handleImageSelected}
          className="hidden"
        />
      </div>

      {/* Editable content */}
      <div
        ref={editorRef}
        contentEditable
        className={`min-h-[300px] p-4 outline-none ${
          isFocused ? "ring-2 ring-[#1C1B0B] ring-inset" : ""
        }`}
        onInput={handleInput}
        onPaste={handlePaste}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        data-placeholder={placeholder}
        style={{ lineHeight: "1.6" }}
      />

      {/* Link Dialog */}
      {showLinkDialog && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full mx-4">
            <h3 className="text-lg font-semibold mb-4">Insert Link</h3>
            <input
              type="url"
              placeholder="https://example.com"
              value={linkUrl}
              onChange={(e) => setLinkUrl(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setShowLinkDialog(false);
                  setLinkUrl("");
                }}
                className="px-4 py-2 text-[#1C1B0B] hover:bg-[#D4F8D4]/60 rounded"
              >
                Cancel
              </button>
              <button
                onClick={confirmLink}
                className="px-4 py-2 bg-[#1C1B0B] text-black rounded hover:bg-[#D4F8D4]/60"
              >
                Insert Link
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Placeholder styling */}
      <style jsx>{`
        [contenteditable]:empty::before {
          content: attr(data-placeholder);
          color: #9ca3af;
          pointer-events: none;
          font-style: italic;
        }
        [contenteditable] img {
          max-width: 100%;
          height: auto;
          margin: 0.5rem 0;
        }
      `}</style>
    </div>
  );
};

export default CustomRichTextEditor;
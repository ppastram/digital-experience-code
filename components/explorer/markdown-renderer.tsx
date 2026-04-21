import React from "react"

export type ArticleClickHandler = (articleId: string) => void

export interface MarkdownSection {
  header: string | null
  rawContent: string
}

/** Splits markdown text into sections on ## headers. Content before the first ## has header: null. */
export function parseMarkdownSections(text: string): MarkdownSection[] {
  const lines = text.split("\n")
  const sections: MarkdownSection[] = []
  let currentHeader: string | null = null
  let currentLines: string[] = []

  for (const line of lines) {
    const h2Match = line.match(/^##\s+(.+)/)
    if (h2Match) {
      // Flush previous section
      if (currentLines.length > 0 || currentHeader !== null) {
        sections.push({ header: currentHeader, rawContent: currentLines.join("\n").trim() })
      }
      currentHeader = h2Match[1]
      currentLines = []
    } else {
      currentLines.push(line)
    }
  }
  // Flush last section
  if (currentLines.length > 0 || currentHeader !== null) {
    sections.push({ header: currentHeader, rawContent: currentLines.join("\n").trim() })
  }

  return sections
}

/** Extracts all unique Article X.X.X IDs (and Arabic المادة X.X.X) from raw text. */
export function extractArticleReferences(text: string): string[] {
  const regex = /(?:Article|المادة)\s+(\d+\.\d+\.\d+)/g
  const ids = new Set<string>()
  let match: RegExpExecArray | null
  while ((match = regex.exec(text)) !== null) {
    ids.add(match[1])
  }
  return Array.from(ids)
}

function renderInline(
  text: string,
  onArticleClick?: ArticleClickHandler
): React.ReactNode[] {
  const nodes: React.ReactNode[] = []
  // Match bold, inline code, and article references
  const regex = /(\*\*(.+?)\*\*)|(`([^`]+)`)|(\bArticle\s+(\d+\.\d+\.\d+)\b)/g
  let lastIndex = 0
  let match: RegExpExecArray | null

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index))
    }
    if (match[1]) {
      // Bold
      nodes.push(
        <strong key={match.index} className="font-semibold text-text-primary">
          {match[2]}
        </strong>
      )
    } else if (match[3]) {
      // Inline code
      nodes.push(
        <code
          key={match.index}
          className="bg-cream text-brand-dark px-1.5 py-0.5 rounded-md text-sm font-mono"
        >
          {match[4]}
        </code>
      )
    } else if (match[5]) {
      // Article reference
      const articleId = match[6]
      if (onArticleClick) {
        nodes.push(
          <button
            key={match.index}
            onClick={() => onArticleClick(articleId)}
            className="bg-brand/15 text-brand-dark font-semibold px-2 py-0.5 rounded-[1.5rem] hover:bg-brand/25 hover:rounded-[0.5rem] transition-all duration-[400ms] ease-[cubic-bezier(0.47,1.64,0.38,0.87)] cursor-pointer"
          >
            {match[5]}
          </button>
        )
      } else {
        nodes.push(
          <span
            key={match.index}
            className="bg-brand/15 text-brand-dark font-semibold px-2 py-0.5 rounded-[1.5rem]"
          >
            {match[5]}
          </span>
        )
      }
    }
    lastIndex = match.index + match[0].length
  }
  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex))
  }
  return nodes
}

export function renderMarkdown(
  text: string,
  onArticleClick?: ArticleClickHandler
): React.ReactNode {
  const lines = text.split("\n")
  const elements: React.ReactNode[] = []
  let i = 0

  while (i < lines.length) {
    const line = lines[i]

    // Empty line
    if (line.trim() === "") {
      i++
      continue
    }

    // Headers
    const h3Match = line.match(/^###\s+(.+)/)
    if (h3Match) {
      elements.push(
        <h4 key={i} className="text-sm font-bold text-text-primary mt-3 mb-1" style={{ fontFamily: "'Inter', sans-serif" }}>
          {renderInline(h3Match[1], onArticleClick)}
        </h4>
      )
      i++
      continue
    }

    const h2Match = line.match(/^##\s+(.+)/)
    if (h2Match) {
      elements.push(
        <h3 key={i} className="text-base font-bold text-text-primary mt-3 mb-1.5" style={{ fontFamily: "'Inter', sans-serif" }}>
          {renderInline(h2Match[1], onArticleClick)}
        </h3>
      )
      i++
      continue
    }

    const h1Match = line.match(/^#\s+(.+)/)
    if (h1Match) {
      elements.push(
        <h2 key={i} className="text-lg font-extrabold text-text-primary mt-3 mb-2" style={{ fontFamily: "'Inter', sans-serif" }}>
          {renderInline(h1Match[1], onArticleClick)}
        </h2>
      )
      i++
      continue
    }

    // Bullet list
    if (line.match(/^\s*[-*]\s/)) {
      const items: React.ReactNode[] = []
      while (i < lines.length && lines[i].match(/^\s*[-*]\s/)) {
        const content = lines[i].replace(/^\s*[-*]\s+/, "")
        items.push(
          <li key={i} className="ml-4 list-disc text-sm text-text-primary/75 leading-relaxed">
            {renderInline(content, onArticleClick)}
          </li>
        )
        i++
      }
      elements.push(
        <ul key={`ul-${i}`} className="my-1.5 space-y-0.5">
          {items}
        </ul>
      )
      continue
    }

    // Numbered list
    if (line.match(/^\s*\d+\.\s/)) {
      const items: React.ReactNode[] = []
      while (i < lines.length && lines[i].match(/^\s*\d+\.\s/)) {
        const content = lines[i].replace(/^\s*\d+\.\s+/, "")
        items.push(
          <li key={i} className="ml-4 list-decimal text-sm text-text-primary/75 leading-relaxed">
            {renderInline(content, onArticleClick)}
          </li>
        )
        i++
      }
      elements.push(
        <ol key={`ol-${i}`} className="my-1.5 space-y-0.5">
          {items}
        </ol>
      )
      continue
    }

    // Horizontal rule
    if (line.match(/^---+$/) || line.match(/^\*\*\*+$/) || line.match(/^___+$/)) {
      elements.push(
        <hr key={i} className="my-3 border-t border-gold-muted/20" />
      )
      i++
      continue
    }

    // Table
    if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      const tableRows: string[][] = []
      let hasHeader = false
      const startI = i

      // Collect all table lines
      while (i < lines.length && lines[i].trim().startsWith("|") && lines[i].trim().endsWith("|")) {
        const row = lines[i]
          .trim()
          .slice(1, -1) // remove outer pipes
          .split("|")
          .map((cell) => cell.trim())

        // Skip separator row (|---|---|)
        if (row.every((cell) => /^:?-+:?$/.test(cell))) {
          hasHeader = true
          i++
          continue
        }
        tableRows.push(row)
        i++
      }

      if (tableRows.length > 0) {
        const headerRow = hasHeader ? tableRows[0] : null
        const bodyRows = hasHeader ? tableRows.slice(1) : tableRows

        elements.push(
          <div key={`table-${startI}`} className="my-2 overflow-x-auto rounded-[10px] border border-gold-muted/20">
            <table className="w-full text-sm">
              {headerRow && (
                <thead>
                  <tr className="bg-cream">
                    {headerRow.map((cell, ci) => (
                      <th
                        key={ci}
                        className="px-3 py-2 text-left font-semibold text-text-primary/80 border-b border-gold-muted/20"
                      >
                        {renderInline(cell, onArticleClick)}
                      </th>
                    ))}
                  </tr>
                </thead>
              )}
              <tbody>
                {bodyRows.map((row, ri) => (
                  <tr key={ri} className={ri % 2 === 0 ? "bg-white" : "bg-page-bg/50"}>
                    {row.map((cell, ci) => (
                      <td
                        key={ci}
                        className="px-3 py-2 text-text-primary/70 border-b border-gold-muted/10"
                      >
                        {renderInline(cell, onArticleClick)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )
      }
      continue
    }

    // Code block
    if (line.startsWith("```")) {
      const codeLines: string[] = []
      i++
      while (i < lines.length && !lines[i].startsWith("```")) {
        codeLines.push(lines[i])
        i++
      }
      i++ // skip closing ```
      elements.push(
        <pre
          key={`code-${i}`}
          className="bg-cream border border-gold-muted/20 rounded-[12px] p-3 my-2 overflow-x-auto"
        >
          <code className="text-sm font-mono text-text-primary/80">
            {codeLines.join("\n")}
          </code>
        </pre>
      )
      continue
    }

    // Italic / emphasis line
    const italicMatch = line.match(/^\*([^*]+)\*$/)
    if (italicMatch) {
      elements.push(
        <p key={i} className="text-sm text-text-primary/45 italic my-1">
          {renderInline(italicMatch[1], onArticleClick)}
        </p>
      )
      i++
      continue
    }

    // Regular paragraph
    elements.push(
      <p key={i} className="text-sm text-text-primary/75 leading-relaxed my-1">
        {renderInline(line, onArticleClick)}
      </p>
    )
    i++
  }

  return <div className="space-y-0.5">{elements}</div>
}

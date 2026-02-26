/**
 * SSR-safe deterministic Markdown-to-HTML renderer.
 * Supports: headings, bold, links, lists, tables, code blocks, blockquotes, images.
 * No random values, no DOM access.
 */
export function renderMarkdown(md: string): string {
  // 1. Extract fenced code blocks first to protect them
  const codeBlocks: string[] = [];
  let processed = md.replace(/```(\w*)\n([\s\S]*?)```/g, (_match, lang, code) => {
    const escaped = escapeHtml(code.trimEnd());
    const langAttr = lang ? ` data-language="${escapeHtml(lang)}"` : "";
    codeBlocks.push(`<pre><code${langAttr}>${escaped}</code></pre>`);
    return `%%CODEBLOCK_${codeBlocks.length - 1}%%`;
  });

  // 2. Inline code
  processed = processed.replace(/`([^`]+)`/g, "<code>$1</code>");

  // 3. Filter out table separator rows
  const lines = processed.split("\n").filter(
    (line) => !/^\|[\s\-:|]+\|$/.test(line.trim())
  );
  processed = lines.join("\n");

  // 4. Block-level transformations
  processed = processed
    // Headings
    .replace(/^#### (.+)$/gm, "<h4>$1</h4>")
    .replace(/^### (.+)$/gm, "<h3>$1</h3>")
    .replace(/^## (.+)$/gm, "<h2>$1</h2>")
    .replace(/^# (.+)$/gm, "<h1>$1</h1>")
    // Blockquotes
    .replace(/^> (.+)$/gm, "<blockquote><p>$1</p></blockquote>")
    // Images: ![alt](src)
    .replace(
      /!\[([^\]]*)\]\(([^)]+)\)/g,
      '<img src="$2" alt="$1" loading="lazy" decoding="async" />'
    )
    // Bold numbered items
    .replace(/^\*\*(\d+)\. (.+)\*\*$/gm, "<strong>$1. $2</strong>")
    // Bold / italic
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    // Links
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>')
    // Unordered list items
    .replace(/^- (.+)$/gm, "<li>$1</li>")
    // Ordered list items
    .replace(/^\d+\. (.+)$/gm, "<li>$1</li>");

  // 5. Wrap consecutive <li> in <ul>
  processed = processed.replace(
    /(<li>[\s\S]*?<\/li>\n?)+/g,
    (match) => `<ul>${match}</ul>`
  );

  // 6. Merge adjacent blockquotes
  processed = processed.replace(
    /(<\/blockquote>\n?<blockquote>)/g,
    "\n"
  );

  // 7. Tables
  processed = processed.replace(/^\| .+$/gm, (match) => {
    const cells = match
      .split("|")
      .filter((c) => c.trim())
      .map((c) => c.trim());
    return `<tr>${cells.map((c) => `<td>${c}</td>`).join("")}</tr>`;
  });
  processed = processed.replace(
    /(<tr>[\s\S]*?<\/tr>\n?)+/g,
    (match) => `<table>${match}</table>`
  );

  // 8. Paragraphs — split on double newlines
  processed = processed
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      // Don't wrap blocks that already start with block-level HTML
      if (
        /^<(h[1-6]|ul|ol|table|div|section|blockquote|pre|figure|img )/.test(
          block
        )
      ) {
        return block;
      }
      if (/^%%CODEBLOCK_\d+%%$/.test(block)) return block;
      if (!block.startsWith("<")) return `<p>${block}</p>`;
      return block;
    })
    .filter(Boolean)
    .join("\n");

  // 9. Restore code blocks
  codeBlocks.forEach((html, i) => {
    processed = processed.replace(`%%CODEBLOCK_${i}%%`, html);
  });

  return processed;
}

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

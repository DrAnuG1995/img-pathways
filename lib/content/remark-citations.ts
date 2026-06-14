// A tiny dependency-free remark (mdast) plugin. It rewrites inline citation
// markers written in content as `[[cite:claim-id]]` into link nodes with a
// `cite:` URL scheme. ContentRenderer's custom anchor renderer then turns those
// links into <Citation> footnote chips. Authoring stays plain markdown; the
// rendering stays structured.

const CITE_RE = /\[\[cite:([a-z0-9-]+)\]\]/g;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function remarkCitations() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => walk(tree);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function walk(node: any): void {
    if (!node || !Array.isArray(node.children)) return;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const out: any[] = [];
    for (const child of node.children) {
      if (
        child.type === "text" &&
        typeof child.value === "string" &&
        child.value.includes("[[cite:")
      ) {
        out.push(...split(child.value));
      } else {
        walk(child);
        out.push(child);
      }
    }
    node.children = out;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  function split(value: string): any[] {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const nodes: any[] = [];
    let last = 0;
    let m: RegExpExecArray | null;
    CITE_RE.lastIndex = 0;
    while ((m = CITE_RE.exec(value)) !== null) {
      if (m.index > last) {
        nodes.push({ type: "text", value: value.slice(last, m.index) });
      }
      nodes.push({
        type: "link",
        url: `cite:${m[1]}`,
        children: [{ type: "text", value: "cite" }],
      });
      last = m.index + m[0].length;
    }
    if (last < value.length) {
      nodes.push({ type: "text", value: value.slice(last) });
    }
    return nodes;
  }
}

import { describe, it, expect } from "vitest";
import fs from "fs";
import path from "path";

// House style: copy must contain no em dash (U+2014) or en dash (U+2013).
// They read as machine-written. Use a comma, colon, full stop, or "to" / a
// plain hyphen for ranges. This guard scans content and source and fails the
// build (CI runs `npm test`) if one returns. The dash chars are referenced by
// escape so this test file never trips on itself.
const DASH = new RegExp("[\\u2014\\u2013]");
const ROOT = process.cwd();
const DIRS = ["content", "app", "components", "lib"];
const EXTS = new Set([".ts", ".tsx", ".json", ".css", ".mjs"]);
const SKIP_DIRS = new Set(["node_modules", ".next", "out", ".git"]);

function walk(dir: string, acc: string[] = []): string[] {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    if (entry.isDirectory()) {
      if (!SKIP_DIRS.has(entry.name)) walk(path.join(dir, entry.name), acc);
    } else if (EXTS.has(path.extname(entry.name))) {
      acc.push(path.join(dir, entry.name));
    }
  }
  return acc;
}

describe("house style: no em or en dashes", () => {
  const files = DIRS.flatMap((d) => {
    const p = path.join(ROOT, d);
    return fs.existsSync(p) ? walk(p) : [];
  });

  const offenders: string[] = [];
  for (const f of files) {
    fs.readFileSync(f, "utf-8")
      .split("\n")
      .forEach((line, i) => {
        if (DASH.test(line)) offenders.push(`${path.relative(ROOT, f)}:${i + 1}`);
      });
  }

  it("scans a non-trivial number of files", () => {
    expect(files.length).toBeGreaterThan(30);
  });

  it("finds no em or en dashes in content or source", () => {
    expect(offenders).toEqual([]);
  });
});

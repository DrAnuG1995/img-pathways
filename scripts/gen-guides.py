#!/usr/bin/env python3
"""
Generate a branded PDF guide for each of the 4 pathways into public/guides/<slug>.pdf,
from the same content/pathways/*.json the site renders. Re-run after content edits:
    python3 scripts/gen-guides.py
Uses fpdf2. Text is sanitised to latin-1 (core Helvetica), so no font files are needed.
"""
import json
import os
import re
from fpdf import FPDF
from fpdf.enums import XPos, YPos

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
PATHWAYS_DIR = os.path.join(ROOT, "content", "pathways")
OUT_DIR = os.path.join(ROOT, "public", "guides")

PRIMARY = (31, 92, 140)
INK = (21, 32, 43)
MUTED = (91, 107, 122)
TEAL = (42, 157, 143)
LINE = (227, 232, 238)
SOFT = (230, 238, 245)

ORDER = ["standard", "competent-authority", "specialist", "expedited-specialist"]


def load_sources():
    merged = {}
    for fn in ("sources.json", "sources-extra.json", "sources-colleges.json"):
        p = os.path.join(ROOT, "content", fn)
        if os.path.exists(p):
            merged.update(json.load(open(p, encoding="utf-8")))
    return merged


SOURCES = load_sources()

_SUBS = {
    "—": "-", "–": "-", "→": "to", "·": ",", "•": "-",
    "‘": "'", "’": "'", "“": '"', "”": '"', "…": "...", "↗": "", "é": "e",
}


def san(s):
    if not s:
        return ""
    for k, v in _SUBS.items():
        s = s.replace(k, v)
    return s.encode("latin-1", "ignore").decode("latin-1")


def clean_inline(s):
    s = re.sub(r"\[\[cite:[a-z0-9-]+\]\]", "", s)        # citation markers
    s = re.sub(r"\[([^\]]+)\]\([^)]+\)", r"\1", s)        # [text](url) -> text
    s = re.sub(r"\*+", "", s).replace("__", "")           # bold/italic markers
    s = re.sub(r"\s+([.,;:])", r"\1", s)                  # tidy space before punctuation
    return san(s).strip()


class Guide(FPDF):
    def mc(self, h, txt, **kw):
        self.multi_cell(0, h, txt, new_x=XPos.LMARGIN, new_y=YPos.NEXT, **kw)

    def header(self):
        self.set_fill_color(*PRIMARY)
        self.rect(0, 0, self.w, 12, "F")
        self.set_xy(self.l_margin, 3.5)
        self.set_font("Helvetica", "B", 10)
        self.set_text_color(255, 255, 255)
        self.cell(0, 5, "IMG Pathways Australia", align="L", new_x=XPos.LMARGIN, new_y=YPos.TOP)
        self.set_font("Helvetica", "", 9)
        self.cell(0, 5, "dranug1995.github.io/img-pathways", align="R")
        self.set_y(22)

    def footer(self):
        self.set_y(-16)
        self.set_draw_color(*LINE)
        self.line(self.l_margin, self.get_y(), self.w - self.r_margin, self.get_y())
        self.set_y(-13)
        self.set_font("Helvetica", "", 7.5)
        self.set_text_color(*MUTED)
        self.mc(3.6, san(
            "General information only, not advice. Always confirm against the official source "
            "(AHPRA, the AMC) and, for migration, a registered MARA agent. "
            f"Page {self.page_no()}."), align="L")

    def h2(self, text):
        if self.get_y() > self.h - 45:
            self.add_page()
        self.ln(3)
        self.set_font("Helvetica", "B", 14)
        self.set_text_color(*PRIMARY)
        self.mc(7, clean_inline(text))
        self.ln(1)

    def para(self, text, size=10.5, color=INK, gap=4.4):
        self.set_font("Helvetica", "", size)
        self.set_text_color(*color)
        self.mc(5.4, clean_inline(text))
        self.ln(gap)

    def bullet(self, text):
        self.set_font("Helvetica", "", 10.5)
        self.set_text_color(*INK)
        x = self.get_x()
        self.cell(5, 5.4, "-", new_x=XPos.RIGHT, new_y=YPos.TOP)
        self.set_x(x + 5)
        self.mc(5.4, clean_inline(text))

    def body(self, md):
        for raw in md.split("\n"):
            s = raw.strip()
            if not s:
                self.ln(2.2)
            elif s.startswith("### ") or s.startswith("## "):
                self.ln(1)
                self.set_font("Helvetica", "B", 11)
                self.set_text_color(*INK)
                self.mc(5.6, clean_inline(s.lstrip("# ")))
            elif s.startswith("- ") or s.startswith("* "):
                self.bullet(s[2:])
            elif s.startswith("|"):
                cells = [c.strip() for c in s.strip("|").split("|")]
                if all(set(c) <= set("-: ") for c in cells):
                    continue
                self.set_font("Helvetica", "", 9.5)
                self.set_text_color(*INK)
                self.mc(5, clean_inline("  |  ".join(cells)))
            else:
                self.set_font("Helvetica", "", 10.5)
                self.set_text_color(*INK)
                self.mc(5.4, clean_inline(s))

    def meta_box(self, meta):
        rows = [("Best for", meta.get("bestFor")), ("Leads to", meta.get("leadsTo")),
                ("What is involved", meta.get("examsSummary"))]
        for label, val in rows:
            if not val:
                continue
            self.set_font("Helvetica", "B", 8.5)
            self.set_text_color(*PRIMARY)
            self.cell(36, 5.6, san(label.upper()), new_x=XPos.RIGHT, new_y=YPos.TOP)
            self.set_font("Helvetica", "", 10)
            self.set_text_color(*INK)
            self.set_x(self.l_margin + 36)
            self.mc(5.6, clean_inline(val))
            self.ln(0.5)
        self.ln(3)


def page_sources(doc):
    ids, seen = [], set()
    for c in doc.get("claims", []):
        for sid in c.get("sourceIds", []):
            if sid not in seen:
                seen.add(sid); ids.append(sid)
    for f in doc.get("faq", []):
        for sid in f.get("sourceIds", []):
            if sid not in seen:
                seen.add(sid); ids.append(sid)
    return [SOURCES[i] for i in ids if i in SOURCES]


def build(slug):
    doc = json.load(open(os.path.join(PATHWAYS_DIR, f"{slug}.json"), encoding="utf-8"))
    pdf = Guide(format="A4")
    pdf.set_auto_page_break(True, margin=18)
    pdf.set_margins(18, 22, 18)
    pdf.add_page()

    if doc.get("eyebrow"):
        pdf.set_font("Helvetica", "B", 9)
        pdf.set_text_color(*TEAL)
        pdf.cell(0, 5, san(doc["eyebrow"].upper()), new_x=XPos.LMARGIN, new_y=YPos.NEXT)
        pdf.ln(2)
    pdf.set_font("Helvetica", "B", 22)
    pdf.set_text_color(*INK)
    pdf.mc(9, clean_inline(doc["title"]))
    pdf.ln(1)
    pdf.set_font("Helvetica", "", 9)
    pdf.set_text_color(*MUTED)
    pdf.mc(5, san(f"Last verified {doc.get('pageLastVerified','')}.  A guide from IMG Pathways Australia."))
    pdf.ln(6)

    if doc.get("pathwayMeta"):
        pdf.meta_box(doc["pathwayMeta"])
    if doc.get("summaryMarkdown"):
        pdf.para(doc["summaryMarkdown"], size=11)

    for sec in doc.get("sections", []):
        pdf.h2(sec.get("heading", ""))
        pdf.body(sec.get("bodyMarkdown", ""))

    faq = doc.get("faq", [])
    if faq:
        pdf.h2("Frequently asked questions")
        for f in faq:
            pdf.set_font("Helvetica", "B", 10.5)
            pdf.set_text_color(*INK)
            pdf.mc(5.4, clean_inline(f.get("question", "")))
            pdf.para(f.get("answerMarkdown", ""), size=10)

    srcs = page_sources(doc)
    if srcs:
        pdf.h2("Sources and last verified")
        pdf.set_font("Helvetica", "", 9)
        for i, s in enumerate(srcs, 1):
            pdf.set_text_color(31, 92, 140)
            label = f"{i}. {s.get('publisher','')}: {s.get('title','')}  (verified {s.get('lastVerified','')})"
            pdf.mc(5, san(label), link=s.get("url", ""))
            pdf.ln(0.6)

    os.makedirs(OUT_DIR, exist_ok=True)
    out = os.path.join(OUT_DIR, f"{slug}.pdf")
    pdf.output(out)
    return out, pdf.page_no()


if __name__ == "__main__":
    for slug in ORDER:
        out, pages = build(slug)
        print(f"{slug}: {pages} pages -> {os.path.relpath(out, ROOT)}")

# AI Document QA — agent conventions

Use this file when helping with this repo (Claude Code, Cursor, or other assistants).

## Project

RAG-style document Q&A: users upload documents, content is chunked and embedded, questions are answered from retrieved passages with source references.

## Stack

- **Runtime:** Node.js LTS
- **Language:** TypeScript (strict)
- **App:** Next.js (App Router), React
- **AI:** OpenAI-compatible chat + embeddings APIs
- **Retrieval:** vector store (start simple; swap later if needed)
- **Package manager:** npm
- **VCS:** Git + Conventional Commits (`feat:`, `fix:`, `docs:`, `chore:`, `refactor:`, `test:`)

## Conventions

- Prefer small, focused changes over large refactors.
- Do not commit secrets; keep `.env` local and document vars in `.env.example`.
- Answers from the product must be grounded in retrieved document context; avoid inventing sources.
- Keep UI accessible and readable; match existing patterns once the app scaffold exists.
- Tests: add or update tests when changing retrieval or API behavior.
- Commits: imperative subject, Conventional Commits format, one logical change per commit.

## Agent workflow

1. Read relevant files before editing.
2. Match existing style and naming.
3. Run checks the project defines (lint/test) when available.
4. Summarize what changed and how to verify it.

# AI Document QA

Ask questions about your documents and get grounded answers with citations.

## Overview

Capstone project for grounded document Q&A: upload PDFs or text files, index them with embeddings, and query an LLM that answers only from retrieved context (RAG). Early scaffolding stage — application code comes next.

## Features (planned)

- Upload and index PDF / text documents
- Semantic search over document chunks
- Chat-style Q&A with source citations
- Local development with an OpenAI-compatible API

## Stack

- Node.js (LTS) + TypeScript
- Next.js (App Router)
- OpenAI-compatible API for embeddings + chat
- Vector store for retrieval (local-first, swappable later)

## Getting started

**Prerequisites:** Node.js LTS, Git, and [Cursor](https://cursor.com) (or another editor).

```bash
git clone https://github.com/MohsinKhan747/ai-document-qa.git
cd ai-document-qa
npm install
npm run dev
```

Copy `.env.example` to `.env` and set your API keys once the app scaffold exists.

## Contributing notes

See [CLAUDE.md](CLAUDE.md) for stack details and agent/coding conventions. Use [Conventional Commits](https://www.conventionalcommits.org/).

## License

MIT — see [LICENSE](LICENSE).

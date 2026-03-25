<!-- omit in toc -->

# Paperless Neo

> A modern, collaborative, AI-native document management system.

Paperless Neo transforms your physical documents into a searchable online archive — with built-in AI classification, multi-user collaboration, and enterprise-grade access control.

Fork of [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) (GPL-3.0).

- [Why Paperless Neo?](#why-paperless-neo)
- [Features](#features)
- [Getting Started](#getting-started)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [Acknowledgements](#acknowledgements)
- [Important Note](#important-note)

## Why Paperless Neo?

Paperless-ngx is excellent for single-user document management. But it falls short in multi-user, team, and family environments:

| Problem | Paperless-ngx | Paperless Neo |
|---|---|---|
| Shared views/dashboards | Per-user only | Shared, default, and private views |
| Document visibility | Owner-based, binary | Granular sharing with permissions |
| Branding | Nginx CSS hacks | Built-in admin UI for full white-label |
| User provisioning | Broken OIDC registration flow | Auto-provision and auto-link on SSO |
| AI classification | Separate container (paperless-ai) | Built-in, zero-config AI pipeline |
| Permissions | Staff or regular user | Role-based access control (RBAC) |

See [NEO.md](NEO.md) for the full vision and [IDEAS.md](IDEAS.md) for the feature roadmap.

## Features

### Core (inherited from Paperless-ngx)

- **OCR & Archival** — Tesseract-based OCR, PDF/A archive generation
- **Full-Text Search** — Find any document by content (Whoosh)
- **Auto-Classification** — ML-based tagging, correspondent and document type assignment
- **Email Ingestion** — Fetch documents from IMAP mailboxes
- **REST API** — Full API with OpenAPI documentation
- **Multi-Format Support** — PDF, images, Office documents (via Tika/Gotenberg), and more
- **Barcode Detection** — Split multi-page scans by barcode separator
- **Multi-Language** — 30+ languages, coordinated via Crowdin
- **Authentication** — MFA, OIDC, OAuth2 via django-allauth

### Planned Neo Enhancements

- **Native AI Pipeline** — Built-in classification with OpenAI, Anthropic, Ollama support
- **Semantic Search** — Natural language queries and vector similarity via FAISS
- **Shared Views & Dashboard** — Collaborative dashboard layouts
- **Document Sharing** — Granular permissions (view/edit/manage)
- **White-Label Branding** — Logo, colors, custom CSS via admin UI
- **RBAC** — Role-based access control with group permissions
- **Auto User Provisioning** — Seamless SSO/OIDC onboarding

## Getting Started

### Docker Compose

```bash
git clone https://github.com/marcelrgberger/paperless-neo.git
cd paperless-neo/docker/compose

# PostgreSQL + Tika (recommended)
docker compose -f docker-compose.postgres-tika.yml up -d

# Create admin user
docker compose exec paperless python manage.py createsuperuser
```

Then open http://localhost:8000.

### Development

```bash
uv sync --group dev
uv run prek install
mkdir -p consume media
cd src && uv run manage.py migrate && uv run manage.py createsuperuser
scripts/start_services.sh

# Backend
cd src && uv run manage.py runserver

# Frontend
cd src-ui && pnpm install && pnpm ng serve
```

See the [Wiki](https://github.com/marcelrgberger/paperless-neo/wiki) for detailed setup and architecture docs.

## Contributing

We welcome contributions — code, ideas, design, docs, testing.

1. Fork the repo
2. Branch from `dev` (`feature/your-feature`)
3. Write tests for your changes
4. Format with ruff
5. Open a PR with a clear description

See [CONTRIBUTING.md](CONTRIBUTING.md) for details.

### Areas Where Help is Needed

- **Backend (Python/Django)** — Shared views, RBAC, AI pipeline
- **Frontend (Angular/TypeScript)** — Branding UI, dashboard, mobile
- **AI/ML** — Classification, semantic search, document understanding
- **Design** — UI/UX mockups and a new logo/icon for Paperless Neo

## Documentation

- **[Wiki](https://github.com/marcelrgberger/paperless-neo/wiki)** — Architecture, API, development setup, testing
- **[Upstream Docs](https://docs.paperless-ngx.com)** — Configuration reference (still applicable)

## Acknowledgements

Paperless Neo is built on the shoulders of:

- [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) — The upstream project
- [Paperless-ng](https://github.com/jonaswinkler/paperless-ng) — The predecessor
- [Paperless](https://github.com/the-paperless-project/paperless) — The original
- [Paperless-AI](https://github.com/clusterzx/paperless-ai) — AI classification inspiration

## Important Note

> Document scanners are typically used to scan sensitive documents like your social insurance number, tax records, invoices, etc. **Paperless Neo should never be run on an untrusted host** because information is stored in clear text without encryption. No guarantees are made regarding security (but we do try!) and you use the app at your own risk.
> **The safest way to run Paperless Neo is on a local server in your own home with backups in place**.

## License

GPL-3.0 — Same as the upstream project. See [LICENSE](LICENSE).

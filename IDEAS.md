# Paperless Neo — Vision & Ideas

> A modern, opinionated fork of [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) focused on multi-user collaboration, branding flexibility, native AI, and enterprise-grade user management.

## Origin

Based on Paperless-ngx (GPL-3.0). Paperless Neo aims to solve real-world pain points encountered when running Paperless-ngx in small team and family environments.

---

## 1. Shared Views & Dashboard

**Problem:** Saved views are per-user only. There is no way to share a dashboard layout, sidebar views, or saved filters with other users. Admins cannot define a default experience for new users.

**Ideas:**
- Introduce **shared views** that are visible to all users (or specific groups)
- Allow admins to define a **default dashboard** that every new user gets on first login
- Views should have a visibility setting: `private`, `shared`, `default` (admin-defined)
- When a user modifies a shared view, create a personal copy (copy-on-write)
- Admins can "push" view updates to all users who haven't customized them

---

## 2. Document Visibility & Sharing

**Problem:** Documents with an owner are invisible to other users. The only options are "owned" (private) or "no owner" (visible to all). No granular sharing.

**Ideas:**
- Documents should be visible to **all users by default** (configurable per instance)
- Introduce **document sharing** with granular permissions: `view`, `edit`, `manage`
- Share documents with specific users or groups
- Admin setting: "Default document visibility" — `everyone`, `owner-only`, `group`
- Shared folders / workspaces where multiple users collaborate
- Activity log: who viewed/edited what

---

## 3. Full White-Label Branding

**Problem:** Customizing the look of Paperless-ngx requires CSS injection via reverse proxy (nginx sub_filter). Logo changes don't persist across updates. The leaf icon is hardcoded in static assets.

**Ideas:**
- **Admin UI for complete branding**: logo, favicon, app name, primary color, accent color
- All branding stored in database, not in static files (survives container updates)
- Color theme picker with live preview
- Custom CSS field in admin settings (no nginx hacks needed)
- Custom login page background and message
- Email notification templates with custom branding

---

## 4. User Provisioning & Management

**Problem:** OIDC/SSO users land on a registration page on first login. Social account linking with existing accounts fails. No way to pre-provision users or assign default permissions.

**Ideas:**
- **Auto-provisioning**: OIDC users are automatically created and linked on first login — no registration step
- Admin can **pre-create users** with email, group, and permissions before they log in
- SSO account linking should work automatically when email matches
- **User groups** with predefined permissions, default views, and document access
- Group-based document visibility (e.g., "Finance" group sees all invoices)
- User invitation system via email
- Bulk user import (CSV/OIDC sync)

---

## 5. Better Permissions System

**Problem:** Permissions are basic — staff/superuser or regular user. No role-based access, no per-document-type restrictions.

**Ideas:**
- **Role-based access control (RBAC)**: define roles like `viewer`, `editor`, `manager`, `admin`
- Permissions per **document type**: e.g., "Finance team can see invoices, HR can see contracts"
- Permissions per **correspondent**: e.g., "Only managers see documents from lawyers"
- Permissions per **tag**: tag-based access control
- **Audit trail**: who did what, when (view, edit, delete, download, share)
- API token scoping: tokens with limited permissions

---

## 6. Improved Consume Pipeline

**Problem:** Consume folder doesn't scan subdirectories by default. No way to assign metadata based on source folder. No email-based consume with auto-tagging.

**Ideas:**
- **Recursive consume** enabled by default
- **Folder-based rules**: documents from `consume/invoices/` auto-tagged as "Invoice"
- **Email consume** with sender-based correspondent matching
- **Watch folders** configurable via UI (not just env vars)
- Upload via **mobile app** with camera scan
- **Drag & drop** zones on dashboard for different document types
- Webhook on document ingestion

---

## 7. Modern UI/UX

**Problem:** The UI is functional but dated. Mobile experience is poor. No dark/light mode toggle.

**Ideas:**
- **Dark/light mode toggle** in user settings (not just system preference)
- **Mobile-first responsive design**
- **Bulk operations**: select multiple documents, bulk tag/retag/move/delete
- **Kanban view** for document workflows (e.g., "To Review" → "Approved" → "Filed")
- **Timeline view**: documents on a timeline by date
- **Dashboard widgets**: storage usage, document count trends, recent activity
- Quick actions: scan, upload, search from anywhere
- Keyboard shortcuts for power users

---

## 8. Native AI Integration

**Problem:** AI classification currently requires a separate container ([paperless-ai](https://github.com/clusterzx/paperless-ai)) with its own web UI, API token setup, and configuration. This is fragile, hard to maintain, and duplicates concerns. Paperless Neo should absorb everything paperless-ai does — and more.

### What paperless-ai does today (to be absorbed):
- Auto-classify new documents: set title, tags, correspondent, document type
- Uses OpenAI (GPT-4o) or other providers via API
- Runs in `auto` mode — processes every new document without user interaction
- Adds a default tag (e.g., "KI-Analysiert") to mark processed documents
- Provides a separate web UI for configuration

### Native integration in Paperless Neo:

**Core — Zero-Config AI Pipeline:**
- AI classification runs **inside Paperless Neo** as part of the consume pipeline — no separate container
- New documents are automatically processed: title, tags, correspondent, document type
- Configurable via **Admin UI** (Settings → AI), not env vars or separate web UI
- AI processing is a **post-consume step**, after OCR but before indexing
- Processed documents get a system tag (e.g., `ai-classified`) with confidence score

**Provider Support:**
- **OpenAI** (GPT-4o, GPT-4.1) — default
- **Anthropic** (Claude Sonnet/Opus)
- **Google** (Gemini)
- **Ollama** (local, self-hosted) — for privacy-sensitive deployments
- **Custom endpoints** — any OpenAI-compatible API
- Provider selection and API keys configurable in Admin UI
- **Fallback chain**: if primary provider fails, try secondary

**Smart Classification:**
- Learns from existing documents: "Documents from Deutsche Telekom are usually tagged 'Rechnung' with correspondent 'Deutsche Telekom'"
- **Confidence scores** visible in document detail view
- **Review mode**: AI suggests, user confirms (for high-value documents)
- Auto-mode: AI classifies without user interaction (for routine documents)
- Configurable per document type: "Always auto-classify invoices, but review contracts"

**AI-Powered Search:**
- Natural language queries: "show me all invoices from last quarter over 500 EUR"
- Semantic search: find documents by meaning, not just keywords
- "Find similar documents" — click a document and find related ones

**Document Understanding:**
- **Auto-summarization**: AI-generated summary stored as document note
- **Key data extraction**: extract amounts, dates, IBAN, tax IDs into custom fields
- **Table extraction**: detect and extract tabular data from PDFs
- **Handwriting recognition**: enhanced OCR for handwritten notes
- **Multi-language**: detect document language and set OCR language accordingly

**Workflow Automation:**
- AI-powered **workflow rules**: "If AI detects this is a tax document dated January, tag it 'Steuererklaerung' and assign to 'Finanzamt'"
- **Smart routing**: auto-assign documents to users/groups based on content
- **Duplicate detection**: AI identifies near-duplicate documents
- **Expiry detection**: AI reads expiry dates and sets reminders

**UI Integration:**
- AI processing status visible in document list (spinner while processing)
- "Re-classify" button to re-run AI on existing documents
- AI settings per user: some users want auto-mode, others want review
- Dashboard widget: "AI processed X documents today, Y need review"
- Inline AI suggestions: hover over a tag suggestion to see why AI chose it

---

## 9. Backup & Export

**Problem:** No built-in backup strategy. Export is manual.

**Ideas:**
- **Scheduled backups** to S3/object storage (built-in)
- **One-click export** of all documents with metadata (portable format)
- **Import from other DMS**: migration wizard
- **Version history**: keep previous versions of documents
- **Trash retention**: configurable auto-delete period

---

## Technical Direction

- **Framework**: Keep Django backend, modernize frontend (consider Vue 3 or React)
- **API**: OpenAPI spec, full REST API coverage
- **Container**: Single container option (all-in-one) for simple deployments
- **Database**: PostgreSQL (primary), SQLite (dev/small installs)
- **License**: GPL-3.0 (same as upstream)

---

## Links

- Upstream: https://github.com/paperless-ngx/paperless-ngx
- License: GPL-3.0

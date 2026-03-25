# Contributing to Paperless Neo

Thanks for your interest in Paperless Neo! We welcome all contributions — code, ideas, design, docs, testing.

## How to Contribute

### Ideas & Feature Requests

- Open an [issue](https://github.com/marcelrgberger/paperless-neo/issues) or [discussion](https://github.com/marcelrgberger/paperless-neo/discussions)
- Check [IDEAS.md](IDEAS.md) for the current roadmap
- Describe the problem you're solving, not just the solution

### Bug Reports

- Open an issue with steps to reproduce
- Include version, environment, and relevant logs

### Code

1. Fork the repo
2. Branch from `dev` (`feature/your-feature`)
3. Write tests for your changes
4. Format with [ruff](https://docs.astral.sh/ruff/formatter/)
5. Open a PR with a clear description

### Areas Where Help is Needed

- **Backend (Python/Django):** Shared views, RBAC, AI pipeline
- **Frontend (Angular/TypeScript):** Branding UI, dashboard, mobile
- **AI/ML:** Classification, semantic search, document understanding
- **Docs:** User guides, API docs, architecture decisions
- **Testing:** Unit, integration, e2e
- **Design:** UI/UX mockups

## Development

### Python

Supports Python 3.12+. Format with [ruff](https://docs.astral.sh/ruff/formatter/).

### Branches

- `main` — latest release
- `dev` — next release, branch from here
- `feature-X` — experimental features

### Testing

```bash
cd src && pytest
```

See the [development docs](https://docs.paperless-ngx.com/development/) for full setup.

## Code of Conduct

Be respectful, constructive, and inclusive.

## License

By contributing, you agree that your contributions will be licensed under GPL-3.0.

## Origin

Paperless Neo is a fork of [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx). We acknowledge and thank the original maintainers and contributors.

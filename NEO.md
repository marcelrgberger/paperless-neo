# Paperless Neo

> A modern, collaborative, AI-native document management system.
> Fork of [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) (GPL-3.0).

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

## Status

**Planning Phase** — Collecting ideas, designing features, preparing the codebase for changes.

## Feature Roadmap

See [IDEAS.md](IDEAS.md) for the full feature vision.

## Contributing

We welcome contributions! Whether it's code, ideas, design, testing, or documentation — every contribution helps.

- **Got an idea?** Open an issue or discussion
- **Want to code?** Fork, branch from `dev`, and submit a PR
- **Found a bug?** Open an issue with reproduction steps

See the upstream [development docs](https://docs.paperless-ngx.com/development/) for setup instructions.

## Acknowledgements

Paperless Neo is built on the shoulders of:

- [Paperless-ngx](https://github.com/paperless-ngx/paperless-ngx) — The upstream project
- [Paperless-ng](https://github.com/jonaswinkler/paperless-ng) — The predecessor
- [Paperless](https://github.com/the-paperless-project/paperless) — The original
- [Paperless-AI](https://github.com/clusterzx/paperless-ai) — AI classification inspiration

## License

GPL-3.0 — Same as the upstream project. See [LICENSE](LICENSE).

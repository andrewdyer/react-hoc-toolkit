## Description

<!-- A single prose paragraph explaining what this PR does and why. On squash merge, this becomes the commit body — keep it concise and focused. -->

## Proposed Changes

<!-- An optional breakdown of what changed and why. Use this section for the detail that helps reviewers but doesn't need to end up in the commit history. The GitHub summary generator output fits well here. -->

## Type of Change

- [ ] `feat` — new feature (minor version bump)
- [ ] `fix` — bug fix (patch version bump)
- [ ] `deps` — dependency update (patch version bump when releasable)
- [ ] `chore` / `docs` / `refactor` / `test` / `ci` — no version bump
- [ ] `feat!` or `BREAKING CHANGE:` — breaking change (major version bump)

## Related Issue

<!-- Link to the issue this addresses (if applicable): closes #123 -->

## Checklist

- [ ] PR title follows Conventional Commits format: `<type>(<scope>): <description>` where scope is optional
- [ ] Description is a single paragraph suitable for squash-merge commit body
- [ ] Code has been formatted with `pnpm format`
- [ ] Code has been linted with `pnpm lint`
- [ ] Tests have been added or updated where appropriate
- [ ] All tests pass with `pnpm test`
- [ ] Lockfile has been updated with `pnpm install` (deps changes only)
- [ ] Breaking changes in updated dependencies have been assessed (deps changes only)
- [ ] Fix has been verified in development (bug fixes only)

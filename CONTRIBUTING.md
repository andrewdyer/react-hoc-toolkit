# Contributing

Thank you for your interest in contributing! Contributions and suggestions that improve the project are always welcome. The guidelines below help ensure a smooth and productive experience for everyone involved.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Development Setup](#development-setup)
- [Development Workflow](#development-workflow)
  - [Branching](#branching)
  - [Coding](#coding)
  - [Building](#building)
  - [Testing](#testing)
  - [Committing](#committing)
- [Dependency Management](#dependency-management)
- [Coding Standards](#coding-standards)
- [Issue Reporting](#issue-reporting)

## Code of Conduct

We strive to maintain a welcoming, respectful, and inclusive community where everyone can collaborate productively. Please adhere to our [Code of Conduct](./CODE_OF_CONDUCT.md) in all interactions.

## Development Setup

A consistent development environment helps ensure contributors can build, test, and run the project reliably.

Prepare the project for local development after cloning the repository:

1. Clone the repository and navigate to its directory.
2. Install the correct Node.js version and project dependencies — see [Dependency Management](#dependency-management).
3. Start Storybook with `pnpm start:storybook` to develop and preview components in isolation.

> **Note:** Installing dependencies also sets up the Git hooks that format and lint staged files and validate commit messages.

A running Storybook confirms the environment is ready for local changes.

## Development Workflow

Moving from a new branch to a reviewable change follows the same sequence for every contribution.

### Branching

Keeping work isolated in focused branches makes reviews easier and reduces the risk of unrelated changes being introduced.

Choose the appropriate target branch before creating a feature branch:

- Bug fixes should be sent to the latest stable branch.
- Minor features that are fully backwards compatible with the current release may be sent to the latest stable branch.
- Major features should always be sent to the `main` branch, which contains the upcoming release.

Create and submit a branch for each change in order:

1. Create a feature branch for each change with `git checkout -b feature/your-feature-name`.
2. Complete the change, then build, test, and commit it — see [Coding](#coding), [Building](#building), [Testing](#testing), and [Committing](#committing).
3. Push the branch once changes are ready with `git push origin feature/your-feature-name`.
4. Open a pull request with a title and description that clearly explain the change — see [Committing](#committing) for the title format.

An open pull request signals the change is ready for review.

> **Tip:** GitHub pre-fills the description from the repository's single pull request template, ready to complete before submitting.

The review process continues until the change is ready to merge:

- Review feedback carefully and suggest improvements or alternatives when needed.
- Apply requested changes in follow-up commits instead of overwriting or squashing history; the merge will be squashed later.
- Keep the branch up to date with the target branch if new commits land while review is in progress.
- Re-request review after the requested changes are in place.
- Resolve review conversations once the underlying concern has been addressed.

The pull request is ready to merge once review conversations are resolved and required checks pass.

### Coding

Keeping changes focused makes reviews easier and reduces the likelihood of unrelated regressions.

Write the change with the existing codebase in mind:

- Keep changes limited to the branch's purpose, avoiding unrelated edits.
- Match existing patterns and conventions already used nearby in the codebase.
- Add or update Storybook stories alongside component changes.
- Export new components from the package entry point in `src/index.ts` so consumers can import them.
- Apply the formatting and linting expectations described in [Coding Standards](#coding-standards) while writing code.

A focused, convention-following change is faster to review and less likely to introduce regressions.

### Building

Building the package validates that publishable output can be generated successfully before changes are submitted.

Generate build output with the following commands:

- Build the package with `pnpm build`.
- Build the Storybook site with `pnpm build:storybook`.

A successful build confirms the package is ready for further validation.

### Testing

Writing tests and checking static types helps verify changes behave as expected and reduces the chance of regressions reaching other contributors.

Run the validation suite before submitting changes:

- Check static types with `pnpm typecheck`.
- Execute all tests with `pnpm test`.
- Re-run tests on file changes with `pnpm test:watch`.
- Check test coverage with `pnpm test:coverage`.
- Explore tests interactively with `pnpm test:ui`.

Structure test files consistently for readability and easier maintenance:

- Mock dependencies and libraries first.
- Define helper functions and constants for mock data.
- Group focused test cases in `describe` blocks.

Passing type checks and tests confirm changes behave as intended and are ready for review.

### Committing

Consistent commit messages, written in a shared format, improve project history and clarify the intent behind each change.

Follow the format below for every commit:

```text
<type>(<scope>): <description>

<body>

[optional footer]
```

The subject line summarises the change and must:

1. **Use a valid commit type.**
   - A new feature uses `feat`.
   - A bug fix uses `fix`.
   - A dependency change uses `deps`.
   - Maintenance, documentation, refactors, tests, and CI changes use `chore`, `docs`, `refactor`, `test`, or `ci`.
2. **Use the scope to identify the affected component.**
3. **Have a clear description.**
   - Use lowercase text.
   - Be written in the imperative style (for example, `add feature` instead of `added feature`).
   - Be concise and specific enough to understand the change at a glance.
   - Do not end with a full stop.
   - Keep the subject line under 72 characters.

> **Tip:** Omit the scope for changes that are not specific to one component.

The body provides additional context about the change and should:

- Explain what changed and why.
- Include relevant context that helps reviewers understand the decision without reading the diff.
- Keep lines under 100 characters.
- Use paragraphs rather than lists or headers.

The footer is optional and is used for additional metadata, such as breaking changes.

- A breaking change should use `!` after the type (for example, `feat!`) or include a `BREAKING CHANGE:` footer.

> **Note:** Pull request titles follow the same format, since they become the squash merge commit message.

A well-formatted commit message helps reviewers and future contributors understand why a change was made.

## Dependency Management

Dependencies should be managed carefully to keep the project secure, compatible, and easy to maintain over time.

Install dependencies before running the project locally:

- Install the Node.js version specified in `.nvmrc`, or run `nvm install` and `nvm use` when using [nvm](https://github.com/nvm-sh/nvm).
- Install every dependency with `pnpm install`.

Manage dependencies with these commands:

- Add a dependency with `pnpm add <package-name>`.
- Add a development dependency with `pnpm add -D <package-name>`.
- Remove a dependency with `pnpm remove <package-name>`.

Check for outdated dependencies before planning an update:

- Check every dependency with `pnpm outdated`.

Update dependencies to bring in fixes and improvements:

- Update every dependency with `pnpm update`.

After any dependency change, confirm compatibility by [building](#building) and [testing](#testing) the package, then commit the updated lockfile.

## Coding Standards

Following shared coding conventions keeps the codebase consistent, readable, and easier to maintain.

Apply consistent formatting and linting before submitting changes:

- Format code using [Prettier](https://prettier.io/) with `pnpm format`.
- Lint code using [ESLint](https://eslint.org/) with `pnpm lint`.

Formatted and linted code passes CI checks without additional review comments on style.

## Issue Reporting

Clear issue reports make it easier to reproduce problems, discuss improvements, and track future work.

Select the template that matches the issue before submitting a report:

- Unexpected behaviour or defects use the Bug Report template.
- New features or enhancements use the Feature Request template.
- Changes to existing functionality use the Improvement template.
- Missing or unclear documentation uses the Documentation template.
- Requests for help or clarification use the Question template.
- Avoid duplicate reports by searching existing issues and checking the README and documentation first.

> **Tip:** GitHub shows the matching template automatically once an issue category is selected.

A complete, well-templated report helps maintainers triage and respond quickly.

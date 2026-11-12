import config from './commitlint.config.js';

/**
 * Commitlint configuration for pull request titles.
 *
 * Squash merges use the PR title as the commit message on main, so every
 * title must be a Conventional Commit for Release Please to read it. The
 * default ignores (merge, revert, fixup! and semver-only messages) are
 * disabled here but stay enabled for local commits.
 *
 * @type {import("@commitlint/types").UserConfig}
 */
export default {
  ...config,
  defaultIgnores: false,
};

---
name: agentic-scaffold
description: Use when applying the Agentic Engineering Kit to a Codex project or repository, including adding project-level guardrails, wiring a local plugin marketplace entry, preserving existing AGENTS.md instructions, and explaining how to use the included agentic-harness-engineering, agentic-brief, agentic-tdd, and agentic-diagnose skills.
---

# Agentic Scaffold

Use this skill to apply the Agentic Engineering Kit to a Codex project. It installs project-level guardrails and confirms the local plugin is discoverable without overwriting existing project instructions.

Use the current workspace by default. If the user provides a GitHub URL, clone or open that repository only after normal workspace and network permissions are satisfied.

## Workflow

1. Inspect the target:
   - Identify the repository root.
   - Check for `AGENTS.md`, `.agents/plugins/marketplace.json`, `plugins/`, and existing Codex skill or plugin structure.
   - Read existing agent instructions before editing.

2. Apply guardrails:
   - Add a concise `Agentic Coding Guardrails` section to `AGENTS.md`.
   - Preserve existing project-specific instructions.
   - If a similar section exists, merge instead of duplicating.

3. Wire plugin discovery:
   - Ensure `.agents/plugins/marketplace.json` contains an entry for `agentic-engineering-kit` when the plugin is repo-local.
   - Do not overwrite unrelated marketplace entries.
   - Keep source paths relative to the repository root.

4. Validate:
   - Confirm plugin manifest JSON is valid.
   - Validate included skills when the skill validator is available.
   - Search for unresolved scaffold markers in generated files.

5. Report:
   - List files created or changed.
   - State whether existing instructions were merged or left untouched.
   - Show the exact prompts to use the kit.

## AGENTS.md Section

Use this section when the target project does not already have equivalent guidance:

```md
## Agentic Coding Guardrails

- Think before coding: state risky assumptions, surface ambiguity, and ask only when a wrong assumption would cause rework, data loss, security risk, or user-visible mistakes.
- Keep code simple: do not add speculative abstractions, configuration, flexibility, or features beyond the request.
- Make surgical changes: every changed line should trace to the task. Do not reformat, refactor, or clean unrelated code.
- Work from verifiable goals: define success criteria, use tests or executable checks where practical, and do not claim completion without relevant verification.

## Skill Routing

- Use `$agentic-harness-engineering` before large, agent-first features that need repo-local context, execution plans, validation loops, or guardrails before implementation.
- Use `$agentic-brief` before non-trivial features, migrations, refactors, or ambiguous UI/API changes.
- Use `$agentic-tdd` when the desired behavior is clear enough to implement and verify.
- Use `$agentic-diagnose` for bugs, regressions, flaky tests, or unexpected runtime behavior.
- For trivial copy edits, obvious one-line fixes, or purely mechanical changes, proceed directly without the full workflow.
```

## Quality Rules

- Do not delete or rewrite existing project instructions.
- Do not install duplicate plugin entries.
- Do not create repo-local skills when the plugin itself already provides them.
- Ask before cloning an external repository if network or destination is unclear.
- Stop when the target repo can discover the plugin and the usage prompts are documented.

## Usage Prompts

```text
Use $agentic-harness-engineering to design a Codex-readable harness before implementation.
```

```text
Use $agentic-brief to turn this request into a compact implementation brief before coding.
```

```text
Use $agentic-tdd to implement the first slice with a failing test, minimal code, and verification.
```

```text
Use $agentic-diagnose to reproduce this bug, gather evidence, find root cause, and add a regression check.
```

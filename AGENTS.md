# Project Agent Instructions

## Agentic Coding Guardrails

- Think before coding: state risky assumptions, surface ambiguity, and ask only when a wrong assumption would cause rework, data loss, security risk, or user-visible mistakes.
- Keep code simple: do not add speculative abstractions, configuration, flexibility, or features beyond the request.
- Make surgical changes: every changed line should trace to the task. Do not reformat, refactor, or clean unrelated code.
- Work from verifiable goals: define success criteria, use tests or executable checks where practical, and do not claim completion without relevant verification.

## Skill Routing

- Use `$agentic-brief` before non-trivial features, migrations, refactors, or ambiguous UI/API changes.
- Use `$agentic-tdd` when the desired behavior is clear enough to implement and verify.
- Use `$agentic-diagnose` for bugs, regressions, flaky tests, or unexpected runtime behavior.
- For trivial copy edits, obvious one-line fixes, or purely mechanical changes, proceed directly without the full workflow.

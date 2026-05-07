---
name: agentic-harness-engineering
description: "Use for large, agent-first software work where Codex should design or improve the repository harness before implementation: docs map, execution plans, validation loops, architecture guardrails, observability/readability surfaces, review loops, and entropy cleanup, while routing concrete coding work through agentic-brief, agentic-tdd, and agentic-diagnose."
---

# Agentic Harness Engineering

Use this skill when the task is too large or too system-shaped to solve by coding immediately. The goal is to make the repository easier for Codex to read, verify, and safely change before sending agents into implementation work.

This skill is based on OpenAI's harness engineering pattern: humans design the environment, intent, scaffolding, and feedback loops; Codex performs the executable work inside those rails.

Do not use this for small edits, one-off bug fixes, or already-scoped implementation slices. Route those to `agentic-tdd` or `agentic-diagnose`.

## When To Use

- A feature needs multiple PR-sized slices, design choices, and verification gates.
- Codex lacks enough repo-local context to act autonomously.
- The project needs `AGENTS.md`, docs, plans, tests, lint rules, or scripts before implementation.
- A UI, service, or workflow needs an agent-readable validation path.
- Repeated agent mistakes suggest missing guardrails or stale documentation.
- The user asks for an agent-first plan, execution harness, or Codex-oriented repo setup.

## Core Loop

1. Read the current harness:
   - Inspect `AGENTS.md`, `README`, architecture docs, `docs/`, tests, scripts, CI, lint rules, and local developer commands.
   - Treat `AGENTS.md` as a map, not an encyclopedia.
   - Identify which important knowledge exists only in the user's prompt or outside the repo.
   - If the Agentic Engineering Kit is not applied yet, use `$agentic-scaffold` first.

2. Define the human intent:
   - Use `$agentic-brief` to clarify the goal, non-goals, constraints, acceptance criteria, and first vertical slice.
   - Ask only for product or risk decisions that cannot be discovered from the repo.

3. Design the harness:
   - Add or update repo-local artifacts that Codex can read later.
   - Prefer concise maps plus deeper linked docs over one giant instruction file.
   - Encode repeated preferences as tests, lint rules, scripts, templates, or checklists when practical.

4. Create an execution plan:
   - Store complex plans under `docs/exec-plans/active/<task-slug>/plan.md` when the repo has or needs persistent planning.
   - Keep simple plans in the conversation if the work is short-lived.
   - Split work into PR-sized vertical slices with verification for each slice.

5. Build validation loops:
   - Route implementation slices through `$agentic-tdd`.
   - Route bugs, flakes, and regressions through `$agentic-diagnose`.
   - Include the exact commands, scripts, browser flows, logs, metrics, screenshots, or smoke checks Codex should use.

6. Add review and cleanup loops:
   - Define what the agent should self-review before handoff.
   - Track follow-up debt in `docs/exec-plans/` or a repo-specific debt tracker only when useful.
   - Turn repeated failures into guardrails rather than repeating prose instructions.

## Harness Artifacts

Create only the artifacts needed for the task. Do not scaffold the full tree unless the project is large enough to justify it.

```text
AGENTS.md
ARCHITECTURE.md
docs/
  exec-plans/
    active/
    completed/
    tech-debt-tracker.md
  product-specs/
  design-docs/
  references/
  generated/
```

Recommended minimum for most projects:

- `AGENTS.md`: short map, guardrails, skill routing, key commands.
- `docs/exec-plans/active/<task-slug>/plan.md`: persistent plan for complex work.
- Existing tests/scripts/CI: preferred verification entry points.

## Output Format

```text
Harness Plan

Goal:
...

Current harness:
- ...

Missing rails:
- ...

Artifacts to create/update:
- ...

Execution slices:
1. ...

Validation loops:
- ...

Review / cleanup:
- ...

Next action:
...
```

## Quality Rules

- Do not bury the agent in a huge `AGENTS.md`; keep it as a map to repo-local sources.
- Put durable knowledge in versioned files that future Codex runs can read.
- Prefer mechanical enforcement over repeated natural-language reminders.
- Prefer boring, inspectable, repo-local tools over opaque external magic.
- Do not implement the product feature until the harness has enough context and verification to keep the work safe.
- Stop when Codex has a clear first slice, a verification loop, and any needed repo-local context.

## Handoff Prompts

```text
Use $agentic-brief to turn this harness goal into acceptance criteria and a first slice.
```

```text
Use $agentic-tdd to implement the first execution slice from this harness plan.
```

```text
Use $agentic-diagnose to reproduce and fix the failure identified by this validation loop.
```

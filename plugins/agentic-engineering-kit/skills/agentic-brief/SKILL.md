---
name: agentic-brief
description: Use before non-trivial coding work when a feature, refactor, migration, UI change, or ambiguous request needs a compact implementation contract with clear goals, non-goals, acceptance criteria, risks, verification, and a first vertical slice before coding.
---

# Agentic Brief

Use this skill to turn a vague or broad request into an executable engineering brief. It combines interview-style clarification with outcome-first prompt guidance: define the desired result, constraints, and stopping conditions before implementation.

Do not use this for tiny edits, obvious one-line fixes, or purely mechanical changes where requirements are already concrete.

## Workflow

1. Classify the task:
   - Feature
   - Bug
   - Refactor
   - Migration
   - UI/UX change
   - Test/tooling change
   - Research or spike

2. Gather local context:
   - Read relevant README, AGENTS, SPEC, docs, issue text, tests, and nearby code.
   - Prefer repository conventions over generic best practices.
   - Identify existing domain terms, data models, API contracts, and validation patterns.

3. Ask only blocking questions:
   - Ask at most 3 questions.
   - Ask only when a wrong assumption would cause rework, data loss, API breakage, security risk, or user-facing behavior mismatch.
   - If the answer can be discovered from the repo, inspect the repo instead of asking.
   - If a reasonable assumption is safe, state it briefly and continue.

4. Write the brief:
   - Keep it compact enough to guide implementation in the same conversation.
   - Focus on observable outcomes, not internal implementation preferences.
   - Make acceptance criteria verifiable.
   - Include a first vertical slice that produces useful behavior end to end.

5. Decide the next mode:
   - If behavior is clear: proceed to implementation, preferably with `agentic-tdd`.
   - If this is a bug: switch to `agentic-diagnose`.
   - If scope is too large: split into smaller vertical slices.
   - If behavior is uncertain: propose a prototype or spike before production code.

## Output Format

```text
Agentic Brief

Task type:
...

Goal:
...

Non-goals:
- ...

Current context:
- ...

Acceptance criteria:
- ...

Constraints:
- ...

Risks / unknowns:
- ...

Verification:
- ...

First slice:
...
```

## Quality Rules

- Prefer outcome-first instructions over long process narration.
- Treat the task as incomplete until the brief has concrete acceptance criteria and a verification plan.
- Do not invent product requirements silently.
- Do not make a full PRD unless the user asks for one.
- Prefer vertical slices over layer-by-layer plans.
- Prefer simple, surgical changes over speculative abstractions.
- Stop when the next implementation step is clear, or when a blocker is explicitly identified.

## Handoff Prompts

```text
Use $agentic-tdd to implement the First slice from this Agentic Brief.
Start with the smallest failing test or executable check, then make the minimal implementation pass.
```

```text
Use $agentic-diagnose for the bug-shaped part of this brief.
Reproduce the behavior before changing code, then add a regression check.
```

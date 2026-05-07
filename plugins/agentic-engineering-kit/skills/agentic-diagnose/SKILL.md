---
name: agentic-diagnose
description: Use for bugs, test failures, flaky behavior, regressions, or unexpected runtime behavior where the agent must reproduce the issue, gather evidence, identify root cause, fix narrowly, and add a regression check before claiming resolution.
---

# Agentic Diagnose

Use this skill for debugging. The goal is evidence-based diagnosis: reproduce first, narrow the failure, change code only after the likely root cause is grounded in tests, logs, code paths, or runtime observations.

Do not use this for straightforward planned feature work. Use `agentic-brief` first when the reported problem mixes bugs, product ambiguity, and refactor scope.

## Workflow

1. Capture the report:
   - Observed behavior
   - Expected behavior
   - Environment or inputs, if known
   - Recent changes or affected area, if known

2. Reproduce before fixing:
   - Run the failing test, command, UI flow, request, or minimal script.
   - If no reproduction exists, create the smallest practical reproduction.
   - If the first attempt fails to reproduce, try one or two plausible alternate paths before declaring it unreproduced.

3. Gather evidence:
   - Inspect logs, stack traces, network requests, data state, tests, and relevant code.
   - Trace the path from input to failure.
   - Separate facts from hypotheses.

4. Narrow the root cause:
   - Form hypotheses that explain the observed evidence.
   - Test or disprove them with focused checks.
   - Do not modify code based only on intuition.

5. Fix narrowly:
   - Make the smallest change that addresses the root cause.
   - Avoid broad refactors unless the bug cannot be fixed safely without them.
   - Preserve unrelated user changes.

6. Add a regression check:
   - Convert the reproduction into a test or executable check when possible.
   - Run the focused check and relevant adjacent verification.
   - If a regression check is impractical, document the reason and run the closest available validation.

## Output Format

```text
Diagnosis

Observed:
...

Expected:
...

Reproduction:
- ...

Evidence:
- ...

Root cause:
...

Fix:
- ...

Regression check:
- ...

Verification:
- ...

Remaining risk:
- ...
```

## Quality Rules

- Reproduction is the first milestone.
- Keep facts and hypotheses separate until evidence supports the cause.
- Do not claim root cause from code reading alone when a runtime or test signal is available.
- If the issue cannot be reproduced, say what was tried and what signal is still missing.
- Do not expand into architecture cleanup unless it directly reduces the bug risk.
- Keep the fix small and directly tied to the confirmed cause.
- Stop when the regression check passes, or when a concrete blocker prevents validation.

## Useful Invocation

```text
Use $agentic-diagnose to debug this.
Reproduce it first, gather evidence, identify the root cause, fix narrowly, and add a regression check.
```

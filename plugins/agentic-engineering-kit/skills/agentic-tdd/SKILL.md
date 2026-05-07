---
name: agentic-tdd
description: "Use when implementing a clear feature slice, refactor, or behavior change with a test-first loop: identify observable behavior, add the smallest failing test or executable check, implement the minimal change, verify, and report remaining gaps."
---

# Agentic TDD

Use this skill when the requested behavior is clear enough to implement and verify. It applies a small red-green-refactor loop to agentic coding so changes stay grounded in tests or executable checks.

Do not force TDD when the repository has no practical test harness and a lower-cost executable verification is more appropriate. In that case, create the best available check and explain the gap.

## Workflow

1. Confirm the slice:
   - Use the user's request or the `First slice` from an Agentic Brief.
   - State the observable behavior being implemented.
   - Identify the relevant public interface: UI, API, CLI, function, integration, or workflow.

2. Inspect existing test patterns:
   - Read nearby tests, fixtures, factories, mocks, and scripts.
   - Prefer the repo's existing test style.
   - Avoid testing private implementation details when behavior can be tested through a public interface.

3. Create the smallest failing check:
   - Add one focused test, assertion, reproduction script, or type-level check.
   - Run it and confirm it fails for the expected reason.
   - If it cannot be made to fail, stop and explain why the signal is not valid.

4. Implement minimally:
   - Make the smallest code change that satisfies the check.
   - Keep unrelated refactors out of the slice.
   - Preserve existing user changes and repo conventions.

5. Verify and refine:
   - Re-run the focused check.
   - Run adjacent tests, typecheck, lint, build, or smoke checks when relevant.
   - Refactor only after the behavior is green and the cleanup reduces real complexity.

6. Close the loop:
   - Map the result back to acceptance criteria.
   - Mention any tests that could not be run.
   - If a new risk appears, stop and surface it instead of silently expanding scope.

## Output Format

```text
TDD Slice

Behavior:
...

Failing check:
- ...

Implementation:
- ...

Verification:
- ...

Remaining gaps:
- ...
```

## Quality Rules

- One behavioral slice at a time.
- Prefer behavior tests over implementation tests.
- Do not write a large batch of tests before learning from the first failure.
- Do not claim success without running the most relevant available verification.
- Keep the implementation simple and directly traceable to the requested behavior.
- If verification is blocked, say exactly what blocked it and what remains unproven.
- Stop when the slice is implemented and verified, or when a concrete blocker is found.

## Useful Invocation

```text
Use $agentic-tdd to implement this slice.
Start with the smallest failing test or executable check, make it pass, then run the relevant verification.
```

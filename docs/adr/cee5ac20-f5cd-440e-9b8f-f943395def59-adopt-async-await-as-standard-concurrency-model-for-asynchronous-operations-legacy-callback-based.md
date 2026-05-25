# Adopt Async/Await as Standard Concurrency Model for Asynchronous Operations: Legacy Callback Based

Status: proposed
Date: 2024-01-09
Deciders: Detection Pipeline (automated)

## Activation

This ADR is ALWAYS ACTIVE for all asynchronous operations in the codebase. All new code involving I/O operations, API calls, database queries, or file system access must follow the async/await concurrency model.

## Context

- The codebase demonstrates consistent use of async/await patterns across 8 files including React Server Components, API routes, server actions, and utility libraries
- Modern JavaScript/TypeScript frameworks (Next.js 13+) have embraced async/await as the primary concurrency model, making it the idiomatic approach for handling asynchronous operations
- The pattern appears in critical data-fetching operations (blog posts, todos, weather data) and server-side rendering contexts where sequential async operations are common
- The async/await model provides better error handling, stack traces, and code readability compared to callback-based or raw Promise chaining approaches
- Pattern detected with 89.75% confidence across 8 files, indicating strong architectural consistency in concurrency handling

## Problem Statement

Without a standardized concurrency model, asynchronous operations can be implemented inconsistently using callbacks, Promise chains, or async/await, leading to code that is difficult to maintain, debug, and reason about. The lack of a unified approach creates cognitive overhead for developers and increases the likelihood of errors in error handling, race conditions, and unhandled promise rejections.

## Decision

1. MAY: Legacy callback-based APIs MAY be wrapped in async functions using Promise constructors to maintain consistency

## Policy Block

- MAY Legacy callback-based APIs MAY be wrapped in async functions using Promise constructors to maintain consistency

In scope:
- All server-side data fetching operations
- React Server Components and Next.js page components
- API route handlers and server actions
- Database query operations
- File system operations
- External API integrations
- Utility functions that perform asynchronous operations

Out of scope:
- Client-side event handlers that require synchronous execution
- React hooks (useState, useEffect) which have their own async handling patterns
- Third-party library code that we do not control
- Performance-critical hot paths where Promise overhead is measurably problematic

Exceptions:
- EXC-001: Integrating with legacy callback-based libraries where wrapping would introduce significant complexity or performance overhead
- EXC-002: Using Promise.race() or other advanced Promise combinators where async/await syntax would reduce clarity

## Rationale

- Pattern detected across 8 files with 89.75% confidence, demonstrating strong existing adoption and architectural consistency
- Async/await provides superior error handling with standard try-catch blocks and maintains proper stack traces for debugging
- The syntax is more readable and maintainable, resembling synchronous code flow while handling asynchronous operations
- Modern JavaScript runtimes and TypeScript provide excellent support and type inference for async/await patterns
- Next.js 13+ and React Server Components are designed around async/await as the primary concurrency model

## Consequences

Positive:
- Improved code readability and maintainability through consistent, linear code flow
- Better error handling with standard try-catch blocks and clearer stack traces
- Reduced cognitive overhead for developers working across different parts of the codebase
- Enhanced type safety with TypeScript's async/await type inference
- Easier testing and mocking of asynchronous operations

Negative:
- Developers unfamiliar with async/await may require training or onboarding time
- Potential for blocking operations if developers forget to use Promise.all() for parallel operations
- Legacy code using callbacks or Promise chains will need refactoring for consistency
- Slight performance overhead compared to raw Promises in some edge cases

## Alternatives

- Continue using mixed concurrency patterns (callbacks, Promises, async/await) based on developer preference (rejected)
  Rejected because: Inconsistent patterns increase cognitive load, make code reviews harder, and lead to maintenance issues. The detected pattern shows strong convergence on async/await (89.75% confidence), indicating this is already the de facto standard.
  When valid: Never - consistency is critical for maintainability
- Use raw Promise chains with .then() and .catch() as the standard pattern (rejected)
  Rejected because: Promise chains are harder to read, especially with nested operations, and error handling is more complex. Async/await is the modern standard and provides better developer experience.
  When valid: Only when using advanced Promise combinators like Promise.race() where the syntax is clearer
- Adopt reactive programming patterns (RxJS observables) for all asynchronous operations (rejected)
  Rejected because: Observables add significant complexity and learning curve. The current codebase shows no evidence of reactive patterns, and async/await is sufficient for the identified use cases.
  When valid: For complex event streams or real-time data pipelines where multiple subscribers and operators are needed

## Risks

- Developers may inadvertently create sequential async operations that should be parallel, impacting performance
  Mitigation: Provide linting rules and code review guidelines to identify sequential awaits that could use Promise.all(). Include performance testing for critical paths.
  Owner: Engineering team with support from tech leads
- Legacy code refactoring may introduce bugs if async boundaries are not properly handled
  Mitigation: Require comprehensive test coverage before refactoring callback-based code. Use incremental migration strategy with clear testing checkpoints.
  Owner: Engineering team
- Unhandled promise rejections may occur if developers forget try-catch blocks or error handling
  Mitigation: Enable strict unhandled rejection warnings in Node.js. Implement ESLint rules to enforce error handling patterns. Use global error handlers as safety net.
  Owner: DevOps and engineering team

## Implementation Notes

- Use ESLint rules such as 'require-await', 'no-async-promise-executor', and 'no-return-await' to enforce async/await best practices
- For parallel operations, prefer Promise.all() for fail-fast behavior or Promise.allSettled() when all results are needed regardless of failures
- Always include try-catch blocks in async functions that perform I/O operations, with appropriate error logging and user-facing error messages
- When migrating legacy code, start with leaf functions (those with no async dependencies) and work upward through the call stack
- Document any intentional use of raw Promises or callbacks with inline comments explaining the rationale

## Continuation Context


Verify commands:
- grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | wc -l
- eslint src/ --rule 'require-await: error' --rule 'no-async-promise-executor: error'
- grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v 'node_modules' | wc -l

Accept when:
- All new asynchronous functions in src/ directory use async/await syntax (verified by grep showing consistent async function declarations)
- ESLint checks pass with no violations of async/await best practice rules
- Raw Promise chains (.then) are only present in documented exception cases or third-party code

## Enforcement

- Verified by: ESLint rules enforced in CI pipeline (require-await, no-async-promise-executor, no-return-await)
- Verified by: Code review checklist includes verification of async/await usage for all asynchronous operations
- Verified by: Automated pattern detection in CI to flag callback-based patterns or raw Promise constructors
- Violation handling: CI build fails if ESLint rules are violated
- Violation handling: Code review blocks merge if async/await patterns are not followed without documented exception
- Violation handling: Quarterly code audits identify and prioritize legacy code for refactoring
- Exception process: Developer documents the specific reason for exception in code comments
- Exception process: Tech lead reviews and approves exception during code review
- Exception process: Exception is logged in ADR exceptions registry with justification and review date
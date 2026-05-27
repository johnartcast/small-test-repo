# Adopt Async/Await as Standard Concurrency Model for Asynchronous Operations: Async Functions Use

Status: proposed
Date: 2024-01-09
Deciders: Detection Pipeline (automated)

## Activation

This ADR is ALWAYS ACTIVE for all asynchronous operations in TypeScript/JavaScript codebases, including API routes, server components, data fetching utilities, and action handlers.

## Context

- The codebase contains multiple asynchronous operations including API routes, server-side data fetching, database queries, and external service calls that require non-blocking I/O handling
- Modern TypeScript/JavaScript environments provide native async/await syntax as a cleaner alternative to callback-based or promise-chaining patterns for handling asynchronous operations
- The detected pattern shows consistent usage across 8 files with 89.75% confidence, indicating an established architectural preference for async/await in components, API routes, and utility functions
- Next.js framework encourages async/await patterns for server components, API routes, and server actions, making it the idiomatic choice for the application architecture
- The pattern appears in critical paths including blog post fetching (src/lib/posts.ts), todo management (src/lib/todos.ts, src/app/todos/actions.ts), weather API integration (src/app/api/weather/route.ts), and server components (src/app/blog/page.tsx, src/app/todos/page.tsx)

## Problem Statement

Asynchronous operations are fundamental to modern web applications, but inconsistent concurrency patterns lead to code that is difficult to read, maintain, and reason about. Without a standardized approach, developers may mix callbacks, promise chains, and async/await syntax, creating cognitive overhead and increasing the likelihood of error-handling bugs, race conditions, and unhandled promise rejections.

## Decision

1. MUST: Async functions MUST use try-catch blocks for error handling rather than .catch() methods or error callbacks

## Policy Block

- MUST Async functions MUST use try-catch blocks for error handling rather than .catch() methods or error callbacks

In scope:
- All TypeScript and JavaScript files in the codebase
- Next.js API routes (src/app/api/**/*.ts)
- Server components and page components (src/app/**/*.tsx)
- Server actions (files with 'use server' directive)
- Utility functions performing I/O operations (src/lib/**/*.ts)
- Data fetching and database query functions
- External API integration code

Out of scope:
- Third-party library code in node_modules
- Legacy callback-based APIs where async/await wrappers would add unnecessary complexity
- Event handlers in browser contexts where synchronous behavior is required
- Performance-critical hot paths where promise overhead is measurably problematic (requires documentation)

Exceptions:
- EXC-001: Integrating with legacy third-party libraries that only provide callback-based APIs and creating async wrappers would introduce significant complexity
- EXC-002: Performance profiling demonstrates that promise overhead in a specific hot path causes measurable performance degradation (>5% impact)

## Rationale

- The pattern detection shows 89.75% confidence across 8 files, indicating strong architectural consistency and team preference for async/await as the standard concurrency model
- Async/await syntax provides superior readability and maintainability compared to callback pyramids or promise chains, making asynchronous code appear more synchronous and easier to reason about
- Error handling with try-catch blocks in async functions is more intuitive and consistent with synchronous error handling patterns, reducing the likelihood of unhandled promise rejections
- Next.js framework and React Server Components architecture are designed with async/await as the primary pattern, making this decision align with framework best practices and ecosystem conventions

## Consequences

Positive:
- Improved code readability and maintainability through consistent, linear asynchronous code flow that resembles synchronous code structure
- Reduced cognitive overhead for developers who no longer need to context-switch between different asynchronous patterns (callbacks, promises, async/await)
- Better error handling and debugging experience with stack traces that are easier to follow and try-catch blocks that work consistently
- Alignment with Next.js and React ecosystem best practices, making onboarding easier and leveraging community patterns and tooling

Negative:
- Developers unfamiliar with async/await may require training and time to understand promise mechanics, execution order, and common pitfalls
- Potential for performance issues if developers use sequential await calls instead of Promise.all() for independent operations, requiring code review vigilance
- Mixing async/await with older promise-based code during migration periods may create temporary inconsistency until full adoption is achieved
- Async functions always return promises, which can lead to unintended promise wrapping and requires careful attention to return types

## Alternatives

- Continue using promise chains with .then() and .catch() methods for all asynchronous operations (rejected)
  Rejected because: Promise chains lead to nested callback-like structures that are harder to read and maintain, especially for complex control flow with multiple sequential operations. The pattern detection shows the team has already moved away from this approach.
  When valid: May be acceptable for simple single-promise operations in utility functions where async/await would add unnecessary function wrapper overhead
- Use callback-based patterns with error-first callbacks for asynchronous operations (rejected)
  Rejected because: Callback-based patterns lead to callback hell, make error handling inconsistent, and are considered legacy in modern JavaScript. They lack the composability and readability of async/await.
  When valid: Only when integrating with legacy libraries that exclusively provide callback APIs and wrapping would be impractical
- Allow mixed concurrency patterns based on developer preference or specific use case requirements (rejected)
  Rejected because: Inconsistent patterns across the codebase create cognitive overhead, make code reviews more difficult, and increase the likelihood of errors when developers switch between different asynchronous paradigms.
  When valid: Not recommended; consistency is more valuable than flexibility in concurrency model choice

## Risks

- Developers may inadvertently create performance bottlenecks by using sequential await calls for independent operations instead of parallel execution with Promise.all()
  Mitigation: Implement ESLint rules to detect sequential awaits that could be parallelized, provide training on Promise.all() patterns, and include performance considerations in code review checklist
  Owner: Engineering team and tech leads
- Unhandled promise rejections may occur if developers forget to wrap await calls in try-catch blocks or if async functions are called without proper error handling
  Mitigation: Enable strict unhandled promise rejection warnings in Node.js, implement ESLint rules requiring error handling, and use TypeScript strict mode to catch missing error handling at compile time
  Owner: Engineering team and DevOps
- Migration of existing callback or promise-chain code to async/await may introduce bugs if not carefully tested, particularly around error handling and execution order
  Mitigation: Require comprehensive test coverage for any refactored asynchronous code, perform incremental migration with thorough code review, and maintain integration tests that verify end-to-end behavior
  Owner: Engineering team and QA

## Implementation Notes

- When refactoring existing promise chains to async/await, ensure that error handling is preserved and that any .finally() cleanup logic is converted to try-catch-finally blocks
- Use Promise.all() for parallel operations and Promise.allSettled() when you need to handle partial failures gracefully without short-circuiting on the first rejection
- In Next.js server components and API routes, mark functions as async and use await for data fetching to leverage framework optimizations and proper error boundaries
- Configure TypeScript with strict mode and ESLint with async-aware rules (e.g., @typescript-eslint/no-floating-promises, @typescript-eslint/await-thenable) to catch common async/await mistakes at development time

## Continuation Context


Verify commands:
- grep -r '\.then(' src/ --include='*.ts' --include='*.tsx' | grep -v node_modules | wc -l
- grep -r 'async function\|async (' src/ --include='*.ts' --include='*.tsx' | grep -v node_modules | wc -l
- npx eslint src/ --ext .ts,.tsx --rule '@typescript-eslint/no-floating-promises: error' --rule '@typescript-eslint/await-thenable: error'

Accept when:
- The ratio of async/await usage to .then() usage is at least 10:1 in the codebase, indicating strong adoption of the async/await pattern
- All new API routes, server components, and data fetching utilities use async/await syntax with proper try-catch error handling
- ESLint checks pass with no violations of async/await best practices rules (no-floating-promises, await-thenable, require-await)

## Enforcement

- Verified by: Automated ESLint checks in CI pipeline enforcing async/await best practices and detecting promise anti-patterns
- Verified by: Code review checklist requiring verification of async/await usage and proper error handling in all asynchronous code
- Verified by: TypeScript compiler strict mode catching missing await keywords and unhandled promise types
- Violation handling: CI pipeline fails if ESLint detects .then() chains or callback patterns in new code without documented exceptions
- Violation handling: Code review blocks merge if asynchronous functions lack proper async/await syntax or error handling
- Violation handling: Automated comments on pull requests highlighting potential async/await violations with suggestions for correction
- Exception process: Developer documents the specific reason for exception in code comments and pull request description
- Exception process: Tech lead reviews and approves exception based on documented criteria (legacy library integration or proven performance impact)
- Exception process: Exception is recorded in ADR amendments or architecture decision log with justification and scope limitations
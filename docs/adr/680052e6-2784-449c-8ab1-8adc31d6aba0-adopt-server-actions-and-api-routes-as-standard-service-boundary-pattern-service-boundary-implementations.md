# Adopt Server Actions and API Routes as Standard Service Boundary Pattern: Service Boundary Implementations

Status: proposed
Date: 2024-01-15
Deciders: Detection Pipeline (automated)

## Activation

This ADR is ACTIVE for all service boundary implementations in Next.js applications. All new service endpoints and data mutation operations MUST follow the patterns defined herein.

## Context

- The application uses Next.js framework which provides multiple mechanisms for defining service boundaries including Server Actions and API Routes
- Pattern detected in 2 files (src/app/todos/actions.ts and src/app/api/weather/route.ts) with 89.15% confidence, indicating a consistent architectural approach
- Modern web applications require clear separation between client-side and server-side logic to ensure security, maintainability, and proper data flow
- Next.js Server Actions provide a type-safe, integrated approach for server-side mutations while API Routes offer RESTful endpoint patterns for external integrations
- The codebase demonstrates a deliberate pattern of using different service boundary mechanisms for different use cases, suggesting architectural intentionality

## Problem Statement

Without standardized service boundary patterns, applications risk inconsistent API design, security vulnerabilities from improper client-server separation, and maintenance challenges from ad-hoc endpoint implementations. The codebase needs a clear architectural decision on when and how to use Server Actions versus API Routes to ensure consistent, secure, and maintainable service boundaries.

## Decision

1. MUST: All service boundary implementations MUST include proper error handling and return structured responses with appropriate status codes or error objects

## Policy Block

- MUST All service boundary implementations MUST include proper error handling and return structured responses with appropriate status codes or error objects

In scope:
- All server-side data mutations and business logic operations
- Form submissions and user-initiated data changes
- External API integrations and webhook handlers
- RESTful endpoints for third-party consumption
- Server-side data fetching with side effects

Out of scope:
- Client-side state management and UI logic
- Pure data fetching without mutations (may use Server Components directly)
- Static content generation and build-time operations
- Middleware and authentication interceptors (use Next.js middleware instead)

Exceptions:
- EXC-001: Legacy API endpoints exist that predate this ADR and are actively used by external clients
- EXC-002: Third-party integrations require specific endpoint patterns that conflict with standard conventions

## Rationale

- Pattern detection identified consistent usage across 2 files with 89.15% confidence, indicating this is an established architectural pattern in the codebase
- Next.js Server Actions provide superior type safety and developer experience for internal mutations, reducing boilerplate and improving maintainability
- API Routes offer standard HTTP semantics necessary for external integrations, webhooks, and RESTful API design patterns
- Clear separation between Server Actions and API Routes creates predictable service boundaries that improve code organization and team collaboration

## Consequences

Positive:
- Improved type safety and developer experience through Server Actions for internal mutations
- Clear architectural boundaries between internal and external service interfaces
- Reduced boilerplate code for common data mutation patterns
- Better security posture through enforced server-side execution of business logic
- Consistent patterns across the codebase improve onboarding and maintainability

Negative:
- Developers must learn and understand the distinction between Server Actions and API Routes
- Potential for confusion when deciding which pattern to use for edge cases
- Migration effort required for existing code that doesn't follow these patterns
- Server Actions are Next.js-specific, creating framework lock-in for this architectural pattern

## Alternatives

- Use only API Routes for all service boundaries, avoiding Server Actions entirely (rejected)
  Rejected because: This approach loses the type safety and developer experience benefits of Server Actions, increases boilerplate, and doesn't leverage Next.js framework capabilities effectively
  When valid: Valid for applications that need framework-agnostic patterns or plan to migrate away from Next.js
- Use only Server Actions for all service boundaries, including external APIs (rejected)
  Rejected because: Server Actions are not designed for RESTful APIs and lack standard HTTP method semantics needed for external integrations and webhooks
  When valid: Valid only for purely internal applications with no external API requirements
- Implement a custom abstraction layer that unifies Server Actions and API Routes (rejected)
  Rejected because: Adds unnecessary complexity and abstraction overhead while obscuring the framework's native patterns and capabilities
  When valid: Valid for large enterprises requiring framework-agnostic patterns across multiple applications

## Risks

- Developers may incorrectly choose between Server Actions and API Routes, leading to inconsistent implementations
  Mitigation: Provide clear decision tree documentation and code review guidelines. Create linting rules to detect common misuses.
  Owner: Engineering team and architecture review board
- Framework lock-in to Next.js may complicate future migration efforts if architectural direction changes
  Mitigation: Keep business logic separate from framework-specific service boundary code. Document migration paths in architecture documentation.
  Owner: Architecture team
- Server Actions are a relatively new Next.js feature and may have undiscovered edge cases or limitations
  Mitigation: Monitor Next.js release notes and community feedback. Maintain fallback patterns for critical functionality.
  Owner: Engineering team

## Implementation Notes

- Create a decision tree or flowchart to help developers choose between Server Actions and API Routes based on use case
- Establish naming conventions: Server Actions in {feature}/actions.ts files, API Routes in app/api/{resource}/route.ts
- Implement ESLint rules to enforce 'use server' directive in action files and prevent server-side code in client components
- Create reusable error handling utilities for both Server Actions and API Routes to ensure consistent error responses
- Document common patterns with code examples in the project's architecture documentation or wiki

## Continuation Context


Verify commands:
- grep -r "'use server'" src/app --include="*.ts" | grep -c "actions.ts"
- find src/app/api -name 'route.ts' -type f | wc -l
- grep -r "export async function" src/app --include="actions.ts" | grep -v "'use server'" && echo 'FAIL: Server actions missing use server directive' || echo 'PASS'

Accept when:
- All Server Action files contain the 'use server' directive and are named actions.ts
- All API Routes are located in app/api/* directories and follow Next.js route handler conventions
- No client-side components contain direct database access or business logic that should be in service boundaries
- Code review checklist includes verification of appropriate service boundary pattern selection

## Enforcement

- Verified by: Automated ESLint rules checking for 'use server' directive in action files
- Verified by: Code review checklist requiring service boundary pattern verification
- Verified by: CI pipeline checks for file naming conventions and directory structure
- Verified by: Periodic architecture audits reviewing service boundary implementations
- Violation handling: ESLint violations block PR merges in CI pipeline
- Violation handling: Code review process flags non-conformant patterns for revision
- Violation handling: Architecture team conducts quarterly reviews to identify and remediate violations
- Violation handling: New violations require documented justification or refactoring before merge approval
- Exception process: Developer documents exception request with technical justification and alternative approaches considered
- Exception process: Tech lead or architecture team reviews exception request within 2 business days
- Exception process: Approved exceptions are documented in code comments with ADR reference and expiration date if applicable
- Exception process: Exception registry maintained in architecture documentation for tracking and periodic review
# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Route Handlers Return

Status: proposed
Date: 2024-01-15
Deciders: Detection Pipeline (automated)

## Activation

This ADR is ACTIVE for all service and API boundary implementations in the codebase. All new API endpoints and server-side data mutations must follow these patterns.

## Context

- The codebase demonstrates a consistent pattern of defining service boundaries using Next.js App Router conventions, specifically route handlers (route.ts) and server actions (actions.ts)
- Two distinct boundary types have emerged: API route handlers for external-facing HTTP endpoints (weather/route.ts) and server actions for server-side mutations (todos/actions.ts)
- This pattern provides clear separation between client and server code, enabling type-safe server-side operations while maintaining clean architectural boundaries
- The pattern was detected across 2 files with 89.15% confidence, indicating a deliberate architectural choice rather than ad-hoc implementation

## Problem Statement

Without standardized service boundary definitions, applications risk inconsistent API design, unclear separation of concerns between client and server code, and difficulty maintaining type safety across network boundaries. The codebase needs a consistent approach to defining where and how service boundaries are established.

## Decision

1. SHOULD: Route handlers SHOULD return NextResponse objects with appropriate status codes and headers

## Policy Block

- SHOULD Route handlers SHOULD return NextResponse objects with appropriate status codes and headers

In scope:
- All HTTP API endpoints exposed to external clients
- All server-side data mutations and database operations
- Server actions invoked from client components via form actions or transitions
- Route handlers in the app/api directory structure

Out of scope:
- Internal utility functions that don't cross client-server boundaries
- React Server Components that directly access data (these are not service boundaries)
- Client-side state management and UI logic
- Third-party API integrations that are wrapped by route handlers

Exceptions:
- EXC-001: Legacy pages directory routes exist during migration period
- EXC-002: Middleware or edge functions require different patterns

## Rationale

- The pattern detection identified consistent usage across weather API routes and todo server actions, demonstrating proven effectiveness in the codebase
- Next.js App Router conventions provide built-in type safety, automatic code splitting, and clear client-server boundaries
- Separating route handlers (external APIs) from server actions (internal mutations) creates clear architectural layers and improves maintainability
- This approach aligns with modern React Server Components architecture and enables progressive enhancement

## Consequences

Positive:
- Clear, consistent service boundary definitions make the codebase easier to navigate and understand
- Type safety across client-server boundaries reduces runtime errors and improves developer experience
- Automatic code splitting and server-only bundling reduce client bundle size
- Colocation of server actions with features improves feature cohesion and reduces cognitive load

Negative:
- Requires team familiarity with Next.js App Router conventions and React Server Components
- May require refactoring existing API routes in pages directory during migration
- Debugging across client-server boundaries can be more complex than traditional monolithic approaches
- File naming conventions (route.ts, actions.ts) must be strictly followed or routing breaks

## Alternatives

- Use traditional REST API controllers in a separate /api directory with explicit routing configuration (rejected)
  Rejected because: Requires manual routing configuration, loses type safety benefits, and doesn't leverage Next.js App Router conventions already adopted in the codebase
  When valid: Valid for non-Next.js projects or when migrating from existing Express/Fastify APIs
- Use tRPC or GraphQL for all client-server communication (rejected)
  Rejected because: Adds additional dependencies and complexity; the detected pattern shows the team has already standardized on Next.js native patterns
  When valid: Valid for projects requiring complex type-safe RPC or when GraphQL's query flexibility is essential
- Consolidate all server-side logic into route handlers without separate server actions (rejected)
  Rejected because: Loses the benefits of colocation and progressive enhancement that server actions provide; detected pattern shows intentional separation
  When valid: Valid for purely API-driven applications without form-based interactions

## Risks

- Team members unfamiliar with App Router conventions may create inconsistent boundary patterns
  Mitigation: Provide training documentation, code examples, and enforce patterns through code review and linting rules
  Owner: Engineering team leads
- Mixing pages directory and app directory patterns during migration could create confusion
  Mitigation: Create clear migration guide, use ESLint rules to prevent mixing patterns, and prioritize complete feature migration
  Owner: Architecture team
- Over-reliance on framework-specific patterns may complicate future framework migrations
  Mitigation: Keep business logic separate from framework code, use dependency injection for testability, and document core patterns
  Owner: Engineering team

## Implementation Notes

- Create route.ts files in app/api/[resource]/ for external-facing HTTP APIs; export GET, POST, etc. as named functions
- Create actions.ts files colocated with feature directories (e.g., app/todos/actions.ts); add 'use server' directive
- Use TypeScript interfaces to define request/response types and share them between client and server code
- Implement error handling consistently across all boundaries using try-catch and appropriate HTTP status codes or error returns
- Consider using Zod or similar validation libraries to validate inputs at service boundaries

## Continuation Context


Verify commands:
- find . -path '*/app/api/*/route.ts' -type f | xargs grep -l 'export.*function.*(GET|POST|PUT|DELETE|PATCH)'
- find . -path '*/app/*/actions.ts' -type f | xargs grep -l "'use server'"
- grep -r "route.ts\|actions.ts" --include="*.ts" --include="*.tsx" | wc -l

Accept when:
- All API endpoints are defined in route.ts files with proper HTTP method exports
- All server actions are defined in actions.ts files with 'use server' directive
- No client components directly access databases or external services without going through defined boundaries

## Enforcement

- Verified by: Automated ESLint rules checking for route.ts and actions.ts naming conventions
- Verified by: Code review checklist items for service boundary patterns
- Verified by: CI pipeline checks using grep/find commands to verify file structure
- Verified by: TypeScript compiler checks for 'use server' directive in server actions
- Violation handling: CI build fails if route handlers or server actions don't follow naming conventions
- Violation handling: Pull requests blocked until code review approves boundary implementation
- Violation handling: Automated comments on PRs highlighting violations with links to this ADR
- Violation handling: Monthly architecture review to identify and refactor non-compliant patterns
- Exception process: Submit exception request to architecture team with justification and impact analysis
- Exception process: Document approved exceptions in ADR amendments with expiration dates
- Exception process: Add inline code comments referencing exception ID and approval
- Exception process: Review all exceptions quarterly to determine if they can be resolved
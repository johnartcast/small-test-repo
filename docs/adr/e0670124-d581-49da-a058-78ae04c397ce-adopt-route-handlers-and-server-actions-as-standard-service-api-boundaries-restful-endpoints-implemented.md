# Adopt Route Handlers and Server Actions as Standard Service/API Boundaries: Restful Endpoints Implemented

Status: proposed
Date: 2024-01-15
Deciders: Detection Pipeline (automated)

## Activation

This ADR is ACTIVE for all service and API boundary implementations in the codebase. All new API endpoints and server-side data mutations must follow these patterns.

## Context

- The codebase uses Next.js App Router architecture which provides two distinct patterns for defining service boundaries: Route Handlers (route.ts files) for RESTful API endpoints and Server Actions (actions.ts files) for server-side mutations
- Pattern detected in 2 files (src/app/api/weather/route.ts and src/app/todos/actions.ts) with 89.15% confidence, indicating a consistent architectural approach to service boundaries
- Modern web applications require clear separation between client and server code, with explicit boundaries for data fetching, mutations, and external service integration
- The framework provides built-in conventions for organizing these boundaries through file-based routing and colocation of actions with feature modules

## Problem Statement

Without standardized patterns for defining service and API boundaries, teams may inconsistently implement server-side logic, leading to unclear separation of concerns, difficulty in testing, and potential security vulnerabilities from improperly exposed server code. The codebase needs a consistent approach to defining where client code ends and server code begins.

## Decision

1. MUST: All RESTful API endpoints MUST be implemented as Route Handlers in route.ts files within the app/api directory structure

## Policy Block

- MUST All RESTful API endpoints MUST be implemented as Route Handlers in route.ts files within the app/api directory structure

In scope:
- All API endpoints exposed to external clients or frontend applications
- Server-side data mutations including create, update, delete operations
- Form submission handlers and progressive enhancement scenarios
- Proxy endpoints for third-party API integrations
- Server-side business logic that requires authentication or authorization

Out of scope:
- Client-side state management and UI logic
- Static page generation and server-side rendering logic in page.tsx files
- Middleware for request/response transformation
- Database schema definitions and migration files
- Utility functions that are framework-agnostic

Exceptions:
- EX-001: Legacy API routes exist in pages/api directory during migration from Pages Router to App Router
- EX-002: Webhook handlers or streaming endpoints require specialized response handling not supported by standard Route Handler patterns

## Rationale

- The detected pattern shows consistent usage across 2 files with 89.15% confidence, indicating this is an established architectural convention in the codebase
- Next.js App Router provides first-class support for both Route Handlers and Server Actions, making them the idiomatic choice for service boundaries in modern Next.js applications
- Separating RESTful endpoints (route.ts) from server mutations (actions.ts) provides clear mental models for developers and enables better code organization and testing strategies
- Using framework conventions reduces cognitive overhead, improves onboarding, and ensures compatibility with Next.js optimizations and security features

## Consequences

Positive:
- Clear, consistent patterns for defining service boundaries improve code discoverability and reduce decision fatigue for developers
- Framework-native patterns ensure automatic optimizations, security features, and compatibility with Next.js tooling and deployment platforms
- Colocation of Server Actions with feature modules improves maintainability and reduces context switching
- Explicit server boundaries ('use server' directive) prevent accidental exposure of sensitive server-side code to clients

Negative:
- Teams must learn and understand the distinction between Route Handlers and Server Actions, which adds initial learning curve
- File proliferation may occur with separate route.ts and actions.ts files, potentially increasing navigation complexity in large codebases
- Framework coupling makes it harder to migrate away from Next.js in the future if architectural needs change
- Testing may require Next.js-specific mocking strategies for Route Handlers and Server Actions

## Alternatives

- Use a single unified API layer with traditional Express.js or Fastify server separate from Next.js (rejected)
  Rejected because: Adds deployment complexity, loses Next.js optimizations, and creates unnecessary separation between frontend and backend code in a full-stack framework
  When valid: Valid for microservices architectures where API services are completely independent from frontend applications
- Implement all server logic as Route Handlers without using Server Actions (rejected)
  Rejected because: Loses progressive enhancement benefits, requires more boilerplate for form handling, and misses framework optimizations for server mutations
  When valid: Valid for API-only applications that don't serve UI components or forms
- Use GraphQL with a single unified endpoint instead of multiple REST endpoints (deferred)
  Rejected because: Not rejected but not currently adopted; would require significant architectural changes and additional tooling
  When valid: Valid for applications with complex data requirements, multiple clients, or need for flexible querying capabilities

## Risks

- Developers may incorrectly place server-only code in client components, exposing sensitive data or API keys
  Mitigation: Implement linting rules to detect server-only imports in client components; use code review checklists; provide training on 'use server' and 'use client' directives
  Owner: Engineering team with security review
- Inconsistent error handling across Route Handlers and Server Actions may lead to poor user experience or security information leakage
  Mitigation: Create standardized error handling utilities and response formatters; document error handling patterns in developer guidelines
  Owner: Platform team
- Performance issues may arise from inefficient Server Actions or Route Handlers without proper caching and optimization
  Mitigation: Establish performance budgets; implement monitoring for API response times; use Next.js caching strategies (revalidate, cache tags)
  Owner: Engineering team

## Implementation Notes

- Create templates or code snippets for common Route Handler and Server Action patterns to accelerate development and ensure consistency
- Establish naming conventions: use route.ts for API endpoints, actions.ts for server mutations, and consider prefixing action functions with action verbs (createTodo, updateWeather)
- Implement shared utilities for common concerns like authentication, error handling, and response formatting that work across both Route Handlers and Server Actions
- Document the decision criteria for choosing between Route Handlers vs Server Actions in the team's architecture guidelines

## Continuation Context


Verify commands:
- find . -path '*/app/api/*/route.ts' -type f | wc -l
- grep -r "'use server'" --include='actions.ts' | wc -l
- grep -r "export async function GET\|POST\|PUT\|DELETE\|PATCH" --include='route.ts' | wc -l

Accept when:
- All API endpoints in app/api directory are implemented as route.ts files with proper HTTP method exports
- All server mutation files contain 'use server' directive and follow actions.ts naming convention
- No server-only code (database queries, API keys) exists in client components without proper server boundary markers

## Enforcement

- Verified by: Automated linting rules checking for 'use server' directive in actions.ts files
- Verified by: Code review checklist items for service boundary patterns
- Verified by: CI pipeline checks for route.ts file structure in app/api directory
- Verified by: Static analysis tools detecting server-only imports in client components
- Violation handling: CI build fails if route.ts files are missing required HTTP method exports
- Violation handling: Linter warnings escalated to errors for missing 'use server' directives in actions.ts files
- Violation handling: Code review blocks deployment if server boundaries are improperly defined
- Violation handling: Security scanning tools flag potential exposure of sensitive server code
- Exception process: Developer submits exception request with technical justification to architecture review board
- Exception process: Tech lead reviews and approves/rejects based on security, performance, and maintainability impact
- Exception process: Approved exceptions are documented in ADR updates or technical debt log with remediation timeline
- Exception process: Exceptions are reviewed quarterly to assess if they can be resolved or if patterns need updating
# Adopt TypeScript as Standard Implementation Language for Application Code: New Application Code

Status: proposed
Date: 2024-01-15
Deciders: Detection Pipeline (automated)

## Activation

This ADR is ACTIVE for all new development and applies to all application code including components, pages, API routes, utilities, and configuration files.

## Context

- The codebase demonstrates consistent use of TypeScript across 15 files with 89.87% confidence, indicating a deliberate architectural choice for type safety and developer experience
- TypeScript files are present across all application layers: configuration (tailwind.config.ts), pages (page.tsx), components (Nav.tsx, ThemeToggle.tsx), API routes (route.ts), context providers (ThemeContext.tsx), and utility libraries (posts.ts, todos.ts)
- The pattern shows TypeScript adoption in a Next.js application context, where TypeScript provides enhanced IDE support, compile-time error detection, and improved refactoring capabilities
- Modern web development increasingly demands type safety to prevent runtime errors, improve code maintainability, and enable better tooling support across large codebases
- The evidence shows TypeScript is used for both client-side components (.tsx) and server-side utilities (.ts), indicating a full-stack TypeScript adoption strategy

## Problem Statement

JavaScript's dynamic typing leads to runtime errors that could be caught at compile time, reduces IDE effectiveness for autocomplete and refactoring, and makes large codebases harder to maintain as implicit contracts between modules are not enforced. Teams need a solution that provides type safety while maintaining JavaScript ecosystem compatibility.

## Decision

1. MUST: All new application code including components, pages, API routes, utilities, and configuration files MUST be written in TypeScript with .ts or .tsx extensions

## Policy Block

- MUST All new application code including components, pages, API routes, utilities, and configuration files MUST be written in TypeScript with .ts or .tsx extensions

In scope:
- All React components (.tsx files)
- All utility libraries and helper functions (.ts files)
- All API routes and server-side code
- All configuration files that support TypeScript
- All context providers and custom hooks
- All data models and type definitions

Out of scope:
- Build scripts and tooling configuration that require plain JavaScript
- Legacy third-party JavaScript files in node_modules
- Generated code from external tools that outputs JavaScript
- Documentation and markdown files

Exceptions:
- EXC-001: Integrating with legacy JavaScript libraries that have incompatible type definitions
- EXC-002: Prototyping or spike work where type safety is temporarily deprioritized

## Rationale

- The detection of TypeScript usage across 15 files with 89.87% confidence indicates this is an established pattern in the codebase, not an experimental choice
- TypeScript provides compile-time type checking that catches errors before runtime, reducing production bugs and improving code quality
- Strong typing enables better IDE support including intelligent autocomplete, refactoring tools, and inline documentation, significantly improving developer productivity
- TypeScript's gradual typing system allows incremental adoption and interoperability with JavaScript libraries, making it practical for real-world projects

## Consequences

Positive:
- Compile-time error detection prevents entire classes of runtime errors, improving application stability
- Enhanced IDE support with autocomplete, type hints, and refactoring tools increases developer productivity by 15-30%
- Self-documenting code through type annotations reduces need for external documentation and improves code readability
- Easier refactoring and maintenance as type system catches breaking changes across the codebase automatically

Negative:
- Initial learning curve for developers unfamiliar with TypeScript or static typing concepts
- Additional build step required for TypeScript compilation adds complexity to build pipeline
- Some third-party JavaScript libraries lack quality type definitions, requiring manual type declaration work
- Increased development time for writing type annotations, though this is offset by reduced debugging time

## Alternatives

- Continue using plain JavaScript without type checking (rejected)
  Rejected because: JavaScript's lack of type safety leads to runtime errors that are expensive to debug and fix in production, and provides poor IDE support for large codebases
  When valid: Only appropriate for small scripts or prototypes that will not be maintained long-term
- Use JSDoc comments for type annotations in JavaScript files (rejected)
  Rejected because: JSDoc provides weaker type checking than TypeScript, is more verbose, and lacks the ecosystem tooling and community support that TypeScript offers
  When valid: May be acceptable for gradual migration of legacy JavaScript codebases
- Use Flow for static type checking (rejected)
  Rejected because: Flow has significantly smaller community adoption, fewer type definitions for third-party libraries, and less robust tooling compared to TypeScript
  When valid: Only if already heavily invested in Flow infrastructure

## Risks

- Team members unfamiliar with TypeScript may experience reduced productivity during learning period
  Mitigation: Provide TypeScript training resources, pair programming sessions, and establish team code review practices to share knowledge
  Owner: Engineering team leads
- Third-party libraries without type definitions may require significant effort to type manually
  Mitigation: Prioritize libraries with native TypeScript support or quality @types packages; create minimal type stubs for untyped dependencies
  Owner: Engineering team
- Overly strict typing may lead to excessive use of 'any' or type assertions, undermining type safety benefits
  Mitigation: Establish code review guidelines for type usage; provide examples of proper typing patterns; use ESLint rules to flag problematic type usage
  Owner: Engineering team

## Implementation Notes

- Configure tsconfig.json with strict mode enabled and appropriate compiler options for the Next.js framework
- Install @types packages for all third-party dependencies that don't include native TypeScript definitions
- Establish naming conventions for type files (e.g., types.ts, interfaces.ts) and organize shared types in a dedicated directory
- Set up ESLint with TypeScript rules to enforce consistent typing practices and catch common mistakes
- Create type definition templates for common patterns (API responses, component props, context values) to accelerate development

## Continuation Context


Verify commands:
- find src -type f \( -name '*.js' -o -name '*.jsx' \) ! -path '*/node_modules/*' | wc -l | grep -q '^0$'
- grep -q '"strict": true' tsconfig.json
- npx tsc --noEmit && echo 'TypeScript compilation successful'

Accept when:
- All application source files use .ts or .tsx extensions with no .js/.jsx files in src directory
- TypeScript strict mode is enabled in tsconfig.json
- TypeScript compilation completes without errors using 'tsc --noEmit'

## Enforcement

- Verified by: Pre-commit hooks run TypeScript compiler to check for type errors
- Verified by: CI pipeline includes TypeScript compilation step that fails build on type errors
- Verified by: Code review checklist includes verification of proper TypeScript usage and type annotations
- Verified by: ESLint rules enforce TypeScript best practices and flag usage of 'any' type
- Violation handling: CI build fails if TypeScript compilation errors are present, preventing merge
- Violation handling: Pull requests with .js/.jsx files in application code are flagged for conversion to TypeScript
- Violation handling: Code review feedback provided for excessive use of 'any' type or missing type annotations
- Violation handling: Quarterly code quality audits identify areas with weak typing for improvement
- Exception process: Developer documents exception rationale in code comments with ticket reference
- Exception process: Tech lead reviews and approves exception with documented justification
- Exception process: Exception is logged in architectural decision log with timeline for resolution
- Exception process: Exceptions are reviewed quarterly to determine if they can be resolved
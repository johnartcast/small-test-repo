# Enforce Input Validation and Sanitization for User-Provided Data: User Input Not

Status: proposed
Date: 2024-01-15
Deciders: Detection Pipeline (automated)

## Activation

This ADR is ALWAYS ACTIVE for all code that processes user-provided input data.

## Context

- The codebase processes user-provided data in multiple modules (posts.ts, todos.ts), creating potential attack vectors for injection attacks, XSS, and data corruption
- Pattern analysis detected consistent input validation and sanitization practices across 2 files with 91.10% confidence, indicating an established security pattern
- Modern web applications face constant threats from malicious input including SQL injection, XSS, path traversal, and command injection attacks
- The security.input_validation facet was identified as a critical architectural concern requiring standardization across all data processing modules

## Problem Statement

Without consistent input validation and sanitization practices, user-provided data can introduce security vulnerabilities including injection attacks, cross-site scripting (XSS), path traversal, and data integrity issues. The codebase needs a standardized approach to validate, sanitize, and safely process all external input to maintain security posture and prevent exploitation.

## Decision

1. MUST_NOT: User input MUST NOT be directly concatenated into SQL queries, shell commands, or file system operations without validation and parameterization

## Policy Block

- MUST_NOT User input MUST NOT be directly concatenated into SQL queries, shell commands, or file system operations without validation and parameterization

In scope:
- All HTTP request parameters (query strings, body, headers)
- Form data and file uploads
- API request payloads (JSON, XML, etc.)
- URL path parameters and route variables
- WebSocket messages and real-time data streams
- Data imported from external files or third-party APIs

Out of scope:
- Data originating from trusted internal services with established security contracts
- Configuration values loaded from secure environment variables or configuration management systems
- Data already validated and sanitized by upstream security layers (with documented verification)

Exceptions:
- EXC-001: Processing data from authenticated admin users in internal-only administrative interfaces
- EXC-002: Performance-critical paths where validation overhead is prohibitive and input source is demonstrably constrained

## Rationale

- Pattern detection identified consistent input validation practices across posts.ts and todos.ts with 91.10% confidence, demonstrating this is an established architectural pattern worth codifying
- Input validation is a foundational security control that prevents entire classes of vulnerabilities (OWASP Top 10 includes injection attacks as #1 risk)
- Standardizing validation practices reduces cognitive load for developers and ensures consistent security posture across the application
- Early validation at data ingress points follows the principle of 'fail fast' and prevents invalid data from propagating through the system

## Consequences

Positive:
- Significantly reduces attack surface for injection attacks, XSS, path traversal, and other input-based vulnerabilities
- Improves data quality and system reliability by rejecting malformed or invalid input early in the processing pipeline
- Provides clear security boundaries and makes security review more straightforward by centralizing validation logic
- Enables better error handling and user feedback by catching invalid input before business logic execution

Negative:
- Adds development overhead as every input point requires explicit validation logic
- May introduce performance overhead for validation operations, particularly for large payloads or high-throughput systems
- Risk of false positives where legitimate input is rejected due to overly restrictive validation rules
- Requires ongoing maintenance as input requirements evolve and new attack vectors emerge

## Alternatives

- Rely on framework-level or ORM-level automatic sanitization without explicit validation (rejected)
  Rejected because: Implicit sanitization is insufficient as it doesn't validate business logic constraints, may not cover all attack vectors, and creates false sense of security. Explicit validation provides defense in depth.
  When valid: May be acceptable for internal prototypes or proof-of-concept code not exposed to untrusted input
- Implement validation only at the API gateway or edge layer, trusting internal services (rejected)
  Rejected because: Single point of validation creates brittleness and doesn't protect against internal threats, compromised services, or bugs in edge validation. Defense in depth requires validation at multiple layers.
  When valid: Can be used as a complementary approach but not as the sole validation strategy
- Use runtime type checking and schema validation libraries (Zod, Joi, etc.) for all inputs (accepted)
  When valid: Recommended approach that provides type safety, schema validation, and clear error messages. Should be used in conjunction with sanitization for display contexts.

## Risks

- Incomplete validation coverage where some input points are missed during implementation or refactoring
  Mitigation: Implement automated scanning tools to detect unvalidated input points, conduct regular security code reviews, and maintain a registry of all external input sources
  Owner: Security team and engineering leads
- Validation bypass through encoding tricks, Unicode normalization issues, or novel attack vectors
  Mitigation: Use well-tested validation libraries, stay current with security advisories, perform regular penetration testing, and implement multiple layers of defense
  Owner: Security team
- Performance degradation in high-throughput scenarios due to validation overhead
  Mitigation: Profile validation performance, optimize hot paths, consider caching validation results for repeated inputs, and use efficient validation algorithms
  Owner: Engineering team

## Implementation Notes

- Start by creating a centralized validation module with reusable validators for common patterns (email, URL, alphanumeric, etc.)
- Use TypeScript interfaces or Zod schemas to define expected input shapes and generate validators automatically
- Implement validation middleware for Express/Fastify routes to enforce validation before route handlers execute
- For sanitization, use established libraries like DOMPurify for HTML content or validator.js for string sanitization
- Document validation requirements in API specifications (OpenAPI/Swagger) to ensure client-side and server-side alignment
- Add unit tests for validation logic covering both valid inputs and common attack patterns

## Continuation Context


Verify commands:
- grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" --include="*.js" | grep -v "validate\|sanitize\|schema" | head -20
- find . -name "*.ts" -o -name "*.js" | xargs grep -l "export.*function.*validate" | wc -l
- npm list zod joi yup validator express-validator 2>/dev/null || echo 'No validation libraries detected'

Accept when:
- All user input access points (req.body, req.query, req.params) are preceded by validation or sanitization calls
- At least one validation library (Zod, Joi, Yup, express-validator) is present in package dependencies
- Code review confirms no direct concatenation of user input into SQL queries, shell commands, or file paths
- Security scanning tools report no high-severity input validation vulnerabilities

## Enforcement

- Verified by: Automated static analysis tools (ESLint security plugins, Semgrep rules) scanning for unvalidated input patterns
- Verified by: Mandatory security-focused code review checklist requiring validation verification for all PRs touching input handling
- Verified by: Dynamic application security testing (DAST) tools testing for injection vulnerabilities in CI/CD pipeline
- Verified by: Quarterly security audits reviewing input validation coverage across all modules
- Violation handling: CI pipeline fails if static analysis detects unvalidated user input in new or modified code
- Violation handling: Code review blocks merge until validation is added or exception is formally documented
- Violation handling: Security team is automatically notified of validation violations detected in production monitoring
- Violation handling: Post-incident reviews for security incidents must assess whether input validation gaps contributed to the issue
- Exception process: Developer submits exception request documenting the input source, trust boundary, and compensating controls
- Exception process: Security team reviews threat model and assesses residual risk
- Exception process: Architecture review board approves exception with documented rationale and expiration date
- Exception process: Exception is tracked in security register and reviewed quarterly for continued validity
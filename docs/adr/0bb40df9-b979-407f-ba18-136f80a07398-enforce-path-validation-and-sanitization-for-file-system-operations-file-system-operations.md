# Enforce Path Validation and Sanitization for File System Operations: File System Operations

Status: proposed
Date: 2024-01-09
Deciders: Detection Pipeline (automated)

## Activation

This ADR is ACTIVE for all file system operations involving user-supplied or external path inputs across the codebase.

## Context

- The codebase performs file system operations (reading, writing, listing) on paths that may be influenced by external inputs or configuration
- Path traversal vulnerabilities (e.g., '../../../etc/passwd') represent a critical security risk that can lead to unauthorized file access
- Multiple modules (todos.ts, posts.ts) demonstrate consistent patterns of path validation and sanitization before file operations
- The pattern shows defensive programming practices where paths are normalized, validated against allowed directories, and sanitized to prevent directory traversal attacks
- This pattern was detected with 91.10% confidence across 2 files, indicating an established architectural practice

## Problem Statement

Without systematic path validation and sanitization, file system operations are vulnerable to path traversal attacks where malicious inputs can access files outside intended directories, potentially exposing sensitive data or enabling unauthorized modifications. The system needs a consistent approach to validate and sanitize all file paths before performing I/O operations.

## Decision

1. SHOULD: File system operations SHOULD use absolute paths after validation to avoid ambiguity and reduce attack surface

## Policy Block

- SHOULD File system operations SHOULD use absolute paths after validation to avoid ambiguity and reduce attack surface

In scope:
- All file read operations (fs.readFile, fs.readFileSync, fs.createReadStream)
- All file write operations (fs.writeFile, fs.writeFileSync, fs.createWriteStream)
- All directory operations (fs.readdir, fs.mkdir, fs.rmdir)
- Path construction using path.join, path.resolve with external inputs
- API endpoints or functions that accept file paths as parameters

Out of scope:
- Hard-coded paths defined as string literals in source code
- Paths generated entirely from trusted internal logic without external influence
- System paths managed by the runtime environment or framework
- Temporary file paths created by secure random generation (e.g., crypto.randomBytes)

Exceptions:
- EXC-001: Administrative or privileged operations that explicitly require access to system-wide paths

## Rationale

- The detection of this pattern across multiple files (todos.ts, posts.ts) with 91.10% confidence indicates an intentional architectural decision to prioritize input validation
- Path traversal is consistently ranked in OWASP Top 10 and CWE Top 25 as a critical vulnerability class, making prevention a high-priority security control
- Centralizing path validation logic reduces code duplication, improves maintainability, and ensures consistent security enforcement across the application
- This pattern aligns with defense-in-depth principles by validating inputs at the earliest possible point before they reach sensitive file system APIs

## Consequences

Positive:
- Significantly reduces the attack surface for path traversal vulnerabilities (CWE-22, CWE-23)
- Provides consistent security controls across all file system operations in the codebase
- Improves code maintainability by centralizing validation logic in reusable utilities
- Enables easier security auditing and compliance verification through standardized patterns

Negative:
- Adds computational overhead for path validation on every file system operation
- May introduce complexity in handling edge cases (symbolic links, case-insensitive file systems, Unicode normalization)
- Requires developer training and awareness to ensure consistent application of validation patterns
- Could potentially reject legitimate use cases if validation rules are overly restrictive

## Alternatives

- Use operating system-level sandboxing (chroot, containers) without application-level validation (rejected)
  Rejected because: OS-level controls alone are insufficient as defense-in-depth requires multiple layers; application-level validation catches issues earlier and provides better error handling
  When valid: May be used as a complementary control in addition to application-level validation
- Implement path validation only at API boundaries without internal validation (rejected)
  Rejected because: Internal functions may be called from multiple contexts; validating only at boundaries creates risk if internal APIs are exposed or misused
  When valid: Acceptable only for purely internal modules with guaranteed trusted inputs and no external exposure
- Use allowlists of specific allowed file paths instead of directory-based validation (deferred)
  Rejected because: Not rejected but deferred; allowlists provide stronger security but may be too restrictive for dynamic file operations
  When valid: Should be considered for high-security contexts with predictable file access patterns

## Risks

- Incomplete validation coverage where some file operations bypass validation checks
  Mitigation: Implement automated static analysis to detect file system operations without preceding validation; conduct regular security code reviews
  Owner: Security team and engineering team
- Validation logic contains bugs or edge cases that allow bypass (e.g., Unicode normalization issues, OS-specific path handling)
  Mitigation: Use well-tested path validation libraries; implement comprehensive unit tests including attack vectors; conduct penetration testing
  Owner: Engineering team
- Performance degradation from validation overhead on high-frequency file operations
  Mitigation: Profile and optimize validation logic; consider caching validated paths where appropriate; benchmark critical paths
  Owner: Engineering team

## Implementation Notes

- Use Node.js path.resolve() to normalize paths and path.relative() to verify the resolved path stays within the base directory
- Create a centralized validatePath(inputPath, baseDir) utility function that returns the validated absolute path or throws a security error
- Consider using established libraries like 'path-is-inside' or implementing checks that ensure path.relative(baseDir, resolvedPath) does not start with '..'
- Log all path validation failures with sufficient context for security monitoring and incident response
- Document the allowed base directories and validation rules in security documentation and code comments

## Continuation Context


Verify commands:
- grep -r "fs\.readFile\|fs\.writeFile\|fs\.readdir" --include="*.ts" --include="*.js" | grep -v "validatePath\|sanitize\|path\.resolve"
- npm run test -- --grep "path.*validation|path.*traversal"
- eslint . --rule 'no-restricted-syntax: ["error", {"selector": "CallExpression[callee.object.name=\"fs\"][callee.property.name=/read|write/]", "message": "File system operations must use validated paths"}]'

Accept when:
- All file system operations in the codebase use validated paths through centralized validation utilities
- Unit tests demonstrate that path traversal attempts (../, absolute paths outside base) are rejected
- Static analysis or linting rules detect and flag unvalidated file system operations
- Security testing confirms no path traversal vulnerabilities in file handling endpoints

## Enforcement

- Verified by: Automated static analysis tools (ESLint rules, custom AST analysis) in CI pipeline
- Verified by: Security-focused code reviews for all changes involving file system operations
- Verified by: Regular penetration testing and security audits targeting path traversal vulnerabilities
- Verified by: Unit and integration tests that include negative test cases for path traversal attempts
- Violation handling: CI pipeline fails if static analysis detects unvalidated file system operations
- Violation handling: Code review process blocks merge requests that introduce file operations without proper validation
- Violation handling: Security incidents involving path traversal trigger immediate remediation and post-mortem analysis
- Violation handling: Violations discovered in production are treated as high-severity security issues requiring urgent patches
- Exception process: Developer submits exception request with detailed justification and risk assessment to security team
- Exception process: Security team reviews the request, evaluates alternative controls, and approves or rejects with feedback
- Exception process: Approved exceptions must be documented in code with comments explaining the exception and compensating controls
- Exception process: All exceptions are logged in a security exceptions register and reviewed quarterly for continued validity
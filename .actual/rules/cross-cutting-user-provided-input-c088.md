# Enforce Input Validation and Sanitization for User-Provided Data: User Provided Input

These rules are ALWAYS ACTIVE for all code that processes user-provided input or external data sources, including API endpoints, controllers, form handlers, file uploads, query parameters, URL paths, and webhooks.

### Rules

- **R-INPUT-001** MUST: All user-provided input MUST be validated against expected format, type, and constraints before processing.
- **R-INPUT-002** MUST: All API endpoints and controllers that accept user input implement validation logic before reaching business logic.
- **R-INPUT-003** MUST: Form handlers and data processing functions validate input before use.
- **R-INPUT-004** MUST: File upload and file path handling logic validate paths and file types.
- **R-INPUT-005** MUST: Query parameters and URL path segments are validated before processing.
- **R-INPUT-006** MUST: External data sources (webhooks, third-party APIs) are validated before processing.
- **R-INPUT-007** SHOULD: Use schema validation libraries (Zod, Joi, Yup) to define reusable validation schemas with type safety.
- **R-INPUT-008** SHOULD: Implement validation middleware at the API gateway or controller layer.
- **R-INPUT-009** SHOULD: Create centralized validation utilities module with common patterns (email, URL, sanitization).
- **R-INPUT-010** SHOULD: Use parameterized queries or ORM methods to prevent SQL injection rather than manual string escaping.
- **R-INPUT-011** MUST NOT: Directly concatenate user input into queries, commands, or HTML output.

### Verify

```bash
# Count unvalidated input access points
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" --include="*.js" | grep -v "validate\|schema\|sanitize" | wc -l

# Run security tests
npm run test:security 2>&1 | grep -i "input validation"

# Check for eval usage
eslint . --ext .ts,.js --rule 'no-eval: error' --rule 'no-implied-eval: error'
```

**Accept when:**
- All API endpoints that accept user input have validation logic implemented before processing
- Security tests pass demonstrating protection against common injection attacks (SQL injection, XSS, path traversal)
- Code review confirms no direct concatenation of user input into queries, commands, or HTML output
- Validation rules are documented in API specifications (OpenAPI/Swagger)
- Centralized validation utilities module exists with reusable patterns

<enforcement>
Claude Code MUST NOT skip or defer verification. Security code reviews are mandatory for all changes touching input handling. CI/CD pipeline MUST fail if security tests detect unvalidated input points. Violations are tracked and require immediate remediation.
</enforcement>
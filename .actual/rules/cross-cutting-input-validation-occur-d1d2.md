# Enforce Input Validation and Sanitization for User-Provided Data: Input Validation Occur

These rules are ALWAYS ACTIVE for all code that processes user-provided input or external data sources, including API endpoints, controllers, form handlers, file uploads, query parameters, and webhook/third-party API integrations.

### Rules

- **R-INPUT-001** MUST: Input validation MUST occur at the earliest point of entry into the system (controller/API boundary).
- **R-INPUT-002** MUST: All API endpoints and controllers that accept user input require validation logic implemented before processing.
- **R-INPUT-003** MUST: Form handlers and data processing functions must validate and sanitize input before use.
- **R-INPUT-004** MUST: File upload and file path handling logic must validate paths and file types to prevent path traversal attacks.
- **R-INPUT-005** MUST: Query parameters and URL path segments must be validated before processing.
- **R-INPUT-006** MUST: External data sources (webhooks, third-party APIs) must be validated before processing or storage.
- **R-INPUT-007** SHOULD: Use schema validation libraries (Zod, Joi, Yup) to define reusable validation schemas with type safety.
- **R-INPUT-008** SHOULD: Implement validation middleware at the API gateway or controller layer to ensure all requests are validated before reaching business logic.
- **R-INPUT-009** SHOULD: Create a centralized validation utilities module with common patterns (email validation, URL validation, sanitization functions).
- **R-INPUT-010** SHOULD: Document validation rules in API specifications (OpenAPI/Swagger) to ensure frontend and backend validation stay synchronized.
- **R-INPUT-011** MUST: Use parameterized queries or ORM methods to prevent SQL injection rather than manual string escaping.

### Verify

```bash
# Check for unvalidated input access patterns
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" --include="*.js" | grep -v "validate\|schema\|sanitize" | wc -l

# Run security tests
npm run test:security 2>&1 | grep -i "input validation"

# Check for unsafe eval patterns
eslint . --ext .ts,.js --rule 'no-eval: error' --rule 'no-implied-eval: error'
```

**Accept when:**
- All API endpoints that accept user input have validation logic implemented before processing
- Security tests pass demonstrating protection against common injection attacks (SQL injection, XSS, path traversal)
- Code review confirms no direct concatenation of user input into queries, commands, or HTML output
- No unvalidated `req.body`, `req.query`, or `req.params` access patterns exist outside validation contexts
- Validation schemas are defined using a schema validation library (Zod, Joi, or Yup)
- Parameterized queries or ORM methods are used consistently for database operations

<enforcement>
Claude Code MUST NOT skip or defer verification. All input validation rules are security-critical and MUST be verified before accepting code changes. Violations block CI/CD pipeline execution and require mandatory security-focused code review.
</enforcement>
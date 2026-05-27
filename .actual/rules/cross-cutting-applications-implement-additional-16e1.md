# Enforce Input Validation and Sanitization for User-Provided Data: Applications Implement Additional

These rules are ALWAYS ACTIVE for all code that processes user-provided input or external data sources, including API endpoints, controllers, form handlers, file uploads, query parameters, and external data integrations.

### Rules

- **R-INPUT-001** MUST: Validate all user-provided input at API endpoints and controllers before processing, using schema validation libraries (Zod, Joi, Yup) to define reusable validation schemas with type safety.
- **R-INPUT-002** MUST: Sanitize and constrain user input to prevent injection attacks, XSS, path traversal, and data integrity issues before storage or rendering.
- **R-INPUT-003** MUST: Implement validation middleware at the API gateway or controller layer to ensure all requests are validated before reaching business logic.
- **R-INPUT-004** MUST: Use parameterized queries or ORM methods to prevent SQL injection rather than manual string escaping or direct concatenation of user input.
- **R-INPUT-005** MUST: Avoid direct concatenation of user input into queries, commands, or HTML output.
- **R-INPUT-006** SHOULD: Create a centralized validation utilities module with common patterns (email validation, URL validation, sanitization functions) to reduce duplication.
- **R-INPUT-007** SHOULD: Document validation rules in API specifications (OpenAPI/Swagger) to ensure frontend and backend validation stay synchronized.
- **R-INPUT-008** MAY: Applications MAY implement additional context-specific validation rules based on business requirements.

### Verify

```bash
# Check for unvalidated input access patterns
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" --include="*.js" | grep -v "validate\|schema\|sanitize" | wc -l

# Run security tests for input validation
npm run test:security 2>&1 | grep -i "input validation"

# Check for unsafe eval patterns
eslint . --ext .ts,.js --rule 'no-eval: error' --rule 'no-implied-eval: error'
```

**Accept when:**
- All API endpoints that accept user input have validation logic implemented before processing
- Security tests pass demonstrating protection against common injection attacks (SQL injection, XSS, path traversal)
- Code review confirms no direct concatenation of user input into queries, commands, or HTML output
- Validation schemas are defined using schema validation libraries with type safety
- Centralized validation utilities module exists with common validation patterns

<enforcement>
Claude Code MUST NOT skip or defer verification. All input validation rules are mandatory security controls. Violations must be caught in CI/CD pipeline and code review before merge.
</enforcement>
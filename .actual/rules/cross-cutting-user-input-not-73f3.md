# Enforce Input Validation and Sanitization for User-Provided Data: User Input Not

These rules are ALWAYS ACTIVE for all code that processes user-provided input or external data sources, including API endpoints, controllers, form handlers, file upload logic, and any function processing external data sources.

### Rules

- **R-INPUT-001** MUST NOT: User input MUST NOT be directly concatenated into SQL queries, shell commands, or HTML output without proper escaping or parameterization.
- **R-INPUT-002** MUST: All API endpoints and controllers that accept user input implement validation logic before processing.
- **R-INPUT-003** MUST: Use schema validation libraries (Zod, Joi, Yup) to define reusable validation schemas with type safety.
- **R-INPUT-004** MUST: Implement validation middleware at the API gateway or controller layer to ensure all requests are validated before reaching business logic.
- **R-INPUT-005** SHOULD: Use parameterized queries or ORM methods to prevent SQL injection rather than manual string escaping.
- **R-INPUT-006** SHOULD: Create a centralized validation utilities module with common patterns (email validation, URL validation, sanitization functions).
- **R-INPUT-007** SHOULD: Document validation rules in API specifications (OpenAPI/Swagger) to ensure frontend and backend validation stay synchronized.

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
- Unvalidated input access points count is zero or documented as exceptions

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory and must be verified before accepting changes that touch input handling, API endpoints, or data processing logic.
</enforcement>
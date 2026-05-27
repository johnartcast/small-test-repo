# Enforce Input Validation and Sanitization for User-Provided Data: Input Validation Logic

These rules are ALWAYS ACTIVE for all code that processes user-provided input or external data sources, including API endpoints, controllers, form handlers, file uploads, query parameters, and external data integrations.

### Rules

- **R-INPUT-001** SHOULD: Input validation logic SHOULD be centralized in reusable validation functions or middleware.

### Verify

```bash
# Check for unvalidated input access patterns
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" --include="*.js" | grep -v "validate\|schema\|sanitize" | wc -l

# Run security tests
npm run test:security 2>&1 | grep -i "input validation"

# Check for eval and implied-eval patterns
eslint . --ext .ts,.js --rule 'no-eval: error' --rule 'no-implied-eval: error'
```

**Accept when:**
- All API endpoints that accept user input have validation logic implemented before processing
- Security tests pass demonstrating protection against common injection attacks (SQL injection, XSS, path traversal)
- Code review confirms no direct concatenation of user input into queries, commands, or HTML output
- Validation schemas are defined using libraries like Zod or Joi with type safety
- Validation middleware is implemented at the API gateway or controller layer
- No unvalidated input points remain in scope files (posts.ts, todos.ts, and similar)

<enforcement>
Clause Code MUST NOT skip or defer verification. All input validation rules MUST be verified through automated security testing in CI/CD pipeline, mandatory security-focused code reviews, and static analysis enforcement. Violations block merge and trigger security team notification.
</enforcement>
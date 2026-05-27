# Enforce Input Validation and Sanitization for User-Provided Data: Validation Failures Return

These rules are ALWAYS ACTIVE for all code that processes user-provided input or external data sources, including API endpoints, controllers, form handlers, file upload logic, query parameters, URL paths, and functions processing external data from webhooks or third-party APIs.

### Rules

- **R-VAL-001** SHOULD: Validation failures SHOULD return clear, actionable error messages without exposing internal system details.

### Verify

```bash
# Check for unvalidated input access patterns
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" --include="*.js" | grep -v "validate\|schema\|sanitize" | wc -l

# Run security tests
npm run test:security 2>&1 | grep -i "input validation"

# Check for eval and implied-eval violations
eslint . --ext .ts,.js --rule 'no-eval: error' --rule 'no-implied-eval: error'
```

**Accept when:**
- All API endpoints that accept user input have validation logic implemented before processing
- Security tests pass demonstrating protection against common injection attacks (SQL injection, XSS, path traversal)
- Code review confirms no direct concatenation of user input into queries, commands, or HTML output
- Error messages returned to clients do not expose internal system details, stack traces, or database schema information

<enforcement>
Claude Code MUST NOT skip or defer verification. Validation failures must be tested in CI/CD pipeline using SAST tools, mandatory security-focused code reviews, and static analysis rules. Violations block merge and trigger security team notification.
</enforcement>
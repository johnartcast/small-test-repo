# Enforce Input Validation and Sanitization for User-Provided Data: String Inputs Sanitized

These rules are ALWAYS ACTIVE for all code that processes user-provided input or external data sources, including API endpoints, controllers, form handlers, file upload logic, query parameters, URL paths, and external data sources (webhooks, third-party APIs).

### Rules

- **R-INPUT-001** MUST: String inputs MUST be sanitized to remove or escape potentially dangerous characters before storage or rendering.

### Verify

```bash
# Check for unvalidated input access patterns
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" --include="*.js" | grep -v "validate\|schema\|sanitize" | wc -l

# Run security tests
npm run test:security 2>&1 | grep -i "input validation"

# Check for eval and implied eval usage
eslint . --ext .ts,.js --rule 'no-eval: error' --rule 'no-implied-eval: error'
```

**Accept when:**
- All API endpoints that accept user input have validation logic implemented before processing
- Security tests pass demonstrating protection against common injection attacks (SQL injection, XSS, path traversal)
- Code review confirms no direct concatenation of user input into queries, commands, or HTML output
- No unvalidated input access patterns detected in grep results

<enforcement>
Claude Code MUST NOT skip or defer verification. Automated security testing in CI/CD pipeline (SAST tools), mandatory security-focused code reviews, and static analysis rules are required to enforce this rule. Violations block merge and trigger security team notification.
</enforcement>
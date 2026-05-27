# Enforce Input Validation and Sanitization for User-Provided Data: File Paths Identifiers

These rules are ALWAYS ACTIVE for all code that processes user-provided input or external data sources, including API endpoints, controllers, form handlers, file upload logic, and query parameter processing.

### Rules

- **R-INPUT-001** MUST: File paths and identifiers derived from user input MUST be validated against allowlists or normalized to prevent path traversal attacks.

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
- File path handling uses allowlist validation or normalization to prevent traversal attacks

<enforcement>
Claude Code MUST NOT skip or defer verification. Security validation is mandatory before merge. Violations must be remediated or formally excepted through the documented exception process.
</enforcement>
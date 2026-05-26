# Enforce Input Validation and Sanitization for User-Provided Data: Input Validation Logic

These rules are ALWAYS ACTIVE for all code that processes user-provided input data, including HTTP request parameters, form data, API payloads, URL path parameters, WebSocket messages, and data imported from external sources.

### Rules

- **R-INPUT-001** SHOULD: Input validation logic SHOULD be centralized in reusable validation functions or schemas to ensure consistency across all data processing modules.

### Verify

```bash
# Check for unvalidated input access points
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" --include="*.js" | grep -v "validate\|sanitize\|schema" | head -20

# Count validation functions in codebase
find . -name "*.ts" -o -name "*.js" | xargs grep -l "export.*function.*validate" | wc -l

# Check for validation library presence
npm list zod joi yup validator express-validator 2>/dev/null || echo 'No validation libraries detected'
```

**Accept when:**
- All user input access points (req.body, req.query, req.params) are preceded by validation or sanitization calls
- At least one validation library (Zod, Joi, Yup, express-validator) is present in package dependencies
- Code review confirms no direct concatenation of user input into SQL queries, shell commands, or file paths
- Security scanning tools report no high-severity input validation vulnerabilities

<enforcement>
Claude Code MUST NOT skip or defer verification. Automated static analysis tools (ESLint security plugins, Semgrep rules), mandatory security-focused code review, and dynamic application security testing (DAST) tools are required to enforce this rule. CI pipeline MUST fail if unvalidated user input is detected in new or modified code.
</enforcement>
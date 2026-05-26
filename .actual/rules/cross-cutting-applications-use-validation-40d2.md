# Enforce Input Validation and Sanitization for User-Provided Data: Applications Use Validation

These rules are ALWAYS ACTIVE for all code that processes user-provided input data.

### Rules

- **R-VAL-001** MAY: Applications MAY use validation libraries (e.g., Zod, Joi, Yup) to define and enforce input schemas

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
Claude Code MUST NOT skip or defer verification. Automated static analysis tools (ESLint security plugins, Semgrep rules) MUST scan for unvalidated input patterns. Code review MUST verify validation for all PRs touching input handling. CI pipeline MUST fail if unvalidated user input is detected in new or modified code.
</enforcement>
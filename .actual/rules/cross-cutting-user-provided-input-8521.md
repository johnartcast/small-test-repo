# Enforce Input Validation and Sanitization for User-Provided Data: User Provided Input

These rules are ALWAYS ACTIVE for all code that processes user-provided input data.

### Rules

- **R-INPUT-001** MUST: All user-provided input MUST be validated against expected format, type, and constraints before processing.

### Verify

```bash
# Check for unvalidated input access patterns
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" --include="*.js" | grep -v "validate\|sanitize\|schema" | head -20

# Count validation functions in codebase
find . -name "*.ts" -o -name "*.js" | xargs grep -l "export.*function.*validate" | wc -l

# Check for validation libraries in dependencies
npm list zod joi yup validator express-validator 2>/dev/null || echo 'No validation libraries detected'
```

**Accept when:**
- All user input access points (req.body, req.query, req.params) are preceded by validation or sanitization calls
- At least one validation library (Zod, Joi, Yup, express-validator) is present in package dependencies
- Code review confirms no direct concatenation of user input into SQL queries, shell commands, or file paths
- Security scanning tools report no high-severity input validation vulnerabilities

<enforcement>
Claude Code MUST NOT skip or defer verification. All user input handling must be validated before processing. Violations block CI pipeline and require security team review.
</enforcement>
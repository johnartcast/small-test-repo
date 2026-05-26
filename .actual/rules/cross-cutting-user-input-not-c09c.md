# Enforce Input Validation and Sanitization for User-Provided Data: User Input Not

These rules are ALWAYS ACTIVE for all code that processes user-provided input data.

### Rules

- **R-INPUT-001** MUST NOT: User input MUST NOT be directly concatenated into SQL queries, shell commands, or file system operations without validation and parameterization.

### Verify

```bash
# Check for unvalidated input access patterns
grep -r "req\.body\|req\.query\|req\.params" --include="*.ts" --include="*.js" | grep -v "validate\|sanitize\|schema" | head -20

# Count validation function exports
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
Claude Code MUST NOT skip or defer verification of input validation rules. All user input must be validated before use in security-sensitive operations.
</enforcement>
# Enforce Path Validation and Sanitization for File System Operations: File System Operations

These rules are ALWAYS ACTIVE for all file system operations involving user-supplied or external path inputs across the codebase, including file read operations, file write operations, directory operations, and path construction with external inputs.

### Rules

- **R-FSO-001** SHOULD: File system operations SHOULD use absolute paths after validation to avoid ambiguity and reduce attack surface.

### Verify

```bash
# Detect unvalidated file system operations
grep -r "fs\.readFile\|fs\.writeFile\|fs\.readdir" --include="*.ts" --include="*.js" | grep -v "validatePath\|sanitize\|path\.resolve"

# Run path validation and traversal tests
npm run test -- --grep "path.*validation|path.*traversal"

# Lint for unvalidated file system operations
eslint . --rule 'no-restricted-syntax: ["error", {"selector": "CallExpression[callee.object.name=\"fs\"][callee.property.name=/read|write/]", "message": "File system operations must use validated paths"}]'
```

**Accept when:**
- All file system operations in the codebase use validated paths through centralized validation utilities
- Unit tests demonstrate that path traversal attempts (../, absolute paths outside base) are rejected
- Static analysis or linting rules detect and flag unvalidated file system operations
- Security testing confirms no path traversal vulnerabilities in file handling endpoints

<enforcement>
Claude Code MUST NOT skip or defer verification. All file system operations must be validated before use. Path traversal vulnerabilities are critical security issues and must be prevented through systematic validation and sanitization.
</enforcement>
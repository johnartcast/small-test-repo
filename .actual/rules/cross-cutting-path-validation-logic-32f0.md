# Enforce Path Validation and Sanitization for File System Operations: Path Validation Logic

These rules are ALWAYS ACTIVE for all file system operations involving user-supplied or external path inputs across the codebase, including file read operations, file write operations, directory operations, and path construction using external inputs.

### Rules

- **R-PATH-001** MUST: Path validation logic MUST reject paths containing directory traversal sequences ('../', '..\\'') after normalization if they escape the allowed base directory.

### Verify

```bash
# Detect file system operations without path validation
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
Claude Code MUST NOT skip or defer verification. Path validation is a critical security control and violations must be caught before merge.
</enforcement>
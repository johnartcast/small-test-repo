# Enforce Path Validation and Sanitization for File System Operations: Path Validation Functions

These rules are ALWAYS ACTIVE for all file system operations involving user-supplied or external path inputs across the codebase, including file read operations, file write operations, directory operations, and path construction using external inputs.

### Rules

- **R-PATH-001** SHOULD: Path validation functions SHOULD be centralized in reusable utility modules to ensure consistent security controls across all file system operations.

### Verify

```bash
# Detect file system operations without preceding validation
grep -r "fs\.readFile\|fs\.writeFile\|fs\.readdir" --include="*.ts" --include="*.js" | grep -v "validatePath\|sanitize\|path\.resolve"

# Run path validation and traversal tests
npm run test -- --grep "path.*validation|path.*traversal"

# Check for unvalidated file system operations via ESLint
eslint . --rule 'no-restricted-syntax: ["error", {"selector": "CallExpression[callee.object.name=\"fs\"][callee.property.name=/read|write/]", "message": "File system operations must use validated paths"}]'
```

**Accept when:**
- All file system operations in the codebase use validated paths through centralized validation utilities
- Unit tests demonstrate that path traversal attempts (../, absolute paths outside base) are rejected
- Static analysis or linting rules detect and flag unvalidated file system operations
- Security testing confirms no path traversal vulnerabilities in file handling endpoints

<enforcement>
Claude Code MUST NOT skip or defer verification. All file system operations must be validated before use, and violations must be caught by automated static analysis in the CI pipeline.
</enforcement>
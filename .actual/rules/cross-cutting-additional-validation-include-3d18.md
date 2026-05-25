# Enforce Path Validation and Sanitization for File System Operations: Additional Validation Include

These rules are ALWAYS ACTIVE for all file system operations involving user-supplied or external path inputs across the codebase, including file read operations, file write operations, directory operations, and path construction using external inputs.

### Rules

- **R-PATH-001** MUST: Validate and sanitize all file paths before performing file system operations (fs.readFile, fs.readFileSync, fs.createReadStream, fs.writeFile, fs.writeFileSync, fs.createWriteStream, fs.readdir, fs.mkdir, fs.rmdir).
- **R-PATH-002** MUST: Use path.resolve() to normalize paths and path.relative() to verify the resolved path stays within the base directory.
- **R-PATH-003** MUST: Create and use a centralized validatePath(inputPath, baseDir) utility function that returns the validated absolute path or throws a security error.
- **R-PATH-004** MUST: Reject path traversal attempts (../, absolute paths outside base directory) with appropriate security errors.
- **R-PATH-005** MUST: Log all path validation failures with sufficient context for security monitoring and incident response.
- **R-PATH-006** SHOULD: Implement checks using established libraries like 'path-is-inside' or ensure path.relative(baseDir, resolvedPath) does not start with '..'.
- **R-PATH-007** MAY: Include additional validation for null bytes, special characters, or platform-specific path restrictions based on security requirements.

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
- Path validation failures are logged with sufficient context for security monitoring

<enforcement>
Claude Code MUST NOT skip or defer verification. All file system operations must be validated before use. Violations are treated as high-severity security issues.
</enforcement>
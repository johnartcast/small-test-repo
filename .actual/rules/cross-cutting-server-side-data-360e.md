# Adopt Server Actions and API Routes as Standard Service Boundary Pattern: Server Side Data

These rules are ALWAYS ACTIVE for all server-side data mutations, business logic operations, form submissions, external API integrations, and RESTful endpoints in Next.js applications.

### Rules

- **R-SSD-001** MUST: All server-side data mutations and business logic MUST be implemented using either Next.js Server Actions or API Routes, never as client-side operations.

### Verify

```bash
# Check for Server Actions with 'use server' directive in actions.ts files
grep -r "'use server'" src/app --include="*.ts" | grep -c "actions.ts"

# Count API Routes in app/api directory
find src/app/api -name 'route.ts' -type f | wc -l

# Verify all Server Actions contain 'use server' directive
grep -r "export async function" src/app --include="actions.ts" | grep -v "'use server'" && echo 'FAIL: Server actions missing use server directive' || echo 'PASS'
```

**Accept when:**
- All Server Action files contain the 'use server' directive and are named actions.ts
- All API Routes are located in app/api/* directories and follow Next.js route handler conventions
- No client-side components contain direct database access or business logic that should be in service boundaries
- Code review checklist includes verification of appropriate service boundary pattern selection

<enforcement>
Claude Code MUST NOT skip or defer verification. ESLint violations block PR merges in CI pipeline. Code review process flags non-conformant patterns for revision. Architecture team conducts quarterly reviews to identify and remediate violations.
</enforcement>
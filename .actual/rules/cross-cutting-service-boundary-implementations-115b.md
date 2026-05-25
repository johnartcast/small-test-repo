# Adopt Server Actions and API Routes as Standard Service Boundary Pattern: Service Boundary Implementations

These rules are ALWAYS ACTIVE for all service boundary implementations in Next.js applications, including server-side data mutations, form submissions, external API integrations, webhook handlers, and RESTful endpoints.

### Rules

- **R-SB-001** SHOULD: Service boundary implementations SHOULD follow the Next.js App Router conventions with API Routes in app/api/* directories and Server Actions in component-adjacent action files.

### Verify

```bash
# Verify Server Actions contain 'use server' directive and are named actions.ts
grep -r "'use server'" src/app --include="*.ts" | grep -c "actions.ts"

# Count API Routes in app/api directory
find src/app/api -name 'route.ts' -type f | wc -l

# Verify all Server Actions have 'use server' directive
grep -r "export async function" src/app --include="actions.ts" | grep -v "'use server'" && echo 'FAIL: Server actions missing use server directive' || echo 'PASS'
```

**Accept when:**
- All Server Action files contain the 'use server' directive and are named actions.ts
- All API Routes are located in app/api/* directories and follow Next.js route handler conventions
- No client-side components contain direct database access or business logic that should be in service boundaries
- Code review checklist includes verification of appropriate service boundary pattern selection

<enforcement>
Claude Code MUST NOT skip or defer verification. ESLint violations block PR merges in CI pipeline. Code review process flags non-conformant patterns for revision. Architecture team conducts quarterly reviews to identify and remediate violations. New violations require documented justification or refactoring before merge approval.
</enforcement>
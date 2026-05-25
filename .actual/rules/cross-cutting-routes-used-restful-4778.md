# Adopt Server Actions and API Routes as Standard Service Boundary Pattern: Routes Used Restful

These rules are ALWAYS ACTIVE for all service boundary implementations in Next.js applications. All new service endpoints and data mutation operations MUST follow the patterns defined herein.

### Rules

- **R-SB-001** MUST: API Routes MUST be used for RESTful endpoints that serve external clients, webhooks, or require standard HTTP method semantics (GET, POST, PUT, DELETE).
- **R-SB-002** MUST: Server Actions MUST include the 'use server' directive and be located in {feature}/actions.ts files.
- **R-SB-003** MUST: All server-side data mutations and business logic operations MUST use appropriate service boundary patterns (Server Actions for internal mutations, API Routes for external integrations).
- **R-SB-004** SHOULD: Establish naming conventions with Server Actions in {feature}/actions.ts files and API Routes in app/api/{resource}/route.ts.
- **R-SB-005** SHOULD: Implement reusable error handling utilities for both Server Actions and API Routes to ensure consistent error responses.

### Verify

```bash
# Check for Server Actions with 'use server' directive in actions.ts files
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
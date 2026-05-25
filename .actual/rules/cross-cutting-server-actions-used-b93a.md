# Adopt Server Actions and API Routes as Standard Service Boundary Pattern: Server Actions Used

These rules are ALWAYS ACTIVE for all service boundary implementations in Next.js applications. All new service endpoints and data mutation operations MUST follow the patterns defined herein.

### Rules

- **R-SB-001** MUST: Server Actions MUST be used for form submissions and data mutations that are tightly coupled to UI components and require type-safe integration.
- **R-SB-002** MUST: All Server Action files MUST contain the 'use server' directive at the top of the file.
- **R-SB-003** MUST: Server Actions MUST be located in files named `actions.ts` within feature directories.
- **R-SB-004** MUST: API Routes MUST be located in `app/api/*` directories and follow Next.js route handler conventions.
- **R-SB-005** MUST: No client-side components MAY contain direct database access or business logic that should be in service boundaries.
- **R-SB-006** SHOULD: Establish naming conventions with Server Actions in `{feature}/actions.ts` files and API Routes in `app/api/{resource}/route.ts`.
- **R-SB-007** SHOULD: Create reusable error handling utilities for both Server Actions and API Routes to ensure consistent error responses.
- **R-SB-008** MAY: Legacy API endpoints that predate this ADR and are actively used by external clients may be exempted (EXC-001).
- **R-SB-009** MAY: Third-party integrations requiring specific endpoint patterns that conflict with standard conventions may be exempted (EXC-002).

### Verify

```bash
# Check for 'use server' directive in action files
grep -r "'use server'" src/app --include="*.ts" | grep -c "actions.ts"

# Count API route files
find src/app/api -name 'route.ts' -type f | wc -l

# Verify all Server Actions have 'use server' directive
grep -r "export async function" src/app --include="actions.ts" | grep -v "'use server'" && echo 'FAIL: Server actions missing use server directive' || echo 'PASS'
```

**Accept when:**
- All Server Action files contain the 'use server' directive and are named `actions.ts`
- All API Routes are located in `app/api/*` directories and follow Next.js route handler conventions
- No client-side components contain direct database access or business logic that should be in service boundaries
- Code review checklist includes verification of appropriate service boundary pattern selection
- ESLint rules enforce 'use server' directive in action files and prevent server-side code in client components

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for service boundary implementations. Violations block PR merges in CI pipeline and require code review flagging or documented exception approval.
</enforcement>
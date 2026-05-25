# Standardize Next.js API Routes for External API Integration: Integration Logic Abstracted

These rules are ALWAYS ACTIVE for all Next.js API routes under `app/api/**`, server actions in `actions.ts` files, library modules in `src/lib/**` that interact with external APIs, and client components that consume external data.

### Rules

- **R-INTEG-001** SHOULD: API integration logic SHOULD be abstracted into library modules (`src/lib/**`) to promote reusability and testability.
- **R-INTEG-002** MUST: All API credentials and sensitive configuration MUST be kept server-side using Next.js environment variables, never exposed in client bundles.
- **R-INTEG-003** MUST: Client-side components MUST NOT make direct fetch calls to external third-party APIs; all external API communication MUST flow through Next.js API routes.
- **R-INTEG-004** SHOULD: API routes SHOULD mirror the external service they proxy (e.g., `/api/weather` for weather API integration).
- **R-INTEG-005** SHOULD: TypeScript interfaces SHOULD be used to define request/response contracts between client components and API routes for type safety.
- **R-INTEG-006** SHOULD: Centralized error handling middleware and standardized error response formats SHOULD be implemented across all API routes.

### Verify

```bash
# Check for direct external API calls in client code
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "api/" | grep -v "localhost"

# Find API routes missing environment variable usage for credentials
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Detect hardcoded API keys or credentials in client-side code
grep -r "API_KEY\|api_key\|apiKey" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- No client-side components contain direct fetch calls to external third-party APIs (excluding localhost and internal `/api` routes)
- All API routes that interact with authenticated external services use environment variables for credentials
- No hardcoded API keys or credentials are found in client-side code (components, pages)

<enforcement>
Claude Code MUST NOT skip or defer verification. All three verification commands MUST pass before accepting code changes that involve external API integration.
</enforcement>
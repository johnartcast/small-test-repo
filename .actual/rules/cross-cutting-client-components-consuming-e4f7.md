# Standardize Next.js API Routes for External Service Integration: Client Components Consuming

These rules are ALWAYS ACTIVE for all client components and API routes that integrate with external third-party services in Next.js applications.

### Rules

- **R-NEXTJS-API-001** SHOULD: Client components consuming API routes SHOULD use fetch with proper error handling and loading states.
- **R-NEXTJS-API-002** MUST: All external API credentials and keys MUST be stored in environment variables and accessed only server-side via process.env.
- **R-NEXTJS-API-003** MUST: API routes MUST implement consistent error handling with appropriate HTTP status codes and standardized error response formats.
- **R-NEXTJS-API-004** SHOULD: TypeScript interfaces SHOULD define contracts for API route requests and responses, shared between client and server code.
- **R-NEXTJS-API-005** MUST: Client components MUST NOT make direct fetch calls to external APIs; all external integrations MUST route through Next.js API routes.

### Verify

```bash
# Detect direct external API calls from client components (excluding internal API routes)
grep -r "fetch.*http" src/components src/app --include="*.tsx" --include="*.ts" | grep -v "'/api/" | grep -v "localhost"

# Find API routes missing environment variable usage for credentials
find src/app/api -name "route.ts" -exec grep -L "process.env" {} \;

# Detect hardcoded API credentials in client-accessible code
grep -r "API_KEY\|apiKey\|api_key" src/components src/app --include="*.tsx" | grep -v "process.env"
```

**Accept when:**
- All external API calls from client components route through Next.js API routes (no direct external fetch calls in client code)
- No API credentials or keys are hardcoded or accessible in client-side code bundles
- All API routes implement consistent error handling with appropriate HTTP status codes
- TypeScript interfaces define contracts for API route requests and responses
- Environment variables are used for all sensitive credentials and validated at runtime

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for code review and CI pipeline enforcement.
</enforcement>
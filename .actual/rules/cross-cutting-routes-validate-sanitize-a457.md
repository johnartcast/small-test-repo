# Standardize Next.js API Routes for External API Integration: Routes Validate Sanitize

These rules are ALWAYS ACTIVE for all Next.js API routes under `app/api/**`, server actions in `actions.ts` files, and library modules in `src/lib/**` that interact with external APIs.

### Rules

- **R-VALIDATE-001** MUST: API routes MUST validate and sanitize incoming request parameters before forwarding to external APIs.
- **R-VALIDATE-002** MUST: All API routes that interact with authenticated external services MUST use environment variables for credentials (never hardcode API keys).
- **R-VALIDATE-003** MUST: Client-side components MUST NOT contain direct fetch calls to external third-party APIs; all external API calls MUST be proxied through Next.js API routes.
- **R-VALIDATE-004** SHOULD: API routes SHOULD implement centralized error handling and standardized error response formats.
- **R-VALIDATE-005** SHOULD: API routes SHOULD include request/response logging for debugging and monitoring purposes.

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
- No client-side components contain direct fetch calls to external third-party APIs (excluding localhost and internal /api routes)
- All API routes that interact with authenticated external services use environment variables for credentials
- No hardcoded API keys or credentials are found in client-side code (components, pages)

<enforcement>
Claude Code MUST NOT skip or defer verification. All three verification commands must pass before accepting changes to API integration patterns.
</enforcement>
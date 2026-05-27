# Adopt Redis as Standard Caching Layer for API Routes: Cache Keys Follow

These rules are ALWAYS ACTIVE for all API routes in `/src/app/api/**` and server actions in `/src/app/**/actions.ts` that fetch external data or perform database queries called more than once per user session.

### Rules

- **R-CACHE-001** MUST: Cache keys MUST follow a consistent naming convention: `{service}:{resource}:{identifier}` (e.g., `weather:forecast:city123`, `todos:list:user456`).
- **R-CACHE-002** MUST: Use Redis as the standard caching layer for all API routes serving frequently accessed data.
- **R-CACHE-003** MUST: Implement cache utility module (e.g., `lib/cache.ts`) that wraps Redis operations with consistent error handling.
- **R-CACHE-004** MUST: Use ioredis or redis npm package as the Redis client library with connection pooling enabled.
- **R-CACHE-005** MUST: Use Redis SETEX command for atomic set-with-TTL operations to avoid race conditions.
- **R-CACHE-006** SHOULD: Set default TTL values: 5 minutes for weather data, 1 minute for todo lists, 1 hour for reference data.
- **R-CACHE-007** SHOULD: Implement cache key prefixing with application version to enable cache invalidation on deployments.
- **R-CACHE-008** SHOULD: Implement comprehensive integration tests that verify cache invalidation on all write operations.
- **R-CACHE-009** SHOULD: Add Redis connection configuration to environment variables: `REDIS_URL`, `REDIS_PASSWORD`, `REDIS_TLS_ENABLED`.
- **R-CACHE-010** MAY: Document exceptions with `@cache-exception` comment tag in route handler when data must be guaranteed fresh for compliance or security reasons, or endpoint is called less than 10 times per day in production.

### Verify

```bash
# Check for Redis client library presence
npm list | grep -E '(ioredis|redis)'

# Verify Redis usage in API routes
grep -r 'redis\|cache' src/app/api/ --include='*.ts' | wc -l

# Check for Redis client initialization
grep -r 'REDIS_URL\|redis.createClient' src/ --include='*.ts'

# Verify cache utility module exists
find src -name 'cache.ts' -o -name 'cache.js'

# Check environment variable documentation
grep -E 'REDIS_URL|REDIS_PASSWORD|REDIS_TLS_ENABLED' .env.example
```

**Accept when:**
- Redis client library (ioredis or redis) is present in package.json dependencies
- At least 2 API route files contain cache implementation with Redis client usage
- Cache utility module exists with standardized get/set/delete operations and error handling
- Environment variables for Redis configuration are documented in .env.example
- Cache keys in implementation follow the `{service}:{resource}:{identifier}` naming convention
- SETEX or equivalent atomic operations are used for cache writes

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules marked MUST are non-negotiable for API routes and server actions within scope. Violations must be flagged in code review and performance regression tests must validate cache hit rates exceed 70% for stable data.
</enforcement>
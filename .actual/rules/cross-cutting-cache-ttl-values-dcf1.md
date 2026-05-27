# Adopt Redis as Standard Caching Layer for API Routes: Cache Ttl Values

These rules are ALWAYS ACTIVE for all API routes in `/src/app/api/**` that fetch external data, server actions in `/src/app/**/actions.ts` that perform database queries, and data fetching functions called more than once per user session.

### Rules

- **R-CACHE-001** SHOULD: Cache TTL values SHOULD be configurable via environment variables to allow tuning without code changes.
- **R-CACHE-002** MUST: Use Redis as the standard caching layer for all in-scope API routes and server actions.
- **R-CACHE-003** MUST: Implement cache key prefixing with application version to enable cache invalidation on deployments.
- **R-CACHE-004** MUST: Use Redis SETEX command for atomic set-with-TTL operations to avoid race conditions.
- **R-CACHE-005** SHOULD: Set default TTL values: 5 minutes for weather data, 1 minute for todo lists, 1 hour for reference data.
- **R-CACHE-006** MUST: Create a centralized cache utility module (e.g., `lib/cache.ts`) that wraps Redis operations with consistent error handling.
- **R-CACHE-007** MUST: Implement comprehensive integration tests that verify cache invalidation on all write operations.
- **R-CACHE-008** SHOULD: Use shorter TTL values for critical data to mitigate stale data risks.
- **R-CACHE-009** MUST: Implement circuit breaker pattern and rate limiting on fallback paths for Redis outage scenarios.
- **R-CACHE-010** MUST: Document cache exceptions with `@cache-exception` comment tags in route handlers.

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
- Cache utility module exists at `lib/cache.ts` with standardized get/set/delete operations and error handling
- Environment variables for Redis configuration (REDIS_URL, REDIS_PASSWORD, REDIS_TLS_ENABLED) are documented in `.env.example`
- Cache key prefixing with application version is implemented in the cache utility module
- Default TTL values are configured for weather data (5 min), todo lists (1 min), and reference data (1 hour)
- Integration tests verify cache invalidation on write operations
- Circuit breaker pattern is implemented for Redis connection failures

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules in this file are mandatory for API routes and server actions within scope. Violations must be flagged in code review and performance regression tests must fail if response times exceed baseline by >50%.
</enforcement>
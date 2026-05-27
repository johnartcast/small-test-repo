# Adopt Redis as Standard Caching Layer for API Routes: Write Operations Post

These rules are ALWAYS ACTIVE for all API routes in `/src/app/api/**` and server actions in `/src/app/**/actions.ts` that perform write operations (POST, PUT, DELETE) or fetch external data.

### Rules

- **R-REDIS-001** SHOULD: Write operations (POST, PUT, DELETE) SHOULD invalidate relevant cache entries to maintain data consistency.
- **R-REDIS-002** MUST: Use ioredis or redis npm package as the Redis client library with connection pooling enabled.
- **R-REDIS-003** MUST: Create a centralized cache utility module (e.g., `lib/cache.ts`) that wraps Redis operations and provides consistent error handling.
- **R-REDIS-004** SHOULD: Set default TTL values: 5 minutes for weather data, 1 minute for todo lists, 1 hour for reference data.
- **R-REDIS-005** MUST: Implement cache key prefixing with application version to enable cache invalidation on deployments.
- **R-REDIS-006** MUST: Add Redis connection configuration to environment variables: `REDIS_URL`, `REDIS_PASSWORD`, `REDIS_TLS_ENABLED`.
- **R-REDIS-007** MUST: Use Redis SETEX command for atomic set-with-TTL operations to avoid race conditions.
- **R-REDIS-008** SHOULD: Implement comprehensive integration tests that verify cache invalidation on all write operations.
- **R-REDIS-009** SHOULD: Use shorter TTL values for critical data and add cache version keys to force invalidation on schema changes.
- **R-REDIS-010** MAY: Document exceptions with `@cache-exception` comment tag in route handler when caching cannot be applied.

### Verify

```bash
# Check for Redis client library presence
grep -r 'redis\|cache' src/app/api/ --include='*.ts' | wc -l

# Verify Redis client initialization
grep -r 'REDIS_URL\|redis.createClient' src/ --include='*.ts'

# Check npm dependencies for Redis packages
npm list | grep -E '(ioredis|redis)'
```

**Accept when:**
- Redis client library (ioredis or redis) is present in package.json dependencies
- At least 2 API route files contain cache implementation with Redis client usage
- Cache utility module exists at `lib/cache.ts` with standardized get/set/delete operations and error handling
- Environment variables for Redis configuration are documented in `.env.example`
- Write operations include cache invalidation logic for affected cache keys
- Integration tests verify cache invalidation on POST, PUT, and DELETE operations

<enforcement>
Claude Code MUST NOT skip or defer verification. All rules must be checked during code review and CI pipeline execution. Performance regression tests must validate cache hit rates meet minimum thresholds (>70% for stable data).
</enforcement>
# Adopt Redis as Standard Caching Layer for API Routes: High Traffic Endpoints

These rules are ALWAYS ACTIVE for all API routes in `/src/app/api/**` that fetch external data, server actions in `/src/app/**/actions.ts` that perform database queries, and data fetching functions called more than once per user session.

### Rules

- **R-REDIS-001** MUST: Implement Redis as the caching layer for high-traffic API endpoints serving weather data, todo lists, and other frequently accessed resources.
- **R-REDIS-002** MUST: Use ioredis or redis npm package as the Redis client library with connection pooling enabled.
- **R-REDIS-003** MUST: Create a centralized cache utility module (e.g., `lib/cache.ts`) that wraps Redis operations and provides consistent error handling.
- **R-REDIS-004** MUST: Set default TTL values: 5 minutes for weather data, 1 minute for todo lists, 1 hour for reference data.
- **R-REDIS-005** MUST: Implement cache key prefixing with application version to enable cache invalidation on deployments.
- **R-REDIS-006** MUST: Add Redis connection configuration to environment variables: `REDIS_URL`, `REDIS_PASSWORD`, `REDIS_TLS_ENABLED`.
- **R-REDIS-007** MUST: Use Redis SETEX command for atomic set-with-TTL operations to avoid race conditions.
- **R-REDIS-008** MUST: Implement circuit breaker pattern and rate limiting on fallback paths for Redis outage scenarios.
- **R-REDIS-009** MUST: Implement comprehensive integration tests that verify cache invalidation on all write operations.
- **R-REDIS-010** SHOULD: Implement cache warming strategies to pre-populate frequently accessed data for high-traffic endpoints.
- **R-REDIS-011** SHOULD: Set up monitoring for Redis memory usage with alerts at 70% and 85% thresholds.
- **R-REDIS-012** SHOULD: Implement eviction policy (allkeys-lru) and regularly review cache key TTL values.
- **R-REDIS-013** MAY: High-traffic endpoints MAY implement cache warming strategies to pre-populate frequently accessed data.

### Exceptions

- **EXC-001**: Data must be guaranteed fresh for compliance or security reasons.
- **EXC-002**: Endpoint is called less than 10 times per day in production.

### Verify

```bash
# Check for Redis client library in dependencies
grep -r 'redis\|cache' src/app/api/ --include='*.ts' | wc -l

# Verify Redis configuration in codebase
grep -r 'REDIS_URL\|redis.createClient' src/ --include='*.ts'

# Check installed Redis packages
npm list | grep -E '(ioredis|redis)'

# Verify cache utility module exists
find src -name 'cache.ts' -o -name 'cache.js'

# Check for cache implementation in API routes
grep -r 'setex\|SETEX\|cache\.' src/app/api/ --include='*.ts' | wc -l
```

**Accept when:**
- Redis client library (ioredis or redis) is present in package.json dependencies
- At least 2 API route files contain cache implementation with Redis client usage
- Cache utility module exists with standardized get/set/delete operations and error handling
- Environment variables for Redis configuration are documented in .env.example
- Cache key prefixing with application version is implemented
- Default TTL values are configured for weather data (5 min), todo lists (1 min), and reference data (1 hour)
- Circuit breaker pattern is implemented for Redis connection failures
- Integration tests verify cache invalidation on write operations

<enforcement>
Claude Code MUST NOT skip or defer verification. All R-REDIS-### rules marked MUST are mandatory for compliance. Violations must be flagged in code review and performance regression tests must fail if cache implementation is missing or incomplete.
</enforcement>
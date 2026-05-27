# Adopt Redis as Standard Caching Layer for API Routes: Routes That Fetch

These rules are ALWAYS ACTIVE for all API routes in `/src/app/api/**` that fetch data from external services or databases, and for server actions in `/src/app/**/actions.ts` that perform database queries.

### Rules

- **R-REDIS-001** MUST: All API routes that fetch data from external services or databases MUST implement a caching layer using Redis.
- **R-REDIS-002** MUST: Use ioredis or redis npm package as the Redis client library with connection pooling enabled.
- **R-REDIS-003** MUST: Create a centralized cache utility module (e.g., lib/cache.ts) that wraps Redis operations and provides consistent error handling.
- **R-REDIS-004** MUST: Set default TTL values: 5 minutes for weather data, 1 minute for todo lists, 1 hour for reference data.
- **R-REDIS-005** MUST: Implement cache key prefixing with application version to enable cache invalidation on deployments.
- **R-REDIS-006** MUST: Add Redis connection configuration to environment variables: REDIS_URL, REDIS_PASSWORD, REDIS_TLS_ENABLED.
- **R-REDIS-007** MUST: Use Redis SETEX command for atomic set-with-TTL operations to avoid race conditions.
- **R-REDIS-008** SHOULD: Implement circuit breaker pattern and rate limiting on fallback paths for Redis outage scenarios.
- **R-REDIS-009** SHOULD: Implement comprehensive integration tests that verify cache invalidation on all write operations.
- **R-REDIS-010** SHOULD: Set up monitoring for Redis memory usage with alerts at 70% and 85% thresholds.

### Verify

```bash
# Check for Redis client library in dependencies
grep -E '(ioredis|redis)' package.json

# Count Redis/cache usage in API routes
grep -r 'redis\|cache' src/app/api/ --include='*.ts' | wc -l

# Verify Redis client initialization
grep -r 'REDIS_URL\|redis.createClient' src/ --include='*.ts'

# Check installed Redis packages
npm list | grep -E '(ioredis|redis)'

# Verify cache utility module exists
find src -name 'cache.ts' -o -name 'cache.js'

# Check for cache implementation in at least 2 API route files
grep -r 'redis\.' src/app/api/ --include='*.ts' -l | wc -l
```

**Accept when:**
- Redis client library (ioredis or redis) is present in package.json dependencies
- At least 2 API route files contain cache implementation with Redis client usage
- Cache utility module exists with standardized get/set/delete operations and error handling
- Environment variables for Redis configuration are documented in .env.example
- REDIS_URL, REDIS_PASSWORD, and REDIS_TLS_ENABLED are defined in environment configuration
- Cache key prefixing with application version is implemented
- Default TTL values are configured for weather data (5 min), todo lists (1 min), and reference data (1 hour)

<enforcement>
Claude Code MUST NOT skip or defer verification. All R-REDIS-### rules marked MUST are non-negotiable for API routes that fetch external data. Violations must be flagged in code review and performance regression tests must fail if cache implementation is missing or incomplete.
</enforcement>
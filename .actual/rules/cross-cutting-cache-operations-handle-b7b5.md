# Adopt Redis as Standard Caching Layer for API Routes: Cache Operations Handle

These rules are ALWAYS ACTIVE for all API routes in `/src/app/api/**` that fetch external data, server actions in `/src/app/**/actions.ts` that perform database queries, and data fetching functions called more than once per user session.

### Rules

- **R-CACHE-001** MUST: Cache operations MUST handle Redis connection failures gracefully and fall back to direct data source access.

### Verify

```bash
# Detect Redis client library presence
npm list | grep -E '(ioredis|redis)'

# Check for Redis usage in API routes
grep -r 'redis\|cache' src/app/api/ --include='*.ts' | wc -l

# Verify Redis configuration in codebase
grep -r 'REDIS_URL\|redis.createClient' src/ --include='*.ts'

# Confirm cache utility module exists
find src/ -name 'cache.ts' -o -name 'cache.js'

# Check environment configuration
grep -E 'REDIS_URL|REDIS_PASSWORD|REDIS_TLS_ENABLED' .env.example
```

**Accept when:**
- Redis client library (ioredis or redis) is present in package.json dependencies
- At least 2 API route files contain cache implementation with Redis client usage
- Cache utility module exists with standardized get/set/delete operations and error handling
- Environment variables for Redis configuration are documented in .env.example
- Cache operations include try-catch blocks or error handlers that fall back to direct data source access

<enforcement>
Claude Code MUST NOT skip or defer verification. All cache operations MUST implement graceful failure handling with fallback to direct data source access before code is approved.
</enforcement>
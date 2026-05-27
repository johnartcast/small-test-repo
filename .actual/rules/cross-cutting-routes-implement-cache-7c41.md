# Adopt Redis as Standard Caching Layer for API Routes: Routes Implement Cache

These rules are ALWAYS ACTIVE for all API routes in `/src/app/api/**` that fetch external data, server actions in `/src/app/**/actions.ts` that perform database queries, and data fetching functions called more than once per user session.

### Rules

- **R-CACHE-001** MUST: API routes MUST implement cache-aside pattern: check cache first, fetch from source on miss, then populate cache.

### Verify

```bash
# Detect Redis client library presence
grep -r 'redis\|cache' src/app/api/ --include='*.ts' | wc -l

# Verify Redis client configuration
grep -r 'REDIS_URL\|redis.createClient' src/ --include='*.ts'

# Check for ioredis or redis package
npm list | grep -E '(ioredis|redis)'
```

**Accept when:**
- Redis client library (ioredis or redis) is present in package.json dependencies
- At least 2 API route files contain cache implementation with Redis client usage
- Cache utility module exists with standardized get/set/delete operations and error handling
- Environment variables for Redis configuration are documented in .env.example

<enforcement>
Claude Code MUST NOT skip or defer verification. All API routes fetching external data or performing database queries must implement the cache-aside pattern using Redis. New routes without caching require explicit justification via @cache-exception comment tag and Tech Lead approval.
</enforcement>
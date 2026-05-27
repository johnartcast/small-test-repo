# Adopt Redis as Standard Caching Layer for API Routes: Cached Entries Include

These rules are ALWAYS ACTIVE for all API routes in `/src/app/api/**` that fetch external data, server actions in `/src/app/**/actions.ts` that perform database queries, and data fetching functions called more than once per user session.

### Rules

- **R-REDIS-001** MUST: All cached entries MUST include an appropriate TTL (Time To Live) value based on data volatility.

### Verify

```bash
# Check for Redis client library presence
grep -r 'redis\|cache' src/app/api/ --include='*.ts' | wc -l

# Verify Redis configuration in codebase
grep -r 'REDIS_URL\|redis.createClient' src/ --include='*.ts'

# Check npm dependencies for Redis client
npm list | grep -E '(ioredis|redis)'
```

**Accept when:**
- Redis client library (ioredis or redis) is present in package.json dependencies
- At least 2 API route files contain cache implementation with Redis client usage
- Cache utility module exists with standardized get/set/delete operations and error handling
- Environment variables for Redis configuration are documented in .env.example
- All cached entries in API routes include explicit TTL values (e.g., SETEX, with expiration parameters)
- Default TTL values are documented: 5 minutes for weather data, 1 minute for todo lists, 1 hour for reference data

<enforcement>
Claude Code MUST NOT skip or defer verification. All cached entries MUST include TTL values. Code review checklist MUST verify caching implementation for new API routes. CI pipeline MUST run grep commands to detect API routes without cache implementation. Performance testing suite MUST validate cache hit rates meet minimum thresholds (>70% for stable data).
</enforcement>
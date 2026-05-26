# Adopt Redis as Standard Cache Layer for Primary Datastores: Cached Data Include

These rules are ALWAYS ACTIVE for all data access patterns involving primary datastores where caching is implemented, including API routes, reference data, user-specific data, and aggregated results.

### Rules

- **R-REDIS-001** MUST: All cached data MUST include explicit TTL (time-to-live) values appropriate to the data volatility.

### Verify

```bash
# Check for Redis client initialization in data access layers
grep -r "redis" --include="*.ts" --include="*.js" src/ | grep -E "(createClient|connect|RedisClient)"

# Check for cache operations with TTL configuration
grep -r "cache" --include="*.ts" --include="*.js" src/ | grep -E "(setex|get|del|expire)"

# Verify Redis cache statistics
redis-cli INFO stats | grep -E "(keyspace_hits|keyspace_misses|evicted_keys)"
```

**Accept when:**
- Redis client initialization is present in data access layers for weather API and todos actions
- Cache key patterns follow documented naming convention with service prefix and TTL configuration
- Redis monitoring shows cache hit rate above 70% for frequently accessed endpoints

<enforcement>
Claude Code MUST NOT skip or defer verification of explicit TTL values on all cached data. Violations must be flagged for architecture review.
</enforcement>
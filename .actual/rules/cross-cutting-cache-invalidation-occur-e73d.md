# Adopt Redis as Standard Cache Layer for Primary Datastores: Cache Invalidation Occur

These rules are ALWAYS ACTIVE for all data access patterns involving primary datastores where caching is implemented, including API routes, frequently accessed reference data, user-specific data, and aggregated results.

### Rules

- **R-CACHE-001** SHOULD: Cache invalidation SHOULD occur synchronously on write operations to maintain data consistency.

### Verify

```bash
# Verify Redis client initialization in data access layers
grep -r "redis" --include="*.ts" --include="*.js" src/ | grep -E "(createClient|connect|RedisClient)"

# Verify cache operations are implemented
grep -r "cache" --include="*.ts" --include="*.js" src/ | grep -E "(setex|get|del|expire)"

# Check Redis cache statistics
redis-cli INFO stats | grep -E "(keyspace_hits|keyspace_misses|evicted_keys)"
```

**Accept when:**
- Redis client initialization is present in data access layers for weather API and todos actions
- Cache key patterns follow documented naming convention with service prefix and TTL configuration
- Redis monitoring shows cache hit rate above 70% for frequently accessed endpoints

<enforcement>
Claude Code MUST NOT skip or defer verification. Cache invalidation synchronization is critical for data consistency and must be validated before accepting implementations.
</enforcement>
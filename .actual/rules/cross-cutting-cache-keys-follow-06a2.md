# Adopt Redis as Standard Cache Layer for Primary Datastores: Cache Keys Follow

These rules are ALWAYS ACTIVE for all data access patterns involving primary datastores where caching is implemented, including API routes, reference data access, user-specific data retrieval, and aggregated result caching.

### Rules

- **R-CACHE-001** MUST: Cache keys MUST follow a consistent naming convention: `{service}:{entity}:{identifier}:{version}`

### Verify

```bash
# Check for Redis client initialization in data access layers
grep -r "redis" --include="*.ts" --include="*.js" src/ | grep -E "(createClient|connect|RedisClient)"

# Check for cache operations with proper key patterns
grep -r "cache" --include="*.ts" --include="*.js" src/ | grep -E "(setex|get|del|expire)"

# Verify Redis cache statistics
redis-cli INFO stats | grep -E "(keyspace_hits|keyspace_misses|evicted_keys)"
```

**Accept when:**
- Redis client initialization is present in data access layers for weather API and todos actions
- Cache key patterns follow documented naming convention with service prefix and TTL configuration
- Redis monitoring shows cache hit rate above 70% for frequently accessed endpoints

<enforcement>
Claude Code MUST NOT skip or defer verification of cache key naming conventions and Redis client initialization. All new data access patterns must be validated against these rules before approval.
</enforcement>
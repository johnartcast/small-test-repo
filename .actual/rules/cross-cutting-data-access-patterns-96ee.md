# Adopt Redis as Standard Cache Layer for Primary Datastores: Data Access Patterns

These rules are ALWAYS ACTIVE for all data access patterns involving primary datastores where caching is implemented, including API routes, reference data access, user-specific data retrieval, and aggregated result caching.

### Rules

- **R-CACHE-001** MUST: All data access patterns involving primary datastores MUST implement a cache layer using Redis for frequently accessed read operations.

### Verify

```bash
# Check for Redis client initialization in data access layers
grep -r "redis" --include="*.ts" --include="*.js" src/ | grep -E "(createClient|connect|RedisClient)"

# Check for cache operations in data access patterns
grep -r "cache" --include="*.ts" --include="*.js" src/ | grep -E "(setex|get|del|expire)"

# Verify Redis cache statistics
redis-cli INFO stats | grep -E "(keyspace_hits|keyspace_misses|evicted_keys)"
```

**Accept when:**
- Redis client initialization is present in data access layers for weather API and todos actions
- Cache key patterns follow documented naming convention with service prefix and TTL configuration
- Redis monitoring shows cache hit rate above 70% for frequently accessed endpoints

<enforcement>
Claude Code MUST NOT skip or defer verification of Redis cache layer implementation in qualifying data access patterns. Pull requests without cache layer for read-heavy operations exceeding 10:1 read-to-write ratios are flagged for review. Services with cache hit rates below 50% trigger performance investigation.
</enforcement>
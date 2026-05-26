# Adopt Redis as Standard Cache Layer for Primary Datastores: Sensitive Pii Data

These rules are ALWAYS ACTIVE for all data access patterns involving primary datastores where caching is implemented, particularly those handling sensitive or PII data.

### Rules

- **R-CACHE-001** MUST_NOT: Sensitive or PII data MUST_NOT be cached without encryption at rest in the cache layer.
- **R-CACHE-002** MUST: Use Redis client libraries with connection pooling (e.g., ioredis for Node.js) to manage connections efficiently.
- **R-CACHE-003** MUST: Implement cache key namespacing per service to prevent key collisions and enable selective cache clearing.
- **R-CACHE-004** SHOULD: Set up Redis monitoring with metrics for hit rate, miss rate, eviction rate, and memory usage to optimize cache effectiveness.
- **R-CACHE-005** SHOULD: Document TTL values for each data type in a central configuration to ensure consistency and enable tuning based on access patterns.
- **R-CACHE-006** SHOULD: Implement probabilistic early expiration and request coalescing to prevent cache stampede during high traffic.
- **R-CACHE-007** SHOULD: Implement cache versioning, monitoring for cache-database drift, and automated reconciliation processes to prevent data inconsistency.
- **R-CACHE-008** SHOULD: Deploy Redis in clustered mode with automatic failover and implement graceful degradation to bypass cache on failure.

### Verify

```bash
# Check for Redis client initialization in data access layers
grep -r "redis" --include="*.ts" --include="*.js" src/ | grep -E "(createClient|connect|RedisClient)"

# Check for cache operations
grep -r "cache" --include="*.ts" --include="*.js" src/ | grep -E "(setex|get|del|expire)"

# Verify Redis monitoring metrics
redis-cli INFO stats | grep -E "(keyspace_hits|keyspace_misses|evicted_keys)"

# Check for encryption at rest configuration for sensitive data
grep -r "encrypt" --include="*.ts" --include="*.js" src/ | grep -i "redis\|cache"

# Verify cache key naming conventions
grep -r "cache.*key\|redis.*key" --include="*.ts" --include="*.js" src/ | grep -E "(namespace|prefix|service)"
```

**Accept when:**
- Redis client initialization is present in data access layers for weather API and todos actions
- Cache key patterns follow documented naming convention with service prefix and TTL configuration
- Redis monitoring shows cache hit rate above 70% for frequently accessed endpoints
- Sensitive or PII data cached in Redis is encrypted at rest
- Connection pooling is configured for Redis client initialization
- Cache invalidation logic is documented and implemented for all cached data types
- Redis is deployed in clustered mode with automatic failover capability

<enforcement>
Claude Code MUST NOT skip or defer verification of these rules. All cache implementations handling sensitive or PII data MUST comply with R-CACHE-001. Verification commands MUST be executed before accepting any data access pattern changes.
</enforcement>
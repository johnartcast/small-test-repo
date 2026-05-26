# Adopt Redis as Standard Cache Layer for Primary Datastores: Services Implement Cache

These rules are ALWAYS ACTIVE for all data access patterns involving primary datastores where caching is implemented, including API routes, reference data access, user-specific data retrieval, and aggregated result computation.

### Rules

- **R-CACHE-001** MAY: Services MAY implement cache-aside pattern or read-through caching based on specific access patterns for data matching in-scope criteria (sub-100ms response requirements, read-to-write ratios >10:1, frequently accessed reference data, high-frequency user-specific data, expensive computed results).
- **R-CACHE-002** MUST: Services MUST NOT apply caching to real-time streaming data requiring immediate consistency, write-heavy operations where cache overhead exceeds benefits, data with strict regulatory prohibitions on external caching, transient data with lifespan under 1 second, or large binary objects exceeding 1MB.
- **R-CACHE-003** MUST: Cache key patterns MUST follow documented naming convention with service prefix and TTL configuration to prevent key collisions and enable selective cache clearing.
- **R-CACHE-004** SHOULD: Services SHOULD implement cache key namespacing per service to prevent collisions and enable selective cache invalidation.
- **R-CACHE-005** SHOULD: Redis client initialization SHOULD use connection pooling (e.g., ioredis for Node.js) to manage connections efficiently.
- **R-CACHE-006** SHOULD: TTL values for each data type SHOULD be documented in central configuration to ensure consistency and enable tuning based on access patterns.
- **R-CACHE-007** SHOULD: Cache implementations SHOULD include monitoring for hit rate, miss rate, eviction rate, and memory usage to optimize cache effectiveness.
- **R-CACHE-008** MUST: Services requiring guaranteed read-after-write consistency within same transaction or subject to regulatory compliance prohibiting Redis/external caching MUST document exception EXC-001 or EXC-002 respectively and obtain approval from tech lead and architecture team.

### Verify

```bash
# Check for Redis client initialization in data access layers
grep -r "redis" --include="*.ts" --include="*.js" src/ | grep -E "(createClient|connect|RedisClient)"

# Check for cache operations in data access patterns
grep -r "cache" --include="*.ts" --include="*.js" src/ | grep -E "(setex|get|del|expire)"

# Verify Redis monitoring metrics
redis-cli INFO stats | grep -E "(keyspace_hits|keyspace_misses|evicted_keys)"

# Validate cache key naming patterns follow service prefix convention
grep -r "redis.*set\|redis.*get" --include="*.ts" --include="*.js" src/ | grep -v ":[a-z_]*:" && echo "WARNING: Cache keys may not follow namespace convention"
```

**Accept when:**
- Redis client initialization is present in data access layers for weather API and todos actions
- Cache key patterns follow documented naming convention with service prefix and TTL configuration
- Redis monitoring shows cache hit rate above 70% for frequently accessed endpoints
- Services with cache hit rates below 50% have documented performance investigation or exception approval
- Non-compliant cache key naming patterns are resolved or documented as exceptions

<enforcement>
Claude Code MUST NOT skip or defer verification. All cache implementations MUST be validated against R-CACHE-001 through R-CACHE-008. Performance testing MUST validate cache hit rates meet minimum thresholds. Architecture review MUST validate cache layer design for new services. Pull requests without cache layer for qualifying data access patterns MUST be flagged for review.
</enforcement>
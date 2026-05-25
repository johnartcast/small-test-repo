# Adopt Cache Layer Pattern for Primary Datastore Operations: Write Operations Primary

These rules are ALWAYS ACTIVE for all server-side action handlers, API route handlers, and data access layers that perform write operations to primary datastores.

### Rules

- **R-CACHE-001** MUST: Write operations to the primary datastore MUST invalidate or update relevant cache entries to prevent stale data.

### Verify

```bash
# Check for cache invalidation patterns in write operations
grep -r "cache" src/ --include="*.ts" --include="*.js" | grep -E "(get|set|invalidate|delete)" | wc -l

# Identify cache-related decorators and function calls
grep -r "@cache\|cache(\|useCache\|getCache\|setCache" src/ --include="*.ts" --include="*.js"

# Find cache files with invalidation/TTL mechanisms
find src/ -name "*cache*.ts" -o -name "*cache*.js" | xargs grep -l "invalidate\|expire\|ttl"
```

**Accept when:**
- Cache layer implementation is detected in at least 80% of identified high-traffic write operations
- All cache implementations include explicit invalidation or TTL mechanisms
- Cache monitoring metrics (hit rate, miss rate, eviction count) are available in observability dashboards
- Write operations include cache invalidation logic that executes before or after datastore mutations

<enforcement>
Claude Code MUST NOT skip or defer verification of cache invalidation in write operations. All write paths to primary datastores require explicit cache invalidation strategy confirmation.
</enforcement>
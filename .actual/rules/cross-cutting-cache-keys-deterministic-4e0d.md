# Adopt Cache Layer Pattern for Primary Datastore Operations: Cache Keys Deterministic

These rules are ALWAYS ACTIVE for all server-side action handlers, API route handlers, and data access layers that perform read operations on primary datastores with predictable access patterns and high read-to-write ratios.

### Rules

- **R-CACHE-001** SHOULD: Cache keys SHOULD be deterministic and based on query parameters to ensure consistent cache hit rates.

### Verify

```bash
# Count cache-related operations in the codebase
grep -r "cache" src/ --include="*.ts" --include="*.js" | grep -E "(get|set|invalidate|delete)" | wc -l

# Find cache implementations and decorators
grep -r "@cache\|cache(\|useCache\|getCache\|setCache" src/ --include="*.ts" --include="*.js"

# Identify cache files with invalidation or TTL mechanisms
find src/ -name "*cache*.ts" -o -name "*cache*.js" | xargs grep -l "invalidate\|expire\|ttl"
```

**Accept when:**
- Cache layer implementation is detected in at least 80% of identified high-traffic read operations
- All cache implementations include explicit invalidation or TTL mechanisms
- Cache monitoring metrics (hit rate, miss rate, eviction count) are available in observability dashboards
- Cache keys are constructed deterministically from query parameters with version identifiers for deployment-safe invalidation

<enforcement>
Claude Code MUST NOT skip or defer verification of cache layer patterns in primary datastore operations. All new datastore read operations in high-traffic paths MUST include cache layer implementation with deterministic keys or document an approved exception.
</enforcement>
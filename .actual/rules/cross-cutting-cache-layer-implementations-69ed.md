# Adopt Cache Layer Pattern for Primary Datastore Operations: Cache Layer Implementations

These rules are ALWAYS ACTIVE for all server-side action handlers, API route handlers, and data access layers that perform read operations on primary datastores with predictable access patterns and high read-to-write ratios.

### Rules

- **R-CACHE-001** SHOULD: Cache layer implementations SHOULD include monitoring and metrics for cache hit rates, miss rates, and eviction patterns.

### Verify

```bash
# Count cache-related operations in codebase
grep -r "cache" src/ --include="*.ts" --include="*.js" | grep -E "(get|set|invalidate|delete)" | wc -l

# Find cache decorator or function usage
grep -r "@cache\|cache(\|useCache\|getCache\|setCache" src/ --include="*.ts" --include="*.js"

# Identify cache files with invalidation/TTL logic
find src/ -name "*cache*.ts" -o -name "*cache*.js" | xargs grep -l "invalidate\|expire\|ttl"
```

**Accept when:**
- Cache layer implementation is detected in at least 80% of identified high-traffic read operations
- All cache implementations include explicit invalidation or TTL mechanisms
- Cache monitoring metrics (hit rate, miss rate, eviction count) are available in observability dashboards

<enforcement>
Claude Code MUST NOT skip or defer verification. Automated code analysis in CI pipeline MUST scan for datastore access patterns without cache layers. Architecture review MUST validate new features involving primary datastore operations. Performance testing MUST validate cache hit rates meet established thresholds (>80% for frequently accessed data).
</enforcement>
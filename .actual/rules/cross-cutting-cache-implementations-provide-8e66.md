# Adopt Cache Layer Pattern for Primary Datastore Operations: Cache Implementations Provide

These rules are ALWAYS ACTIVE for all server-side action handlers, API route handlers, and data access layers that perform read operations on primary datastores with predictable access patterns and high read-to-write ratios.

### Rules

- **R-CACHE-001** MUST: Cache implementations MUST provide cache invalidation mechanisms to maintain consistency with the primary datastore.

### Verify

```bash
# Count cache-related operations with get/set/invalidate/delete patterns
grep -r "cache" src/ --include="*.ts" --include="*.js" | grep -E "(get|set|invalidate|delete)" | wc -l

# Find cache decorator or function usage
grep -r "@cache\|cache(\|useCache\|getCache\|setCache" src/ --include="*.ts" --include="*.js"

# Identify cache files with invalidation/expiration logic
find src/ -name "*cache*.ts" -o -name "*cache*.js" | xargs grep -l "invalidate\|expire\|ttl"
```

**Accept when:**
- Cache layer implementation is detected in at least 80% of identified high-traffic read operations
- All cache implementations include explicit invalidation or TTL mechanisms
- Cache monitoring metrics (hit rate, miss rate, eviction count) are available in observability dashboards

<enforcement>
Claude Code MUST NOT skip or defer verification. All primary datastore read operations in scope MUST be audited for cache layer presence and invalidation mechanisms before code approval.
</enforcement>
# Adopt Cache Layer Pattern for Primary Datastore Operations: Cache Misses Trigger

These rules are ALWAYS ACTIVE for all server-side action handlers, API route handlers, and data access layers that perform read operations on primary datastores with predictable access patterns and high read-to-write ratios.

### Rules

- **R-CACHE-001** SHOULD: Cache misses SHOULD trigger asynchronous cache population to minimize impact on subsequent requests.

### Verify

```bash
# Count cache-related operations in codebase
grep -r "cache" src/ --include="*.ts" --include="*.js" | grep -E "(get|set|invalidate|delete)" | wc -l

# Find cache implementations and decorators
grep -r "@cache\|cache(\|useCache\|getCache\|setCache" src/ --include="*.ts" --include="*.js"

# Identify cache files with invalidation/TTL logic
find src/ -name "*cache*.ts" -o -name "*cache*.js" | xargs grep -l "invalidate\|expire\|ttl"
```

**Accept when:**
- Cache layer implementation is detected in at least 80% of identified high-traffic read operations
- All cache implementations include explicit invalidation or TTL mechanisms
- Cache monitoring metrics (hit rate, miss rate, eviction count) are available in observability dashboards
- Cache misses are configured to trigger asynchronous population rather than blocking requests

<enforcement>
Claude Code MUST NOT skip or defer verification. All primary datastore read operations in high-traffic paths MUST be evaluated against these rules during code review and architecture assessment.
</enforcement>
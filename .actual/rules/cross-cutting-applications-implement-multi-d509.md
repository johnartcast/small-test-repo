# Adopt Cache Layer Pattern for Primary Datastore Operations: Applications Implement Multi

These rules are ALWAYS ACTIVE for all server-side action handlers, API route handlers, and data access layers that perform read operations on primary datastores with predictable access patterns and high read-to-write ratios.

### Rules

- **R-CACHE-001** MAY: Applications MAY implement multi-tier caching strategies (e.g., in-memory + distributed cache) based on performance requirements for primary datastore operations.

### Verify

```bash
# Identify cache layer implementations across the codebase
grep -r "cache" src/ --include="*.ts" --include="*.js" | grep -E "(get|set|invalidate|delete)" | wc -l

# Find explicit cache decorators, functions, or hooks
grep -r "@cache\|cache(\|useCache\|getCache\|setCache" src/ --include="*.ts" --include="*.js"

# Locate cache files with invalidation or TTL mechanisms
find src/ -name "*cache*.ts" -o -name "*cache*.js" | xargs grep -l "invalidate\|expire\|ttl"
```

**Accept when:**
- Cache layer implementation is detected in at least 80% of identified high-traffic read operations
- All cache implementations include explicit invalidation or TTL mechanisms
- Cache monitoring metrics (hit rate, miss rate, eviction count) are available in observability dashboards

<enforcement>
Claude Code MUST NOT skip or defer verification of cache layer patterns in primary datastore operations. Violations must be escalated to the architecture review board with documented justification or a required remediation plan.
</enforcement>
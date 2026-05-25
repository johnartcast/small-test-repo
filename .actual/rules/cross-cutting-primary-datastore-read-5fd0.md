# Adopt Cache Layer Pattern for Primary Datastore Operations: Primary Datastore Read

These rules are ALWAYS ACTIVE for all primary datastore read operations requiring performance optimization through caching mechanisms, including server-side action handlers, API route handlers, and data access layers interfacing with relational or NoSQL datastores.

### Rules

- **R-CACHE-001** MUST: All primary datastore read operations for frequently accessed data MUST implement a cache layer between the application logic and the datastore.

### Verify

```bash
# Count cache-related operations in codebase
grep -r "cache" src/ --include="*.ts" --include="*.js" | grep -E "(get|set|invalidate|delete)" | wc -l

# Find cache decorator or function usage patterns
grep -r "@cache\|cache(\|useCache\|getCache\|setCache" src/ --include="*.ts" --include="*.js"

# Identify cache files with invalidation/TTL mechanisms
find src/ -name "*cache*.ts" -o -name "*cache*.js" | xargs grep -l "invalidate\|expire\|ttl"
```

**Accept when:**
- Cache layer implementation is detected in at least 80% of identified high-traffic read operations
- All cache implementations include explicit invalidation or TTL mechanisms
- Cache monitoring metrics (hit rate, miss rate, eviction count) are available in observability dashboards

<enforcement>
Claude Code MUST NOT skip or defer verification. Automated code analysis in CI pipeline MUST scan for datastore access patterns without cache layers. Architecture review MUST validate new features involving primary datastore operations. Performance testing MUST validate cache hit rates meet established thresholds (>80% for frequently accessed data).
</enforcement>
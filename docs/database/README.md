# HOSPITALITY AI OS - Database Foundation

## Initial migration

`001_core_identity.sql`

Creates:

- app.tenants
- app.properties
- app.users
- app.memberships
- app.property_memberships
- app.permissions
- app.roles
- app.role_permissions
- app.membership_roles
- app.schema_migrations (managed by the migration engine)

## Migration engine

- SQL files are embedded into the Go binary.
- Migration files are ordered by numeric prefix.
- SHA-256 checksums detect modifications to applied migrations.
- PostgreSQL advisory locks prevent concurrent migration execution.
- Each migration and its ledger entry run in one transaction.
- Applied migrations are skipped on subsequent startups.

## Tenant context

Tenant-scoped requests must execute database operations inside a transaction
and set the tenant context transaction-locally:

`SELECT set_config('app.tenant_id', $1, true);`

The third argument `true` makes the setting local to the current transaction.

Never use session-wide tenant context with a pooled database connection.

## RLS production requirement

RLS policies are enabled and forced on tenant-scoped tables.

The current local database bootstrap user may be the database owner or
superuser. Superusers and roles with BYPASSRLS can bypass row-level security.

Before production:
1. Create a dedicated migration/owner role.
2. Create a separate restricted API runtime role.
3. Ensure the runtime role is not a superuser and has no BYPASSRLS.
4. Grant only the required schema/table/sequence/function privileges.
5. Connect the API using the restricted runtime role.
6. Test cross-tenant access denial with separate tenant contexts.

Do not treat RLS as a substitute for application authorization.

## Data policy

No demo or seed records are created by this migration.

## Future migrations

Use the next available numeric prefix, for example:

`002_rooms_and_room_types.sql`

Never edit an already-applied migration. Create a new migration to change schema.
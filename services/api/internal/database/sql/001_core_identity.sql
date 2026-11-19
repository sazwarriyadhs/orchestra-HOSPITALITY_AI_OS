-- =========================================================
-- HOSPITALITY AI OS
-- Migration: 001_core_identity
-- PostgreSQL 17
-- No demo or seed data.
-- =========================================================

CREATE SCHEMA IF NOT EXISTS app;

-- ---------------------------------------------------------
-- TENANTS / HOTEL GROUPS
-- ---------------------------------------------------------

CREATE TABLE app.tenants (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug VARCHAR(100) NOT NULL,
    name VARCHAR(200) NOT NULL,
    legal_name VARCHAR(250),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    default_currency CHAR(3) NOT NULL DEFAULT 'USD',
    default_timezone VARCHAR(100) NOT NULL DEFAULT 'UTC',
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT tenants_status_check
        CHECK (status IN ('active', 'suspended', 'pending', 'archived')),

    CONSTRAINT tenants_currency_check
        CHECK (default_currency ~ '^[A-Z]{3}$')
);

CREATE UNIQUE INDEX tenants_slug_unique
    ON app.tenants (LOWER(slug));

CREATE INDEX tenants_status_idx
    ON app.tenants (status);

-- ---------------------------------------------------------
-- PROPERTIES / HOTELS
-- ---------------------------------------------------------

CREATE TABLE app.properties (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE RESTRICT,
    code VARCHAR(50) NOT NULL,
    name VARCHAR(200) NOT NULL,
    property_type VARCHAR(50) NOT NULL DEFAULT 'hotel',
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    country_code CHAR(2),
    timezone VARCHAR(100) NOT NULL DEFAULT 'UTC',
    currency CHAR(3) NOT NULL DEFAULT 'USD',
    address JSONB NOT NULL DEFAULT '{}'::jsonb,
    contact JSONB NOT NULL DEFAULT '{}'::jsonb,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT properties_status_check
        CHECK (status IN ('active', 'inactive', 'maintenance', 'archived')),

    CONSTRAINT properties_currency_check
        CHECK (currency ~ '^[A-Z]{3}$'),

    CONSTRAINT properties_country_check
        CHECK (country_code IS NULL OR country_code ~ '^[A-Z]{2}$'),

    CONSTRAINT properties_tenant_code_unique
        UNIQUE (tenant_id, code),

    CONSTRAINT properties_tenant_id_unique
        UNIQUE (tenant_id, id)
);

CREATE INDEX properties_tenant_status_idx
    ON app.properties (tenant_id, status);

-- ---------------------------------------------------------
-- USERS / GLOBAL IDENTITY
-- ---------------------------------------------------------

CREATE TABLE app.users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(320) NOT NULL,
    full_name VARCHAR(200) NOT NULL,
    phone VARCHAR(40),
    status VARCHAR(30) NOT NULL DEFAULT 'active',
    email_verified_at TIMESTAMPTZ,
    last_login_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT users_status_check
        CHECK (status IN ('active', 'inactive', 'locked', 'pending'))
);

CREATE UNIQUE INDEX users_email_lower_unique
    ON app.users (LOWER(email));

CREATE INDEX users_status_idx
    ON app.users (status);

-- ---------------------------------------------------------
-- TENANT MEMBERSHIPS
-- ---------------------------------------------------------

CREATE TABLE app.memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL REFERENCES app.tenants(id) ON DELETE RESTRICT,
    user_id UUID NOT NULL REFERENCES app.users(id) ON DELETE RESTRICT,
    status VARCHAR(30) NOT NULL DEFAULT 'invited',
    joined_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT memberships_status_check
        CHECK (status IN ('invited', 'active', 'suspended', 'removed')),

    CONSTRAINT memberships_tenant_user_unique
        UNIQUE (tenant_id, user_id),

    CONSTRAINT memberships_tenant_id_unique
        UNIQUE (tenant_id, id)
);

CREATE INDEX memberships_user_idx
    ON app.memberships (user_id);

CREATE INDEX memberships_tenant_status_idx
    ON app.memberships (tenant_id, status);

-- ---------------------------------------------------------
-- PROPERTY MEMBERSHIPS
-- ---------------------------------------------------------

CREATE TABLE app.property_memberships (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID NOT NULL,
    property_id UUID NOT NULL,
    membership_id UUID NOT NULL,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT property_memberships_property_fk
        FOREIGN KEY (tenant_id, property_id)
        REFERENCES app.properties (tenant_id, id)
        ON DELETE CASCADE,

    CONSTRAINT property_memberships_membership_fk
        FOREIGN KEY (tenant_id, membership_id)
        REFERENCES app.memberships (tenant_id, id)
        ON DELETE CASCADE,

    CONSTRAINT property_memberships_unique
        UNIQUE (property_id, membership_id)
);

CREATE INDEX property_memberships_tenant_idx
    ON app.property_memberships (tenant_id);

-- ---------------------------------------------------------
-- PERMISSIONS
-- ---------------------------------------------------------

CREATE TABLE app.permissions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    permission_key VARCHAR(150) NOT NULL UNIQUE,
    description TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ---------------------------------------------------------
-- ROLES
-- tenant_id NULL = platform-defined system role.
-- ---------------------------------------------------------

CREATE TABLE app.roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    tenant_id UUID REFERENCES app.tenants(id) ON DELETE CASCADE,
    role_key VARCHAR(100) NOT NULL,
    name VARCHAR(150) NOT NULL,
    description TEXT,
    is_system BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    CONSTRAINT roles_system_scope_check
        CHECK (
            (tenant_id IS NULL AND is_system = TRUE)
            OR
            (tenant_id IS NOT NULL AND is_system = FALSE)
        ),

    CONSTRAINT roles_tenant_id_unique
        UNIQUE (tenant_id, id)
);

CREATE UNIQUE INDEX roles_system_key_unique
    ON app.roles (role_key)
    WHERE tenant_id IS NULL;

CREATE UNIQUE INDEX roles_tenant_key_unique
    ON app.roles (tenant_id, role_key)
    WHERE tenant_id IS NOT NULL;

-- ---------------------------------------------------------
-- ROLE PERMISSIONS
-- ---------------------------------------------------------

CREATE TABLE app.role_permissions (
    role_id UUID NOT NULL REFERENCES app.roles(id) ON DELETE CASCADE,
    permission_id UUID NOT NULL REFERENCES app.permissions(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (role_id, permission_id)
);

-- ---------------------------------------------------------
-- MEMBERSHIP ROLES
-- ---------------------------------------------------------

CREATE TABLE app.membership_roles (
    tenant_id UUID NOT NULL,
    membership_id UUID NOT NULL,
    role_id UUID NOT NULL REFERENCES app.roles(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

    PRIMARY KEY (membership_id, role_id),

    CONSTRAINT membership_roles_membership_fk
        FOREIGN KEY (tenant_id, membership_id)
        REFERENCES app.memberships (tenant_id, id)
        ON DELETE CASCADE
);

CREATE INDEX membership_roles_tenant_idx
    ON app.membership_roles (tenant_id);

-- ---------------------------------------------------------
-- TENANT CONTEXT FUNCTION
-- The application must set app.tenant_id inside a transaction.
-- ---------------------------------------------------------

CREATE OR REPLACE FUNCTION app.current_tenant_id()
RETURNS UUID
LANGUAGE SQL
STABLE
AS $$
    SELECT NULLIF(
        current_setting('app.tenant_id', TRUE),
        ''
    )::UUID;
$$;

-- ---------------------------------------------------------
-- ROW LEVEL SECURITY
-- No tenant context = no tenant-scoped rows.
-- ---------------------------------------------------------

ALTER TABLE app.properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.properties FORCE ROW LEVEL SECURITY;

CREATE POLICY properties_tenant_isolation
    ON app.properties
    USING (tenant_id = app.current_tenant_id())
    WITH CHECK (tenant_id = app.current_tenant_id());

ALTER TABLE app.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.memberships FORCE ROW LEVEL SECURITY;

CREATE POLICY memberships_tenant_isolation
    ON app.memberships
    USING (tenant_id = app.current_tenant_id())
    WITH CHECK (tenant_id = app.current_tenant_id());

ALTER TABLE app.property_memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.property_memberships FORCE ROW LEVEL SECURITY;

CREATE POLICY property_memberships_tenant_isolation
    ON app.property_memberships
    USING (tenant_id = app.current_tenant_id())
    WITH CHECK (tenant_id = app.current_tenant_id());

ALTER TABLE app.roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.roles FORCE ROW LEVEL SECURITY;

CREATE POLICY roles_tenant_isolation
    ON app.roles
    USING (
        tenant_id IS NULL
        OR tenant_id = app.current_tenant_id()
    )
    WITH CHECK (
        tenant_id IS NULL
        OR tenant_id = app.current_tenant_id()
    );

ALTER TABLE app.membership_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE app.membership_roles FORCE ROW LEVEL SECURITY;

CREATE POLICY membership_roles_tenant_isolation
    ON app.membership_roles
    USING (tenant_id = app.current_tenant_id())
    WITH CHECK (tenant_id = app.current_tenant_id());

-- ---------------------------------------------------------
-- COMMENTS / SECURITY DOCUMENTATION
-- ---------------------------------------------------------

COMMENT ON SCHEMA app IS
    'Hospitality AI OS application schema';

COMMENT ON TABLE app.tenants IS
    'Hotel groups and tenant organizations';

COMMENT ON TABLE app.properties IS
    'Hotels and hospitality properties owned by a tenant';

COMMENT ON TABLE app.users IS
    'Global user identity; tenant access is controlled by memberships';

COMMENT ON TABLE app.memberships IS
    'User membership within a tenant organization';

COMMENT ON TABLE app.property_memberships IS
    'Property-level access assignments';

COMMENT ON FUNCTION app.current_tenant_id() IS
    'Returns the tenant UUID from transaction-local app.tenant_id context';

-- No seed records are inserted by this migration.
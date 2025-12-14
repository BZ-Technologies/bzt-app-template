# Application Template

This is a template repository for creating new BZ Technologies applications.

## How to Use This Template

### Step 1: Create New Application from Template

```bash
cd ~/bztech/code
cp -r bzt-app-template bzt-app-{your-app-code}
cd bzt-app-{your-app-code}
rm -rf .git
git init
```

### Step 2: Replace Placeholders

This template uses the following placeholders that need to be replaced:

- `{app-code}` - Application code (e.g., `calendar`, `ecommerce`)
- `{appCode}` - CamelCase version (e.g., `calendar` → `Calendar`)
- `{App Name}` - Display name (e.g., `Calendar Management`)
- `{APP_ROUTE}` - Frontend route folder (e.g., `calendar`)
- `{route}` - API route path (e.g., `/api/calendar`)
- `{route-path}` - URL path (e.g., `calendar`)
- `{category}` - Application category (e.g., `productivity`, `ecommerce`, `hosting`)
- `{APP_CONFIG_KEY}` - Environment variable names

### Step 3: Use the Replacement Script

Run the replacement script to automatically replace all placeholders:

```bash
./scripts/replace-placeholders.sh
```

Or manually replace using find/replace in your editor.

### Step 4: Customize for Your Application

1. **Update README.md** - Fill in application-specific details
2. **Update package.json** - Add any additional dependencies
3. **Customize routes** - Modify `src/routes/{appCode}Routes.js` for your API
4. **Customize services** - Modify `src/services/{appCode}Service.js` for your business logic
5. **Create database schema** - Update `migrations/db-init-{app-code}.sql`
6. **Create frontend** - Customize `client/src/app/{route}/page.tsx`
7. **Add worker** (if needed) - Customize `src/workers/{appCode}Worker.js`

### Step 5: Initialize Git and Commit

```bash
git add .
git commit -m "Initial commit: {App Name} application"
```

### Step 6: Create GitHub Repository

Follow instructions in `SETUP-GITHUB.md`

## Template Structure

```
bzt-app-template/
├── README.md                    # Application documentation template
├── DEPLOYMENT.md                # Deployment guide template
├── INTEGRATION-NOTES.md         # Integration documentation
├── SETUP-GITHUB.md             # GitHub setup instructions
├── TEMPLATE-README.md          # This file
├── package.json                 # Node.js dependencies
├── .gitignore
├── src/
│   ├── routes/                 # Express routes template
│   │   └── {appCode}Routes.js
│   ├── services/               # Business logic template
│   │   └── {appCode}Service.js
│   └── workers/                # Background workers template
│       └── {appCode}Worker.js
├── migrations/                  # Database migrations template
│   ├── db-init-{app-code}.sql
│   └── db-add-{app-code}-app.sql
├── client/                      # Frontend components template
│   └── src/app/{APP_ROUTE}/
│       └── page.tsx
└── scripts/                     # Utility scripts
    └── replace-placeholders.sh
```

## Placeholder Reference

| Placeholder | Example | Description |
|------------|---------|-------------|
| `{app-code}` | `calendar` | Application code (lowercase, hyphenated) |
| `{appCode}` | `Calendar` | CamelCase version for code |
| `{App Name}` | `Calendar Management` | Display name |
| `{APP_ROUTE}` | `calendar` | Frontend route folder |
| `{route}` | `calendar` | API route path |
| `{route-path}` | `calendar` | URL path |
| `{category}` | `productivity` | Application category |
| `{APP_CONFIG_KEY}` | `CALENDAR_API_KEY` | Environment variable |

## Best Practices

1. **Naming Convention**: Use lowercase, hyphenated names for app codes
2. **Database Tables**: Prefix with `{app_code}_` (e.g., `calendar_events`)
3. **Tenant Isolation**: Always include `tenant_id` in all tables
4. **Soft Deletes**: Use `is_active` boolean instead of hard deletes
5. **Versioning**: Use semantic versioning (1.0.0, 1.1.0, etc.)

## Next Steps After Creating App

1. Replace all placeholders
2. Customize code for your application
3. Test locally
4. Commit to git
5. Create GitHub repository
6. Push to GitHub
7. Add to applications catalog in database


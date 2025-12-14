# Using the Application Template

## Quick Start Guide

This template helps you quickly create new application repositories for the BZ Technologies platform.

## Method 1: Automated (Recommended)

### Step 1: Copy Template

```bash
cd ~/bztech/code
cp -r bzt-app-template bzt-app-{your-app-code}
cd bzt-app-{your-app-code}
rm -rf .git
git init
git branch -m main
```

### Step 2: Run Replacement Script

```bash
./scripts/replace-placeholders.sh
```

The script will ask you for:
- Application code (e.g., `calendar`)
- Application name (e.g., `Calendar Management`)
- Route path (e.g., `calendar`)
- Category (e.g., `productivity`)
- Description

It will automatically:
- Replace all placeholders in files
- Rename files with placeholders
- Rename directories with placeholders

### Step 3: Customize

1. Review and customize the code
2. Update database schema in `migrations/`
3. Customize frontend in `client/src/app/{route}/`
4. Add any additional dependencies to `package.json`

### Step 4: Commit and Push

```bash
git add .
git commit -m "Initial commit: {App Name} application"
# Create GitHub repo, then:
./push-to-github.sh
```

## Method 2: Manual

### Step 1: Copy Template

```bash
cd ~/bztech/code
cp -r bzt-app-template bzt-app-{your-app-code}
cd bzt-app-{your-app-code}
rm -rf .git
git init
```

### Step 2: Manual Replacement

Use find/replace in your editor to replace:

| Find | Replace With | Example |
|------|--------------|---------|
| `{app-code}` | Your app code | `calendar` |
| `{appCode}` | CamelCase version | `Calendar` |
| `{App Name}` | Display name | `Calendar Management` |
| `{APP_ROUTE}` | Route folder | `calendar` |
| `{route}` | API route | `calendar` |
| `{route-path}` | URL path | `calendar` |
| `{category}` | Category | `productivity` |
| `{Application description}` | Description | Your description |

### Step 3: Rename Files

Rename files containing placeholders:
- `{appCode}Routes.js` → `CalendarRoutes.js`
- `{appCode}Service.js` → `CalendarService.js`
- `{appCode}Worker.js` → `CalendarWorker.js`
- `db-init-{app-code}.sql` → `db-init-calendar.sql`
- `db-add-{app-code}-app.sql` → `db-add-calendar-app.sql`

### Step 4: Rename Directories

- `client/src/app/{APP_ROUTE}/` → `client/src/app/calendar/`

## What Gets Replaced

The template includes placeholders in:
- ✅ File contents (code, documentation)
- ✅ File names
- ✅ Directory names
- ✅ Package.json
- ✅ README files

## After Replacement

1. **Review Code**: Check all files for correctness
2. **Update Database Schema**: Modify `migrations/db-init-{app-code}.sql` for your tables
3. **Customize Services**: Update `src/services/{appCode}Service.js` for your business logic
4. **Customize Routes**: Update `src/routes/{appCode}Routes.js` for your API endpoints
5. **Customize Frontend**: Update `client/src/app/{route}/page.tsx` for your UI
6. **Add Worker Logic**: Update `src/workers/{appCode}Worker.js` if needed
7. **Update Documentation**: Fill in specific details in README.md

## Example: Creating Calendar App

```bash
# 1. Copy template
cd ~/bztech/code
cp -r bzt-app-template bzt-app-calendar
cd bzt-app-calendar
rm -rf .git
git init
git branch -m main

# 2. Run replacement script
./scripts/replace-placeholders.sh
# Enter: calendar, Calendar Management, calendar, productivity, "Event scheduling..."

# 3. Customize
# Edit migrations/db-init-calendar.sql
# Edit src/services/CalendarService.js
# Edit client/src/app/calendar/page.tsx

# 4. Commit
git add .
git commit -m "Initial commit: Calendar Management application"

# 5. Create GitHub repo and push
./push-to-github.sh
```

## Tips

- Keep the template repository clean - don't commit changes to it
- Use the template as a starting point, then customize
- Follow the same structure for consistency
- Document any app-specific requirements


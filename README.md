# {APP_NAME} Application

**Repository**: `BZ-Technologies/bzt-app-{app-code}`  
**Application Code**: `{app-code}`  
**Route**: `/{route-path}`  
**Version**: 1.0.0

## Overview

{Application description - what it does, who it's for, key benefits}

## Features

- **Feature 1**: Description
- **Feature 2**: Description
- **Feature 3**: Description
- **Tenant Isolation**: All data is tenant-scoped and isolated

## Architecture

### Database Schema

- `{app_code}_table_name`: Description of what this table stores
- Additional tables as needed

### Components

1. **Backend Service** (`src/services/{appCode}Service.js`)
   - Manages CRUD operations
   - Tenant-scoped queries
   - Business logic

2. **API Routes** (`src/routes/{appCode}Routes.js`)
   - `GET /api/{route}` - List all items
   - `POST /api/{route}` - Create new item
   - `GET /api/{route}/:id` - Get specific item
   - `PUT /api/{route}/:id` - Update item
   - `DELETE /api/{route}/:id` - Delete item

3. **Worker Script** (`src/workers/{appCode}Worker.js`) - Optional
   - Background processing
   - Scheduled tasks
   - External API integration

4. **Frontend** (`client/src/app/{route}/page.tsx`)
   - React component for managing {app functionality}
   - User interface
   - Real-time updates (if applicable)

## Setup

### 1. Database Setup

Run the database initialization scripts:

```bash
# Create tables
mysql -u root -p bzt_main_db < migrations/db-init-{app-code}.sql

# Add to applications catalog (after applications table exists)
mysql -u root -p bzt_main_db < migrations/db-add-{app-code}-app.sql
```

### 2. Environment Variables

Add to `.env` file:

```env
# Application-specific environment variables
{APP_CONFIG_KEY}=your_value_here
```

### 3. Worker Script Setup (if applicable)

Set up a cron job to run the worker script:

```bash
# Edit crontab
crontab -e

# Add this line (adjust path and schedule as needed)
*/5 * * * * cd /opt/bzt-app-{app-code} && node src/workers/{appCode}Worker.js >> /var/log/{app-code}-worker.log 2>&1
```

Or use a process manager like PM2:

```bash
pm2 start src/workers/{appCode}Worker.js --cron "*/5 * * * *" --name {app-code}-worker
```

## Usage

### Adding Items

1. Navigate to `/{route}` in the portal
2. Click "Add {Item}"
3. Fill in the form
4. Click "Save"

### Viewing Items

- Items are displayed in a list/grid view
- Auto-refreshes every X seconds (if applicable)
- Status indicators show item state

### Managing Items

- Edit: Click edit icon
- Delete: Click delete icon (with confirmation)

## API Endpoints

All endpoints require authentication and tenant context.

### GET /api/{route}
Get all items for the current tenant.

**Response:**
```json
{
  "items": [
    {
      "id": 1,
      "name": "Example",
      ...
    }
  ]
}
```

### POST /api/{route}
Create a new item.

**Request Body:**
```json
{
  "name": "Example",
  "description": "Description"
}
```

### GET /api/{route}/:id
Get specific item details.

### PUT /api/{route}/:id
Update an item.

### DELETE /api/{route}/:id
Delete an item (soft delete).

## Worker Script (if applicable)

The worker script (`{appCode}Worker.js`) should be run periodically.

**Features:**
- Processes queued items
- Updates status
- Error handling and logging
- Automatic database connection cleanup

**Manual Run:**
```bash
cd /opt/bzt-app-{app-code}
npm run worker
# or
node src/workers/{appCode}Worker.js
```

## Cost Considerations

- **API Costs**: $X/month (if using external APIs)
- **Database**: Minimal (standard MariaDB tables)
- **Compute**: Worker script runs every X minutes (negligible CPU)

## Future Enhancements

- [ ] Feature enhancement 1
- [ ] Feature enhancement 2
- [ ] Integration with other applications
- [ ] Mobile app support

## Troubleshooting

### Common Issues

1. **Items Not Appearing**
   - Verify tenant has subscribed to {app-code} application
   - Check database: `SELECT * FROM {app_code}_table_name WHERE tenant_id = ?`
   - Verify API routes are registered in portal's `server.js`

2. **Worker Not Running**
   - Check cron is running: `crontab -l`
   - Check worker logs: `tail -f /var/log/{app-code}-worker.log`
   - Test manually: Run worker script directly

---

**Last Updated**: {date}  
**Application Code**: `{app-code}`  
**Route**: `/{route-path}`


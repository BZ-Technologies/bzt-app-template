# Integration Notes

## Platform Dependencies

This application requires the following from the BZ Technologies platform:

### Backend Dependencies

1. **Database Pool** (`src/db/pool.js`)
   - The routes and services expect a database connection pool
   - Must be compatible with MariaDB/MySQL
   - Should export `getConnection()` function

2. **Tenant Middleware** (`src/middleware/tenantMiddleware.js`)
   - Required for tenant isolation
   - Must provide `tenantMiddleware` function
   - Must provide `getTenantId()` function

### Integration Points

When integrating this app into the portal:

1. **Copy routes to portal:**
   ```javascript
   // In portal's server.js
   const {appCode}Routes = require('/path/to/bzt-app-{app-code}/src/routes/{appCode}Routes');
   app.use('/api/{route}', tenantMiddleware, {appCode}Routes);
   ```

2. **Copy services to portal:**
   ```javascript
   // Services can be used directly if paths are adjusted
   // Or copy to portal's services directory
   ```

3. **Copy frontend component:**
   ```bash
   cp -r /path/to/bzt-app-{app-code}/client/src/app/{route} \
         /path/to/bzt-portal/client/src/app/
   ```

4. **Setup worker (if applicable):**
   ```bash
   # Adjust paths in worker script to point to portal's db pool
   # Or copy worker to portal and adjust imports
   ```

## Future: Standalone Package

In the future, this could be packaged as an npm package with:
- Shared utilities as peer dependencies
- Clear integration API
- Version management


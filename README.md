# How to run

## Setup local environment with Docker

Before running the script to give execution permission (for macOS):
  ```bash
    chmod +x ./db.sh ./all.sh ./dev.sh
  ```

- Run only database
  ```bash
    ./db.sh
  ```

- Run all services (frontend, server and db)
  ```bash
    ./all.sh
  ```

- Run server and frontend (for using staging database)
  ```bash
    ./dev.sh
  ```

## Setup local database
1. Make sure you have installed Docker and it's running
2. Make sure Docker have permissions for your innoduel_dashboard folder.
- If not, on Windows open Docker Desktop -> Settings -> File Sharing, Add the folder.
3. Add .env file to the root of server folder. Get content for this from Discord. 
4. In the root of the project run ./db.sh in Git bash (Available in VS Code)
  ```bash
  ./db.sh
  ```
The database should start with the correct data. Next start server and frontend. In server folder remember npm install. 
On home page you should be able to see data from database.

## Setup staging database
1. Make sure your .env file is valid. (Check Discord)
2. In .env file change CURRENT_DATABASE_URL=${STAGING_DATABASE_URL}
3. Run the server

If you want to use local database again, make sure the local database is running.
Then change CURRENT_DATABASE_URL=${DATABASE_URL} and restart the server.

## Create data for compare arena page
1. In .env file change CURRENT_DATABASE_URL=${DATABASE_URL}
2. In the root of the project run ./dummy.sh in Git bash (Available in VS Code)
  ```bash
  ./dummy.sh
  ```
3. Use the company_id shown in terminal for endpoints
4. Run the server
5. Use /api/arenas/{company_id}/find_matching_arenas/{arenaId} to load the 2nd select component's options
6. Use /api/arenas/{company_id}/compare_win_rate/{arenaId1}/{arenaId2} to get the winRate/risk-probability data

## Setup backend

1. cd server
2. npm install
3. npm run dev

## Available Scripts

In the backend part of the project, you can run several npm scripts defined in your `package.json`:

- **Linting**: Analyze your code for potential errors and enforce coding style.

  ```bash
  npm run lint
  ```

  To automatically fix many of the linting issues:

  ```bash
  npm run lint:fix
  ```

- **Unit Testing**: Run unit tests located in `tests/unitTests`.

  ```bash
  npm run test:unit
  ```

- **Integration Testing**: Execute integration tests found in `tests/integrationTests`.

  ```bash
  npm run test:integration
  ```

- **All Tests**: Run both unit and integration tests.

  ```bash
  npm test
  ```

- **Swagger UI Endpoint**:

The backend server provides API documentation via Swagger UI. Once the server is running, you can access the Swagger UI by visiting:

```
http://localhost:8000/api-docs
```

Replace `8000` with your server's actual port if it's different. This endpoint allows you to view the API documentation and interact with the available endpoints directly from your browser.

## Setup frontend

1. cd frontend
2. npm install
3. npm run dev

# shadcn-ui

Components created with shadcn are located in frontend/components/ui

Shadcn components can be created with command npx shadcn-ui@latest add component-name
See more in https://ui.shadcn.com/docs/components

# Own components

Own components can be created in frontend/components folder.
If the component has child components create own folder for it, e.g. navbar.

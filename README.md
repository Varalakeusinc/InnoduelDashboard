# How to run

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

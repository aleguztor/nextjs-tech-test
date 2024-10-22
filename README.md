# INSTRUCTION

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Abrir http://localhost:3000 con el navegador para ver el resultado.

### Tests

```bash
# Para iniciar los tests tendremos que ejecutar
npm run cypress:open
```

# Architecture Overview

https://next-js-test-linkdin.netlify.app/

### Api

- GET /api/ventas?year=xxxx

Ejemplo: https://next-js-test-linkdin.netlify.app/api/ventas?year=2022

- GET /api/productos/paginated?page=xx&limit=xx (se puede añadir minPrice & maxPrice para filtrar)

Ejemplo: https://next-js-test-linkdin.netlify.app/api/productos/paginated?page=1&limit=10&minPrice=80

- GET /api/productos/{id}

Ejemplo: https://next-js-test-linkdin.netlify.app/api/1

# Architecture Overview de la App

## 1. Frontend: Next.js

- **Framework**: Next.js (React-based).
- **Funcionalidades clave**:
  - Interfaz de usuario construida con React.
  - Soporte de SSR (Server-Side Rendering) y SSG (Static Site Generation).
  - Manejo de rutas dinámicas y estáticas.

## 2. Autenticación: NextAuth.js

- **Método de login**: Autenticación con GitHub.
- **Flujo de autenticación**:
  - Los usuarios inician sesión a través de GitHub OAuth.
  - NextAuth gestiona las sesiones y tokens.
- **Seguridad**: Manejo seguro de sesiones con cookies y cifrado.

## 3. Backend/API: Prisma + PostgreSQL

- **ORM**: Prisma para interactuar con la base de datos.
- **Base de datos**: PostgreSQL.
  - PostgreSQL está alojado en **Vercel**.
  - Almacena información de ventas.
- **API**: Endpoints manejados mediante API Routes de Next.js, con consultas gestionadas por Prisma.

## 4. Testing: React Testing Library

- **Component Testing**: Se realizan pruebas de componentes individuales usando .
- **End-to-End (E2E) Testing**: Pruebas completas del flujo de usuario desde el frontend hasta el backend.
- Uso de **React Testing Library**.

## 5. Infraestructura y despliegue

- **Despliegue**: La aplicación está desplegada en **Netlify**, aprovechando el CI/CD y la integración automatizada.
- **Base de datos**: PostgreSQL alojado en **Vercel**, lo que facilita la integración con el backend.

## 6. Flujo de Datos

- El usuario accede a la interfaz frontend en Netlify.
- Si no está autenticado, se redirige a GitHub para login.
- Tras autenticarse, NextAuth gestiona la sesión y Prisma interactúa con PostgreSQL en Vercel para las operaciones CRUD.
- Los datos se presentan en la interfaz mediante los componentes React de Next.js.

# ChatApp

A modern, full-featured chat application built with NestJS, Prisma, and PostgreSQL.

## Features

- User registration and authentication (JWT)
- Create and join chat rooms
- Send and retrieve messages in chat rooms
- RESTful API with Swagger documentation
- End-to-end tested
- Docker and Docker Compose support for easy deployment

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Docker & Docker Compose (for containerized setup)

### Local Development

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Set up environment variables:**
   - Copy an example env file or create your own in `env/.env` (see `docker-compose.yml` for required variables).
3. **Run the database (PostgreSQL):**
   - You can use Docker or a local instance. Example for Docker:
     ```bash
     docker run --name chatapp-db -e POSTGRES_DB=chatapp -e POSTGRES_USER=chatuser -e POSTGRES_PASSWORD=chatpass -p 5432:5432 -d postgres:15-alpine
     ```
4. **Run migrations and generate Prisma client:**
   ```bash
   npm run prisma:migrate
   npm run prisma:generate
   ```
5. **Start the app:**
   ```bash
   npm run start:dev
   ```
6. **Access the API:**
   - API: http://localhost:3000
   - Swagger docs: http://localhost:3000/api

### Running with Docker

1. **Build and start everything:**
   ```bash
   docker-compose up --build
   ```
2. **Stop everything:**
   ```bash
   docker-compose down
   ```

## API Documentation

- Swagger UI is available at `/api` when the app is running.
- All endpoints are documented, including authentication, chat room, and message APIs.

## Testing

- **Unit tests:**
  ```bash
  npm run test
  ```
- **End-to-end tests:**
  ```bash
  npm run test:e2e
  ```

## Project Structure

- `src/auth` - Authentication and user management
- `src/chat` - Chat room and messaging features
- `src/share` - Shared modules and services
- `prisma` - Prisma schema and migrations
- `test` - E2E and unit tests

## Environment Variables

- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret for signing JWT tokens
- `NODE_ENV` - Environment (development, production, etc)

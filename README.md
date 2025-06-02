<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>

# Accelo Exam API

This project is a NestJS-based API for managing companies, invoices, and exchange rates, supporting both REST and GraphQL endpoints.

## Features
- Company, Invoice, and Exchange Rate management
- RESTful API endpoints
- GraphQL API with auto-generated schema
- Global error handling
- SQLite database with Prisma ORM

## Getting Started

### Install dependencies
```bash
npm install
```

### Run database migrations
```bash
npx prisma migrate dev --name init
```

### Run the application
```bash
npm run start:dev
```

The REST API will be available at `http://localhost:3000/` and the GraphQL playground at `http://localhost:3000/graphql`.

---

## REST API Endpoints

### Company
- **GET** `/companies` — List all companies
- **GET** `/company/:id` — Get a company by ID
- **POST** `/company` — Create a company
  - Body: `{ "name": "Acme Corp", "baseCurrency": "USD" }`
- **POST** `/company/:id` — Update a company
  - Body: `{ "name": "New Name", "baseCurrency": "EUR" }`

### Invoice
- **GET** `/invoice` — List all invoices
- **GET** `/invoice/:id` — Get an invoice by ID
- **POST** `/invoice` — Create an invoice
  - Body: `{ "title": "Invoice 1", "amount": 100, "currencyCode": "USD", "companyId": 1 }`
- **POST** `/invoice/:id` — Update an invoice
  - Body: `{ "title": "Updated Invoice" }`

### Exchange Rate
- **GET** `/rates?from=USD&to=EUR` — Get the latest exchange rate from the database
- **GET** `/rates/live?from=USD&to=EUR` — Fetch and save the latest exchange rate from external API
- **POST** `/rates` — Create an exchange rate
  - Body: `{ "from": "USD", "to": "EUR", "rate": 1.1, "source": "manual" }`

---

## GraphQL API

Access the playground at `http://localhost:3000/graphql`.

### Sample Queries

#### List all companies
```graphql
query {
  companies {
    id
    name
    baseCurrency
    createdAt
    updatedAt
  }
}
```

#### Get a company by ID
```graphql
query {
  company(id: 1) {
    id
    name
    baseCurrency
    createdAt
    updatedAt
  }
}
```

#### List all invoices
```graphql
query {
  invoices {
    id
    title
    amount
    currencyCode
    baseCurrency
    exchangeRate
    amountInBaseCurrency
    companyId
    createdAt
    updatedAt
  }
}
```

#### Get latest exchange rate
```graphql
query {
  latestExchangeRate(from: "USD", to: "EUR") {
    id
    from
    to
    rate
    source
    createdAt
    updatedAt
  }
}
```

### Sample Mutations

#### Create a company
```graphql
mutation {
  createCompany(input: { name: "Acme Corp", baseCurrency: "USD" }) {
    id
    name
    baseCurrency
  }
}
```

#### Update a company
```graphql
mutation {
  updateCompany(input: { id: 1, name: "New Name" }) {
    id
    name
    baseCurrency
  }
}
```

#### Create an invoice
```graphql
mutation {
  createInvoice(input: { title: "Invoice 1", amount: 100, currencyCode: "USD", companyId: 1 }) {
    id
    title
    amount
    currencyCode
    baseCurrency
    exchangeRate
    amountInBaseCurrency
    companyId
  }
}
```

#### Create an exchange rate
```graphql
mutation {
  createExchangeRate(input: { from: "USD", to: "EUR", rate: 1.1, source: "manual" }) {
    id
    from
    to
    rate
    source
  }
}
```

---

## Error Handling
All errors are handled globally and returned in a consistent format for both REST and GraphQL APIs.

---

## Unit Testing

Run all unit tests with:
```bash
npm run test
```

---

## License
MIT

---

## Future Plans

- Add pagination and filtering to REST and GraphQL endpoints for better scalability
- Implement authentication and authorization (e.g., JWT, role-based access)
- Use repository and service design patterns for improved maintainability
- Add request validation and DTOs for stricter API contracts
- Add integration and e2e tests for more robust coverage
- Add OpenAPI/Swagger documentation for REST endpoints
- Support for environment-based configuration and deployment
- Add caching for frequently accessed data (e.g., exchange rates)
- Implement logging and monitoring (e.g., Winston, Sentry)
- Add Docker support for containerized deployments

---

## Design Patterns Used

- **Dependency Injection**: All services and controllers use NestJS's built-in dependency injection for loose coupling and testability.
- **Service Layer Pattern**: Business logic is encapsulated in service classes (e.g., `CompanyService`, `InvoiceService`, `ExchangeRateService`).
- **Controller Pattern**: HTTP and GraphQL requests are handled by controllers and resolvers, separating API logic from business logic.
- **Repository Pattern (via Prisma)**: Data access is abstracted through Prisma, acting as a repository for database operations.
- **Exception Filter Pattern**: A global exception filter (`AllExceptionsFilter`) is used for centralized error handling and consistent API responses.
- **DTO/Input Pattern**: GraphQL input types (DTOs) are used to validate and structure incoming data for mutations.
- **Module Pattern**: Features are organized into modules for scalability and maintainability.

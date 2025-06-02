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
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

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

## License
MIT

# Iowa Enterprise Service Portal

An accessible, responsive service management application for handling citizen requests across government departments. The project is an independently developed portfolio demonstration using realistic mock data. **It is not an official Iowa state application and is not affiliated with the State of Iowa.**

## Screenshots

Add genuine screenshots captured from a running local build to `docs/screenshots/` and link them here. Suggested captures: desktop dashboard, filtered request list, request details, create request form, and narrow mobile layout. Do not use illustrative mockups as evidence of the running application.

## Technology

- Angular 19 standalone components and routing, TypeScript strict mode, RxJS
- Angular Material package and theme foundation; Bootstrap 5 utilities and Sass
- Native semantic HTML tables and forms with SCSS design tokens
- Local browser storage behind an injectable request store; no backend is included
- Angular CLI/Karma/Jasmine test tooling

## Features

- Dashboard metrics, request status distribution with visible text values, recent activity and requests
- Search by request ID, citizen, category, or department; status/priority filters; sorting and pagination
- Request details with citizen, assignment, status history, and activity summary
- Create and edit requests, update status, and delete with confirmation
- Responsive sidebar and mobile navigation; keyboard skip link, visible focus, reduced-motion support, and live feedback
- Changes persist in browser `localStorage` under `iowa-service-portal-requests-v1`

## Architecture

```text
src/app/
  app.component.*             Application shell and feature presentation
  models/service-request.ts   Request and status types
  services/request-store.service.ts  Mock repository and persistence boundary
  app.routes.ts               Angular route configuration
  app.config.ts               Application providers
src/styles.scss               Bootstrap import and global accessibility styles
accessibility/                WCAG checklist and verification record
```

The `RequestStoreService` is the future integration boundary for an ASP.NET Core Web API. Replace its local read/write methods with typed `HttpClient` calls and configure the API base URL, authentication, authorization, server validation, and error handling. No .NET service or API is present in this demonstration.

## Run locally

Requirements: Node.js supported by Angular 19 (Node 18.19+, 20.11+, or 22.0+), npm.

```bash
npm install
npm start
```

Open the local URL printed by Angular CLI (normally `http://localhost:4200`). The environment used to scaffold this project has Node 24.13.0, which Angular CLI 19 reports as unsupported; use a supported Node release for reliable development.

## Commands

```bash
npm start                 # Development server
npm run build             # Production build
npm test                  # Karma/Jasmine tests in a browser
npm run test:accessibility # axe-core browser checks (when configured)
```

## Accessibility

The interface uses native landmarks, heading structure, labeled form controls, table captions and scoped headers, non-color status text, visible focus, keyboard activation, an error/status live region, and responsive zoom-friendly layouts. See [the WCAG checklist](accessibility/WCAG-CHECKLIST.md) and [testing report](accessibility/TESTING-REPORT.md) for the addressed criteria and verification limits.

## Known limitations

- Sample records are fictional, and browser-local data is not shared, backed up, or suitable for real citizen information.
- Authentication, roles, server-side validation, attachments, and API integration are not implemented.
- The form checks required values and basic email format on save; richer per-field inline errors and a field-linked error summary remain to be completed.
- Modal keyboard focus containment/restoration and assistive technology behavior require manual verification before production use.
- No WCAG conformance claim is made. Consult the testing report for checks actually run.

## Future work

Connect the repository service to a documented ASP.NET Core API, add server validation and authorization, implement robust async loading/error states, add a maintained axe-core test suite, and conduct keyboard, zoom, screen reader, contrast, and mobile assistive technology testing.

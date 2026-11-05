# Service Desk

A responsive request-management workspace for internal service teams. It runs with realistic demo records and browser-local storage; there is no backend or authentication service in this project.

## Screenshots

Capture genuine screenshots from a local build and add them under `docs/screenshots/`. Suggested views are the dashboard, filtered request list, request details, create form, and narrow mobile layout. Screenshots should show the running application.

## Features

- Request totals, status overview, recent activity, and recent requests
- Search by request ID, requester, category, or team; filter by status and priority; sort and paginate
- Request details with requester information, team assignment, status, and activity history
- Create and edit requests, update status, and delete with confirmation
- Form error summaries, field-specific messages, labels, and focus management
- Responsive navigation and layout; visible keyboard focus and reduced-motion support
- Updates persist in `localStorage`; data written under the previous demo key is migrated to the Service Desk key
- Subtle entry/exit transitions, stat reveals, row updates, chart bars, and a profile popover

## Technology and dependencies

- Angular 20.3.35 standalone components and TypeScript 5.9.3 strict mode
- Angular CLI and build tooling 20.3.42
- RxJS is used through Angular’s framework dependency; this app does not import it directly
- Jasmine/Karma tests and axe-core browser checks
- Exact direct dependency versions are pinned in `package.json`; `package-lock.json` records the full dependency tree

Angular 20 supports Node.js `^20.19.0`, `^22.12.0`, or `^24.0.0`; this project’s TypeScript 5.9.3 is within Angular 20’s supported `>=5.8 <6.0` range. See [Angular’s version compatibility table](https://angular.dev/reference/versions).

Angular’s published schedule currently lists Angular 20 support through November 21, 2026. The requested Angular 20 line is pinned deliberately; review the supported-version schedule before future releases.

## Structure

```text
src/app/
  app.component.*                   Application shell and request views
  models/service-request.ts         Request and status types
  services/request-store.service.ts Demo repository, persistence, and data migration
  services/request-store.service.spec.ts
  app.component.spec.ts             Request workflow tests
  accessibility.spec.ts             axe-core view checks
src/styles.scss                     Global type, focus, and skip-link styles
```

The request store is the boundary for a future API. Replace its local-storage reads/writes with typed HTTP calls and add server validation, authentication, authorization, and error handling as needed.

## Run locally

Use a Node version supported by Angular 20, then run:

```bash
npm ci
npm start
```

Angular CLI prints the local URL (normally `http://localhost:4200`).

## Verification

```bash
npm run build              # Passed: Angular production build
npm run test:accessibility # Passed: 11 ChromeHeadless tests
```

## Accessibility

The application uses semantic landmarks and tables, explicit form labels with field-linked validation, visible keyboard focus, text status labels, a native modal dialog, and reduced-motion styles. axe-core checks the dashboard, request list, request details, profile popover, and create dialog. These automated checks do not establish full WCAG conformance; manual keyboard, screen-reader, zoom, and responsive checks remain.

## Limitations

- Demo records are fictional and stored only in the current browser profile.
- Login, role permissions, server validation, attachments, and API integration are not included.
- The local mock data loads synchronously, so there is no artificial loading delay or skeleton state. Add skeletons when an asynchronous data source is connected.
- Screen-reader, manual keyboard, zoom/reflow, and full responsive review still need human verification.

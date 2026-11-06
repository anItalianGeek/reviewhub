# ReviewHub

Angular frontend for the ReviewHub tutoring-desk system (*sportelli didattici*), developed as a final-year high school project at ITET "A. Chilesotti" (2024/2025).

> **School project archive (2024/2025).** Preserved for reference, without active development or maintenance. Deployed exclusively at school, on a Raspberry Pi inside the school network (internal DNS, Apache with TLS, and `systemd`).

The web interface adapts available views and actions based on the user's role stored in `localStorage` upon login:

- **Students** view desk sessions they are enrolled in and sessions currently open for booking, with the ability to reserve an available seat slot. Other administrative views remain hidden.
- **Teachers** see their own scheduled desk sessions, with controls to create and edit sessions, in addition to student-level views.
- **Admins** have access to administrative management views for classrooms (*aule*), subjects (*materie*), and user accounts.

Opening any session reveals its full details: subject, classroom location, responsible instructor, dated slots, and remaining seat capacity.

*(Note: Role-based view switching is handled client-side for navigation; access enforcement and request validation rely on the backend API.)*

**Backend API**: [anItalianGeek/reviewhub_restAPI](https://github.com/anItalianGeek/reviewhub_restAPI)

---

## Architecture & Backend Dependency

ReviewHub is a single-page application built with Angular 19. It relies entirely on the companion backend ([anItalianGeek/reviewhub_restAPI](https://github.com/anItalianGeek/reviewhub_restAPI)) and its school environment data (pre-seeded subjects, classrooms, and user accounts under the `@chilesotti.it` domain). Running the frontend alone serves the client interface, but full authentication and data persistence require a running, initialized instance of the backend API.

---

## Getting Started

### Prerequisites

Manifest requirements:
- **Node.js**: Versions supported by Angular CLI 19 tooling (`^18.19.1 || ^20.11.1 || >=22.0.0`, as specified in `package-lock.json` engines)
- **npm**: Version compatible with lockfile v3
- **Backend API**: A running instance of [reviewhub_restAPI](https://github.com/anItalianGeek/reviewhub_restAPI)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/anItalianGeek/reviewhub.git
   cd reviewhub
   ```

2. **Install dependencies:**
   ```bash
   npm ci
   ```

### Available Scripts

Scripts defined in `package.json`:

- **`npm start`**: Starts the local Angular development server (`ng serve`). The application is served by default at `http://localhost:4200/`.
- **`npm run build`**: Compiles the application for production (`ng build`). Build artifacts are output to `dist/sportelli-web-client`.
- **`npm run watch`**: Compiles the application in development mode with file watching enabled (`ng build --watch --configuration development`).
- **`npm test`**: Executes unit tests via Karma / Jasmine (`ng test`).

---

## API Configuration & Local Testing

Backend endpoints are defined statically in `src/Enviroment.ts`:

```typescript
export class Enviroment {
    public static readonly DOMAIN: string = '@chilesotti.it';
    //public static readonly API_URL: string = 'https://reviewhub.chilesotti.it:8888/api/v1/'; // uncomment for production
    public static readonly API_URL: string = 'https://localhost:8888/api/v1/'; // uncomment for local testing
}
```

The Angular configuration (`angular.json`) does not define a dev-server reverse proxy or dynamic environment substitutions; HTTP requests are dispatched directly from the browser to the URL defined in `src/Enviroment.ts`.

When running against a local backend instance:

- **HTTPS (Default backend setting)**: The backend API runs by default with TLS enabled on port 8888 (`server.ssl.enabled=true`, serving `https://localhost:8888`). Before the frontend can communicate with the local API, navigate to `https://localhost:8888` in your browser and accept the local/self-signed SSL certificate; otherwise, browser security policies will block API calls.
- **HTTP (TLS disabled)**: If the backend is started with TLS disabled (e.g., passing `--server.ssl.enabled=false`), update `Enviroment.API_URL` in `src/Enviroment.ts` to `http://localhost:8888/api/v1/`.
- **Domain resolution**: Client services append `Enviroment.DOMAIN` (`@chilesotti.it`) to user identifiers during login and when querying session ownership. Ensure test accounts in the backend match this domain format.

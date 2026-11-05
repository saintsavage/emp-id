# EMP ID

EMP ID is the central identity provider for the EMP Exclusive ecosystem.

## Core principles

- One account can be created from any connected EMP project.
- Real name and unique username identify the person; EMP ID is a permanent identifier in the format `EMP-000001`.
- Authentication is centralised here. Application data and project-specific permissions remain in each project's own database.
- Connected websites use OpenID Connect / OAuth 2.1 authorisation code flow with PKCE.
- Sessions are stored centrally. A user who has an active EMP ID session can authorise another connected project without entering their password again.
- Each project must be explicitly registered as an OAuth client with exact redirect URIs and limited scopes.
- Users approve requested access on the EMP ID consent screen.

## Stack

- Next.js
- Better Auth
- Better Auth OAuth Provider (OpenID Connect)
- Neon PostgreSQL
- Vercel

## Database

The EMP ID Neon project is the central identity database. Do not merge or replace the databases belonging to EMP HQ, HandOn, EMP UNKNOWN, or other projects.

## Deployment

Vercel runs `npm run db:migrate` before `npm run build` so Better Auth plugin schema changes are applied before deployment. Keep the database migration additive and review any schema change before applying it.

## Identity fields

- Real name: private profile identity
- Username: unique, immutable public handle
- Email: sign-in and account recovery address
- Password: stored only as a secure hash by Better Auth
- EMP ID: generated server-side by a PostgreSQL sequence and insert trigger

Never expose database credentials, signing secrets, or OAuth client secrets in browser code or public repositories.

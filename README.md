# Markdown Editor

A feature-rich markdown editor with folder management and Supabase integration.

## Features

- Markdown editing with live preview
- Folder management with Supabase integration
- Project organization
- Documentation browsing

## Prerequisites

- Node.js 20.19.2
- Docker

## Setup

1. Install dependencies

```bash
npm install
```

2. Start the Supabase local development environment

```bash
npm run supabase:start
```
View your local Supabase instance at http://localhost:54323.

3. Run dev server

```bash
npm run dev
```

## Folder Management

The application allows you to:
- Create folders and subfolders
- Navigate through folder hierarchy
- View folder contents
- Delete folders

All folder data is stored in Supabase.

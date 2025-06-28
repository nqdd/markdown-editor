# Markdown Editor Web

## Features

- Markdown editing with live preview
- Folder management with Supabase integration
- Project organization
- Documentation browsing

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Supabase CLI (for local development)

### Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Supabase:
   - Install Supabase CLI if you haven't already: `npm install -g supabase`
   - Start Supabase locally: `supabase start`
   - The migration for the folders table will be automatically applied

4. Copy the environment variables:
   ```bash
   cp .env.example .env
   ```
   Update the Supabase URL and anon key in the `.env` file if needed.

5. Start the development server:
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
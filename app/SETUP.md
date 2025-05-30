# CRM Setup Guide

## Environment Variables Setup

To fix the "add company doesn't add to database" issue, you need to set up your Supabase environment variables.

### Step 1: Create .env.local file

Create a file named `.env.local` in the `app` directory with the following content:

```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Step 2: Get your Supabase credentials

1. Go to [supabase.com](https://supabase.com)
2. Sign in or create an account
3. Create a new project or select an existing one
4. Go to Settings > API
5. Copy the "Project URL" and paste it as `NEXT_PUBLIC_SUPABASE_URL`
6. Copy the "anon public" key and paste it as `NEXT_PUBLIC_SUPABASE_ANON_KEY`

### Step 3: Set up your database tables

Make sure you have the following tables in your Supabase database:

#### Companies table
```sql
CREATE TABLE Companies (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  website VARCHAR(255),
  headquarters VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### People table
```sql
CREATE TABLE People (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  companyId INTEGER REFERENCES Companies(id),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

#### Opportunities table
```sql
CREATE TABLE Opportunities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  value DECIMAL(12, 2) NOT NULL DEFAULT 0,
  company VARCHAR(255) NOT NULL,
  close_date DATE NOT NULL,
  progress INTEGER NOT NULL DEFAULT 0 CHECK (progress >= 0 AND progress <= 100),
  stage VARCHAR(50) NOT NULL DEFAULT 'Qualified' CHECK (stage IN ('Qualified', 'Proposal', 'Negotiation', 'Closed Won')),
  company_avatar VARCHAR(255),
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);
```

### Step 4: Restart the development server

After setting up the environment variables, restart your development server:

```bash
npm run dev
```

## Troubleshooting

If you're still having issues:

1. Check the browser console for error messages
2. Check the terminal/server logs for detailed error information
3. Verify your Supabase credentials are correct
4. Make sure your database tables exist and have the correct structure
5. Check that your Supabase project has the correct RLS (Row Level Security) policies if enabled

## Testing

After setup, try adding a company through the UI. You should see detailed logging in both the browser console and server terminal that will help identify any remaining issues. 
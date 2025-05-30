# CRM Pro - Modern Customer Relationship Management System

A full-stack CRM application built with modern web technologies, showcasing best practices in React development, database design, and user experience. This portfolio project demonstrates a complete customer relationship management solution with a beautiful, responsive interface and robust backend architecture.

## 🚀 Live Demo

Experience the CRM in action: [View Demo](https://your-demo-url.com)

## 📋 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Architecture](#architecture)
- [Getting Started](#getting-started)
- [Database Schema](#database-schema)
- [Project Structure](#project-structure)
- [API Documentation](#api-documentation)
- [Contributing](#contributing)
- [License](#license)

## ✨ Features

### 🏢 Company Management
- **Company Profiles**: Create and manage detailed company records
- **Contact Tracking**: Associate multiple contacts with each company
- **Status Management**: Track company status (Active, Prospect, Inactive)
- **Search & Filter**: Advanced search and filtering capabilities

### 👥 Contact Management
- **People Directory**: Comprehensive contact database
- **Company Associations**: Link contacts to their respective companies
- **Communication History**: Track all interactions and touchpoints
- **Contact Details**: Store emails, phone numbers, and additional information

### 💼 Sales Pipeline
- **Opportunity Tracking**: Visual kanban-style pipeline management
- **Deal Stages**: Qualified → Proposal → Negotiation → Closed Won
- **Revenue Analytics**: Track total pipeline value and win rates
- **Progress Monitoring**: Visual progress indicators for each deal

### 📊 Analytics Dashboard
- **Revenue Overview**: Interactive charts showing revenue trends
- **Pipeline Metrics**: Key performance indicators and statistics
- **Activity Feed**: Recent messages and communications
- **Calendar Integration**: Upcoming meetings and events

### 🎨 User Experience
- **Modern UI**: Clean, professional interface built with Subframe components
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark/Light Mode**: Adaptive theming for user preference
- **Intuitive Navigation**: Sidebar navigation with clear visual hierarchy

## 🛠 Tech Stack

### Frontend
- **[Next.js 14](https://nextjs.org/)** - React framework with App Router
- **[React 18](https://reactjs.org/)** - Component-based UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type-safe JavaScript
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Subframe](https://subframe.com/)** - Professional React component library

### Backend & Database
- **[Supabase](https://supabase.com/)** - PostgreSQL database with real-time features
- **[PostgreSQL](https://www.postgresql.org/)** - Robust relational database
- **Next.js API Routes** - Serverless API endpoints

### Development Tools
- **[Cursor IDE](https://cursor.sh/)** - AI-powered code editor
- **ESLint** - Code linting and formatting
- **PostCSS** - CSS processing and optimization

## 🏗 Architecture

### Frontend Architecture
```
src/
├── app/                    # Next.js App Router
│   ├── (routes)/          # Route groups
│   ├── api/               # API endpoints
│   └── globals.css        # Global styles
├── components/            # Reusable components
├── ui/                    # Subframe UI components
├── lib/                   # Utilities and configurations
└── types/                 # TypeScript type definitions
```

### Database Architecture
The application uses a normalized PostgreSQL schema with the following core entities:

- **Companies**: Central business entities
- **People**: Individual contacts linked to companies
- **Opportunities**: Sales pipeline tracking (planned)

### API Design
RESTful API endpoints following standard conventions:
- `GET /api/companies` - List companies with filtering
- `POST /api/companies` - Create new company
- `GET /api/people` - List contacts with company associations
- `POST /api/people` - Create new contact

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- Supabase account
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/crm-pro.git
   cd crm-pro/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the `app` directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Set up Supabase database**
   
   Run the following SQL commands in your Supabase SQL editor:
   ```sql
   -- Companies table
   CREATE TABLE Companies (
     id SERIAL PRIMARY KEY,
     name VARCHAR(255) NOT NULL,
     website VARCHAR(255),
     headquarters VARCHAR(255),
     created_at TIMESTAMP DEFAULT NOW(),
     updated_at TIMESTAMP DEFAULT NOW()
   );

   -- People table
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

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🗄 Database Schema

### Companies Table
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(255) | Company name (required) |
| website | VARCHAR(255) | Company website URL |
| headquarters | VARCHAR(255) | Company location |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

### People Table
| Column | Type | Description |
|--------|------|-------------|
| id | SERIAL | Primary key |
| name | VARCHAR(255) | Contact name (required) |
| email | VARCHAR(255) | Email address (required) |
| phone | VARCHAR(50) | Phone number |
| companyId | INTEGER | Foreign key to Companies |
| created_at | TIMESTAMP | Record creation time |
| updated_at | TIMESTAMP | Last update time |

## 📁 Project Structure

```
app/
├── public/                 # Static assets
├── src/
│   ├── app/
│   │   ├── companies/     # Company management pages
│   │   ├── people/        # Contact management pages
│   │   ├── opportunities/ # Sales pipeline pages
│   │   ├── hub/          # Dashboard page
│   │   └── api/          # API routes
│   ├── components/        # Custom React components
│   │   ├── CompanyModal.tsx
│   │   └── PersonModal.tsx
│   ├── ui/               # Subframe UI components
│   ├── lib/              # Utilities and configurations
│   │   └── supabase.ts   # Database client
│   └── types/            # TypeScript definitions
├── .subframe/            # Subframe configuration
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── README.md
```

## 📚 API Documentation

### Companies API

#### GET /api/companies
Retrieve all companies with optional filtering.

**Query Parameters:**
- `search` - Filter by company name
- `status` - Filter by company status

**Response:**
```json
[
  {
    "id": 1,
    "name": "Acme Corp",
    "website": "https://acme.com",
    "headquarters": "San Francisco, CA",
    "created_at": "2024-01-01T00:00:00Z"
  }
]
```

#### POST /api/companies
Create a new company.

**Request Body:**
```json
{
  "name": "New Company",
  "website": "https://example.com",
  "headquarters": "New York, NY"
}
```

### People API

#### GET /api/people
Retrieve all contacts with company associations.

#### POST /api/people
Create a new contact.

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1-555-0123",
  "companyId": 1
}
```

## 🎯 Key Features Demonstrated

### Frontend Development
- **Modern React Patterns**: Hooks, context, and functional components
- **TypeScript Integration**: Full type safety across the application
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Component Architecture**: Reusable, maintainable component structure

### Backend Development
- **API Design**: RESTful endpoints with proper HTTP methods
- **Database Integration**: Supabase client with error handling
- **Data Validation**: Input validation and sanitization
- **Error Handling**: Comprehensive error responses

### User Experience
- **Intuitive Interface**: Clean, professional design
- **Performance**: Optimized loading and rendering
- **Accessibility**: Semantic HTML and keyboard navigation
- **Visual Feedback**: Loading states and success/error messages

## 🔧 Development Tools

This project showcases modern development practices:

- **Cursor IDE**: AI-assisted development for faster coding
- **TypeScript**: Enhanced developer experience with type safety
- **ESLint**: Code quality and consistency
- **Git**: Version control with meaningful commit messages

## 🚀 Deployment

The application is designed for easy deployment on modern platforms:

- **Vercel**: Optimized for Next.js applications
- **Netlify**: Static site generation support
- **Railway**: Full-stack deployment with database

## 🤝 Contributing

This is a portfolio project, but feedback and suggestions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

- **[Subframe](https://subframe.com/)** - For the beautiful component library
- **[Supabase](https://supabase.com/)** - For the powerful backend platform
- **[Cursor](https://cursor.sh/)** - For the AI-powered development experience

---

**Built with ❤️ by [Your Name]** - Showcasing modern web development practices and clean architecture patterns.

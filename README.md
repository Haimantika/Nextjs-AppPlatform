# Guestbook - Next.js App

[![Deploy to DO](https://www.deploytodo.com/do-btn-blue.svg)](https://cloud.digitalocean.com/apps/new?repo=https://github.com/Haimantika/Nextjs-AppPlatform/tree/main)

A modern, responsive guestbook application built with Next.js, TypeScript, DigitalOcean and Tailwind CSS.

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn
- PostgreSQL (DigitalOcean managed database)

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd Nextjs-AppPlatform
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
  Follow [DigitalOcean's official documentation](https://docs.digitalocean.com/products/databases/postgresql/getting-started/quickstart/) to spin up a managed PostgresQL database. 

5. Run the development server:
```bash
npm run dev
```

6. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# Database connection string
DATABASE_URL=postgresql://username:password@localhost:5432/your_database_name
```

For production deployments, make sure to set the `DATABASE_URL` environment variable in DigitalOcean's App Platform.

## Project Structure

```
├── app/
│   ├── api/
│   │   └── guestbook/
│   │       └── route.ts     # API endpoints for guestbook operations
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout component
│   └── page.tsx             # Main guestbook page
├── components/
│   └── ui/                  # Reusable UI components
├── lib/
│   ├── db.ts                # Database connection and queries
│   └── utils.ts             # Utility functions
├── database-setup.sql       # Database schema and sample data
├── package.json             # Dependencies and scripts
├── tailwind.config.ts       # Tailwind CSS configuration
├── tsconfig.json            # TypeScript configuration
└── next.config.js           # Next.js configuration
```

## Technologies Used

- **Next.js 14** - React framework with App Router
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **React Hooks** - State management
- **PostgreSQL** - Database for persistent storage
- **pg** - PostgreSQL client for Node.js
- **Radix UI** - Accessible UI components
- **Lucide React** - Icon library

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
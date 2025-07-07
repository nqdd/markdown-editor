# Markdown Editor

A modern, feature-rich markdown editor built with Clean Architecture principles, offering flexibility in backend infrastructure and a robust development experience.

## 🏗️ Architecture
This project follows Clean Architecture principles with clear separation of concerns:

- Domain Layer ( apps/domain/ ) - Core business entities and rules
- Use Case Layer ( apps/usecase/ ) - Application-specific business logic
- Infrastructure Layer ( apps/infrastructure/ ) - External services and data persistence
- Presentation Layer ( apps/presentation/web/ ) - User interface and interaction
## 🚀 Tech Stack
### Frontend
- React 19 with TypeScript
- Vite for fast development and building
- BlockNote - Rich markdown editor with React integration
- Tailwind CSS for styling
- React Router for navigation
- ShadCN UI components
### Backend Options
- Supabase - Open source Firebase alternative
- Firebase - Google's backend-as-a-service platform
### Development Tools
- Turborepo - High-performance build system for monorepos
- Yarn Workspaces - Package management
- ESLint - Code linting
- Prettier - Code formatting
- Husky - Git hooks
- TypeScript - Type safety
## 📁 Project Structure
```
markdown-editor/
├── apps/
│   ├── domain/                # Business entities and rules
│   ├── usecase/               # Application business logic
│   ├── infrastructure/        # External services
│   │   ├── firebase/          # Firebase implementation
│   │   └── supabase/          # Supabase implementation
│   └── presentation/
│       └── web/               # React web application
├── packages/
│   ├── config/                # Shared configurations
│   │   ├── eslint/            # ESLint configuration
│   │   ├── tailwind/          # Tailwind configuration
│   │   └── typescript/        # TypeScript configuration
│   ├── ioc/                   # Inversion of Control container
│   └── ui/                    # Shared UI components
├── .local-services/           # Local development services
│   ├── firebase/              # Local Firebase setup
│   └── supabase/              # Local Supabase setup
└── .husky/                    # Git hooks
```
## 🛠️ Getting Started
### Prerequisites
- Node.js 20.19.2
- Yarn 1.22.22
### Installation
```
# Clone the repository
git clone <repository-url>
cd markdown-editor

# Install dependencies
yarn install
```
### Development
```
# Start development server
yarn dev

# The web application will be available at http://
localhost:9000
```
### Building
```
# Build all packages and applications
yarn build

# Type checking
yarn check-types

# Linting
yarn lint

# Code formatting
yarn format
```
## 🔧 Available Scripts
- yarn dev - Start development servers for all applications
- yarn build - Build all packages and applications
- yarn lint - Run ESLint on all packages
- yarn format - Format code with Prettier
- yarn check-types - Run TypeScript type checking
## 🏛️ Clean Architecture Benefits
1. Separation of Concerns - Each layer has a specific responsibility
2. Testability - Business logic is isolated and easily testable
3. Flexibility - Easy to swap infrastructure implementations (Firebase ↔ Supabase)
4. Maintainability - Clear boundaries make the codebase easier to understand and modify
5. Scalability - Architecture supports growth and feature additions
## 🔌 Infrastructure Flexibility
The project supports multiple backend options:

- Firebase : Google's comprehensive app development platform
- Supabase : Open source alternative with PostgreSQL database
Both implementations follow the same interface contracts defined in the domain layer, making it easy to switch between them or even use both simultaneously.

## 🎨 UI Components
The project uses a combination of:

- BlockNote for the rich markdown editing experience
- ShadCN UI for consistent, accessible components
- Tailwind CSS for utility-first styling
## 📦 Monorepo Structure
This project uses Turborepo with Yarn Workspaces to manage multiple packages efficiently:

- Shared configurations across all packages
- Optimized build caching and parallelization
- Clear dependency management
- Consistent development experience
## 🚀 Local Development Services
The .local-services/ directory contains Docker configurations for running backend services locally:

- Firebase Emulator Suite
- Supabase local development stack
This ensures a consistent development environment across the team.

## 🤝 Contributing
1. Follow the established architecture patterns
2. Ensure all tests pass: yarn test (when available)
3. Run linting: yarn lint
4. Format code: yarn format
5. Check types: yarn check-types
The project uses Husky for pre-commit hooks to maintain code quality.

This markdown editor demonstrates modern web development practices with clean architecture, type safety, and developer experience in mind.
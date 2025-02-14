# <img width='24' height='24' src='./src/app/favicon.ico'> Challenge App

A Next.js application for tracking personal challenges and goals.

## ✨ Features

- Create and manage personal challenges
- Track progress over time
- Set custom periods and amounts for each challenge
- Responsive design
- Local storage persistence

## 🛠️ Tech Stack

### Frontend:

- Next.js 14
- TypeScript
- Redux Toolkit
- React Hook Form
- SCSS Modules
- ESLint & Prettier

### [Backend:](https://github.com/Anna-Kolmychek/challenge_app)

- Django
- Python
- Docker

## 🚀 Getting Started

### 📋 Prerequisites

- Node.js 18+
- npm or yarn

### 💻 Installation

1. Clone the repository:

```bash
git clone https://github.com/Svetk0/challenge-app.git
```

2. Install dependencies in `challenge-app` folder:

```bash
cd challenge-app
```

```bash
npm install
# or
yarn install
```

3. Run the development server:

```bash
npm run dev
# or
yarn dev
```

The application will be available at [http://localhost:3017](http://localhost:3017)

## 📜 Available Scripts

- `npm run dev` - Runs the development server
- `npm run build` - Creates a production build
- `npm run start` - Starts the production server
- `npm run lint` - Runs ESLint to check code
- `npm run format:fix` - Formats code using Prettier
- `npm run precommit` - Runs lint-staged checks
- `npm run prepare` - Sets up Husky git hooks

## 🎨 Code Formatting

This project uses ESLint and Prettier for code formatting and maintaining consistent code style.

### ⚙️ ESLint Configuration

The ESLint configuration can be found in `.eslintrc.json`. It extends:

- next/core-web-vitals
- next/typescript
- prettier

### 🔧 Prettier Configuration

Prettier settings are defined in `.prettierrc.json` with the following defaults:

- Single quotes
- 2 spaces indentation
- 100 characters line length
- ES5 trailing commas

## 🔄 Pre-commit Hooks

The project uses Husky and lint-staged to ensure code quality before commits:

1. All staged files are formatted with Prettier
2. ESLint checks are run
3. TypeScript compilation is verified

## ⌨️ Manual Formatting

To manually format code:

1. Format all files:

```bash
npm run format:fix
```

2. Lint and fix issues manually:

```bash
npm run lint
```

## 📁 Project Structure

- `/src` - Application source code
  - `/app` - Next.js app router pages
  - `/components` - React components
  - `/lib` - Redux store and features
  - `/styles` - Global styles and SCSS modules
  - `/types` - TypeScript type definitions
  - `/utils` - Utility functions

## 🤝 Contributing

1. Create a new branch from `develop` branch
2. Name own branch as `taskID-taskType/taskName` <br>
   Example: `6-feat/add-redux-toolkit`
3. Make changes
4. Check all changes using step by step checking

- Check by ESLint
  ```bash
  npm run lint
  ```
- Then format all files using prettier
  ```bash
  npm run format:fix
  ```
- Finally, check on build production
  ```bash
  npm run build
  ```
  Fix all errors and warnings

5. Submit a pull request using the PR template
6. After PR approving, perform `Squash and Merge`

## 🏀 Team

- Frontend: [Svetlana](https://github.com/Svetk0), [Daria](https://github.com/Dari-Dari)
- Backend: [Anna](https://github.com/Anna-Kolmychek)
- Design: [Dmitriy](https://www.behance.net/dmitrydemosyuk)

## 📄 License

MIT License

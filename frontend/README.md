# ImpactHire Frontend

Frontend application for ImpactHire.

## Project Structure

```txt
src/
├── assets/                # Images, icons, fonts and static resources
├── components/
│   ├── atoms/             # Basic UI components (Button, Input, Badge)
│   ├── molecules/         # Combinations of atoms (SearchBar, CardHeader)
│   ├── organisms/         # Complex UI sections (CandidateCard, JobForm)
│   └── templates/         # Page layouts and structural templates
├── pages/                 # Application pages/routes
├── hooks/                 # Custom React hooks
├── services/              # API clients and external integrations
├── utils/                 # Helper and utility functions
├── styles/                # Global styles and design tokens
├── App.tsx                # Root application component
└── main.tsx               # Application entry point
```

## Design System

The project follows the Atomic Design methodology:

- **Atoms** → Smallest reusable UI elements.
- **Molecules** → Groups of atoms working together.
- **Organisms** → Complex sections composed of molecules and atoms.
- **Templates** → Page-level layouts and structure.
- **Pages** → Final screens rendered by the application.

## Styling

The application uses Tailwind CSS with a custom design system based on:

- Primitive Tokens
- Semantic Tokens
- Brand Colors
- Accessibility-first color usage

All UI components should consume semantic design tokens instead of hardcoded colors whenever possible.

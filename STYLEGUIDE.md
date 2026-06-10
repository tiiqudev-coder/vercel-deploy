# React Component Style Guide

This guide was written with the use of GitHub Copilot

## Using GitHub Copilot for Code Formatting

GitHub Copilot can help you write code that follows this style guide. Here are effective ways to leverage Copilot:

### Getting Component Suggestions
- **Comment your intent**: Write descriptive comments before coding
  ```tsx
  // Create a main component that fetches user dashboard data and displays it
  // Use implicit returns for sub-components
  ```
- **Use specific prompts**: Be explicit about the pattern you want
  ```tsx
  // Create a generic Button component with variants and sizes
  ```

### Following Naming Conventions
- **Start with the pattern**: Begin typing the interface or component structure
  ```tsx
  interface UserCardProps {
    // Copilot will suggest appropriate prop names
  }
  ```

### Icon Component Creation
- **Provide the SVG**: Paste the SVG code and ask Copilot to convert it
  ```tsx
  // Convert this SVG to a React component with size and color props
  <svg>...</svg>
  ```

### Code Style Assistance
- **Implicit returns**: When writing simple components, Copilot will suggest implicit returns
- **TypeScript interfaces**: Copilot helps generate proper interfaces for component props
- **Hook patterns**: Copilot suggests proper hook usage and custom hook creation

### Best Practices for Copilot Usage
- **Review suggestions**: Always review Copilot's suggestions against this style guide
- **Provide context**: Include relevant imports and existing code for better suggestions
- **Iterate on suggestions**: If Copilot's first suggestion doesn't match the style, provide feedback through your edits
- **Use comments**: Descriptive comments help Copilot understand your intent and generate better code

### Example Workflow
1. Write a comment describing what you want to build
2. Start typing the basic structure (interface, function signature)
3. Let Copilot suggest the implementation
4. Review and adjust to match this style guide's patterns
5. Test the component functionality

## Component Architecture

### Layer Separation
- **Main Component Layer**: Handles data fetching, state management, and display logic
- **Sub Components**: Pure presentation components that receive props and render UI
- **Generic Components**: Reusable components that can be used across the application
- **Specific Components**: Components specific to a main component's functionality

### Folder Structure
```
src/components/
├── ComponentName/
│   ├── ComponentName.tsx          # Main component (data + logic)
│   ├── subcomponents/             # Specific sub-components
│   │   ├── SubComponent.tsx
│   │   └── AnotherSubComponent.tsx
│   └── ComponentName.test.tsx     # Tests for main component
├── GenericComponent.tsx           # Generic/reusable components
└── shared/                        # Shared utilities, types, hooks
```

## Component Patterns

### Main Components
```tsx
// Main components handle data fetching and business logic
const Dashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData().then(setData).finally(() => setLoading(false));
  }, []);

  if (loading) return <LoadingSpinner />;

  return (
    <div className="dashboard">
      <DashboardHeader data={data.summary} />
      <DashboardGrid items={data.items} />
      <DashboardFooter stats={data.stats} />
    </div>
  );
};
```

### Sub Components
```tsx
// Sub components are pure and receive all data via props
interface DashboardHeaderProps {
  summary: DashboardSummary;
}

const DashboardHeader = ({ summary }: DashboardHeaderProps) =>
  <header className="dashboard-header">
    <h1>{summary.title}</h1>
    <StatsDisplay stats={summary.stats} />
  </header>;
```

### Generic Components
```tsx
// Generic components are reusable across the app
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({ variant = 'primary', size = 'md', className, ...props }: ButtonProps) =>
  <button
    className={`btn btn-${variant} btn-${size} ${className || ''}`}
    {...props}
  />;
```

### Icon Components (SVG)
```tsx
// Convert SVGs to React components for better control and TypeScript support
// Place in src/components/Icons/ folder with PascalCase naming

interface MagnifierIconProps extends HTMLAttributes<SVGSVGElement> {
  size?: number;
  color?: string;
}

const MagnifierIcon = ({
  size = 24,
  color = '#4B7D94',
  className = '',
  ...props
}: MagnifierIconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    {...props}
  >
    <path
      d="M19.22 20.55L13.235 14.565C12.76 14.945 12.2137 15.2458 11.5962 15.4675C10.9787 15.6891 10.3216 15.8 9.62495 15.8C7.89912 15.8 6.43849 15.2022 5.24308 14.0068C4.04766 12.8114 3.44995 11.3508 3.44995 9.62495C3.44995 7.89912 4.04766 6.43849 5.24308 5.24308C6.43849 4.04766 7.89912 3.44995 9.62495 3.44995C11.3508 3.44995 12.8114 4.04766 14.0068 5.24308C15.2022 6.43849 15.8 7.89912 15.8 9.62495C15.8 10.3216 15.6891 10.9787 15.4675 11.5962C15.2458 12.2137 14.945 12.76 14.565 13.235L20.55 19.22L19.22 20.55ZM9.62495 13.9C10.8125 13.9 11.8218 13.4843 12.6531 12.6531C13.4843 11.8218 13.9 10.8125 13.9 9.62495C13.9 8.43745 13.4843 7.42808 12.6531 6.59683C11.8218 5.76558 10.8125 5.34995 9.62495 5.34995C8.43745 5.34995 7.42808 5.76558 6.59683 6.59683C5.76558 7.42808 5.34995 8.43745 5.34995 9.62495C5.34995 10.8125 5.76558 11.8218 6.59683 12.6531C7.42808 13.4843 8.43745 13.9 9.62495 13.9Z"
      fill={color}
    />
  </svg>
);

// Usage examples:
<MagnifierIcon />
<MagnifierIcon size={32} color="#000" />
<MagnifierIcon className="hover:opacity-75 transition-opacity" />
```

**Icon Component Guidelines:**
- Store SVG icons as React components in `src/components/Icons/`
- Use PascalCase naming (e.g., `MagnifierIcon`, `ChevronDownIcon`)
- Extend `HTMLAttributes<SVGSVGElement>` for full SVG attribute support
- Provide `size` and `color` props for customization
- Include proper TypeScript interfaces
- Use implicit returns for simple icon components
- Keep original SVG viewBox and structure intact
- Add accessibility attributes when needed

## Code Style

### Function Components
- Use **implicit return arrow functions** for simple components
- Use **explicit return** for complex components with multiple statements
- Prefer **arrow functions** over function declarations

```tsx
// ✅ Good - Implicit return for simple components
const SimpleComponent = ({ title }) =>
  <div className="simple">{title}</div>;

// ✅ Good - Explicit return for complex logic
const ComplexComponent = ({ data }) => {
  const processed = useMemo(() => processData(data), [data]);

  return (
    <div className="complex">
      {processed.map(item => <Item key={item.id} {...item} />)}
    </div>
  );
};
```

### Props & Types
- Define interfaces for component props
- Use descriptive prop names
- Prefer object destructuring in function parameters

```tsx
interface UserCardProps {
  user: User;
  onEdit?: (user: User) => void;
  showDetails?: boolean;
}

const UserCard = ({ user, onEdit, showDetails = false }: UserCardProps) =>
  <div className="user-card">
    <h3>{user.name}</h3>
    {showDetails && <UserDetails user={user} />}
    {onEdit && <button onClick={() => onEdit(user)}>Edit</button>}
  </div>;
```

### Hooks Usage
- Custom hooks for shared logic
- Keep hooks at the top level of components
- Use descriptive hook names

```tsx
const useDashboardData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData().then(setData).finally(() => setLoading(false));
  }, []);

  return { data, loading };
};

const Dashboard = () => {
  const { data, loading } = useDashboardData();

  // ... rest of component
};
```

## Naming Conventions

### Components
- PascalCase for component names
- Descriptive names that indicate purpose
- Suffix with component type when needed (Button, Modal, etc.)

### Files
- ComponentName.tsx for main component files
- ComponentName.test.tsx for test files
- index.ts for barrel exports when needed

### Props & State
- camelCase for prop names
- Descriptive names (avoid abbreviations)
- Boolean props should be prefixed with `is`, `has`, `show`, etc.

## Best Practices

### Component Design
- Keep components small and focused
- Prefer composition over inheritance
- Use children prop for flexible layouts
- Avoid deep prop drilling - use context or state management

### Performance
- Use React.memo for expensive components
- Memoize expensive calculations with useMemo
- Use useCallback for event handlers passed to children

### Testing
- Test behavior, not implementation
- Use descriptive test names
- Test both success and error states

### Accessibility
- Use semantic HTML elements
- Provide aria-labels when needed
- Ensure keyboard navigation works
- Test with screen readers
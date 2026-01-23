# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Package Manager

This project uses **pnpm** (v10.17.1) as the package manager. Always use `pnpm` commands instead of npm or yarn.

## Development Commands

```bash
# Install dependencies
pnpm install

# Start development server (runs on http://localhost:3000)
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run ESLint
pnpm lint

# Add shadcn/ui components
npx shadcn@latest add [component-name]
# Example: npx shadcn@latest add button
```

## Architecture Overview

### Tech Stack
- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 3.4.x (Note: v4 is not compatible with current setup)
- **UI Components**: shadcn/ui
- **State Management**: Zustand (client state) + TanStack Query (server state)
- **Forms**: React Hook Form + Zod

### State Management Strategy

**Client State (Zustand)**
- Use for UI state, user preferences, and application-level state
- Located in `/store` directory
- Pattern: Create stores with devtools and persist middleware
- Example: `useUserStore` demonstrates the standard pattern with TypeScript interfaces

**Server State (TanStack Query)**
- Use for all server data fetching and caching
- QueryProvider is configured in `/providers/query-provider.tsx` with:
  - 1-minute stale time
  - Disabled refetch on window focus
  - React Query Devtools enabled in development

### Provider Architecture

All providers are composed in the root layout (`app/layout.tsx`). Currently includes:
- QueryProvider for TanStack Query

When adding new providers, nest them in the root layout in this order:
1. Theme providers (if needed)
2. QueryProvider (already configured)
3. Auth providers (if needed)
4. Other context providers

### Form Validation Pattern

Forms use React Hook Form with Zod schemas:
1. Define Zod schemas in `/schemas` directory
2. Export TypeScript types using `z.infer<typeof schema>`
3. Use `@hookform/resolvers/zod` to integrate with React Hook Form
4. See `/schemas/auth.ts` for reference implementation

### shadcn/ui Integration

Configuration in `components.json`:
- Components install to `@/components/ui`
- Uses CSS variables for theming (defined in `app/globals.css`)
- Base color: slate
- Path aliases configured in `tsconfig.json`

Utility function `cn()` in `lib/utils.ts` combines clsx and tailwind-merge for className management.

### Path Aliases

The following path aliases are configured:
- `@/components` → `/components`
- `@/lib` → `/lib`
- `@/hooks` → `/hooks`
- `@/utils` → `/utils`
- `@/types` → `/types`
- `@/store` → `/store`
- `@/schemas` → `/schemas`
- `@/services` → `/services`
- `@/constants` → `/constants`
- `@/providers` → `/providers`

Always use these aliases instead of relative imports for better maintainability.

### Directory Structure

- `/app` - Next.js App Router pages and layouts
- `/components` - React components
  - `/ui` - shadcn/ui components (auto-generated)
- `/providers` - React context providers
- `/store` - Zustand stores for client state
- `/schemas` - Zod validation schemas
- `/services` - API service functions
- `/hooks` - Custom React hooks
- `/lib` - Utility functions and shared libraries
- `/types` - TypeScript type definitions
- `/utils` - Helper functions
- `/constants` - Application constants

### Environment Variables

Copy `.env.example` to `.env` for local development. The example file shows all required environment variables.

## Code Documentation Standards

### JSDoc Requirements

All exported functions, custom hooks, and components must include JSDoc comments with the following structure:

**Custom Hooks:**
```typescript
/**
 * Custom hook description
 * @param {Object} options - Hook options
 * @param {string} options.paramName - Parameter description
 * @returns {Object} Return value description
 * @example
 * const { value, setValue } = useExample({ paramName: 'value' });
 */
```

**Utility Functions:**
```typescript
/**
 * Function description
 * @param {Type} paramName - Parameter description
 * @returns {Type} Return value description
 */
```

**React Components:**
```typescript
/**
 * Component description
 * @param {Object} props - Component props
 * @param {Type} props.propName - Prop description
 */
```

### JSDoc Best Practices

1. **Always include**:
   - Clear description of purpose
   - All parameters with types and descriptions
   - Return value with type and description
   - `@example` tag for complex hooks or functions

2. **Optional but recommended**:
   - `@throws` for functions that can throw errors
   - `@see` for related functions or components
   - `@deprecated` for deprecated code

3. **Keep descriptions concise** but informative
4. **Use TypeScript types** in JSDoc for better IDE support

## Internationalization (i18n)

This project uses **next-intl** for internationalization support.

### Supported Languages

- **ko** (한국어) - Default language
- **en** (English)
- **ja** (日本語)
- **zh** (简体中文)

### i18n Directory Structure

```
/i18n
├── config.ts       # Locale configuration
└── request.ts      # Server-side i18n setup

/messages
├── ko.json         # Korean translations (base)
├── en.json         # English translations
├── ja.json         # Japanese translations
└── zh.json         # Chinese translations
```

### URL Structure

- `/` - Korean (default, no prefix)
- `/en` - English
- `/ja` - Japanese
- `/zh` - Chinese

### Translation Rules

1. **Base Language**: Korean (ko) is the base language for all translations
2. **Translation Style**: Other languages should use formal/written style (문어체)
   - English: Formal expressions
   - Japanese: です/ます体 (polite form)
   - Chinese: Formal expressions

3. **Variable Interpolation**: Use next-intl's variable feature
   ```json
   {
     "welcome": "{name}님, 환영합니다"
   }
   ```
   ```typescript
   t('welcome', { name: 'John' })
   ```

4. **Rich Text**: Use next-intl's rich feature for styled text
   ```json
   {
     "description": "This is <b>important</b> message"
   }
   ```
   ```typescript
   t.rich('description', {
     b: (chunks) => <b>{chunks}</b>
   })
   ```

### Using Translations

**Server Components:**
```typescript
import { getTranslations } from 'next-intl/server';

const t = await getTranslations({ locale, namespace: 'home' });
```

**Client Components:**
```typescript
import { useTranslations } from 'next-intl';

const t = useTranslations('speech.stt');
```

### Adding New Translations

1. Add the key to `messages/ko.json` first
2. Add corresponding translations to `en.json`, `ja.json`, `zh.json`
3. Use the translation key in your component with `t()` or `t.rich()`

### Translation Key Naming Convention

```json
{
  "metadata": { ... },
  "home": { ... },
  "speech": {
    "page": { ... },
    "stt": { ... },
    "tts": { ... },
    "transcript": { ... },
    "voiceSelector": { ... },
    "browserWarning": { ... }
  }
}
```

Use dot notation for nested keys: `t('speech.page.title')`

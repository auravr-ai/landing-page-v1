# Theme Toggle Implementation Guide

This guide provides comprehensive instructions for implementing a theme toggle button in your Next.js application using `next-themes`.

## Table of Contents

1. [Introduction](#introduction)
2. [Understanding the useTheme Hook](#understanding-the-usetheme-hook)
3. [Implementation Examples](#implementation-examples)
4. [Integration with Header Component](#integration-with-header-component)
5. [Troubleshooting](#troubleshooting)

## Introduction

The application now supports light/dark theme switching powered by the `next-themes` package. The theme system is already configured in the root layout with:

- **Class-based theming**: The `dark` class is added/removed from the `<html>` element
- **System preference detection**: Automatically respects the user's OS theme preference
- **Default theme**: Set to `"system"` to follow the OS preference by default
- **CSS variables**: Both light and dark themes are defined in `app/globals.css`

The theme provider is configured with:
```typescript
<ThemeProvider
  attribute="class"
  defaultTheme="system"
  enableSystem
>
```

## Understanding the useTheme Hook

The `useTheme` hook from `next-themes` provides the following properties:

```typescript
import { useTheme } from "next-themes"

const { theme, setTheme, systemTheme, resolvedTheme } = useTheme()
```

- **`theme`**: The currently selected theme (`"light"`, `"dark"`, or `"system"`)
- **`setTheme(name)`**: Function to change the theme
- **`systemTheme`**: The actual system preference (`"light"` or `"dark"`)
- **`resolvedTheme`**: The theme that's actually being displayed (resolves `"system"` to either `"light"` or `"dark"`)

### Important: Handling Hydration

To prevent hydration mismatches between server and client, you should use a `mounted` state:

```typescript
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) {
  return null // or a placeholder
}
```

This ensures the theme toggle only renders on the client after hydration is complete.

## Implementation Examples

### Example 1: Simple Toggle Button

A basic button that switches between light and dark themes:

```tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"

export function SimpleThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="px-4 py-2 rounded-md bg-secondary text-secondary-foreground hover:bg-secondary/80"
    >
      {theme === "dark" ? "Light" : "Dark"} Mode
    </button>
  )
}
```

### Example 2: Icon-Based Toggle

A more polished toggle using Sun and Moon icons from `lucide-react`:

```tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    // Return a placeholder with the same dimensions to prevent layout shift
    return (
      <div className="w-10 h-10" />
    )
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
      aria-label="Toggle theme"
    >
      <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
```

### Example 3: Dropdown Menu with Three Options

A dropdown that allows selecting light, dark, or system theme:

```tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun, Monitor, ChevronDown } from "lucide-react"

export function ThemeDropdown() {
  const [mounted, setMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-32 h-10" />
  }

  const themes = [
    { name: "light", icon: Sun, label: "Light" },
    { name: "dark", icon: Moon, label: "Dark" },
    { name: "system", icon: Monitor, label: "System" },
  ]

  const currentTheme = themes.find(t => t.name === theme) || themes[0]
  const Icon = currentTheme.icon

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-input bg-background hover:bg-accent hover:text-accent-foreground transition-colors"
        aria-label="Select theme"
      >
        <Icon className="h-4 w-4" />
        <span className="text-sm">{currentTheme.label}</span>
        <ChevronDown className="h-3 w-3" />
      </button>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 z-10"
            onClick={() => setIsOpen(false)}
          />
          <div className="absolute right-0 mt-2 w-40 rounded-md border border-input bg-popover shadow-lg z-20">
            {themes.map((t) => {
              const ThemeIcon = t.icon
              return (
                <button
                  key={t.name}
                  onClick={() => {
                    setTheme(t.name)
                    setIsOpen(false)
                  }}
                  className={`w-full flex items-center gap-2 px-3 py-2 text-sm hover:bg-accent hover:text-accent-foreground transition-colors ${
                    theme === t.name ? "bg-accent text-accent-foreground" : ""
                  }`}
                >
                  <ThemeIcon className="h-4 w-4" />
                  <span>{t.label}</span>
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
```

### Example 4: Animated Toggle Button

A smooth, animated toggle with the orange-500 accent color:

```tsx
"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Moon, Sun } from "lucide-react"

export function AnimatedThemeToggle() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme, resolvedTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="w-16 h-8" />
  }

  const isDark = resolvedTheme === "dark"

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="relative inline-flex h-8 w-16 items-center rounded-full border-2 border-border transition-colors hover:border-orange-500/50"
      style={{ backgroundColor: isDark ? "#1f1f1f" : "#f5f5f5" }}
      aria-label="Toggle theme"
    >
      <span
        className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-orange-500 transition-transform duration-300 ease-in-out"
        style={{
          transform: isDark ? "translateX(32px)" : "translateX(4px)",
        }}
      >
        {isDark ? (
          <Moon className="h-3.5 w-3.5 text-white" />
        ) : (
          <Sun className="h-3.5 w-3.5 text-white" />
        )}
      </span>
    </button>
  )
}
```

## Integration with Header Component

The header component is located at `components/ui/header.tsx`. Here are some recommended places to add the theme toggle:

### Option 1: Add to Desktop Actions (Recommended)

Add the toggle button next to the login and get started buttons:

```tsx
// In components/ui/header.tsx
import { ThemeToggle } from "@/components/theme-toggle"

// Inside the Header component, find the desktop actions div:
<div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-3 sm:space-y-0 md:w-fit">
  <ThemeToggle /> {/* Add here */}
  <Button variant="outline" size="sm" className={cn(isScrolled && "lg:hidden")}>
    <span>{t('header.login')}</span>
  </Button>
  <Button
    size="sm"
    className={cn(
      isScrolled
        ? "lg:inline-flex bg-orange-500 hover:bg-orange-600"
        : "hidden bg-orange-500 hover:bg-orange-600",
    )}
  >
    <span>{t('header.getStarted')}</span>
  </Button>
</div>
```

### Option 2: Add Before Logo

Add the toggle button at the start of the header, next to the menu:

```tsx
// Inside the Header component, find the flex container with Logo:
<div className="flex w-full justify-between lg:w-auto">
  <Link href="/" aria-label="home" className="flex items-center space-x-2">
    <Menubar>
      <MenubarMenu>
        <MenubarTrigger>
          <Menu className="h-5 w-5" />
        </MenubarTrigger>
        {/* ... menu content ... */}
      </MenubarMenu>
    </Menubar>
    <Logo />
  </Link>
  <ThemeToggle /> {/* Add here for mobile and desktop */}
  {/* ... mobile menu toggle ... */}
</div>
```

### Option 3: Add to Mobile Menu

Include the theme toggle in the mobile menu dropdown:

```tsx
<div className="bg-background group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl border p-6 shadow-2xl shadow-zinc-300/20 md:flex-nowrap lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent dark:shadow-none dark:lg:bg-transparent">
  <div className="lg:hidden">
    <ul className="space-y-6 text-base">
      {/* Navigation items */}
    </ul>
    <div className="mt-4">
      <ThemeToggle /> {/* Add here for mobile menu */}
    </div>
  </div>
  {/* ... rest of mobile menu ... */}
</div>
```

## Styling Suggestions

The application uses the orange-500 color (`#f97316`) as the primary accent. Here are some styling tips:

### Using the Orange Accent

```tsx
// Button with orange accent
<button className="bg-orange-500 hover:bg-orange-600 text-white">
  Toggle Theme
</button>

// Border with orange accent
<button className="border-2 border-orange-500 hover:border-orange-600">
  Toggle Theme
</button>

// Icon with orange tint
<Sun className="h-5 w-5 text-orange-500" />
```

### Matching the Existing Design System

The application uses Tailwind CSS v4 with custom CSS variables. To match the existing design:

```tsx
// Use design system colors
<button className="bg-background text-foreground border border-border hover:bg-accent hover:text-accent-foreground">

// Use design system spacing and borders
<button className="px-4 py-2 rounded-md">

// Use design system transitions
<button className="transition-colors duration-200">
```

### Smooth Transitions

For a polished feel, add transitions to your theme toggle:

```tsx
<button className="transition-all duration-300 ease-in-out">
  {/* Icon transitions */}
  <Sun className="transition-transform duration-300 dark:rotate-180 dark:scale-0" />
  <Moon className="transition-transform duration-300 dark:rotate-0 dark:scale-100" />
</button>
```

## Troubleshooting

### Issue: Hydration Mismatch Warning

**Problem**: You see a warning about hydration mismatches in the console.

**Solution**: Always use the `mounted` state pattern shown in the examples above. This ensures the theme toggle only renders on the client after hydration.

```tsx
const [mounted, setMounted] = useState(false)

useEffect(() => {
  setMounted(true)
}, [])

if (!mounted) {
  return null // or a placeholder with same dimensions
}
```

### Issue: Theme Flashing on Page Load

**Problem**: You see a brief flash of the wrong theme when the page loads.

**Solution**: The `suppressHydrationWarning` prop is already added to the `<html>` tag in `app/layout.tsx`. This prevents the warning, and `next-themes` handles the flash prevention automatically with its built-in script.

### Issue: Theme Not Persisting

**Problem**: The selected theme doesn't persist across page refreshes.

**Solution**: `next-themes` automatically stores the theme preference in `localStorage`. Make sure you're not clearing localStorage or using incognito mode.

### Issue: Icons Not Switching

**Problem**: The Sun/Moon icons aren't switching properly.

**Solution**: Make sure you're using the `dark:` variant correctly and that the parent element has the `dark` class. Use `resolvedTheme` instead of `theme` if you need the actual active theme:

```tsx
const { resolvedTheme } = useTheme()
const isDark = resolvedTheme === "dark"
```

### Issue: Layout Shift When Toggle Appears

**Problem**: The page layout shifts when the theme toggle appears after mounting.

**Solution**: Return a placeholder element with the same dimensions:

```tsx
if (!mounted) {
  return <div className="w-10 h-10" /> // Same size as the button
}
```

## Best Practices

1. **Always handle mounting**: Use the `mounted` pattern to prevent hydration issues
2. **Provide accessible labels**: Use `aria-label` on icon-only buttons
3. **Use semantic HTML**: Use `<button>` elements for interactive controls
4. **Add keyboard support**: Ensure toggles work with keyboard navigation
5. **Test both themes**: Always test your UI in both light and dark modes
6. **Use CSS transitions**: Add smooth transitions for a polished feel
7. **Follow design system**: Use existing Tailwind classes and CSS variables
8. **Respect system preference**: The default "system" theme is user-friendly
9. **Provide visual feedback**: Use hover states and active states
10. **Keep it simple**: Don't overcomplicate the UI—a simple toggle is often best

## Additional Resources

- [next-themes Documentation](https://github.com/pacocoursey/next-themes)
- [Next.js App Router Documentation](https://nextjs.org/docs/app)
- [Tailwind CSS Dark Mode](https://tailwindcss.com/docs/dark-mode)
- [lucide-react Icons](https://lucide.dev/)

## Summary

You now have everything you need to implement a theme toggle button:

1. The theme provider is already set up in `app/layout.tsx`
2. Choose an implementation example that fits your needs
3. Create a new component file (e.g., `components/theme-toggle.tsx`)
4. Import and add the component to your header
5. Test in both light and dark modes

The theme system is fully functional—you just need to add the UI control for users to switch themes manually. Choose the implementation that best fits your design preferences and user experience goals.

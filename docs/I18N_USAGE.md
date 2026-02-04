# i18next Integration Guide

This application now supports internationalization (i18n) using i18next with English and Traditional Chinese languages.

## Available Languages

- **English** (en) - Default language
- **Traditional Chinese** (zh-TW) - 繁體中文

## How to Switch Languages

### Method 1: Using Browser LocalStorage

You can switch languages by setting the language in your browser's localStorage:

```javascript
// Switch to Traditional Chinese
localStorage.setItem('i18nextLng', 'zh-TW');

// Switch to English
localStorage.setItem('i18nextLng', 'en');

// Reload the page to apply changes
window.location.reload();
```

### Method 2: Using URL Query Parameter

Add `?lng=zh-TW` to the URL to load the page in Traditional Chinese:

```
http://localhost:3000/?lng=zh-TW
```

Or for English:

```
http://localhost:3000/?lng=en
```

### Method 3: Browser Console

Open the browser console (F12) and run:

```javascript
// For Traditional Chinese
localStorage.setItem('i18nextLng', 'zh-TW');
window.location.reload();

// For English
localStorage.setItem('i18nextLng', 'en');
window.location.reload();
```

## Adding a Language Switcher Button

To add a UI button for language switching, you can create a component like this:

```tsx
'use client';

import { useTranslation } from 'react-i18next';

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="flex gap-2">
      <button
        onClick={() => changeLanguage('en')}
        className={`px-4 py-2 rounded ${
          i18n.language === 'en' ? 'bg-orange-500 text-white' : 'bg-gray-200'
        }`}
      >
        English
      </button>
      <button
        onClick={() => changeLanguage('zh-TW')}
        className={`px-4 py-2 rounded ${
          i18n.language === 'zh-TW' ? 'bg-orange-500 text-white' : 'bg-gray-200'
        }`}
      >
        繁體中文
      </button>
    </div>
  );
}
```

Then add it to your header or any component:

```tsx
import { LanguageSwitcher } from '@/components/language-switcher';

// In your component JSX:
<LanguageSwitcher />
```

## Translation Files Location

- English: `locales/en/translation.json`
- Traditional Chinese: `locales/zh-TW/translation.json`

## Adding New Translations

1. Add the translation key to both `locales/en/translation.json` and `locales/zh-TW/translation.json`
2. Use the `useTranslation` hook in your component:

```tsx
import { useTranslation } from 'react-i18next';

function MyComponent() {
  const { t } = useTranslation();
  
  return <h1>{t('myKey')}</h1>;
}
```

## Configuration

The i18n configuration is located in `lib/i18n/config.ts`. It includes:

- Language detection from query strings, localStorage, and browser settings
- Fallback to English if the selected language is not available
- Automatic caching of language preference in localStorage

## Testing

To test the translations:

1. Start the development server: `npm run dev`
2. Open the browser console (F12)
3. Run: `localStorage.setItem('i18nextLng', 'zh-TW'); window.location.reload();`
4. The page should now display in Traditional Chinese
5. Run: `localStorage.setItem('i18nextLng', 'en'); window.location.reload();`
6. The page should switch back to English

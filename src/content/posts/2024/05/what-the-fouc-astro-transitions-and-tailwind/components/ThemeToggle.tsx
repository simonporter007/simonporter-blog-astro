import { useEffect, useState } from 'react';

/* Simplified theme toggle for FOUC demo */
export default function ThemeToggle() {
  const [theme, setTheme] = useState('');
  const isDark = theme === 'dark';

  useEffect(() => {
    if (!theme) {
      setTheme(localStorage?.getItem('theme') || 'light');
    }
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.dataset.theme = isDark
      ? 'dracula'
      : 'github-light';

    localStorage?.setItem('theme', theme);
  }, [isDark, theme]);

  const handleClick = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  return <button onClick={handleClick}>{isDark ? '🌚' : '🌞'}</button>;
}

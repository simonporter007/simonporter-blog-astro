const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class'],
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      typography: {
        DEFAULT: {
          css: {
            a: {
              textDecoration: 'none',
              background:
                'linear-gradient(to right, hsl(var(--ring)), hsl(var(--ring))), linear-gradient(to right, hsl(var(--accent-foreground)),hsl(var(--accent-foreground)))',
              backgroundSize: '100% 2px, 0 2px',
              backgroundPosition: '100% 100%, 0 100%',
              backgroundRepeat: 'no-repeat',
              transition: 'background-size 400ms',
              '&:hover': {
                backgroundSize: '0 2px, 100% 2px',
              },
            },
          },
        },
      },
      animationDuration: {
        '2s': '2s',
        '10s': '10s',
      },
      fontFamily: {
        headline: [
          'Bowlby One SC',
          'Bowlby One SC fallback',
          ...defaultTheme.fontFamily.sans,
        ],
        sans: ['Nunito', 'Nunito fallback', ...defaultTheme.fontFamily.sans],
      },
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        rotate: {
          '0%': { transform: 'rotate(1turn)' },
        },
        rotateBefore: {
          '0%': { transform: 'rotate(-2turn)' },
        },
        rotateAfter: {
          '0%': { transform: 'rotate(2turn)' },
        },
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'), require('tailwindcss-animate')],
};

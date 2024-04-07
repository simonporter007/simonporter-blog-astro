import { animated, useSpring, useTrail } from '@react-spring/web';
import { useEffect, useState } from 'react';

import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';

/* Adapted from the brilliant https://www.joshwcomeau.com/ - it's the tiny things that cause pure delight */
export default function ThemeToggle() {
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');
  const prefersReducedMotion = usePrefersReducedMotion();
  const isDark = theme === 'dark';

  const svgSpring = useSpring({
    transform: isDark ? 'rotate(40deg)' : 'rotate(90deg)',
    immediate: prefersReducedMotion,
  });
  const maskSpring = useSpring({
    cx: isDark ? 10 : 25,
    cy: isDark ? 2 : 0,
    config: {
      mass: 3.1,
      friction: 21,
    },
    immediate: prefersReducedMotion,
  });
  const sunMoonSpring = useSpring({
    r: isDark ? 8 : 5,
    immediate: prefersReducedMotion,
  });

  const sunDotAngles = [0, 60, 120, 180, 240, 300];

  const sunDotTrail = useTrail(sunDotAngles.length, {
    transform: isDark ? 0 : 1,
    transformOrigin: 'center center',
    immediate: isDark || prefersReducedMotion,
    config: {
      tension: 210,
      friction: 20,
    },
  });

  const moonStarsTrail = useTrail(2, {
    transform: isDark ? 0.25 : 0,
    transformOrigin: 'center center',
    immediate: !isDark || prefersReducedMotion,
    config: {
      tension: 200,
      friction: 8,
    },
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    document.documentElement.dataset.theme = isDark
      ? 'dracula'
      : 'github-light';

    localStorage.setItem('theme', theme);
  }, [isDark, theme]);

  const handleClick = () => {
    setTheme(isDark ? 'light' : 'dark');
  };

  const title = isDark ? 'Activate light mode' : 'Activate dark mode';

  return (
    <button
      aria-label={title}
      title={title}
      onClick={handleClick}
      className='grid place-content-center text-accent-foreground transition animate-in animate-out hover:text-ring'
    >
      <animated.svg
        className='relative size-6 overflow-visible hover:text-ring'
        viewBox='0 0 18 18'
        style={svgSpring}
      >
        {moonStarsTrail.map(({ transform, ...props }, index) => {
          return (
            <animated.path
              key={index}
              fill='currentColor'
              style={{
                ...props,
                transform: transform.to((t) => {
                  const scale = index === 0 ? t : t + 0.1;
                  const [x, y] = index === 0 ? [4, -8] : [4, -22];
                  return `scale(${scale}) translate(${x}px, ${y}px)`;
                }),
              }}
              d='M9.5 14.25l-5.584 2.936 1.066-6.218L.465 6.564l6.243-.907L9.5 0l2.792 5.657 6.243.907-4.517 4.404 1.066 6.218'
            />
          );
        })}

        <mask id={`moon-mask`}>
          <rect x='0' y='0' width='20' height='20' fill='#FFF' />
          <animated.circle {...maskSpring} r='8' fill='black' />
        </mask>

        <animated.circle
          cx='9'
          cy='9'
          mask={`url(#moon-mask)`}
          fill='currentColor'
          {...sunMoonSpring}
        />

        {/* Sun dots */}
        <g>
          {sunDotTrail.map(({ transform, ...props }, index) => {
            const angle = sunDotAngles[index];
            const centerX = 9;
            const centerY = 9;

            const angleInRads = (angle / 180) * Math.PI;

            const c = 8; // hypothenuse

            // I was getting a rehydration error because apparently
            // there was a different # of decimal places between
            // Node and browser. Round to 6 decimal places to avoid
            // this rehydration warning.
            const a = Math.round(
              +(centerX + c * Math.cos(angleInRads)).toFixed(6)
            );
            const b = Math.round(
              +(centerY + c * Math.sin(angleInRads)).toFixed(6)
            );

            return (
              <animated.circle
                key={angle}
                cx={a}
                cy={b}
                r={1.5}
                fill='currentColor'
                style={{
                  ...props,
                  transform: transform.to((t) => `scale(${t})`),
                }}
              />
            );
          })}
        </g>
      </animated.svg>
    </button>
  );
}

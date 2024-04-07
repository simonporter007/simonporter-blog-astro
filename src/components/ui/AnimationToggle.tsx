import { usePrefersReducedMotion } from '@/hooks/usePrefersReducedMotion';
import { animated, useTrail } from '@react-spring/web';
import { useEffect, useState } from 'react';

/* Adapted from the brilliant https://www.joshwcomeau.com/ - it's the tiny things that cause pure delight */
export default function AnimationToggle() {
  const prefersReducedMotion = usePrefersReducedMotion();
  const [isAnimationsEnabled, setIsAnimationEnabled] = useState(
    !prefersReducedMotion && localStorage.getItem('animate') === 'true'
  );

  const boostTrail = useTrail(1, {
    transform: !isAnimationsEnabled || prefersReducedMotion ? 0 : 1,
    transformOrigin: 'bottom left',
    immediate: !isAnimationsEnabled,
    config: {
      tension: 200,
      friction: 8,
    },
  });

  useEffect(() => {
    if (prefersReducedMotion) {
      setIsAnimationEnabled(false);
    }
  }, [prefersReducedMotion]);

  useEffect(() => {
    document.documentElement.dataset.animate = `${isAnimationsEnabled}`;
    localStorage.setItem('animate', `${isAnimationsEnabled}`);
  }, [isAnimationsEnabled]);

  const handleClick = () => {
    setIsAnimationEnabled(!isAnimationsEnabled);
  };

  const title = prefersReducedMotion
    ? 'Prefers reduced motion enabled'
    : isAnimationsEnabled
      ? 'Turn off animations'
      : 'Turn on animations';

  return (
    <button
      aria-label={title}
      title={title}
      onClick={handleClick}
      disabled={prefersReducedMotion}
      className='grid place-content-center text-accent-foreground transition animate-in animate-out hover:text-ring disabled:text-muted-foreground'
    >
      <animated.svg
        className='relative size-6 overflow-visible'
        viewBox='0 0 24 24'
      >
        <animated.path
          fill='currentColor'
          fillRule='evenodd'
          clipRule='evenodd'
          d='M17.992 1.25h.679c.753 0 1.393 0 1.903.068c.543.073 1.05.235 1.46.643c.41.41.574.916.647 1.458c.07.508.069 1.146.069 1.896v.677c0 .901.001 1.56-.25 2.165c-.252.605-.72 1.07-1.36 1.707l-.096.095l-2.265 2.256l.039.06c.34.527.62.957.822 1.33c.21.387.363.757.425 1.17a3.64 3.64 0 0 1-.25 1.948a3.242 3.242 0 0 1-.433.693c-.176.226-.39.472-.619.721c-.455.495-1 1.038-1.483 1.52l-.007.006l-.073.073c-.674.671-1.844.455-2.205-.449c-.199-.498-.276-.69-.373-.865a3.456 3.456 0 0 0-.31-.47c-.123-.156-.266-.301-.634-.668l-.423-.37a2.026 2.026 0 0 1-.216.011c-.579 0-1.053-.242-1.489-.573c-.41-.311-.862-.762-1.394-1.292l-1.267-1.261c-.532-.53-.985-.981-1.297-1.389c-.333-.434-.577-.907-.577-1.487c0-.087.005-.173.016-.257l-.687-.685a3.476 3.476 0 0 0-1.269-.831l-.33-.13a1.414 1.414 0 0 1-.478-2.318l.007-.006a50.196 50.196 0 0 1 1.525-1.477c.25-.228.497-.441.724-.616c.216-.167.46-.334.695-.432a3.694 3.694 0 0 1 1.952-.247c.413.06.783.213 1.172.422c.374.201.807.48 1.335.819l.066.042l2.269-2.26l.095-.094c.64-.638 1.107-1.104 1.713-1.354c.606-.25 1.266-.25 2.172-.249m-.3 12.047c.281.435.483.754.63 1.023c.166.306.233.502.26.676c.055.377.006.775-.15 1.149c-.02.045-.085.159-.235.351c-.14.18-.323.392-.538.626c-.405.44-.893.929-1.357 1.392a7.33 7.33 0 0 0-.365-.815a4.966 4.966 0 0 0-.445-.673c-.188-.24-.403-.453-.74-.788l-.036-.036a8.77 8.77 0 0 0 .101-.086c.33-.284.699-.652 1.124-1.075zm.434-10.547c-1.097 0-1.438.013-1.734.136c-.296.122-.546.352-1.322 1.124L9.984 9.075c-.435.433-.76.758-1.006 1.037c-.246.281-.364.465-.42.603a.536.536 0 0 0-.043.208c0 .118.037.274.268.575c.243.318.622.698 1.2 1.274l.069.067l1.263-1.257a.75.75 0 0 1 1.058 1.063l-1.258 1.253l.063.063c.579.576.96.954 1.28 1.197c.302.23.46.267.58.267c.063 0 .123-.01.194-.036c.136-.05.32-.162.605-.409c.285-.245.617-.575 1.062-1.019l5.087-5.065c.776-.773 1.006-1.02 1.129-1.315c.122-.293.135-.63.135-1.723v-.493c0-.814-.002-1.35-.055-1.746c-.05-.374-.135-.51-.22-.595c-.084-.084-.222-.168-.6-.219c-.399-.053-.937-.055-1.754-.055zm.221 2.883a2.445 2.445 0 0 0-3.448 0a2.428 2.428 0 0 0 0 3.442a2.445 2.445 0 0 0 3.448 0a2.428 2.428 0 0 0 0-3.442m-2.39 1.063a.945.945 0 0 1 1.332 0a.928.928 0 0 1 0 1.316a.945.945 0 0 1-1.331 0a.928.928 0 0 1 0-1.316m-5.303-.405a16.741 16.741 0 0 0-1.023-.624c-.307-.165-.505-.233-.68-.26a2.194 2.194 0 0 0-1.158.15c-.047.02-.162.086-.355.234c-.18.14-.394.322-.628.536c-.441.402-.929.885-1.392 1.346l.209.082l.005.002l.112.045c.583.24 1.116.59 1.57 1.028l.085.085l.34.339a7.26 7.26 0 0 1 .112-.13c.282-.322.643-.683 1.058-1.096z'
        />
        {boostTrail.map(({ transform, ...props }, index) => {
          return (
            <animated.path
              key={index}
              fill='currentColor'
              style={{
                ...props,
                transform: transform.to((t) => {
                  return `scale(${t})`;
                }),
              }}
              d='M3.003 12.357a.75.75 0 0 1 0 1.06l-.154.154a.335.335 0 0 0 0 .475a.338.338 0 0 0 .477 0l1.692-1.69a.75.75 0 1 1 1.06 1.061l-1.692 1.69a1.838 1.838 0 0 1-2.597 0a1.835 1.835 0 0 1 0-2.597l.153-.154a.75.75 0 0 1 1.061 0m4.854.997a.75.75 0 0 1 0 1.06L5.74 16.53a.75.75 0 0 1-1.06-1.06l2.116-2.117a.75.75 0 0 1 1.061 0m2.776 2.772a.75.75 0 0 1 0 1.06L8.53 19.289a.75.75 0 1 1-1.06-1.06l2.102-2.103a.75.75 0 0 1 1.06 0m-3.16.395a.75.75 0 0 1-.012 1.06l-1.71 1.673a.75.75 0 0 1-1.048-1.073l1.71-1.672a.75.75 0 0 1 1.06.012m4.134 1.405a.75.75 0 0 1 0 1.06l-1.692 1.69a.335.335 0 0 0 0 .475a.338.338 0 0 0 .478 0l.154-.153a.75.75 0 1 1 1.06 1.061l-.154.154a1.838 1.838 0 0 1-2.598 0a1.835 1.835 0 0 1 0-2.598l1.692-1.69a.75.75 0 0 1 1.06.001'
            />
          );
        })}
      </animated.svg>
    </button>
  );
}

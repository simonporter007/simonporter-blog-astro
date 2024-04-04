import { useGetAlien, type Alien } from './useGetAlienWithStringSelect';

const selectEyeCount = (alien: Alien) => alien?.eyes ?? 0;

export function useGetAlienEyeCount() {
  return useGetAlien({
    id: 123,
    options: {
      select: selectEyeCount,
    },
  });
}

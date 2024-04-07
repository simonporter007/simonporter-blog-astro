import { useGetAlien, type Alien } from './useGetAlienWithStringSelect';

const selectName = (alien: Alien) => alien?.name;

export function useGetAlienName({ id }: { id: number }) {
  return useGetAlien({
    id,
    options: {
      //@ts-expect-error: selectName returns a string, but it's expecting a number
      // Type '(alien: Alien) => string' is not assignable to type '(alien: Alien) => number'.
      //     Type 'string' is not assignable to type 'number'.ts(2322)
      select: selectName,
    },
  });
}

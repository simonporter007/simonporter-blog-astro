import { useQuery } from '@tanstack/react-query';

export type Alien = {
  id: number;
  name: string;
  colour: string;
  eyes: number;
  arms: number;
  legs: number;
};

export function useGetAlien({
  id,
  options,
}: {
  id: number;
  options?: {
    // eslint-disable-next-line no-unused-vars
    select?: (alien: Alien) => number;
  };
}) {
  return useQuery({
    queryKey: ['alien', { id }],
    queryFn: async () => {
      // This is where you would fetch the user data from an API (e.g. axios.get<Alien>(`/api/alien/${id}`))
      return {
        id: 123,
        name: 'Baglorag Snargleblurf',
        colour: 'green',
        eyes: 3,
        arms: 8,
        legs: 3,
      } as Alien;
    },
    ...options,
  });
}

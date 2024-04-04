import { ReactQueryProvider } from '@/components/layout/ReactQueryProvider';
import { useGetAlien } from '@/content/posts/2023/03/slicing-data-with-tanstack-query/hooks/useGetAlien';
import { useGetAlienEyeCount } from '@/content/posts/2023/03/slicing-data-with-tanstack-query/hooks/useGetAlienEyeCount';
import { log } from '@/utils/log';

function LogQueries() {
  const getAlienQuery = useGetAlien({ id: 123 });
  const getAlienEyesQuery = useGetAlienEyeCount();

  if (getAlienQuery.isLoading || getAlienEyesQuery.isLoading) {
    return null;
  }

  log(
    `Here's the result of our 👽 query and the result from the custom select hook for the 👀 count:`
  );
  console.info({
    useGetAlienQueryData: getAlienQuery?.data,
    useGetAlienEyeCountData: getAlienEyesQuery?.data,
  });

  return null;
}

export function QueryLogger() {
  return (
    <ReactQueryProvider>
      <LogQueries />
    </ReactQueryProvider>
  );
}

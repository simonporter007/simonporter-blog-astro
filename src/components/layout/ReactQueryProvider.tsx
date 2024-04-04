import { useIsMobile } from '@/hooks/useIsMobile';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, lazy } from 'react';

const queryClient = new QueryClient();
const ReactQueryDevtoolsProduction = lazy(() =>
  // @ts-expect-error - would need to switch tsconfig to nodenext which causes more issues
  import('@tanstack/react-query-devtools/production').then((d) => ({
    default: d.ReactQueryDevtools,
  }))
);

export function ReactQueryProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const isMobile = useIsMobile();

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={null}>
        {!isMobile ? <ReactQueryDevtoolsProduction /> : null}
      </Suspense>
      {children}
    </QueryClientProvider>
  );
}

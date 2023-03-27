import React, { lazy, Suspense } from 'react';

interface FactoryProps {
  componentName: string;
}

export function Factory({ componentName }: FactoryProps) {
  const MyComponent = lazy(() => import(`../../components/${componentName}`).catch((error) => {
    return import('./Error')
  }));

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyComponent />
    </Suspense>
  );
};
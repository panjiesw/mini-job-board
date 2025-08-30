import { DefaultLayout } from '@/components/default-layout';
import { JobList } from '@/components/job-list';
import { Suspense } from 'react';

export default function Home() {
  return (
    <DefaultLayout>
      <main className="flex-1 flex flex-col gap-6 px-4 w-full">
        <h2 className="font-semibold text-xl mb-4">Available Jobs</h2>
        <Suspense>
          <JobList />
        </Suspense>
      </main>
    </DefaultLayout>
  );
}

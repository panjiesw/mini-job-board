import { DefaultLayout } from '@/components/default-layout';
import { JobForm } from '@/components/job-form';

export default function NewJob() {
  return (
    <DefaultLayout>
      <main className="flex-1 px-4 min-w-2xl">
        <JobForm />
      </main>
    </DefaultLayout>
  );
}

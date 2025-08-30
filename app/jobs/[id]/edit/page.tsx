import { DefaultLayout } from '@/components/default-layout';
import { JobForm } from '@/components/job-form';
import { PARAM_ID, TABLE_JOB } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';

export default async function EditJob(props: PageProps<'/jobs/[id]/edit'>) {
  const supabase = await createClient();

  const { id } = await props.params;
  const { data } = await supabase
    .from(TABLE_JOB)
    .select('*,user_profile(*)')
    .eq(PARAM_ID, id)
    .limit(1)
    .single();

  if (data == null) {
    return notFound();
  }
  return (
    <DefaultLayout>
      <main className="flex-1 px-4 min-w-2xl">
        <JobForm id={id} defaultValues={{ ...data }} />
      </main>
    </DefaultLayout>
  );
}

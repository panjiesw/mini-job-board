import { DefaultLayout } from '@/components/default-layout';
import { JobForm } from '@/components/job-form';
import { PARAM_ID, TABLE_JOB } from '@/lib/constants';
import { createClient } from '@/lib/supabase/server';
import { notFound, redirect } from 'next/navigation';

export default async function EditJob(props: PageProps<'/jobs/[id]/edit'>) {
  const supabase = await createClient();

  const { id } = await props.params;

  const { data: userData, error } = await supabase.auth.getUser();
  if (error || !userData?.user) {
    return redirect(`/auth/login?redirect_to=/jobs/${id}/edit`);
  }
  const { data } = await supabase
    .from(TABLE_JOB)
    .select('*,user_profile(*)')
    .eq(PARAM_ID, id)
    .limit(1)
    .single();

  if (data == null || data.user_profile.id !== userData.user.id) {
    return notFound();
  }
  return (
    <DefaultLayout>
      <main className="flex-1 px-4 md:min-w-2xl min-w-lg">
        <h2 className="font-semibold text-xl mb-4">Edit Job Post</h2>
        <JobForm id={id} defaultValues={{ ...data }} />
      </main>
    </DefaultLayout>
  );
}

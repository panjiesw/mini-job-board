import { DefaultLayout } from '@/components/default-layout';
import { JobList } from '@/components/job-list';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function Jobs() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return redirect('/auth/login?redirect_to=/jobs');
  }

  return (
    <DefaultLayout>
      <main className="flex-1 flex flex-col gap-6 px-4 w-full">
        <h2 className="font-semibold text-xl mb-4">My Posted Jobs</h2>
        <JobList userId={data.user.id} />
      </main>
    </DefaultLayout>
  );
}

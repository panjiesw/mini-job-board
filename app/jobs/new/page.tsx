import { DefaultLayout } from '@/components/default-layout';
import { JobForm } from '@/components/job-form';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';

export default async function NewJob() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.getUser();
  if (error || !data?.user) {
    return redirect("/auth/login?redirect_to=/jobs/new");
  }

  return (
    <DefaultLayout>
      <main className="flex-1 px-4 md:min-w-2xl min-w-lg">
        <h2 className="font-semibold text-xl mb-4">Add New Job Post</h2>
        <JobForm />
      </main>
    </DefaultLayout>
  );
}

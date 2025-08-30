import { DefaultLayout } from '@/components/default-layout';
import { JobManageButtons } from '@/components/job-manage-buttons';
import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { PARAM_ID, TABLE_JOB } from '@/lib/constants';
import { getCurrentTZString } from '@/lib/dates';
import { genAvatar } from '@/lib/gravatar';
import { createClient } from '@/lib/supabase/server';
import { formatDistance } from 'date-fns';
import { toZonedTime } from 'date-fns-tz';
import { Check } from 'lucide-react';
import { notFound } from 'next/navigation';

export default async function Job(props: PageProps<'/job/[id]'>) {
  const supabase = await createClient();

  const { id } = await props.params;
  const { data } = await supabase
    .from(TABLE_JOB)
    .select('*,user_profile(*)')
    .eq(PARAM_ID, id)
    .limit(1)
    .single();
  const { data: userData } = await supabase.auth.getUser();

  if (data == null) {
    return notFound();
  }

  return (
    <DefaultLayout>
      <main className="flex-1 flex flex-col gap-6 px-4 min-w-2xl">
        <div className="flex flex-row items-center gap-2">
          <Avatar className="rounded-xs border-muted-foreground border-[1px] size-14">
            <AvatarImage src={genAvatar(data.company)} />
          </Avatar>
          <span className="font-medium">{data.company}</span>
        </div>
        <div className="flex flex-col gap-1">
          <div className="flex flex-row gap-2">
            <h2 className="font-bold text-xl">{data.title}</h2>
            {data.user_profile.id == userData.user?.id ? (
              <>
                <span className="flex-1" />
                <JobManageButtons id={id} />
              </>
            ) : null}
          </div>
          <span className="text-muted-foreground">
            {data.location} {' - '}
            {formatDistance(
              toZonedTime(data.updated_at, getCurrentTZString()),
              new Date(),
              { addSuffix: true },
            )}
          </span>
          <span className="text-muted-foreground">
            Posted by {data.user_profile.display_name}
          </span>
        </div>
        <div className="flex flex-row gap-2">
          <Badge variant="default">
            <Check />
            {data.job_type}
          </Badge>
          <Badge variant="default">
            <Check />
            {data.location_type}
          </Badge>
        </div>
        <div
          className="mb-3 text-gray-500 dark:text-gray-400"
          dangerouslySetInnerHTML={{ __html: data.description }}
        />
      </main>
    </DefaultLayout>
  );
}

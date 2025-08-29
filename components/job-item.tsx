import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';
import { genAvatar } from '@/lib/gravatar';
import { useMemo } from 'react';
import { formatDistance } from 'date-fns';

export type JobItemProps = {
  id: string;
  title: string;
  company: string;
  job_type: 'Contract' | 'Full-Time' | 'Part-Time';
  location: string;
  location_type: 'Remote' | 'Hybrid' | 'On-site';
  updated_at: Date;
};

export const JobItem = ({
  id,
  title,
  company,
  job_type,
  location,
  location_type,
  updated_at,
}: JobItemProps) => {
  const now = useMemo(() => new Date(), []);
  return (
    <section className="mb-6">
      <div className="flex flex-row gap-2">
        <Avatar className="rounded-xs border-muted-foreground border-[1px] size-14">
          <AvatarImage src={genAvatar(company)} />
        </Avatar>
        <div className="flex flex-col">
          <h3 className="font-medium text-blue-600 leading-none mb-1">
            <Link href={`/job/${id}`}>{title}</Link>
            <span className="font-normal ml-4 text-muted-foreground">
              {formatDistance(updated_at, now, { addSuffix: true })}
            </span>
          </h3>
          <span>
            {company} - {location} ({location_type})
          </span>
          <span className="text-muted-foreground">{job_type}</span>
        </div>
        <span className="flex-1" />
      </div>
    </section>
  );
};

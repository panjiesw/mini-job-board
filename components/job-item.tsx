import Link from 'next/link';
import { Avatar, AvatarImage } from './ui/avatar';
import { genAvatar } from '@/lib/gravatar';
import { useMemo } from 'react';
import { formatDistance } from 'date-fns';
import { JobManageButtons } from './job-manage-buttons';
import { formatInTimeZone, toZonedTime } from 'date-fns-tz';
import { getCurrentTZString } from '@/lib/dates';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export type JobItemProps = {
  id: string;
  title: string;
  company: string;
  job_type: 'Contract' | 'Full-Time' | 'Part-Time';
  location: string;
  location_type: 'Remote' | 'Hybrid' | 'On-site';
  updated_at: Date;
  manage?: boolean;
  onManageDelete?: () => void;
};

export const JobItem = ({
  id,
  title,
  company,
  job_type,
  location,
  location_type,
  updated_at,
  manage,
  onManageDelete,
}: JobItemProps) => {
  const now = useMemo(() => new Date(), []);
  return (
    <section className="mb-6">
      <div className="flex flex-row gap-2">
        <Avatar className="rounded-xs border-muted-foreground border-[1px] size-14">
          <AvatarImage src={genAvatar(company)} />
        </Avatar>
        <div className="flex flex-col">
          <div className="flex flex-row gap-1 items-center">
            <h3 className="font-medium text-blue-600 leading-none mb-1">
              <Link href={`/job/${id}`}>{title}</Link>
            </h3>
            <span className="text-sm font-normal text-muted-foreground">
              -{' '}
              <Tooltip>
                <TooltipTrigger>
                  {formatDistance(
                    toZonedTime(updated_at, getCurrentTZString()),
                    now,
                    { addSuffix: true },
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  {formatInTimeZone(
                    updated_at,
                    getCurrentTZString(),
                    'yyyy-MM-dd HH:mm:ss zzz',
                  )}
                </TooltipContent>
              </Tooltip>
            </span>
          </div>
          <span>
            {company} - {location} ({location_type})
          </span>
          <span className="text-muted-foreground">{job_type}</span>
        </div>
        <span className="flex-1" />
        {manage ? (
          <JobManageButtons onManageDelete={onManageDelete} id={id} />
        ) : null}
      </div>
    </section>
  );
};

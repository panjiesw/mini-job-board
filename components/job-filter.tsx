'use client';
import { cn, setSearchParams } from '@/lib/utils';
import { ComponentPropsWithoutRef } from 'react';
import { Input } from './ui/input';
import { SelectJobType } from './select-job-type';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import {
  PARAM_JOB_TYPE,
  PARAM_LOCATION,
  PARAM_LOCATION_TYPE,
  PARAM_TITLE,
} from '@/lib/constants';
import { SelectLocationType } from './select-location-type';
import { Button } from './ui/button';
import Link from 'next/link';
import { Newspaper } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export type JobFilterProps = ComponentPropsWithoutRef<'div'> & {
  manage?: boolean;
};

export const JobFilter = ({ className, manage, ...props }: JobFilterProps) => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const debouncedTitleChange = useDebouncedCallback((value: string) => {
    replace(setSearchParams(pathname, searchParams, PARAM_TITLE, value));
  }, 400);

  const debouncedLocationChange = useDebouncedCallback((value: string) => {
    replace(setSearchParams(pathname, searchParams, PARAM_LOCATION, value));
  }, 400);

  return (
    <div
      className={cn(
        'mb-4 flex flex-row justify-center gap-2 md:min-w-2xl min-w-lg',
        className,
      )}
      {...props}
    >
      <Input
        placeholder="Search Title..."
        onChange={(e) => debouncedTitleChange(e.target.value)}
      />
      <Input
        placeholder="Search Location..."
        onChange={(e) => debouncedLocationChange(e.target.value)}
      />
      <SelectJobType
        defaultValue={searchParams.get(PARAM_JOB_TYPE) ?? undefined}
        onValueChange={(value) => {
          replace(
            setSearchParams(pathname, searchParams, PARAM_JOB_TYPE, value),
          );
        }}
      />
      <SelectLocationType
        defaultValue={searchParams.get(PARAM_LOCATION_TYPE) ?? undefined}
        onValueChange={(value) => {
          replace(
            setSearchParams(pathname, searchParams, PARAM_LOCATION_TYPE, value),
          );
        }}
      />
      {manage ? (
        <Link href="/jobs/new">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button size="icon" className="bg-blue-500 hover:bg-blue-400">
                <Newspaper />
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              Add New Job Post
            </TooltipContent>
          </Tooltip>
        </Link>
      ) : null}
    </div>
  );
};

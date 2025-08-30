'use client';
import { InfiniteList } from './infinite-list';
import { JobItem } from './job-item';
import { JobFilter } from './job-filter';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import {
  PARAM_JOB_TYPE,
  PARAM_LOCATION,
  PARAM_LOCATION_TYPE,
  PARAM_RECRUITER_ID,
  PARAM_TITLE,
} from '@/lib/constants';

export type JobListProps = {
  userId?: string | null;
};

export const JobList = ({ userId }: JobListProps) => {
  const params = useSearchParams();
  const [force, setForce] = useState(0);
  const jobType = params.get(PARAM_JOB_TYPE);
  const title = params.get(PARAM_TITLE);
  const location = params.get(PARAM_LOCATION);
  const locationType = params.get(PARAM_LOCATION_TYPE);

  useEffect(() => {
    setForce((prev) => prev + 1);
  }, [jobType, title, location, locationType]);

  return (
    <div className="flex flex-col">
      <JobFilter manage={userId != null} />
      <InfiniteList
        key={force}
        columns="id,title,updated_at,company,job_type,location,location_type"
        tableName="job"
        renderItem={(job) => (
          <JobItem
            key={job.id}
            {...job}
            manage={userId != null}
            onManageDelete={() => setForce((prev) => prev + 1)}
          />
        )}
        trailingQuery={(query) => {
          query = query
            .eq('status', 'Open')
            .order('updated_at', { ascending: false });
          if (userId) {
            query = query.eq(PARAM_RECRUITER_ID, userId);
          }
          if (title) {
            query = query.ilike(PARAM_TITLE, `%${title}%`);
          }
          if (jobType) {
            query = query.eq(PARAM_JOB_TYPE, jobType);
          }
          if (location) {
            query = query.ilike(PARAM_LOCATION, `%${location}%`);
          }
          if (locationType) {
            query = query.eq(PARAM_LOCATION_TYPE, locationType);
          }
          return query;
        }}
      />
    </div>
  );
};

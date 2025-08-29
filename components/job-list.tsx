'use client';
import { SupabaseQueryHandler } from '@/hooks/use-infinite-query';
import { InfiniteList } from './infinite-list';
import { JobItem } from './job-item';

const orderByUpdatedAt: SupabaseQueryHandler<'todos'> = (query) => {
  return query.eq('status', 'Open').order('updated_at', { ascending: false });
};

export const JobList = () => {
  return (
    <div>
      <InfiniteList
        columns="id,title,updated_at,company,job_type,location,location_type"
        tableName="job"
        renderItem={(job) => <JobItem key={job.id} {...job} />}
        trailingQuery={orderByUpdatedAt}
      />
    </div>
  );
};

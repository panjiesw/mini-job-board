import { createClient } from '@/lib/supabase/client';
import { Button } from './ui/button';
import { Pencil } from 'lucide-react';
import { PARAM_ID, TABLE_JOB } from '@/lib/constants';
import { JobDeleteConfirm } from './job-delete-confirm';
import Link from 'next/link';
import { Tooltip, TooltipContent, TooltipTrigger } from './ui/tooltip';

export type JobManageButtonsProps = {
  id: string;
  onManageDelete?: () => void;
};

export function JobManageButtons({
  id,
  onManageDelete,
}: JobManageButtonsProps) {
  return (
    <>
      <Link href={`/jobs/${id}/edit`}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button variant="outline" size="icon">
              <Pencil />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Edit</TooltipContent>
        </Tooltip>
      </Link>
      <JobDeleteConfirm
        onConfirm={async () => {
          const supabase = createClient();
          await supabase.from(TABLE_JOB).delete().eq(PARAM_ID, id);
          onManageDelete?.();
        }}
      />
    </>
  );
}

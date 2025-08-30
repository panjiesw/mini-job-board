'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Editor from 'react-simple-wysiwyg';
import sanitizeHtml from 'sanitize-html';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/form';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { SelectJobType } from './select-job-type';
import { SelectLocationType } from './select-location-type';
import { createClient } from '@/lib/supabase/client';
import { PARAM_ID, TABLE_JOB } from '@/lib/constants';
import { useRouter } from 'next/navigation';
import { PostgrestError } from '@supabase/postgrest-js';

const formSchema = z.object({
  title: z
    .string()
    .min(5, { error: 'Please provide a more detailed title' })
    .max(128, { error: 'Please provide a more compact title' }),
  description: z
    .string()
    .nonempty({ error: 'Please provide the job description' }),
  company: z.string().nonempty({ error: 'Please provide company name' }),
  job_type: z.enum(['Full-Time', 'Part-Time', 'Contract']),
  location: z
    .string()
    .nonempty({ error: 'Please provide the location for this job' }),
  location_type: z.enum(['Remote', 'Hybrid', 'On-site']),
});

export type JobFormSchema = z.infer<typeof formSchema>;

export type JobFormProps = {
  id?: string;
  defaultValues?: JobFormSchema;
};

export function JobForm({ id, defaultValues }: JobFormProps) {
  const router = useRouter();
  const jobForm = useForm<JobFormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: defaultValues ?? {
      title: '',
      company: '',
      description: '',
      job_type: 'Full-Time',
      location: '',
      location_type: 'On-site',
    },
  });

  const onSubmit = async (values: JobFormSchema) => {
    const description = sanitizeHtml(values.description);

    const supabase = createClient();
    const { data: currentUser } = await supabase.auth.getUser();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let ret: any;
    let err: PostgrestError | null;
    if (id) {
      const { data, error } = await supabase
        .from(TABLE_JOB)
        .update({ ...values, description })
        .eq(PARAM_ID, id)
        .select()
        .single();
      ret = data;
      err = error;
    } else {
      const { data, error } = await supabase
        .from(TABLE_JOB)
        .insert({ ...values, description, recruiter_id: currentUser.user!.id })
        .select()
        .single();
      ret = data;
      err = error;
    }

    if (err) {
      throw err;
    }
    router.push(`/job/${ret.id}`);
  };

  return (
    <Form {...jobForm}>
      <form onSubmit={jobForm.handleSubmit(onSubmit)}>
        <FormField
          control={jobForm.control}
          name="title"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Senior Software Engineer" {...field} />
              </FormControl>
              <FormDescription>The job title</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={jobForm.control}
          name="company"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Company</FormLabel>
              <FormControl>
                <Input placeholder="ACME Company" {...field} />
              </FormControl>
              <FormDescription>The company name for this job</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={jobForm.control}
          name="job_type"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Job Type</FormLabel>
              <FormControl>
                <SelectJobType {...field} />
              </FormControl>
              <FormDescription>Choose Job Type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={jobForm.control}
          name="location"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Location</FormLabel>
              <FormControl>
                <Input placeholder="Los Angeles, CA" {...field} />
              </FormControl>
              <FormDescription>The location for this job</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={jobForm.control}
          name="location_type"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Location Type</FormLabel>
              <FormControl>
                <SelectLocationType {...field} />
              </FormControl>
              <FormDescription>Choose Location Type</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={jobForm.control}
          name="description"
          render={({ field }) => (
            <FormItem className="mb-4">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Editor
                  {...field}
                  containerProps={{ className: '!min-h-64 resize-y' }}
                />
              </FormControl>
              <FormDescription>
                Provide a detailed description for this job
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}

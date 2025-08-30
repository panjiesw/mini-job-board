import { ComponentPropsWithoutRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export type SelectJobTypeProps = ComponentPropsWithoutRef<typeof Select>;

export const SelectJobType = (props: SelectJobTypeProps) => {
  return (
    <Select {...props}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Job Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Full-Time">Full-Time</SelectItem>
        <SelectItem value="Part-Time">Part-Time</SelectItem>
        <SelectItem value="Contract">Contract</SelectItem>
      </SelectContent>
    </Select>
  );
};

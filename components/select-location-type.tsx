import { ComponentPropsWithoutRef } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export type SelectLocationTypeProps = ComponentPropsWithoutRef<typeof Select>;

export const SelectLocationType = (props: SelectLocationTypeProps) => {
  return (
    <Select {...props}>
      <SelectTrigger>
        <SelectValue placeholder="Location Type" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="Remote">Remote</SelectItem>
        <SelectItem value="Hybrid">Hybrid</SelectItem>
        <SelectItem value="On-site">On-site</SelectItem>
      </SelectContent>
    </Select>
  );
};

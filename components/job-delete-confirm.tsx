import { Trash } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';

export type JobDeleteConfirmProps = {
  onConfirm?: () => void;
};

export function JobDeleteConfirm({ onConfirm }: JobDeleteConfirmProps) {
  return (
    <TooltipProvider>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button variant="destructive" size="icon">
                <Trash />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>Delete</TooltipContent>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirm Job Delete</DialogTitle>
            </DialogHeader>
            <p>
              This action cannot be undone. This will permanently delete the job
              posting.
            </p>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button variant="destructive" onClick={onConfirm}>
                Confirm
              </Button>
            </DialogFooter>
          </DialogContent>
        </Tooltip>
      </Dialog>
    </TooltipProvider>
  );
}

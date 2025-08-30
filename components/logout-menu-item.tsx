'use client';

import { ComponentProps } from 'react';
import { DropdownMenuItem } from './ui/dropdown-menu';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';

export const LogoutMenuItem = ({
  onSelect,
  ...props
}: ComponentProps<typeof DropdownMenuItem>) => {
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace('/');
  };
  return <DropdownMenuItem onSelect={onSelect ?? logout} {...props} />;
};

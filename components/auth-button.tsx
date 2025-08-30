import Link from 'next/link';
import { Button } from './ui/button';
import { createClient } from '@/lib/supabase/server';
import { CurrentUserAvatar } from './current-user-avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import { LogoutMenuItem } from './logout-menu-item';

export async function AuthButton() {
  const supabase = await createClient();

  // You can also use getUser() which will be slower.
  const { data } = await supabase.auth.getUser();

  const { user } = data;

  return user ? (
    <div className="flex items-center gap-4">
      <DropdownMenu>
        <DropdownMenuTrigger>
          <CurrentUserAvatar />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>
            {user.user_metadata?.display_name ?? user.email ?? 'My Account'}
          </DropdownMenuLabel>
          <DropdownMenuGroup>
            {/* <DropdownMenuItem>My Profile</DropdownMenuItem> */}
            <DropdownMenuItem>
              <Link href="/jobs/new">Add New Job</Link>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Link href="/jobs">My Posted Jobs</Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem>
              <Link href="/auth/forgot-password">Forgot Password</Link>
            </DropdownMenuItem>
            <LogoutMenuItem>Logout</LogoutMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  ) : (
    <div className="flex gap-2">
      <Button asChild size="sm" variant="outline">
        <Link href="/auth/login">Login</Link>
      </Button>
      <Button asChild size="sm" variant="default">
        <Link href="/jobs/new">Post a Job!</Link>
      </Button>
    </div>
  );
}

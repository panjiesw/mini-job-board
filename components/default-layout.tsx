import { CommonPageLayoutProps } from '@/lib/types';
import Link from 'next/link';
import { AuthButton } from './auth-button';
import { cn } from '@/lib/utils';
import { ThemeSwitcher } from './theme-switcher';

export const DefaultLayout = ({
  className,
  children,
}: CommonPageLayoutProps) => (
  <main className={cn('min-h-screen flex flex-col items-center', className)}>
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <nav className="w-full flex justify-center border-b border-b-foreground/10 h-16">
        <div className="w-full max-w-5xl flex gap-2 items-center p-3 px-5 text-sm">
          <div className="flex gap-5 items-center font-semibold">
            <Link href={'/'}>Mini Job Board</Link>
          </div>
          <span className="flex-1" />
          <AuthButton />
          <ThemeSwitcher />
        </div>
      </nav>
      <div className="flex-1 flex flex-col gap-20 max-w-5xl p-5">
        {children}
      </div>
    </div>
  </main>
);

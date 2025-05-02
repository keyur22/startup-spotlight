import { auth, signIn, signOut } from '@/auth';
import { BadgePlus, LogOut } from 'lucide-react';

import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';

const Navbar = async () => {
  const session = await auth();

  return (
    <header className='px-5 py-3 bg-white shadow-sm font-work-sans'>
      <nav className='flex justify-between items-center'>
        <Link href='/'>
          <Image src='/logo.jpg' alt='logo' width={144} height={30} priority />
        </Link>

        <div className='flex items-center gap-5 text-black'>
          {session?.user ? (
            <>
              <Link href='/startup/create'>
                <span className='max-sm:hidden'>Create</span>
                <BadgePlus className='size-6 sm:hidden' />
              </Link>
              <button
                onClick={async () => {
                  'use server';
                  await signOut({ redirectTo: '/' });
                }}
              >
                <span className='max-sm:hidden'>Logout</span>
                <LogOut className='size-6 sm:hidden text-red-500' />
              </button>
              <Link href={`/user/${session.id}`}>
                <Avatar className='size-10'>
                  <AvatarImage
                    src={session?.user?.image || ''}
                    alt={session?.user?.name || ''}
                  />
                  <AvatarFallback>AV</AvatarFallback>
                </Avatar>
              </Link>
            </>
          ) : (
            <button
              onClick={async () => {
                'use server';
                await signIn('github');
              }}
            >
              <span>Login</span>
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;

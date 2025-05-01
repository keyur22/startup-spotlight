import { PropsWithChildren } from 'react';
import Navbar from '../../components/Navbar';
import { Toaster } from '@/components/ui/toaster';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <main className='font-work-sans'>
        <Navbar />
        {children}
      </main>
      <Toaster />
    </>
  );
};

export default Layout;

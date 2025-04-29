import { PropsWithChildren } from 'react';
import Navbar from '../../components/Navbar';

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <main className='font-work-sans'>
      <Navbar />
      {children}
    </main>
  );
};

export default Layout;

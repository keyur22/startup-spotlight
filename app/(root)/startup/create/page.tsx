import { auth } from '@/auth';
import StartupForm from '@/components/StartupForm';
import { Metadata } from 'next';
import { redirect } from 'next/navigation';

const StartupCreatePage = async () => {
  const session = await auth();

  if (!session) redirect('/');

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <h1 className='heading'>Submit Your Startup</h1>
      </section>

      <StartupForm />
    </>
  );
};

export const metadata: Metadata = {
  title: 'Startup Spotlight - Submit Your Startup'
};

export default StartupCreatePage;

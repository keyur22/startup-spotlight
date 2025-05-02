import StartupCard, { StartupTypeCard } from '@/components/StartupCard';
import { Skeleton } from '@/components/ui/skeleton';
import View from '@/components/View';
import { formatDate } from '@/lib/utils';
import { client } from '@/sanity/lib/client';
import {
  CATEGORY_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY
} from '@/sanity/lib/queries';
import markdownit from 'markdown-it';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Suspense } from 'react';

// export const experimental_ppr = true;

const md = markdownit();

const StartupDetailPage = async ({
  params
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;

  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(CATEGORY_BY_SLUG_QUERY, {
      slug: 'editor-picks'
    })
  ]);

  const { _createdAt, title, description, author, image, category, pitch } =
    post || {};

  const parsedContent = md.render(pitch || '');

  if (!post) return notFound();

  return (
    <>
      <section className='pink_container !min-h-[230px]'>
        <p className='tag'>{formatDate(_createdAt)}</p>

        <h1 className='heading'>{title}</h1>
        <p className='sub-heading !max-w-5xl'>{description}</p>
      </section>

      <section className='section_container'>
        {image && (
          <Image
            src={image}
            alt='thumbnail'
            className='w-full h-auto rounded-xl'
            width={500}
            height={250}
          />
        )}

        <div className='space-y-5 mt-10 max-w-4xl mx-auto'>
          <div className='flex-between gap-5'>
            <Link
              href={`/user/${author?._id}`}
              className='flex gap-2 items-center mb-3'
            >
              <Image
                src={author?.image || 'https://placehold.co/64'}
                alt='avatar'
                width={64}
                height={64}
                className='rounded-full drop-shadow-lg'
              />

              <div>
                <p className='text-20-medium'>{author?.name}</p>
                <p className='text-16-medium !text-black-300'>
                  @{author?.username}
                </p>
              </div>
            </Link>

            <p className='category-tag'>{category}</p>
          </div>

          <h3 className='text-30-bold'>Pitch Details</h3>
          {parsedContent ? (
            <article
              className='prose max-w-4xl font-work-sans break-all'
              dangerouslySetInnerHTML={{ __html: parsedContent }}
            />
          ) : (
            <p className='no-result'>No details provided</p>
          )}
        </div>

        <hr className='divider' />

        {editorPosts?.length > 0 && (
          <div className='max-w-4xl mx-auto'>
            <p className='text-30-semibold'>Editor Picks</p>

            <ul className='mt-7 card_grid-sm'>
              {editorPosts.map((post: StartupTypeCard, i: number) => (
                <StartupCard key={i} post={post} />
              ))}
            </ul>
          </div>
        )}

        <Suspense fallback={<Skeleton className='view_skeleton' />}>
          <View id={id} />
        </Suspense>
      </section>
    </>
  );
};

export default StartupDetailPage;

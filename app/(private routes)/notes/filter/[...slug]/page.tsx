import {fetchNotes } from '@/lib/api/serverApi'
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import NotesClient from './Notes.client';
import { Metadata } from 'next';

interface NotesByCategoryProps {
    params: Promise<{ slug: string[] }>;
    searchParams: Promise<{
        page?: string; 
        query?: string;
    }>
};

export async function generateMetadata({ params }: NotesByCategoryProps): Promise<Metadata> {
  const { slug } = await params
    const tag = slug[0]=== 'all' ? 'All' : slug[0];
  return {
    title: `${tag} notes`,
      description:  `Browse notes filtered by ${tag} in NoteHub.`,
     openGraph: {
      title: `${tag} notes`,
         description: `Browse notes filtered by ${tag} in NoteHub.`,
      url: `https://notehub.app/filter/${tag}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
        },
      ],
    },
  };
};
 


export default async function NotesByCategory({ params, searchParams }: NotesByCategoryProps) {
    const { slug } = await params;
    const tag = slug[0] === 'all' ? undefined : slug[0];
    
    const { page, query } = await searchParams;
    const pageNumber = Number(page) || 1;

    const queryClient = new QueryClient();

    await queryClient.prefetchQuery({
        queryKey: ['notes', pageNumber, query, tag],
        queryFn: () => fetchNotes(pageNumber, query, tag),
    });

  return (
      <HydrationBoundary state={dehydrate(queryClient)}>
          <NotesClient tag={tag}/>
</HydrationBoundary>
  );
}

'use client';
import css from './NotesPage.module.css';
import SearchBox from '@/components/SearchBox/SearchBox'
import NoteList from "@/components/NoteList/NoteList"
import Pagination from '@/components/Pagination/Pagination'
import React, { useEffect, useState } from 'react'
import { fetchNotes } from '@/lib//api/clientApi'
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import toast from 'react-hot-toast'
import {useDebouncedCallback} from 'use-debounce'
import Link from "next/link";


type NotesClientsProps = {
	tag?: string;

  
}

export default function NotesClient({tag}: NotesClientsProps) {
	const [page, setPage] = useState(1);
	const [query, setQuery] = useState('');


	const { data, isSuccess } = useQuery({
		queryKey: ["notes",query,tag, page],
		queryFn: () => fetchNotes(page, query.trim(), tag),
		placeholderData: keepPreviousData,
		refetchOnMount: false,
		
	})

	useEffect(() => {
		if (isSuccess && data?.notes.length === 0) {
			toast.error('No notes.');
		}
	}, [isSuccess, data?.notes.length]
	);

	const notes = data?.notes || [];
	const totalPages = data?.totalPages || 0;

	
	const handleChangeQuery = useDebouncedCallback(
		(event: React.ChangeEvent<HTMLInputElement>) => {
			setPage(1),
			setQuery(event.target.value)
		}, 1000
	);
	

	return (
		<div className={css.app}>
			<header className={css.toolbar}>
				<SearchBox onChange={handleChangeQuery} />
				{totalPages > 0 &&
					(
						<Pagination
							totalPages={totalPages}
							page={page}
							onSetPage={setPage}
						/>
					
					)}
				<Link className={css.button} href={"/notes/action/create"}>Create note +</Link>
				
			</header>
			
			{notes.length > 0 && <NoteList notes={notes} />}
			
			
			
		</div>
	);
}


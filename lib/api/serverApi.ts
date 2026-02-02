import type { FetchNotesResponse, Note } from "@/types/note"
import { nextServer } from './api'
import { cookies } from 'next/headers';
import { AxiosResponse } from "axios";
import { User } from '../../types/user';

export async function fetchNotes(
    page: number = 1,
    search: string = '',
    tag?: string,
): Promise<FetchNotesResponse> {
    const cookieStore = await cookies();
    const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
        params: {
            search,
            page,
            perPage: 12,
            tag,
        },
        headers: {

            Cookie: cookieStore.toString(),
        },
    });
    return data;
}


export async function fetchNoteById(id: Note['id']) {
    const cookieStore = await cookies();

    const { data } = await nextServer.get<Note>(`/notes/${id}`, {
        headers: {
            Cookie: cookieStore.toString(),
        }
    });

    return data;
};


export const checkSession = async (): Promise<AxiosResponse<{ success: boolean }>> => {
    const cookieStore = await cookies();
    const res = await nextServer.get<{ success: boolean }>('/auth/session', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });

    return res;
};




export const getMe = async (): Promise<User> => {
    const cookieStore = await cookies();
    const { data } = await nextServer.get('/users/me', {
        headers: {
            Cookie: cookieStore.toString(),
        },
    });
    return data;
};
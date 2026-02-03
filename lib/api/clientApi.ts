
import { nextServer } from './api'
import { FetchNotesResponse, NoteFormValues, Note } from "@/types/note"
import type { User } from "@/types/user";


export type RegisterRequest = {
    email: string;
    password: string;
}


export async function fetchNotes(
    page: number = 1,
    search: string = '',
    tag?: string,
): Promise<FetchNotesResponse> {
    const { data } = await nextServer.get<FetchNotesResponse>("/notes", {
        params: {
            search,
            page,
            perPage: 12,
            tag,
        },
    });
    return data;
}


export async function createNote(newNote: NoteFormValues): Promise<Note> {
    const { data } = await nextServer.post<Note>(`/notes`, newNote);
    return data;
}



export async function deleteNote(id: string): Promise<Note> {
    const { data } = await nextServer.delete<Note>(`/notes/${id}`);
    return data;
}



export async function fetchNoteById(id: Note['id']): Promise<Note> {
    const { data } = await nextServer.get<Note>(`/notes/${id}`);
    return data;
}

export async function register(payload: RegisterRequest): Promise<User> {
    const { data } = await nextServer.post<User>("/auth/register", payload, {
        headers: {
            "Content-Type": "application/json",
        },
    });

    return data;
}

export type LoginRequest = {
    email: string;
    password: string;
};

export const login = async (data: LoginRequest) => {
    const user = await nextServer.post<User>('/auth/login', data);
    return user.data;
};

export const logout = async (): Promise<void> => {
    await nextServer.post('/auth/logout')
};


export const checkSession = async (): Promise<boolean> => {
    const { data } = await nextServer.get<{ success: boolean }>('/auth/session');
    return data.success;
};



export const getMe = async (): Promise<User> => {
    const { data } = await nextServer.get<User>('/users/me');
    return data;
};


export type UpdateMeRequest = {
    username: string;
};


export const updateMe = async (
    payload: UpdateMeRequest
): Promise<User> => {
    const { data } = await nextServer.patch<User>('/users/me', payload);
    return data;
};
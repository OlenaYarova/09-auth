'use client';

import css from "@/components/NoteForm/NoteForm.module.css"
import toast from "react-hot-toast";
import { createNote } from "@/lib/api/clientApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from 'next/navigation';
import { NoteTag } from "@/types/note";
import {useNoteDraftStore} from "@/lib/store/noteStore"

const NoteForm =() => {
    const router = useRouter();
    const queryClient = useQueryClient();
    
    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const handleChange = (
        event: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
        
    ) => {
        setDraft({
            ...draft,
            [event.target.name]: event.target.value,
        });
    };


const createNoteMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ['notes'] });
        
        clearDraft();
    router.push('/notes/filter/all');
    },
    onError: () => {
      toast.error('Failed to create the note. Please try again.');
    },
});

function handleSubmit (formData: FormData): void {
      const values = {
      title: formData.get('title') as string,
      content: formData.get('content') as string,
      tag: formData.get('tag') as NoteTag,
    };
     if (!values.title.trim()) {
      toast.error('Title is required');
      return;
    }
    if (values.content) {
        if (!values.content.trim()) {
            toast.error('Content cannot contain only spaces');
            return;
        }

        if (values.content.length > 500) {
            toast.error('Content can contain up to 500 characters');
            return;
        }
    };
    createNoteMutation.mutate(values);
   
    }
    
const handleCancel = () => router.push('/notes/filter/all');

return (

        <form action={handleSubmit} className={css.form}>
            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
            <input
                id="title"
                name="title"
                value={draft.title}
                onChange={handleChange}
                className={css.input} />
                
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
            < textarea
                value={draft.content}
                onChange={handleChange}
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                />
               
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
            <select
                id="tag"
                name="tag"
                  value={draft.tag}
          onChange={handleChange}
                className={css.select}>
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
            </div>

            <div className={css.actions}>
            <button
                type="button"
                onClick={handleCancel}
                className={css.cancelButton}
                disabled = {createNoteMutation.isPending}>
                    Cancel
                </button>
                <button
                    type="submit"
                    className={css.submitButton}
                    disabled={createNoteMutation.isPending}
                    >
                     Create note
                </button>
            </div>
        </form>

);
}

export default NoteForm;
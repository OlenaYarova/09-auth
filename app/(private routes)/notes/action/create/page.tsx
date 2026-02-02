import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm'
import { Metadata } from 'next';


export const metadata: Metadata = {
    title: 'Create note',
    description: 'Create a new note in NoteHub',
    openGraph: {
        title: 'Create note',
        description: 'Create a new note in NoteHub',
        url: 'https://notehub.app/notes/action/create',
        images: [
            {
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
            },
        ],
    },
}




const CreateNote = () => {
    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>
    );
};

export default CreateNote;
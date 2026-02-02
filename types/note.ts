export type NoteTag = "Todo" | "Work" | "Personal" | "Shopping" | "Meeting";

export type Note = {
  id: string;
  title: string;
  content: string;
  tag: NoteTag;
  createdAt: string;
  updatedAt: string;
}

export type NoteFormValues = {
  title: string;
  content?: string;
  tag: NoteTag;
}

export type FetchNotesResponse = {
  notes: Note[];
  totalPages: number;
}


import React from 'react';
import styles from '../Notes.module.css';
import PocketBase from "pocketbase";
import { useRouter } from 'next/navigation';
import Link from 'next/link';


async function getNote(noteId: string) {
    const res = await fetch(
        `http://127.0.0.1:8090/api/collections/notes/records/${noteId}`,
        {
            next: { revalidate: 10 },
        }
    );
    const data = await res.json();
    return data;
}
async function deleteNote(noteId: string){
    const db = new PocketBase('http://127.0.0.1:8090');
    await db.collection('notes').delete(noteId);
    return null
}

export default async function NotePage({ params }: any) {
    const note = await getNote(params.id);
    

    return (
        <div>
            <h1>notes/{note.id}</h1>
            <div className={styles.note}>
                <h3>{note.title}</h3>
                <h5>{note.content}</h5>
                <p>{note.created}</p>
            </div>
            
            
            <Link href="/notes">
                <button onClick={deleteNote(note.id)}>Delete</button>
            </Link>
        
        </div>
    );
}